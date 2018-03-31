import assign from './util/assign';

const fs = {}

assign(fs, require('./copy'))
assign(fs, require('./path-exist'))

export default fs

