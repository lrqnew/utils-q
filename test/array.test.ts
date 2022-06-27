/*
 * @Author: lrqnew
 * @Date: 2022-06-27 14:10:22
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-06-27 14:16:11
 * @FilePath: \utils-q\test\array.test.ts
 * @Description:
 */
import { getMaxValue } from "../src/array"

describe("对象函数", () => {
  test("返回对象中所有属性的最大值", () => {
    expect(getMaxValue([{ yw: 88, ss: 50, en: 99 }])).toBe(99)
  })
})
