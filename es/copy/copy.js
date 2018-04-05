import fs from 'fs'
import path from 'path'
import { pathAccessAsync } from '../path-access'
import { mkdirAsync } from '../mkdir'
// import { promiseify } from '../util/promiseify'

function _startCopy (...args) {
  return new Promise(async function (resolve, reject) {
    try {
      await _getStats(...args)
    } catch (err) {
      reject(err)
    }
  })
}

function _getStats (...args) {
  return new Promise(async function (resolve, reject) {
    console.log('start-copy', ...args)

    const [src, dist] = args
    const stat = fs.lstatSync

    console.log(src)

    try {
      await stat(src)
    } catch (err) {
      reject(err)
    }
  })
}

/**
 *
 * @param {String} 拷贝源目录
 * @param {String} 拷贝目标目录
 * @param {Objetc} 拷贝相关配置项
 */
export default function copy (src, dist, opts) {
  return new Promise(async (resolve, reject) => {
    src = path.resolve(src)
    dist = path.resolve(dist)
    if (src === dist) {
      reject(new Error('src and dist must not be the same.'))
    }
    try {
      const distIsExist = await pathAccessAsync(dist)
      console.log('distIsExist', distIsExist)
      if (distIsExist) {
        // dist is exist => startCopy
        return await _startCopy(src, dist, opts)
      }
      // dist isn't exist => mkdir
      await mkdirAsync(dist)
      await _startCopy(src, dist, opts)
    } catch (err) {
      console.log('debug-err', err)
      // reject(err)
    }
  })
}

// process.on('unhandledRejection', (err) => {
//   console.log('Unhandled Rejection at:', err.message)
//   // process.exit(1)
//   // application specific logging, throwing an error, or other logic here
// })
