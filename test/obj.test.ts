import { delKey,params } from "../src/obj"

describe("对象函数", () => {
  test("同时删除对象的多个属性", () => {
    expect(delKey({ yw: 88, ss: 50, en: 99 }, "yw")).toStrictEqual({ ss: 50, en: 99 })
  })
  test("获取对象的前几个数据", () => {
    expect(params({ yw: 88, ss: 50, en: 99 }, 2)).toStrictEqual({ yw: 88, ss: 50 })
  })
})
