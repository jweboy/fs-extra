import { pathAccessAsync } from '../path-access'
import { mkdirAsync } from '../mkdir';

function _startCopy(...args) { 
  console.log('start-copy', ...args);
}

export default  function copy(src, dist, opts) { 
  return new Promise(async (resolve, reject) => { 
    try { 
      // await mkdir(dist)
      const distAccessError = await pathAccessAsync(dist)
      // dist is exist => startCopy
      if (!distAccessError) { 
        return _startCopy(src, dist, opts)
      }
    } catch (err) {
      // dist isn't exist => mkdir
      try { 
        await mkdirAsync(dist)
        _startCopy(src, dist, opts)
      } catch (err) {
        reject(err)
      }
    }
  })
}

// process.on('unhandledRejection', (err) => {
//   console.log('Unhandled Rejection at:', err.message)
//   // process.exit(1)
//   // application specific logging, throwing an error, or other logic here
// })