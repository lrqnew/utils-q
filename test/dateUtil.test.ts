/*
 * @Author: lrqnew
 * @Date: 2021-12-16 10:00:44
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-06-27 15:50:44
 * @FilePath: \utils-q\test\dateUtil.test.ts
 * @Description:
 */
import {
  formatToDate,
  formatToDateTime,
  getAge,
  getTimeStringAutoShort2,
  getDay,
  forwardRankingDate,
  reverseRankingDate
} from "../src/dateUtil"

describe("时间格式化", () => {
  test("日期", () => {
    let date: any = new Date("Thu Dec 16 2021 10:11:27 GMT+0800")
    expect(formatToDate(date)).toBe("2021-12-16")
  })
  test("时间", () => {
    let date: any = new Date("Thu Dec 16 2021 10:11:27 GMT+0800")
    expect(formatToDateTime(date)).toBe("2021-12-16 10:11:27")
  })
  test("年龄", () => {
    expect(getAge("1997-05-27")).toBe(24)
  })
  test("聊天记录日期", () => {
    expect(getTimeStringAutoShort2("1639632295295", true)).toBe("13:24:55")
  })
  test("距离当前日期的一周后的时间", () => {
    expect(getDay(7)).toBe("2021-12-23")
  })
  test("日期排序(正序)", () => {
    expect(
      forwardRankingDate(
        [
          { ExecutionTime: "2022-01-25 12:00:00", Content: "请按时吃药" },
          { ExecutionTime: "2022-01-23 14:00:00", Content: "《科普文章》" },
        ],
        "ExecutionTime",
      ),
    ).toStrictEqual([
      { "ExecutionTime": "2022-01-23 14:00:00", "Content": "《科普文章》" },
      { "ExecutionTime": "2022-01-25 12:00:00", "Content": "请按时吃药" },
    ])
  })
  test("日期排序(反序)", () => {
    expect(
      reverseRankingDate(
        [
          { ExecutionTime: "2022-01-25 12:00:00", Content: "请按时吃药" },
          { ExecutionTime: "2022-01-23 14:00:00", Content: "《科普文章》" },
        ],
        "ExecutionTime",
      ),
    ).toStrictEqual([
      { "ExecutionTime": "2022-01-25 12:00:00", "Content": "请按时吃药" },
      { "ExecutionTime": "2022-01-23 14:00:00", "Content": "《科普文章》" },
    ])
  })
})
