App({
  onLaunch: function () {
    this.login();
  },
  login:function(){
    // wx.showLoading({
    //   title: '加载中...',
    //   mask: true
    // });
    wx.checkSession({
      success() {
        //session_key 未过期，并且在本生命周期一直有效
      },
      fail() {
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            console.log(res)
          }
        })
      }
    });
  },
  request: function (url, data, method ,header,success){
    wx.request({
      url: url,
      data: data,
      method: method || 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
      }
    })
  },
  loginCall:null,
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