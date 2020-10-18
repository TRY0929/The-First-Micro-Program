// components/classic/index.js
import {behavior} from "../classic-bah.js";
const audioManager = wx.getBackgroundAudioManager()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [behavior],

  /**
   * 组件的初始数据
   */
  properties: {
    musicSrc: String
  },
  data: {
    playing: false,
    musicTabImg: './images/music@tag.png',
    playingImg: './images/player@playing.png',
    waittingImg: './images/player@waitting.png'
  },
  lifetimes: {
    attached () {
      this._recoverMusicStatus()
      this._monitorSwitch()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay () {
      this.setData({
        playing: !this.data.playing
      })
      if (this.data.playing) {
        audioManager.src = this.properties.musicSrc
        audioManager.title = '123'
        audioManager.play()
      } else {
        audioManager.pause()
      }
    },
    _recoverMusicStatus () {
      if (audioManager.paused) {
        this.setData({
          playing: false
        })
      } else if (this.properties.musicSrc === audioManager.src) {
        this.setData({
          playing: true
        })
      }
    },
    _monitorSwitch () {
      audioManager.onPlay(() => {
        this._recoverMusicStatus()
      })
      audioManager.onPause(() => {
        this._recoverMusicStatus()
      })
      audioManager.onStop(() => {
        this._recoverMusicStatus()
      })
      audioManager.onEnded(() => {
        this._recoverMusicStatus()
      })
    }
  }
})
