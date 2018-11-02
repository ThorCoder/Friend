var App = getApp();
Page({
  data: {
    mail:""
  },
  onLoad:function(options){
    this.setData({ mail: options["mail"]});
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
          content: 'fail:' + data.code, showCancel: false
        })
      }
    });
  }
})