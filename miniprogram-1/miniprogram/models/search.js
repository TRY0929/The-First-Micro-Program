import {Http} from '../utils/http-p'

class SearchModel extends Http {
  search (start, q) {
    return this.request({
      url: 'book/search',
      data: {
        start,
        q
      }
    })
  }
  getHotWords () {
    return this.request({
      url: 'book/hot_keyword'
    })
  }
}

export {SearchModel}
