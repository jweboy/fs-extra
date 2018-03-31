import path from 'path'
import fs from './es'

fs.copy('', path.resolve('./es1'), {}, function (err) {
}).then(() => { 
  
}).catch(err => { 
  console.log(1, err);
})