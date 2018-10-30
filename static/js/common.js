function login() {
  var that = this;
  wx.showLoading({ title: '登录中...', mask: true });
  wx.login({
    success: res => {
      this.request('login.txt', { 'code': res.code }, function (data) {
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
        if (that.loginCall){
          that.loginCall();
        }
      });
    }
  })
}
function checkLogin(){
  this.userInfo.myautoid = wx.getStorageSync('myautoid')
  this.userInfo.myssidkey = wx.getStorageSync('myssidkey')
  this.userInfo.myselfid = wx.getStorageSync('myselfid')
  if (!this.userInfo.islogin) {
    login.call(this); return;
  }
  wx.checkSession({
    fail: () => {
      login.call(this);
    }
  });
}

module.exports.login = login
module.exports.checkLogin = checkLogin