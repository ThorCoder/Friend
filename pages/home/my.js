var App = getApp();
Page({
  data: {
    data:{"mail":""},
    userInfo: App.userInfo
  },
  onLoad: function (options) {
    if (!this.data.userInfo["islogin"]) {
      App.loginCall.push(this.init);
    }
  }, onShow: function () {
    if (this.data.userInfo["islogin"]) {
      this.init();
    }
  },
  init: function () {
    wx.showNavigationBarLoading();
    this.setData({ "userInfo": App.userInfo });
    App.request('mail/detail', '', function (data) {
      if (data.code == "success") {
        that.setData({ "mail": data.info });
        if (showToast) App.toast("数据已刷新");
      } else {
        wx.showModal({ content: data.code, showCancel: false })
      }
      wx.hideNavigationBarLoading();
    }, 'GET');
  },
  onPullDownRefresh: function () {
    this.init(true);
  },
})