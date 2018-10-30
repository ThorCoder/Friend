var App = getApp();
Page({
  data: {"birthday":"","region":""},
  bindTimeChange: function (e) {
    this.setData({
      "birthday": e.detail.value
    })
  },bindRegionChange: function (e) {
    this.setData({
      "region": e.detail.value
    })
  },
  bindsubmit:function(e){
    e.detail.value["formId"] = e.detail.formId;
    wx.showLoading({ title: '正在提交...', mask: true });
    App.request('friend/add', e.detail.value, function (data) {
      if(data.code=="success"){
        App.toast("添加成功！","success");
        wx.redirectTo({
          url: '/pages/detail/detail?id=' + data.friendid
        })
      }else{
        wx.hideLoading();
        wx.showModal({
          content: 'fail' + data.code,
          showCancel: false
        })
      }
    });
  }
})