var App = getApp();
Page({
  data: {
    "userid":0,
    "newDate":"",
    "remind":false,
    "zhouqi":["每年","每月","每周","每日"],
    "zqval":[1,2,3,4],
    "zqindex":0,
    "nexttixing":"计算中...",
    "now":new Date()
  },
  onLoad: function (options){
    var userid = options["userid"];
    if (!userid) {
      App.toast("参数错误：ID！", "error", function () {
        wx.navigateBack({ delta: 1 });
      });
      return;
    }
    this.setData({ userid: userid });
  },
  bindTimeChange: function (e) {
    this.setData({
      "newDate": e.detail.value
    });
    this.setNextTixing();
  },
  setNextTixing:function(){
    var date = this.data.newDate;
    var zqindex = this.data.zqindex;
    if (zqindex == 3) {
      this.setData({ "nexttixing": "明天" })
      return;
    } 
    if (isNaN(new Date(date).getTime())) {
      this.setData({ "nexttixing": "未选择日期" })
      return;
    }
    this.setData({ "nexttixing": "计算中..." })
    App.request('event/tixing', { "cycle": this.data.zqval[this.data.zqindex], "date": this.data.newDate }, function (data) {
      if (data.code == "success") {
        that.setData({ "nexttixing": data.info })
      } else {
        that.setData({ "nexttixing": "计算失败" })
      }
    }, 'GET');
  },
  bindPickerChange:function(e){
    this.setData({"zqindex": e.detail.value})
    this.setNextTixing();
  },
  switchChange:function(e){
    this.setData({"remind": e.detail.value})
  },
  bindsubmit: function (e) {
    e.detail.value["cycle"] = this.data.zqval[this.data.zqindex];
    e.detail.value["formId"] = e.detail.formId;
    e.detail.value["remind"]+=1;
    wx.showLoading({ title: '正在提交...', mask: true });
    App.request('event/add', e.detail.value, function (data) {
      if (data.code == "success") {
        App.toast("添加成功！", "success",function(){
          wx.navigateBack({ delta: 1 })
        });
      } else {
        wx.hideLoading();
        wx.showModal({
          content: 'fail:' + data.code,showCancel: false
        })
      }
    });
  }
})