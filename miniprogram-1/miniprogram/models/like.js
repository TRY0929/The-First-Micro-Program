import {Http} from "../utils/http.js";

class LikeModel extends Http {
  like (behavior, artID, category) {
    return new Promise((resolve, reject) => {
      this.request({
        url: behavior === 'like' ? 'like' : 'like/cancel',
        method: 'POST',
        data: {
          art_id: artID,
          type: category
        }
      })
    })
  }
  getClassicLikeStatus (artId, category) {
    return new Promise((resolve, reject) => {
      this.request({
          url: `classic/${category}/${artId}/favor`,
          success: res => {
            if (resolve) resolve (res.data)
          }
      })
    })
  }
}

export {LikeModel}
