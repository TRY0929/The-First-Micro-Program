import {Http} from "../utils/http.js";

class LikeModel extends Http {
  like (behavior, artID, category) {
    this.request({
      url: behavior === 'like' ? 'like' : 'like/cancel',
      method: 'POST',
      data: {
        art_id: artID,
        type: category
      }
    })
  }
}

export {LikeModel}
