import { pathExist } from '../path-exist'

export default function copy(src, dist, opts, cb) { 
  console.log('copy', pathExist());
  return new Promise((resolve, reject) => { 
    pathExist(dist)
      .then((exist) => { 
        console.log(exist);
      })
      .catch(err => {
        reject(err)
      })
  })
}