App({
  userInfo: { myautoid: '', myssidkey:''},
  CONFIG:{
    'domain':"https://vlehe.com/"
  },
  onLaunch: function () {
    this.userInfo.myautoid = wx.getStorageSync('myautoid')
    this.userInfo.myssidkey = wx.getStorageSync('myssidkey')
    if(!this.userInfo.myssidkey || !this.userInfo.myautoid){
      this.login(); return;
    }
    wx.checkSession({
      fail :()=> {
        this.login();
      }
    });
  },
  login:function(){
    var that = this;
    wx.showLoading({title: '加载中...',mask: true});
    wx.login({
      success: res => {
        this.request('haha', { 'code': res.code},function(data){
          that.userInfo.myssidkey = data.myssidkey;
          that.userInfo.myautoid = data.myautoid;
          wx.setStorageSync("myssidkey", data.myssidkey)
          wx.setStorageSync("myautoid", data.myautoid)
        });
      }
    })
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