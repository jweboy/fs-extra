import path from 'path'
import fs from './es'

fs.copy(path.resolve('./src22'), path.resolve('./forTest'), {})
  .catch(err => {
    console.log('copy-err', err)
    // throw err
  })

// // fs.mkdirAsync(path.resolve('./es1'))
// //   .then((data) => {
// //     console.log('ok', data);
// //   }).catch(err => {
// //     console.log('err', err);
// //   })
