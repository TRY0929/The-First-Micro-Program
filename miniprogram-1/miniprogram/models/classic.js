import {Http} from '../utils/http.js'

class ClassicModel extends Http {
  getLatest (cb) {
    this.request({
      url: 'classic/latest',
      success: (res) => {
        if (cb) {
          cb(res.data)
        }
      }
    })
  }
}

export {ClassicModel}