import fs from 'fs'
import { promisify } from 'util'

const ACCESSMODE = 'fs.constants.F_OK'

const pathIsExistAsync = (path, mode = ACCESSMODE) => promisify(fs.access)(path, mode)
  .then(() => true)
  .catch(() => false)

// const pathIsExistAsync = (path, mode) => new Promise((resolve, reject) => {
//   fs.access(path, function (err) {
//     if (err) resolve(false)
//     resolve(true)
//   })
// })

module.exports = {
  pathAccessAsync: pathIsExistAsync,
  pathAccessSync: fs.accessSync
}
