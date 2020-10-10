import { config } from '../config.js'

const tips = {
  1: '抱歉，出现了一个错误',
  1005: 'appkey无效，请前往7yue.pro申请',
  3000: '期刊不存在'
}

class Http {
  request (params) {
    if (!params.method) {
      params.method = 'GET'
    }
    wx.request({
      url: `${config.app_base_url}${params.url}`,
      method: params.method,
      data: params.data,
      header: {
        'content-type': 'application/json',
        appkey: config.appkey
      },
      success: (res) => {
        let statusCode = res.statusCode.toString()
        if (statusCode.startsWith('2')) {
          if (params.success) {
            params.success && params.success(res)
          }
        }
        else {
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: (err) => {}
    })
  }
  _show_error (error_code) {
    if (!error_code) {
      error_code = 1
    }
    wx.showToast({
      title: tips[error_code],
      icon: 'fail',
      duration: 2000
    })
  }
}

export {Http}
