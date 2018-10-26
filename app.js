//app.js
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  },
  toast:function(title, icon, duration){
    icon = icon ? icon:"none";
    duration = duration ? duration:1000;
    wx.showToast({
      title: title,
      icon: icon,
      duration: duration
    })
  }
})