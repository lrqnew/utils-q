/*
 * @Author: lrqnew
 * @Date: 2021-12-15 16:37:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-24 09:58:29
 * @FilePath: \q-utils\src\dateUtil.ts
 * @Description: 时间格式化
 */
import dayjs from "dayjs"

const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss"
const DATE_FORMAT = "YYYY-MM-DD"

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
  return dayjs(date).format(format)
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
  return dayjs(date).format(format)
}

/**
 * 根据生日计算年龄
 * @param strBirthday '1997-05-27'
 * @returns
 */
export function getAge(strBirthday: string) {
  let returnAge
  const strBirthdayArr = strBirthday.split("-")
  const birthYear = Number(strBirthdayArr[0])
  const birthMonth = Number(strBirthdayArr[1])
  const birthDay = Number(strBirthdayArr[2])

  const d = new Date()
  const nowYear = d.getFullYear()
  const nowMonth = d.getMonth() + 1
  const nowDay = d.getDate()

  if (nowYear == birthYear) {
    returnAge = 0 //同年 则为0岁
  } else {
    const ageDiff = nowYear - birthYear //年之差
    if (ageDiff > 0) {
      if (nowMonth == birthMonth) {
        const dayDiff = nowDay - birthDay //日之差
        if (dayDiff < 0) {
          returnAge = ageDiff - 1
        } else {
          returnAge = ageDiff
        }
      } else {
        const monthDiff = nowMonth - birthMonth //月之差
        if (monthDiff < 0) {
          returnAge = ageDiff - 1
        } else {
          returnAge = ageDiff
        }
      }
    } else {
      returnAge = -1 //返回-1 表示出生日期输入错误 晚于今天
    }
  }

  return returnAge //返回周岁年龄
}

/**
 * 对Date的扩展，将 Date 转化为指定格式的String。
 *
 *  月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 *  年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)。
 *
 *  【示例】：
 *  common.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss.S') ==> 2006-07-02 08:09:04.423
 *  common.formatDate(new Date(), 'yyyy-M-d h:m:s.S')      ==> 2006-7-2 8:9:4.18
 *  common.formatDate(new Date(), 'hh:mm:ss.S')            ==> 08:09:04.423
 *
 */
export function _formatDate(date: Date, fmt: string) {
  const o: any = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds(), //毫秒
  }
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length),
    )
  for (const k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length),
      )
  return fmt
}

/**
 * 仿照微信中的消息时间显示逻辑，将时间戳（单位：毫秒）转换为友好的显示格式.
 *
 * 1）7天之内的日期显示逻辑是：今天、昨天(-1d)、前天(-2d)、星期？（只显示总计7天之内的星期数，即<=-4d）；
 * 2）7天之外（即>7天）的逻辑：直接显示完整日期时间。
 *
 * @param  {[long]} timestamp 时间戳（单位：毫秒），形如：1550789954260
 * @param {boolean} mustIncludeTime true表示输出的格式里一定会包含“时间:分钟”
 * ，否则不包含（参考微信，不包含时分的情况，用于首页“消息”中显示时）
 *
 * @return {string} 输出格式形如：“刚刚”、“10:30”、“昨天 12:04”、“前天 20:51”、“星期二”、“2019/2/21 12:09”等形式
 * @since 1.1
 */
export function getTimeStringAutoShort2(
  timestamp: string,
  mustIncludeTime: any,
) {
  // 当前时间
  const currentDate = new Date()
  // 目标判断时间
  const srcDate = new Date(parseInt(timestamp))

  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth() + 1
  const currentDateD = currentDate.getDate()

  const srcYear = srcDate.getFullYear()
  const srcMonth = srcDate.getMonth() + 1
  const srcDateD = srcDate.getDate()

  let ret = ""

  // 要额外显示的时间分钟
  const timeExtraStr = mustIncludeTime
    ? " " + _formatDate(srcDate, "hh:mm:ss")
    : ""

  // 当年
  if (currentYear == srcYear) {
    const currentTimestamp = currentDate.getTime()
    const srcTimestamp = Number(timestamp)
    // 相差时间（单位：毫秒）
    const deltaTime = currentTimestamp - srcTimestamp

    // 当天（月份和日期一致才是）
    if (currentMonth == srcMonth && currentDateD == srcDateD) {
      // 时间相差60秒以内
      if (deltaTime < 60 * 1000) ret = "刚刚"
      // 否则当天其它时间段的，直接显示“时:分”的形式
      else ret = _formatDate(srcDate, "hh:mm:ss")
    }
    // 当年 && 当天之外的时间（即昨天及以前的时间）
    else {
      // 昨天（以“现在”的时候为基准-1天）
      const yesterdayDate = new Date()
      yesterdayDate.setDate(yesterdayDate.getDate() - 1)

      // 前天（以“现在”的时候为基准-2天）
      const beforeYesterdayDate = new Date()
      beforeYesterdayDate.setDate(beforeYesterdayDate.getDate() - 2)

      // 用目标日期的“月”和“天”跟上方计算出来的“昨天”进行比较，是最为准确的（如果用时间戳差值
      // 的形式，是不准确的，比如：现在时刻是2019年02月22日1:00、而srcDate是2019年02月21日23:00，
      // 这两者间只相差2小时，直接用“deltaTime/(3600 * 1000)” > 24小时来判断是否昨天，就完全是扯蛋的逻辑了）
      if (
        srcMonth == yesterdayDate.getMonth() + 1 &&
        srcDateD == yesterdayDate.getDate()
      )
        ret = "昨天" + timeExtraStr
      // -1d
      // “前天”判断逻辑同上
      else if (
        srcMonth == beforeYesterdayDate.getMonth() + 1 &&
        srcDateD == beforeYesterdayDate.getDate()
      )
        ret = "前天" + timeExtraStr
      // -2d
      else {
        // 跟当前时间相差的小时数
        const deltaHour = deltaTime / (3600 * 1000)

        // 如果小于或等 7*24小时就显示星期几
        if (deltaHour <= 7 * 24) {
          const weekday = new Array(7)
          weekday[0] = "星期日"
          weekday[1] = "星期一"
          weekday[2] = "星期二"
          weekday[3] = "星期三"
          weekday[4] = "星期四"
          weekday[5] = "星期五"
          weekday[6] = "星期六"

          // 取出当前是星期几
          const weedayDesc = weekday[srcDate.getDay()]
          ret = weedayDesc + timeExtraStr
        }
        // 否则直接显示完整日期时间
        else ret = _formatDate(srcDate, "yyyy-M-d") + timeExtraStr
      }
    }
  }
  // 往年
  else {
    ret = _formatDate(srcDate, "yyyy-M-d") + timeExtraStr
  }

  return ret
}

/**
 * 最近一周 getDay(-7)    返回的是距离当前日期的一周后的时间
 * 一月 getDay(-30)
 * 一年 getDay(-365)
 * @param day
 * @returns
 */
export function getDay(day: number) {
  const today = new Date()

  const targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day

  today.setTime(targetday_milliseconds) //注意，这行是关键代码

  const tYear = today.getFullYear()

  let tMonth: string | number = today.getMonth()

  let tDate: string | number = today.getDate()

  tMonth = doHandleMonth(tMonth + 1)

  tDate = doHandleMonth(tDate)

  return tYear + "-" + tMonth + "-" + tDate
}
function doHandleMonth(month: string | number) {
  let m = month

  if (month.toString().length == 1) {
    m = "0" + month
  }

  return m
}


