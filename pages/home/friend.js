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
         data.info.sort(function (x, y) {
           if (!x["event"]){
             return 1;
           }
           if (!y["event"]) {
             return -1;
           }
           if (x["event"]["remind"] > y["event"]["remind"]) {
            return -1;
           } else if (x["event"]["remind"] < y["event"]["remind"]) {
            return 1;
           }
           return x["event"]["nextDate"] - y["event"]["nextDate"];
      })
        var now = new Date().getTime()/1000;
        for(var i in data.info){
          if (!data.info[i]["event"]) continue;
          data.info[i].event.nextDate2=Math.ceil((data.info[i].event.nextDate - now)/86400)+"天";
        }
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