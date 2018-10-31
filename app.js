var common = require('static/js/common.js');
App({
  userInfo: { myautoid: '', myssidkey: '', myselfid:'',islogin:false},
  CONFIG:{
    'domain':"https://vlehe.com/"
  },
  onLaunch: function () {
    common.checkLogin.call(this);
  },
  request: function (url, data, success, method, header){
    wx.request({
      url: this.CONFIG.domain+url,
      data: data,
      method: method || 'POST',
      header: {
        'myautoid': this.userInfo.myautoid,'myssidkey': this.userInfo.myssidkey,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      complete:res=> {
        console.log(res)
        if (res.statusCode >= 200 && res.statusCode <300){
          if (success) {
            success(res.data);
          }
        } else if (res.statusCode == 401) {
          this.toast("请先登录！");
          common.login.call(this);
        }else{
          this.toast("请求失败，请稍后重试！")
        }
      }
    })
  },
  loginCall:null,
  toast: function (title, icon, doFn, duration){
    icon = icon ? icon:"none";
    duration = duration ? duration:1000;
    wx.showToast({
      title: title, icon: icon, duration: duration, complete: function () {
        if (doFn){
          setTimeout(doFn, duration);
        } 
      }})
  }
})