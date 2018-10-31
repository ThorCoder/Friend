var App = getApp();
Page({
  data: {
    data: { "date": "","addr":[]},
    userInfo: App.userInfo

  },
  bindTimeChange: function (e) {
    this.data.data['date'] = e.detail.value;
    this.setData({
      "data": this.data.data
    })
  }, bindRegionChange: function (e) {
    this.data.data['addr'] = e.detail.value;
    this.setData({
      "data": this.data.data
    })
  },
  binddel:function(e){
    wx.showModal({
      title:"确认",
      content: '确认要删除该信息吗？',
      success:res=>{
        if (res.confirm) {
          wx.showLoading({ title: '正在删除...', mask: true });
          App.request('friend/delete', this.data.data["id"], function (data) {
            if (data.code == "success") {
              App.toast("删除成功！", "success");
              wx.navigateBack({ delta: 2 });
            } else {
              wx.hideLoading();
              wx.showModal({
                content: 'fail:' + data.code,
                showCancel: false
              })
            }
          });
        }
      }
    })
  },
  bindsubmit: function (e) {
    e.detail.value["formId"] = e.detail.formId;
    wx.showLoading({ title: '正在提交...', mask: true });
    App.request('friend/edit', e.detail.value, function (data) {
      if (data.code == "success") {
        App.toast("修改成功！", "success");
        wx.navigateBack({delta: 1});
      } else {
        wx.hideLoading();
        wx.showModal({
          content: 'fail:' + data.code,
          showCancel: false
        })
      }
    });
  }
})