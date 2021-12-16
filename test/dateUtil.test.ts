/*
 * @Author: OBKoro1
 * @Date: 2021-12-16 10:00:44
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-16 10:24:05
 * @FilePath: \q-utils\test\dateUtil.test.ts
 * @Description:
 */
import { formatToDate, formatToDateTime } from "../src/dateUtil"

describe('时间格式化',()=>{
    
    test('日期',()=>{
        let date:any = new Date('Thu Dec 16 2021 10:11:27 GMT+0800')
        expect(formatToDate(date)).toBe('2021-12-16')
    })
    test('时间',()=>{
        let date:any = new Date('Thu Dec 16 2021 10:11:27 GMT+0800')
        expect(formatToDateTime(date)).toBe('2021-12-16 10:11:27')
    })
})
