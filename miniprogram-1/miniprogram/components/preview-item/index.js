// components/preview-item/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    classic: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    typeText: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap (event) {
      const bid = this.properties.classic.id
      wx.navigateTo({
        url: `/pages/book-detail/book-detail?bid=${bid}`
      })
    }
  }
})
