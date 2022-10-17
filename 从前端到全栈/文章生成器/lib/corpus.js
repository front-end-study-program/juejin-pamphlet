import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

// import.meta.url: 获取当前脚本文件的url
// fileURLToPath: 将 url 转换为文件路径
// dirname: 获取当前 js 文件的目录
const __dirname = dirname(fileURLToPath(import.meta.url))

// 加载语料库
export function loadCorpus(src) {
  // resolve: 将 js 文件目录和相对路径进行拼接
  const path = resolve(__dirname, '..', src)
  const data = readFileSync(path, {encoding: 'utf-8'})
  return JSON.parse(data)
}

// 保存文章
export function saveCorpus(title, article) {
  const outputDir = resolve(__dirname, '..', 'output')
  const outputFile = resolve(outputDir, `${title}${Date.now()}.txt`)

  // 检查outputDir是否存在，没有则创建一个
  if(!existsSync(outputDir)) {
    mkdirSync(outputDir)
  }

  const text = `${title}\n\n    ${article.join('\n    ')}`
  writeFileSync(outputFile, text) // 写文件

  return outputFile
}