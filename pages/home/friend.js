var App = getApp();
Page({
  data: {
    "friendlist":[],userInfo:App.userInfo
  },
  onLoad:function(options){
    if (!this.data.userInfo["islogin"]){
      App.loginCall.push(this.init);
    }
  }, onShow: function () {
    if (this.data.userInfo["islogin"]) {
      this.init();
    }
  },
  init:function(showToast){
    wx.showNavigationBarLoading();
    this.setData({ "userInfo": App.userInfo});
    var that = this;
    App.request('friend/list','',function(data){
      if(data.code=="success"){
        that.setData({ "friendlist": data.info });
        if (showToast) App.toast("数据已刷新");
      }else{
        wx.showModal({content:data.code, showCancel: false})
      }
      
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
      
    },'GET');
  },
  onPullDownRefresh: function () {
    this.init(true);
  },
  onReachBottom: function () {
    App.toast("这是我的底线");
  }
})