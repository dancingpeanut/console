import { get } from 'lodash'

import { getValueObj } from './yaml'

export const getConfigFromAbstraction = (prefix, abstraction) => {
  const r = RegExp(`${prefix}\\s+\`\`\`json([\\s\\S]+?)\`\`\``)
  const match = r.exec(abstraction)
  if (match && match.length >= 2) {
    const configStr = match[1]
    try {
      const result = JSON.parse(configStr)
      // eslint-disable-next-line no-console
      console.log(prefix + configStr)
      return result
    } catch (e) {
      console.error(`Get config from abstraction error, ${configStr}\n`, e)
    }
  }
  return null
}

export const getExtraInfoFromEnv = (abstraction, env) => {
  const result = []
  try {
    const yamlObj = getValueObj(env)
    // 提取配置项
    const configs = getConfigFromAbstraction('APP附加信息：', abstraction)
    if (configs != null) {
      configs.forEach(c => {
        const vv = []
        const v = get(yamlObj, c.path)
        if (v !== undefined && v !== null) {
          if (c.name !== undefined && c.name !== null && c.name !== '') {
            vv.push(c.name)
          }
          vv.push(v)
          result.push(vv)
        }
      })
    }
  } catch (e) {
    console.error(`Get extra info from error,\n`, e)
  }
  return result
}

export const getExtraInfoStringFromEnv = (abstraction, env) => {
  return getExtraInfoFromEnv(abstraction, env)
    .map(d => {
      return d.join(': ')
    })
    .join('  |  ')
}

export const getLocalStorageItem = key => {
  const item = localStorage.getItem(key)
  try {
    return JSON.parse(item)
  } catch (e) {
    return item
  }
}

export const setLocalStorageItem = (key, value) => {
  let vv = value
  if (typeof value !== 'string') {
    vv = JSON.stringify(value)
  }
  try {
    localStorage.setItem(key, vv)
  } catch (e) {
    console.error('Set localStorage error,', e)
  }
}
