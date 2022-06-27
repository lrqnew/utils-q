/*
 * @Author: lrqnew
 * @Date: 2022-06-27 14:07:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-06-27 16:05:06
 * @FilePath: \utils-q\src\arrayUtils.ts
 * @Description: 数组工具函数
 */

import { flatten, parseInt } from "lodash"
/**
 * 返回对象中所有属性的最大值
 * @param obj 对象
 * @param obj 需要删除的多余对象key
 */
export function getMaxValue(obj: any[], key?: string | number) {
  const arr = obj.map((item) => {
    if (key) {
      delete item[key]
    }
    const a: any = Object.values(item)
    return a
  })
  return Math.max(
    ...[].concat(...arr.map((x) => (Array.isArray(x) ? flatten(x) : x))),
  )
}

/**
 * 返回对象数组中对象的某一项的最大值
 * @param arr 对象数组 [{a:10,b:2},{a:88,b:100},{a:879,b:888}]
 * @param key 哪一项的key  a
 * @returns
 */
export function getMaxValueItem(
  arr: { [x: string]: any }[],
  key: string | number,
) {
  // eslint-disable-next-line prefer-spread
  return Math.max.apply(
    Math,
    arr.map((i: { [x: string]: any }) => {
      return i[key]
    }),
  )
}

/**
 * 计算数组里的对象的某个key相同，其余key的值求平均数
 * @param arry 数组 [{x:'2021-10-21',y:100,},{x:'2021-10-22',y:20},{x:'2021-10-21',y:200,},{x:'2021-10-22',y:20}]
 * @param dupkey 去重的属性 x
 * @param avgkey 求值的属性 y
 * @param fixed  求值的结果保留的小数位数
 */
export function dupAvg(arry: any[], dupkey: string | number, avgkey: string | number, fixed: number | undefined) {
  const dupkeys:any = []
  const dupkeys_count:any = []
  const newArraySeries: any = []
  arry.forEach(function (e) {
    if (!dupkeys[e[dupkey]]) {
      dupkeys[e[dupkey]] = 0
      dupkeys_count[e[dupkey]] = 0
    }
    if (typeof avgkey == "string") {
      dupkeys[e[dupkey]] += Number(e[avgkey])
    } else {
      dupkeys[e[dupkey]] += e[avgkey]
    }

    dupkeys_count[e[dupkey]]++
  })
  for (const country in dupkeys) {
    newArraySeries.push({
      [dupkey]: country,
      [avgkey]: (dupkeys[country] / dupkeys_count[country]).toFixed(fixed),
    })
  }
  return newArraySeries
}

/**
 * 删除数组中指定的元素
 * @param val
 * @param arr
 */
 export function arrayRemove(val: any, arr: any[]) {
  const index = arr.indexOf(val);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr
}