import fs from 'fs'
import { promisify } from 'util'

// const pathIsExistAsync = path => promisify(fs.access)(path)
//   .then(() => null)
//   .catch(err => err)
// const pathIsExistAsync = (path) => new Promise((resolve, reject) => { 
//   fs.access(path, function (err) { 
//     if (err) reject(err)
//     resolve(null)
//   })
// })

module.exports = {
  pathAccessAsync: promisify(fs.access),
  pathAccessSync: fs.accessSync
}
