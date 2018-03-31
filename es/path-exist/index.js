import fs from 'fs'
import { promisify } from 'util'
import { fromCallback } from 'universalify'

// const _access = promisify(fs.access)

const pathIsExist = path => promisify(fs.access)(path)
  .then(() => null)
  .catch(err => err)

module.exports = {
  pathExist: pathIsExist
}
