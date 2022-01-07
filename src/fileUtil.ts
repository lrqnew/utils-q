/*
 * @Author: lrqnew
 * @Date: 2021-12-24 09:50:11
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-07 17:27:34
 * @FilePath: \utils-q\src\fileUtil.ts
 * @Description: 文件工具函数
 */

/**
 * 生成唯一文件名
 * @param len  生成的文件名长度
 * @param radix  指定基数
 * @returns
 */
export function getuuid(len: number, radix?:number) {
  const chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("")
  let uuid = []
  let i = 0
  radix = radix || chars.length

  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)]
  } else {
    let r
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-"
    uuid[14] = "4"

    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16)
        uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r]
      }
    }
  }

  return uuid.join("")
}

/**
 * 生成唯一文件名 时间戳 + 随机数
 * @param  len 生成的文件名长度
 * @param  radix 指定基数
 */
export function getTimeId(len: number, radix?: number) {
  if (len) {
    const time = new Date().getTime()
    const uuid = getuuid(len, radix)
    return `${time}${uuid}`
  } else {
    console.log("请输入长度")
  }
}
