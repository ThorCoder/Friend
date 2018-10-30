var App = getApp();
Page({
  data: {
    "friendlist":[],userInfo:App.userInfo
  },
  onLoad:function(options){
    if (!this.islogin){
      App.loginCall = this.init;
    }
  }, onShow: function () {
    if (this.islogin) {
      this.init();
    }
  },
  init:function(showToast){
    wx.showNavigationBarLoading();
    this.setData({ "userInfo": App.userInfo});
    var that = this;
    App.request('friend/list','',function(data){
      that.setData({"friendlist":data});
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
      if (showToast)App.toast("数据已刷新");
    },'GET');
  },
  onPullDownRefresh: function () {
    this.init(true);
  },
  onReachBottom: function () {
    App.toast("这是我的底线");
  }
})