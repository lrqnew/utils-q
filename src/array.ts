/*
 * @Author: lrqnew
 * @Date: 2022-06-27 14:07:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-06-27 14:14:19
 * @FilePath: \utils-q\src\array.ts
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
