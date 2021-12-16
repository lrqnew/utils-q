/*
 * @Author: OBKoro1
 * @Date: 2021-12-16 10:25:18
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-16 10:58:11
 * @FilePath: \q-utils\src\color.ts
 * @Description: 颜色工具函数
 */

/**
 * 判断是否 十六进制颜色值.
 * 输入形式可为 #fff000 #f00
 *
 * @param   String  color   十六进制颜色值
 * @return  Boolean
 */
export function isHexColor(color: string) {
  const reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-f]{6})$/
  return reg.test(color)
}

/**
 * RGB 颜色值转换为 十六进制颜色值.
 * r, g, 和 b 需要在 [0, 255] 范围内
 *
 * @return  String          类似#ff00ff
 * @param r
 * @param g
 * @param b
 */
export function rgbToHex(r: number, g: number, b: number) {
  // tslint:disable-next-line:no-bitwise
  const hex = ((r << 16) | (g << 8) | b).toString(16)
  return "#" + new Array(Math.abs(hex.length - 7)).join("0") + hex
}

/**
 * 将十六进制颜色转换为RGB
 * @param {string} hex 要变换的颜色
 * @returns 传递的颜色的RGB
 */
export function hexToRGB(hex: string) {
  let sHex = hex.toLowerCase()
  if (isHexColor(hex)) {
    if (sHex.length === 4) {
      let sColorNew = "#"
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sHex.slice(i, i + 1).concat(sHex.slice(i, i + 1))
      }
      sHex = sColorNew
    }
    const sColorChange: number[] = []
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt("0x" + sHex.slice(i, i + 2)))
    }
    return "RGB(" + sColorChange.join(",") + ")"
  }
  return sHex
}

/**
 * 用十六进制颜色的R、G或B减去指定的百分比
 * @param {string} color 要改变的颜色
 * @param {number} amount 改变颜色的量
 * @returns {string} 结果颜色
 */
function subtractLight(color: string, amount: number) {
  const cc = parseInt(color, 16) - amount
  const c = cc < 0 ? 0 : cc
  return c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`
}
/**
 * 根据通过的百分比调暗十六进制颜色
 * @param {string} color 要处理的颜色
 * @param {number} amount 改变颜色的量
 * @returns {string} 结果颜色
 */
export function darken(color: string, amount: number) {
  color = color.indexOf("#") >= 0 ? color.substring(1, color.length) : color
  amount = Math.trunc((255 * amount) / 100)
  return `#${subtractLight(color.substring(0, 2), amount)}${subtractLight(
    color.substring(2, 4),
    amount,
  )}${subtractLight(color.substring(4, 6), amount)}`
}

/**
 * 根据通过的百分比，调亮十六进制颜色
 * @param {string} color 要改变的颜色
 * @param {number} amount 改变颜色的量
 * @returns {string} 结果颜色
 */
export function lighten(color: string, amount: number) {
  color = color.indexOf("#") >= 0 ? color.substring(1, color.length) : color
  amount = Math.trunc((255 * amount) / 100)
  return `#${addLight(color.substring(0, 2), amount)}${addLight(
    color.substring(2, 4),
    amount,
  )}${addLight(color.substring(4, 6), amount)}`
}

/**
 * 将传递给十六进制颜色的R、G或B的百分比相加
 * @param {string} color 要改变的颜色
 * @param {number} amount 改变颜色的量
 * @returns {string} 结果颜色
 */
function addLight(color: string, amount: number) {
  const cc = parseInt(color, 16) + amount
  const c = cc > 255 ? 255 : cc
  return c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`
}

/**
 * 计算rgb颜色的亮度
 * @param {number} r red
 * @param {number} g green
 * @param {number} b blue
 */
function luminanace(r: number, g: number, b: number) {
  const a = [r, g, b].map((v) => {
    v /= 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
}
/**
 * 计算两个rgb颜色之间的对比度
 * @param {string} rgb1 rgb color 1
 * @param {string} rgb2 rgb color 2
 */
function contrast(rgb1: string[], rgb2: number[]) {
  return (
    (luminanace(~~rgb1[0], ~~rgb1[1], ~~rgb1[2]) + 0.05) /
    (luminanace(rgb2[0], rgb2[1], rgb2[2]) + 0.05)
  )
}
/**
 * 根据与背景的对比确定最佳文本颜色(黑色或白色)
 * @param hexColor - 用户最后选择的颜色
 */
export function calculateBestTextColor(hexColor: string) {
  const rgbColor = hexToRGB(hexColor.substring(1))
  const contrastWithBlack = contrast(rgbColor.split(","), [0, 0, 0])
  return contrastWithBlack >= 12 ? "#000000" : "#FFFFFF"
}
