Page({
  data: {
    "birthday": "",
    "region": "",
    "switch":false,
    "zhouqi":["每年","每月","每周","每日"],
    "zhouqiindex":0,
    "nexttixing":"计算中..."
  },
  bindTimeChange: function (e) {
    this.setData({
      "birthday": e.detail.value
    })
  },
  bindPickerChange:function(e){
    this.setData({
      "zhouqiindex": e.detail.value,
      "nexttixing":"下一"+ this.data.zhouqi[e.detail.value]
    })
  },
  switchChange:function(e){
    this.setData({
      "switch": e.detail.value
    })
  },
  bindsubmit: function (e) {
    wx.showModal({
      content: '添加成功！',
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