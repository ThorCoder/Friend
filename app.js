var common = require('static/js/common.js');
App({
  userInfo: { myautoid: '', myssidkey: '', myselfid:'',islogin:false},
  CONFIG:{
    'domain':"https://cc.9iwww.com/f/"
  },
  onLaunch: function () {
    common.checkLogin.call(this);
  },
  request: function (url, data, success, method, header){
    console.log(data)
    wx.request({
      url: this.CONFIG.domain+url,
      data: data,
      method: method || 'GET',
      header: {
        'myautoid': this.userInfo.myautoid,'myssidkey': this.userInfo.myssidkey
      },
      complete:res=> {
        if (res.statusCode >= 200 && res.statusCode <300){
          if (success) {
            success(res.data);
          }
        } else if (res.statusCode == 401) {
          this.toast("请先登录！");
          common.login.call(this);
        }else{
          this.toast("加载失败，请稍后重试！")
        }
      }
    })
  },
  loginCall:null,
  toast:function(title, icon, duration){
    icon = icon ? icon:"none";
    duration = duration ? duration:1000;
    wx.showToast({title: title,icon: icon,duration: duration})
  }
})