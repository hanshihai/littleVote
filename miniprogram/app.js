//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    this.globalData = {}
  },

  addVoteCheck: function (addedJson) {
    const title = addedJson.title
    const optionA = addedJson.optiona
    const optionB = addedJson.optionb

    if(title === "" || optionA === "" || optionB === "") {
      return false;
    }else{
      return true;
    }
  },

  getStats: function (vote) {
    var keys = []
    var totals = []

    var v,k
    
    if (vote && Array.isArray(vote)) {
      for (v in vote) {
        var checked = false;
        for (k in keys) {
          if (keys[k] === vote[v].value) { checked = true; break; }
        }
        if (!checked) { keys.push(vote[v].value); }
      }

      for (k in keys) {
        var total = 0;
        for (v in vote) {
          if (vote[v].value === keys[k]) { total += 1 }
        }
        var element = { "name": keys[k], "data": total }
        totals.push(element)
      }
    }

    return totals
  }
})
