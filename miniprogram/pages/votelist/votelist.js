// miniprogram/pages/votelist.js
const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    topics: [],
    count: 0
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log(app.globalData.openid)

    const db = wx.cloud.database()
    db.collection('topic').get({
      success: res => {
        this.setData({
          topics: res.data,
          count: res.data.length
        })
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },

  voteTopic: function (options) {
    console.log(options)
    app.globalData.currentTopic = options.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/votevote/votevote',
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})