// miniprogram/pages/votevote/votevote.js

const app = getApp()

var wxCharts = require("./../../util/wxcharts.js")
var pieChart = null

Page({

  /**
   * Page initial data
   */
  data: {
      topic: {},
      topicCount: 0,
      vote: [],
      totals: [],
      voteCount: 0
  },

  touchHandler: function (e) {
    console.log(pieChart.getCurrentDataIndex(e));
  }, 

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const indexId = app.globalData.currentTopic

    var windowWidth = 320;

    if(indexId) {
      const db = wx.cloud.database()
      db.collection('topic').where({
        _id: indexId
      }).get({
        success: res => {
          this.setData({
            topic: res.data[0],
            topicCount: res.data.length
          })
          console.log('topic: ', res)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询失败'
          })
          console.error('topic：', err)
        }
      })

      db.collection('vote').where({
        topic: indexId
      }).get({
        success: res => {
          const ts = app.getStats(res.data)
          this.setData({
            vote: res.data,
            totals: ts,
            voteCount: ts.length
          })
          console.log('vote: ', res)
          console.log('vote stats: ', ts)

          if(ts.length > 0) {
            pieChart = new wxCharts({
              animation: true,
              canvasId: 'pieCanvas',
              type: 'pie',
              series: ts,
              width: windowWidth,
              height: 300,
              dataLabel: true,
            });
          }

        },
        fail: err => {
          wx.showToast({
            title: '查询失败',
          })
          console.error('vote：', err)
        }
      })      
    }
  },

  radioChange: function (e) {
    console.log("submit value: ", e.detail.value);
    const optionValue = e.detail.value
    const topicId = app.globalData.currentTopic
    const openId = app.globalData.openid

    const db = wx.cloud.database()
    db.collection('vote').add({
      data: {
        topic: topicId,
        user: openId,
        value: optionValue
      },
      success: res => {
        wx.showToast({
          title: '投票成功',
        })
      },
      fail: res => {
        wx.showToast({
          title: '投票失败',
        })
      }
    })
  },

  formReset: function (e) {

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