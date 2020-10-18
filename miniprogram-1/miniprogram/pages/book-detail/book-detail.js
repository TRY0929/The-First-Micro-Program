// miniprogram/pages/book-detail/book-detail.js
import {BookModel} from "../../models/book";
import {LikeModel} from "../../models/like";

const bookModel = new BookModel()
const likeModel = new LikeModel()

Page({

  onLike (event) {
    const behavior = event.detail.behavior
    likeModel.like(behavior, this.data.detail.id, 400)
  },
  onShowCommentTap () {
    this.setData({
      showComment: true
    })
  },
  onCommentCancelTap () {
    this.setData({
      showComment: false
    })
  },
  onMaskTap () {
    this.onCommentCancelTap()
  },
  onTagTap (event) {
  },
  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    detail: null,
    likeStatus: false,
    likeCount: 0,
    showComment: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading()
    const detail = bookModel.getBookDetail(options.bid)
    const comments = bookModel.getBookComments(options.bid)
    const like = bookModel.getBookLike(options.bid)
    Promise.all([detail, comments, like])
      .then(res => {
        this.setData({
          detail: res[0],
          comments: res[1],
          likeStatus: res[2].like_status,
          likeCount: res[2].fav_nums
        })
        wx.hideLoading()
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
