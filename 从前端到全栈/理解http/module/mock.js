import fs from 'fs'
import url from 'url'
import path from 'path'

let dataCache = null;

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

function loadData() {
  if(!dataCache) {
    const file = path.resolve(__dirname, '../mock/data.json')
    const data = JSON.parse(fs.readFileSync(file, {encoding: 'utf-8'}))
    const reports = data.dailyReports // 数组格式的数据
    dataCache = {}
    // 把数组数据转换成以日期为key的JSON格式并缓存起来
    reports.forEach((report) => {
      if(report && report.updatedDate) {
        dataCache[report.updatedDate] = report
      }
    })
  }
  return dataCache
}

/**
 * 获取所有有疫情记录的日期
 */
export function getCoronavirusKeyIndex() {
  return Object.keys(loadData())
}

/**
 * 获取当前日期对应的疫情数据
 * @param {*} date
 * @returns 
 */
export function getCoronavirusByDate(date) {
  const dailyData = loadData()[date] || {}
  if(dailyData.countries) {
    // 按照各国确诊人数排序
    dailyData.countries.sort((a, b) => {
      return b.confirmed - a.confirmed
    });
  }
  return dailyData
}