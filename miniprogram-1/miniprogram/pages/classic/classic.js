// miniprogram/pages/classic/classic.js
import { ClassicModel } from '../../models/classic.js'
import {LikeModel} from "../../models/like.js";
let likeModel = new LikeModel()
let classicModel = new ClassicModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    latest: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest(res => {
      this.setData({
        latest: res
      })
      console.log(this.data.latest)
    })
  },
  onlike (event) {
    let behavior = event.detail.behavior
    likeModel.like(behavior, this.data.latest.id, this.data.latest.type)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
