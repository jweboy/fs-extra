export default function assign(fs, module) {
  // ['copy']
  const keys = Object.keys(module)

  for (const name of keys) {
    fs[name] = module[name]
  }

  return fs
}