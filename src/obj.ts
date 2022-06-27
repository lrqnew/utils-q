

/**
 * 同时删除对象的多个属性
 * @param obj  {a:1,b:2,c:3}
 * @param args a,b
 * @returns
 */
 export function delKey(obj: { [x: string]: any; }, ...args: any[]) {
    args.forEach((v) => {
      delete obj[v];
    });
    return obj;
  }