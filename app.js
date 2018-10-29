var common = require('static/js/common.js');
App({
  userInfo: { myautoid: '', myssidkey:''},
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
      method: method || 'GET',
      header: {
        'myautoid': this.userInfo.myautoid,'myssidkey': this.userInfo.myssidkey
      },
      success:res=> {
        if(res.code==401){
          this.toast("加载失败，请稍后重试！");
          this.loginRun();
          return ;
        }
        if (success){
          success(res.data);
        }
      },
      fail:()=>{
        this.toast("加载失败，请稍后重试！")
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