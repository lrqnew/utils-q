/*
 * @Author: lrqnew
 * @Date: 2022-06-27 14:40:14
 * @LastEditors: 
 * @LastEditTime: 2022-06-27 14:41:32
 * @FilePath: \utils-q\test\stringUtils.test.ts
 * @Description: 
 */
import { numberToChinese } from "../src/stringUtils"

describe("字符串函数", () => {
  test("数字转中文", () => {
    expect(numberToChinese(123)).toBe("一百二十三")
  })
})
