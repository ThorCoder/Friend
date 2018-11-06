var App = getApp();
Page({
  data: {
    id:0,
    "data": {},
    "eventlist":[],
    userInfo: App.userInfo,
    "stype":{"def":"hover","wait":""}
  },
  onLoad: function (options) {
    wx.showLoading({ title: '加载中...', mask: true });
    var id = options["id"];
    if (!id) {
      App.toast("参数错误：ID！","",function(){
        wx.navigateBack({ delta: 1 });
      });
      return;
    }
    this.setData({ id: id });
    if (!this.data.userInfo["islogin"]) {
      App.loginCall.push(this.init);
    }
  },
  tapSort:function(e){
    var stype = {"def":"","wait":""};
    stype[e.target.id]="hover";
    if(e.target.id=="def"){
      this.data.eventlist.sort(function(x,y){
        return x["date"] - y["date"];
      })
    }else{
      this.data.eventlist.sort(function (x, y) {
        if(x["remind"]>y["remind"]){
          return -1;
        }else if(x["remind"]<y["remind"]){
          return 1;
        }
        return x["nextDate"] - y["nextDate"];
      })
    }
    this.setData({ stype, "eventlist": this.data.eventlist});
  },
  onShow: function () {
    if (this.data.userInfo["islogin"]) {
      this.init();
    }
  },
  onPullDownRefresh: function () {
    this.init(true);
  },
  init: function (showToast) {
    var isshow=2;
    wx.showNavigationBarLoading();
    var that = this;
    App.request('friend/detail', { id:this.data.id }, function (data) {
      if (data.code == "success") {
        for (var i in data.info) {
          if (!data.info[i]) {
            data.info[i] = "";
          }
        }
        for (var i in data.info.addr) {
          data.info.addr[i] = data.info.addr[i].replace(/自治区|省|市|县|区/g, '');
        }
        that.setData({ "data": data.info });
        
        if (--isshow < 1) {
         wx.hideNavigationBarLoading();
         wx.hideLoading();
         if (showToast) {
           wx.stopPullDownRefresh();
           App.toast("数据已刷新");
        }
        }
      } else {
        wx.hideNavigationBarLoading();
        wx.hideLoading();
        wx.showModal({
          content: data.code, showCancel: false, success(res) {
            wx.navigateBack({ delta: 1 });
          }
        })
      }
    }, "GET");
    App.request('event/list', { id: this.data.id }, function (data) {
      if (data.code == "success") {
        var now = new Date().getTime() / 1000;
        for (var i in data.info) {
        data.info[i].nextDate2 = Math.ceil((data.info[i].nextDate - now) / 86400);
        }
        that.setData({ "eventlist": data.info });
         if(that.data.stype.def!=""){
           that.tapSort({"target":{"id":"def"}});
         }else{
           that.tapSort({ "target": { "id": "wait" } });
         }
        if (--isshow < 1) {
          wx.hideNavigationBarLoading();
          wx.hideLoading();
          if (showToast) {
            wx.stopPullDownRefresh();
            App.toast("数据已刷新");
          }
        }
      } else {
        wx.hideNavigationBarLoading();
        wx.hideLoading();
        wx.showModal({
          content:data.code, showCancel: false, success(res) {
            wx.navigateBack({ delta: 1 });
          }
        })
      }
    }, "GET");
  },
})