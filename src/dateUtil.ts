/*
 * @Author: lrqnew
 * @Date: 2021-12-15 16:37:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-16 11:29:46
 * @FilePath: \q-utils\src\dateUtil.ts
 * @Description: 时间格式化
 */
 import  dayjs from 'dayjs';

 const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
 const DATE_FORMAT = 'YYYY-MM-DD';
 
 /**
  * 日期格式转换 
  * @param date 时间
  * @param format 格式'YYYY-MM-DD'
  * @returns 
  */
 export function formatToDateTime(
   date: dayjs.Dayjs | undefined = undefined,
   format = DATE_TIME_FORMAT,
 ): string {
   return dayjs(date).format(format);
 }
 
 /**
  * 日期时间格式转换 
  * @param date 时间
  * @param format 格式'YYYY-MM-DD HH:mm:ss'
  * @returns 
  */
 export function formatToDate(
   date: dayjs.Dayjs | undefined = undefined,
   format = DATE_FORMAT,
 ): string {
   return dayjs(date).format(format);
 }
 
 export const dateUtil = dayjs;