// components/classic/episode/index.js
Component({
  /**
   * 组件的属性列表
   */
  lifetimes: {
    attached () {
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth()
      this.setData({
        year: year,
        month: this.data.months[month]
      })
    }
  },
  properties: {
    index: {
      type: Number
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    year: 0,
    month: '0',
    months: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月',]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
