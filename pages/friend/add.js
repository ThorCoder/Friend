var App = getApp();
Page({
  data: { "addr":[]},
  bindTimeChange: function (e) {
    this.setData({
      "birthday": e.detail.value
    })
  },bindRegionChange: function (e) {
    this.setData({
      "addr": e.detail.value
    })
  },
  bindsubmit:function(e){
    e.detail.value["formId"] = e.detail.formId;
    wx.showLoading({ title: '正在提交...', mask: true });
    App.request('friend/add', e.detail.value, function (data) {
      if(data.code=="success"){
        App.toast("添加成功！","success",function(){
          wx.redirectTo({
            url: '/pages/detail/detail?id=' + data.friendId
          })
        });
      }else{
        wx.hideLoading();
        wx.showModal({
          content: data.code,showCancel: false
        })
      }
    });
  }
})