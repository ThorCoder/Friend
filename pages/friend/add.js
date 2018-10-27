Page({
  data: {
      "birthday":"",
      "region":""
  },
  bindTimeChange: function (e) {
    this.setData({
      "birthday": e.detail.value
    })
  },bindRegionChange: function (e) {
    console.log(e)
    this.setData({
      "region": e.detail.value
    })
  },
  bindsubmit:function(e){
    console.log(e)
    wx.redirectTo({
      url: '/pages/detail/detail'
    })
  }
})