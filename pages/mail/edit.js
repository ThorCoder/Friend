var App = getApp();
Page({
  data: {
    mail:"",
    yzm:"",
    disable:false
  },
  onLoad:function(options){
    this.setData({ mail: options["mail"]});
  },
  input: function (value, cursor, keyCode) {
    this.data[value.target.id] = value.detail.value;
    this.setData(this.data);
  },
  bindsend:function(){
    if(!/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(this.data.mail)){
      App.toast("邮箱不正确！");
      return ;
    }
    this.setData({disable:true,seconds:60});
    var intval = setInterval(()=>{
      var s = --this.data.seconds;
      this.setData({seconds:  s});
      if(s<1){
        this.setData({ disable: false});
        clearInterval(intval);
        }
    },1000)
    App.request('mail/code', {"mail":this.data.mail}, function (data) {
      if (data.code == "success") {
        wx.showModal({
          content: "发送成功，验证码有效期为5分钟！请确保发件方在白名单内。", showCancel: false
        });
      } else {
        App.toast("发送失败！");
      }
    });
  },
  bindsubmit: function (e) {
    e.detail.value["formId"] = e.detail.formId;
    if (!/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(e.detail.value.mail)) {
      App.toast("邮箱不正确！");
      return;
    }
    if (e.detail.value.yzm.length<4) {
      App.toast("请输入验证码！");
      return;
    }
    wx.showLoading({ title: '正在提交...', mask: true });
    App.request('mail/confirm', e.detail.value, function (data) {
      console.log(data)
      if (data.code == "success") {
        App.toast("绑定成功！", "success", function () {
          wx.navigateBack({ delta: 1 })
        });
      } else {
        wx.hideLoading();
        wx.showModal({
          content: data.code, showCancel: false
        })
      }
    });
  }
})