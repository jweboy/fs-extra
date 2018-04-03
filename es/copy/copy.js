import { pathAccessAsync } from '../path-access'

function _startCopy(...args) { 
  console.log('start-copy', ...args);
}

export default  function copy(src, dist, opts) { 
  return new Promise(async (resolve, reject) => { 
    try { 
      const distAccessError = await pathAccessAsync(dist)
      // dist is exist => startCopy
      if (!distAccessError) { 
        return _startCopy(src, dist, opts)
      }
    } catch (err) {
      // dist isn't exist => mkdir
      // mkdirs()
      console.log('mkdir', err);
    }
  })
}