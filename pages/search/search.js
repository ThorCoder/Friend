var App = getApp();
Page({
  data: {
    "friendlist": [],
    "ishidden":true,
    "searchinput":"",
    "focus":true
  },
  search: function (value, cursor, keyCode){
    var friendlist = [];
    this.setData({
      "ishidden": value.detail.value.length == 0
    })
    if (value.detail.value.length<1){
      return ;
    }
    wx.showNavigationBarLoading();
    var that= this;
    App.request('friend/search', {'kw':value.detail.value}, function (data) {
      wx.hideNavigationBarLoading();
      if (data.code == "success") {
        that.setData({ "friendlist": data.info });
      }else{
        wx.showModal({content: 'fail:' + data.code, showCancel: false })
      }
    }, 'GET');
  },
  reset:function(){
    this.setData({
      "searchinput": "",
      "friendlist":[],
      "ishidden":true
    })
  },
  onShow:function(){
    this.setData({
      "focus": true
    })
  }
})