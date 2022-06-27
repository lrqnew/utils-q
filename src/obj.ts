/**
 * 同时删除对象的多个属性
 * @param obj  {a:1,b:2,c:3}
 * @param args a,b
 * @returns
 */
export function delKey(obj: { [x: string]: any }, ...args: any[]) {
  args.forEach((v) => {
    delete obj[v]
  })
  return obj
}

/**
 * 获取对象的前几个数据
 * @param obj
 * @param num 前几个
 * @returns
 */
export function params(obj: { [x: string]: any }, num: number) {
  const newData: any = {}
  const newDatas: any = {}
  const newKeys = Object.keys(obj)
  newKeys.map((item, idx) => {
    if (idx < num) {
      newData[item] = obj[item]
    }
  })
  for (const key in newData) {
    const newKey = key
    newDatas[newKey] = newData[key]
  }
  return newDatas
}
