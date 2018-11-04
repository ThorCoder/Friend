var App = getApp();
Page({
  data: {
    id:0,
    userId:0,
    data:{},
    "zhouqi": ["每年", "每月", "每周", "每日"],
    "zqval": [1, 2, 3, 4],
    "zqindex": 0,
    "nexttixing": "计算中...",
    "now":new Date()
  },
  onLoad:function(options){
    var id = options["id"];
    var userId = options["userId"];
    if (!id || !userId) {
      App.toast("参数错误：ID！", "error", function () {
        wx.navigateBack({ delta: 1 });
      });
      return;
    }
    this.setData({ id: id, userId: userId });
    this.init();
  },
  init: function () {
    wx.showNavigationBarLoading();
    var that = this;
    App.request('event/detail', { id: this.data.id,userId:this.data.userId }, function (data) {
      wx.hideNavigationBarLoading();
      if (data.code == "success") {
        for (var i in data.info) {
          if (!data.info[i]) {data.info[i] = "";}
        }
        data.info.remind = (data.info.remind ==2);
        that.setData({
           "data": data.info,
            nexttixing: data.info["nextDate2"],
            zqindex: that.data.zqval.indexOf(parseInt(data.info.cycle))
        });
      } else {
        wx.showModal({
          content:data.code, showCancel: false, success: function (res) {
            wx.navigateBack({ delta: 1 });
          }
        })
      }
    }, "GET");
  },
  bindTimeChange: function (e) {
    this.data.data["newDate"] = e.detail.value;
    this.setData({
      "data": this.data.data
    });
    this.setNextTixing();
  },
  setNextTixing: function () {
    var date = this.data.data.newDate;
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
    var that = this
    console.log(this.data.zqval[parseInt(this.data.zqindex)])
    console.log(this.data.zqval[this.data.zqindex])
    App.request('event/tixing', { "cycle": this.data.zqval[parseInt(this.data.zqindex)],"date": this.data.data.newDate}, function (data) {
      if (data.code == "success") {
        that.setData({ "nexttixing": data.info })
      } else {
        that.setData({ "nexttixing": "计算失败" })
      }
    },'GET');
  },
  bindPickerChange: function (e) {
    this.setData({ "zqindex": e.detail.value })
    this.setNextTixing();
  },
  switchChange: function (e) {
    this.data.data["remind"] = e.detail.value;
    this.setData({
      "data": this.data.data
    });
  },
  bindsubmit: function (e) {
    e.detail.value["cycle"] = this.data.zqval[this.data.zqindex];
    e.detail.value["formId"] = e.detail.formId;
    e.detail.value["remind"] += 1;
    wx.showLoading({ title: '正在提交...', mask: true });
    App.request('event/edit', e.detail.value, function (data) {
      if (data.code == "success") {
        App.toast("修改成功！", "success", function () {
          wx.navigateBack({ delta: 1 })
        });
      } else {
        wx.hideLoading();
        wx.showModal({
          content:data.code, showCancel: false
        })
      }
    });
  },
  binddel: function (e) {
    wx.showModal({
      title: "确认",
      content: '确认要删除该信息吗？',
      success: res => {
        if (res.confirm) {
          wx.showLoading({ title: '正在删除...', mask: true });
          App.request('event/delete', { "id": this.data.id,userId:this.data.userId }, function (data) {
            if (data.code == "success") {
              App.toast("删除成功！", "success", function () {
                wx.navigateBack({ delta: 1 });
              });
            } else {
              wx.hideLoading();
              wx.showModal({
                content: data.code, showCancel: false
              })
            }
          });
        }
      }
    })
  },
})