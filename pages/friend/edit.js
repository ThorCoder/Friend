Page({
  data: {
    "birthday": "",
    "region": ""
  },
  bindTimeChange: function (e) {
    this.setData({
      "birthday": e.detail.value
    })
  }, bindRegionChange: function (e) {
    console.log(e)
    this.setData({
      "region": e.detail.value
    })
  },
  bindsubmit: function (e) {
    
    wx.showModal({
      content: '修改成功！',
      showCancel: false,
      success(res) {
        //confirm cancel
        wx.navigateBack({
          delta: 1
        })
      }
    })
  }
})