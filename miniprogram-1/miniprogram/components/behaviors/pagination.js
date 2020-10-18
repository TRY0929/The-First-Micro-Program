const paginationBev = Behavior({
  data: {
    searchBook: [],
    total: null
  },
  methods: {
    setMoreData (arr) {
      this.setData({
        searchBook: this.data.searchBook.concat(arr)
      })
    },
    getCurrentStart () {
      return this.data.searchBook.length
    },
    hasMore () {
      if (this.data.total === null) return true
      return (this.getCurrentStart() < this.data.total)
    },
    initial () {
      this.setData({
        total: null,
        searchBook: []
      })
    }
  }
})

export {paginationBev}
