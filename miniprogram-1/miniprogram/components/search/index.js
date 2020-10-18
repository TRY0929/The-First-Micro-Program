// components/search/index.js
import {SearchModel} from "../../models/search";
import {KeywordModel} from "../../models/keyword";
import {paginationBev} from "../behaviors/pagination";

const searchModel = new SearchModel()
const keywordModel = new KeywordModel()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: Number,
      observer: 'getMore'
    }
  },
  behaviors: [paginationBev],
  /**
   * 组件的初始数据
   */
  data: {
    onSearching: false,
    inputValue: '',
    hotWords: [],
    historyWords: [],
    loading: false,
    loadingCenter: false
  },

  lifetimes: {
    attached () {
      const hw = keywordModel.getHistoryWord()
      searchModel.getHotWords().then(res => {
        this.setData({
          hotWords: res.hot,
          historyWords: hw
        })
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getMore () {
      const q = this.data.inputValue
      if (!q || this.data.loading || !this.hasMore()) {
        return
      }
      const start = this.getCurrentStart()
      this._show_loading()
      this._show_loadingCenter()
      searchModel.search(start, q).then(res => {
        this.setMoreData(res.books)
        this.setData({
          total: res.total
        })
        this._hide_loading()
        this._hide_loadingCenter()
      }, err => {
        this._hide_loading()
        this._hide_loadingCenter()
      })
    },
    onCancelTap () {
      this.triggerEvent('back')
    },
    onInputCancelTap (event) {
      this.setData({
        searchBook: [],
        inputValue: '',
        onSearching: false
      })
    },
    onInputConfirm (event) {
      this.initial()
      const value = event.detail.value || event.detail.content
      searchModel.search(0, value).then(res => {
        this.setData({
          searchBook: res.books,
          onSearching: true,
          inputValue: value,
          total: res.total
        })
        if (res.books) {
          keywordModel.addToHistory(value)
        }
      })
    },
    onHotWordTap (event) {
      this.onInputConfirm(event)
    },
    _show_loading () {
      this.setData({
        loading: true
      })
    },
    _hide_loading () {
      this.setData({
        loading: false
      })
    },
    _show_loadingCenter () {
      this.setData({
        loadingCenter: true
      })
    },
    _hide_loadingCenter () {
      this.setData({
        loadingCenter: false
      })
    }
  }
})
