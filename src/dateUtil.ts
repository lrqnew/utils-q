/*
 * @Author: lrqnew
 * @Date: 2021-12-15 16:37:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-15 17:26:17
 * @FilePath: \QUtils\src\dateUtil.ts
 * @Description: 时间格式化
 */
 import  dayjs from 'dayjs';

 const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
 const DATE_FORMAT = 'YYYY-MM-DD';
 
 export function formatToDateTime(
   date: dayjs.Dayjs | undefined = undefined,
   format = DATE_TIME_FORMAT,
 ): string {
   return dayjs(date).format(format);
 }
 
 export function formatToDate(
   date: dayjs.Dayjs | undefined = undefined,
   format = DATE_FORMAT,
 ): string {
   return dayjs(date).format(format);
 }
 
 export const dateUtil = dayjs;