import {Http} from '../utils/http.js'

class ClassicModel extends Http {
  getFavorCount (success) {
    this.request({
      url: 'book/favor/count',
      success
    })
  }
  getPreviewClassic (success) {
    this.request({
      url: 'classic/favor',
      success
    })
  }
  getLatest () {
    return new Promise((resolve, reject) => {
      this.request({
        url: 'classic/latest',
        success: (res) => {
          this._setLatestIndex(res.data.index)
          if (resolve) resolve(res.data)
        }
      })
    })
  }
  getClassic (index, prevOrNext) {
    let key = prevOrNext === 'previous' ? this._getKey(index-1) : this._getKey(index+1)
    let classic = wx.getStorageSync(key)
    if (!classic) {
      return new Promise((resolve, reject) => {
        this.request({
          url: 'classic/' + index + '/' + prevOrNext,
          success: (res) => {
            if (resolve) {
              wx.setStorageSync(this._getKey(res.data.index), res.data)
              resolve(res.data)
            }
          }
        })
      })
    } else {
      return Promise.resolve(classic)
    }
  }
  isFirst (index) {
    return index === 1
  }
  isLatest (index) {
    return index === this._getLatestIndex()
  }
  _setLatestIndex (index) {
    wx.setStorageSync('latest', index)
  }
  _getLatestIndex () {
    return wx.getStorageSync('latest')
  }
  _getKey (index) {
    return 'classic-' + index
  }
}

export {ClassicModel}
