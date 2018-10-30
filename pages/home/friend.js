var App = getApp();
Page({
  data: {
    "friendlist":[],userInfo:App.userInfo
  },
  onLoad:function(options){
    if (!this.data.userInfo.myautoid || !this.data.userInfo.myssidkey){
      App.loginCall = this.init;
    }
  }, onShow: function () {
    if (this.data.userInfo.myautoid && this.data.userInfo.myssidkey) {
      this.init();
    }
  },
  init:function(showToast){
    wx.showNavigationBarLoading();
    this.setData({ "userInfo": App.userInfo});
    var that = this;
    App.request('friendlist','',function(data){
      that.setData({"friendlist":data});
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
      if (showToast)App.toast("数据已刷新");
    });
  },
  onPullDownRefresh: function () {
    this.init(true);
  },
  onReachBottom: function () {
    App.toast("这是我的底线");
  }
})