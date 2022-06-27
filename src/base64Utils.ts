/*
 * @Author: lrqnew
 * @Date: 2022-06-27 14:06:07
 * @LastEditors:
 * @LastEditTime: 2022-06-27 14:06:29
 * @FilePath: \utils-q\src\base64.ts
 * @Description:
 */

/**
 * 是否是base64数据
 * @param str 
 * @returns 
 */
export function isBase64(str: string) {
  if (str.indexOf("data:") != -1 && str.indexOf("base64") != -1) {
    return true
  } else {
    return false
  }
}
