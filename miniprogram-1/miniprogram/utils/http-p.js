import { config } from '../config.js'

const tips = {
  1: '抱歉，出现了一个错误',
  1005: 'appkey无效，请前往7yue.pro申请',
  3000: '期刊不存在'
}

class Http {
  request ({url, method='GET', data={}}) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, method, data)
    })
  }
  _request (url, resolve, reject, method, data) {
    wx.request({
      url: `${config.app_base_url}${url}`,
      method: method,
      data: data,
      header: {
        'content-type': 'application/json',
        appkey: config.appkey
      },
      success: (res) => {
        let statusCode = res.statusCode.toString()
        if (statusCode.startsWith('2')) {
          resolve(res.data)
        }
        else {
          let error_code = res.data.error_code
          this._show_error(error_code)
          reject && reject()
        }
      },
      fail: (err) => {
        reject && reject(err)
      }
    })
  }
  _show_error (error_code) {
    if (!error_code) {
      error_code = 1
    }
    const tip = tips[error_code]
    wx.showModal({
      title: '错误',
      content: tip ? tips[tip] : tips[1]
    })
  }
}

export {Http}
