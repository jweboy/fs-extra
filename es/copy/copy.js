import fs from 'fs'
import path from 'path'
import { pathAccessAsync } from '../path-access'
import { mkdirAsync } from '../mkdir'
// import { promiseify } from '../util/promiseify'

const NOTEXIST = Symbol('notExist')
const EXIST = Symbol('exist')
const ENCODEING = 'utf-8'

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
    // console.log('start-copy', ...args)

    const [src, dist] = args
    const statSync = fs.lstatSync
    // console.log(src)

    try {
      const stat = await statSync(src)
      // 目录类型
      if (stat.isDirectory()) {
        await _onDir(...args)
      }
      // 文件类型
      if (stat.isFile() ||
        stat.isBlockDevice() ||
        stat.isCharacterDevice()
      ) {
        _onFile()
      }
    } catch (err) {
      reject(err)
    }
  })
}

const readlinkAsync = (path, opts = {
  encoding: ENCODEING
}) => new Promise(function (resolve, reject) {
  fs.readlink(path, opts, function (err, linkstring) {
    if (err) {
      // TODO: windows may throw UNKNOWN error
      // dest exists and is a regular file or directory
      if (err.code === 'EINVAL') {
        resolve(EXIST)
      }
      if (err.code === 'ENOENT') {
        resolve(NOTEXIST)
      } else {
        reject(err)
      }
    }
    resolve(linkstring)
  })
})

const _checkDist = async (src, dist) => new Promise(async function (resolve, reject) {
  try {
    const linkPath = await readlinkAsync(dist)
    if (linkPath === NOTEXIST) {
      if (_isSrcSubDir(src, dist)) {
        reject(new Error(`Cannot copy ${src} to a subdirectory of itself, ${dist}`))
      }
    }
    if (linkPath === EXIST) {
      if (_isSrcSubDir(src, dist)) {
        reject(new Error(`Cannot copy ${src} to a subdirectory of itself, ${dist}`))
      }
      _mapCopyDir()
    }
  } catch (err) {
    console.log('checkdir-err', err)
  }
})

function _mapCopyDir() { 
  
}

async function _onDir (src, dist) {
  console.log('copy dir', dist)
  try {
    const codeVal = await _checkDist(src, dist)
    console.log('codeVal', codeVal)
  } catch (err) {
    console.log('ondir-err', err)
  }
}

function _isSrcSubDir (src, dist) {
  const srcArray = src.split(path.sep)
  const distArray = dist.split(path.stp)

  srcArray.reduce(function (res, curr, index) {
    return res && distArray[index] === curr
  }, true)

  // console.log(srcArray, distArray)
}

function _onFile () {
  console.log('copy file')
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
      dist = path.dirname(dist)
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
