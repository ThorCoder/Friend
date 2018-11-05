function login() {
  var that = this;
  wx.showLoading({ title: '登录中...', mask: true });
  wx.login({
    success: res => {
      this.request('login', { code: res.code }, function (data) {
        if (!data.myssidkey || !data.myautoid || !data.myselfid){
          that.toast("登陆失败！");
          return ;
        }
        that.userInfo.islogin=true;
        that.userInfo.myssidkey = data.myssidkey;
        that.userInfo.myautoid = data.myautoid;
        that.userInfo.myselfid = data.myselfid;
        wx.setStorageSync("myssidkey", data.myssidkey)
        wx.setStorageSync("myautoid", data.myautoid)
        wx.setStorageSync("myselfid", data.myselfid)
        that.toast("登陆成功！");
        for(var i in that.loginCall){
          if (that.loginCall[i]) {
            that.loginCall[i]();
          }
        }
      });
    }
  })
}
function checkLogin(){
  this.userInfo.myautoid = wx.getStorageSync('myautoid')
  this.userInfo.myssidkey = wx.getStorageSync('myssidkey')
  this.userInfo.myselfid = wx.getStorageSync('myselfid')
  if (!this.userInfo.myautoid || !this.userInfo.myssidkey || !this.userInfo.myselfid) {
    login.call(this); return;
  }else{
    this.userInfo.islogin=true;
  }
  wx.checkSession({
    fail: () => {
      this.userInfo.islogin = false;
      login.call(this);
    }
  });
}

module.exports.login = login
module.exports.checkLogin = checkLogin