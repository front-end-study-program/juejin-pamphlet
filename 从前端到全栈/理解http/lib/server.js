import http from 'http'
import cluster from 'cluster' // 集群
import os from 'os'
import fs from 'fs'
import Interceptor from './interceptor.js'

const cpuNums = os.cpus().length // 获取CPU的内核数
export default class Server {
  constructor({instances = 1, enableCluster = true, mode = 'production'} = {}) {
    if(mode === 'development') {
      instances = 1; // 在开发模式下，为了提高开发速度，只启动一个worker进程
      enableCluster = true;
    }

    this.mode = mode; // production / development
    this.instances = instances || cpuNums // 指定启动几个进程，默认启动和cpu的内核数一样多的进程
    this.enableCluster = enableCluster // 是否启动多进程服务

    const interceptor = new Interceptor()

    this.server = http.createServer(async (req, res) => {
      await interceptor.run({ req, res }) // 执行注册的拦截函数

      if(!res.writableFinished) {
        let body = res.body || '200 OK'
        if(body.pipe) {
          body.pipe(res)
        } else {
          if(typeof body !== 'string' && res.getHeader('Content-Type') === 'application/json') {
            body = JSON.stringify(body)
          }
          res.end(body)
        }
      }
    })

    this.server.on('clientError', (err, socket) => {
      socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
    })

    this.interceptor = interceptor
  }
  // 监听服务
  listen(opts, cb = () => {}) {
    if(typeof opts === 'number') opts = {port: opts};
    opts.host = opts.host || '0.0.0.0';
    const instances = this.instances;
    if(this.enableCluster && cluster.isMaster) {
      for(let i = 0; i < instances; i++) {
        cluster.fork();
      }

      function broadcast(message) { // eslint-disable-line no-inner-declarations
        Object.entries(cluster.workers).forEach(([id, worker]) => {
          worker.send(message);
        });
      }

      // 广播消息
      Object.keys(cluster.workers).forEach((id) => {
        cluster.workers[id].on('message', broadcast);
      });

      /* 如果是开发模式，监听js文件是否修改：
      如果文件有变化，则杀死所有子进程（即worker进程），并重新启动一个新的子进程。*/
      if(this.mode === 'development') { 
        fs.watch('.', {recursive: true}, (eventType) => { // 监听js文件是否更新
          if(eventType === 'change') { // 如果
            Object.entries(cluster.workers).forEach(([id, worker]) => {
              console.log('kill workder %d', id);
              worker.kill();
            });
            cluster.fork();
          }
        });
      } else { // 如果在production模式下，则不能热更新：
        cluster.on('exit', (worker, code, signal) => {
          console.log('worker %d died (%s). restarting...',
            worker.process.pid, signal || code);
          cluster.fork();
        });
      }
    } else {
      this.worker = cluster.worker;
      console.log(`Starting up http-server
      http://${opts.host}:${opts.port}`);
      this.server.listen(opts, () => cb(this.server));
    }
  }
  // 向http服务器添加不同功能的拦截切面
  use(aspect) {
    return this.interceptor.use(aspect);
  }
}