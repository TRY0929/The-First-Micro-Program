import {Http} from "../utils/http-p";

class KeywordModel extends Http {
  key = 'historyWords'
  maxLength = 10
  getHistoryWord () {
    return wx.getStorageSync(this.key)
  }
  addToHistory (key) {
    let arr = this.getHistoryWord() || []
    arr.unshift(key)
    arr = Array.from(new Set(arr))
    if (arr.length > this.maxLength) {
      arr.pop()
    }
    wx.setStorageSync(this.key, arr)
  }
}

export {KeywordModel}
