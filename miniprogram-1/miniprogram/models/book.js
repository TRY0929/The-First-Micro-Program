import {Http} from "../utils/http-p";

class BookModel extends Http {
  getHotList () {
    return this.request({
      url: 'book/hot_list'
    })
  }
  getBookDetail (bid) {
    return this.request({
      url: `book/${bid}/detail`
    })
  }
  getBookComments (bid) {
    return this.request({
      url: `book/${bid}/short_comment`
    })
  }
  getBookLike (bid) {
    return this.request({
      url: `book/${bid}/favor`
    })
  }
  addComment (bid, content) {
    return this.request({
      url: `book/add/short_comment`,
      method: "POST",
      data: {
        book_id: bid,
        content
      }
    })
  }
}

export {BookModel}
