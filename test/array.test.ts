/*
 * @Author: lrqnew
 * @Date: 2022-06-27 14:10:22
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-06-27 16:05:08
 * @FilePath: \utils-q\test\array.test.ts
 * @Description:
 */
import {
  getMaxValue,
  getMaxValueItem,
  dupAvg,
  arrayRemove,
} from "../src/arrayUtils"

describe("对象函数", () => {
  test("返回对象中所有属性的最大值", () => {
    expect(getMaxValue([{ yw: 88, ss: 50, en: 99 }])).toBe(99)
  })
  test("返回对象数组中对象的某一项的最大值", () => {
    expect(
      getMaxValueItem(
        [
          { a: 10, b: 2 },
          { a: 88, b: 100 },
          { a: 879, b: 888 },
        ],
        "a",
      ),
    ).toBe(879)
  })
  test("计算数组里的对象的某个key相同，其余key的值求平均数", () => {
    expect(
      dupAvg(
        [
          { x: "2021-10-21", y: 100 },
          { x: "2021-10-22", y: 20 },
          { x: "2021-10-21", y: 200 },
          { x: "2021-10-22", y: 20 },
        ],
        "x",
        "y",
        2,
      ),
    ).toStrictEqual([
      { x: "2021-10-21", y: "150.00" },
      { x: "2021-10-22", y: "20.00" },
    ])
  })

  test("删除数组中指定的元素", () => {
    expect(arrayRemove( 10,[20, 10, 101])).toStrictEqual([20,101])
  })
})
