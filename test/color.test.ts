/*
 * @Author: OBKoro1
 * @Date: 2021-12-16 10:27:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-16 10:49:19
 * @FilePath: \q-utils\test\color.test.ts
 * @Description:
 */
import { isHexColor, hexToRGB, rgbToHex } from "../src/color"

describe("颜色", () => {
  test("判断是否 十六进制颜色值,输入形式可为 #fff000 #f00", () => {
    expect(isHexColor("#fff000")).toBe(true)
  })
  test("将十六进制颜色转换为RGB", () => {
    expect(hexToRGB("#FFB400")).toBe("RGB(255,180,0)")
  })
  test("将RGB转换为十六进制颜色", () => {
    expect(rgbToHex(255,180,0)).toBe("#ffb400")
  })
})
