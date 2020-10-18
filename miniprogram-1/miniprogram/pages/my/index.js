// miniprogram/pages/my/index.js
import {ClassicModel} from "../../models/classic";
const classicModel = new ClassicModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,
    userInfo: {},
    getUserInfo: '',
    classics: {},
    myBooksCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAuthorized()
    this.getFavorCount()
    this.getPreviewClassic()
  },
  getPreviewClassic () {
    classicModel.getPreviewClassic(res => {
      this.setData({
        classics: res.data
      })
    })
  },
  getFavorCount () {
    classicModel.getFavorCount(res => {
      this.setData({
        myBooksCount: res.data.count
      })
    })
  },
  getUserInfo (event) {
  },
  onGetUserInfo (event) {
    const userInfo = event.detail.userInfo
    if (userInfo) {
      this.setData({
        userInfo,
        hasUserInfo: true
      })
    }
  },
  userAuthorized () {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (res) => {
              this.setData({
                hasUserInfo: true,
                userInfo: res.userInfo
              })
            }
          })
        }
        else {
          console.log('hasn\'t')
        }
      }
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
