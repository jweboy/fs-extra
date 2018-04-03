import path from 'path'
import fs from './es'

fs.copy('', path.resolve('./forTest'), {})
  .then(() => { 
  
  }).catch(err => { 
    console.log('copy-err', err);
  })

// fs.pathAccessAsync(path.resolve('./es1'))
// .then((data) => { 
//   console.log('ok', data);
// }).catch(err => { 
//   console.log('exist-err', err);
//   })
 