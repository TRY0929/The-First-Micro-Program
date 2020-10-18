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
    latest: null,
    first: false,
    last: true,
    likeStatus: false,
    likeCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest().then(res => {
      this.setData({
        latest: res,
        likeStatus: res.like_status,
        likeCount: res.fav_nums
      })
    })
  },
  onlike (event) {
    let behavior = event.detail.behavior
    likeModel.like(behavior, this.data.latest.id, this.data.latest.type)
  },
  onPrev () {
    this._updateClassic('previous')
  },
  onNext () {
    this._updateClassic('next')
  },
  _updateClassic (prevOrNext) {
    let index = this.data.latest.index
    classicModel.getClassic(index, prevOrNext).then(res => {
      this._getLikeStatus(res.id, res.type)
      this.setData({
        latest: res,
        last: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
    })
  },
  _getLikeStatus (artId, category) {
    likeModel.getClassicLikeStatus(artId, category).then(res => {
      this.setData({
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
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
