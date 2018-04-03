import fs from 'fs'
import path from 'path'

const MODE = '0o777'

export default function mkdir(_path, opts = { mode: MODE }) { 
  return new Promise(function (resolve, reject) { 
    if (Object.prototype.toString.call(opts) !== '[object Object]') { 
      reject(new Error('mkdir options must be object'))
    }
    const mode = opts.mode
    if (!mode) { 
      mode = MODE
    }
  
    _path = path.resolve(_path)

    fs.mkdir(_path, mode, function (err) { 
      if (err) { 
        reject(err)
      }
      resolve(null)
    })
  })
}

