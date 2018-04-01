import { pathAccessAsync } from '../path-access'

function _startCopy(...args) { 
  console.log('start-copy', ...args);
}

export default  function copy(src, dist, opts) { 
  return new Promise(async (resolve, reject) => { 
    try { 
      const distAccessError = await pathAccessAsync(dist)
      // console.log('copy', distAccessError)
      if (!distAccessError) { 
        // dist is exist => start copy
        return _startCopy(src, dist, opts)
      }
      throw distAccessError
      // if (!distAccessError) {
      // }
    } catch (err) {
      // dist isn't exist => mkdir
      // mkdirs()
      console.log('mkdir', err);
    }
  })
}