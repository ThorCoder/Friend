function login() {
  var that = this;
  wx.showLoading({ title: '登录中...', mask: true });
  wx.login({
    success: res => {
      this.request('haha', { 'code': res.code }, function (data) {
        that.userInfo.myssidkey = data.myssidkey;
        that.userInfo.myautoid = data.myautoid;
        wx.setStorageSync("myssidkey", data.myssidkey)
        wx.setStorageSync("myautoid", data.myautoid)
      });
    }
  })
}
function checkLogin(){
  this.userInfo.myautoid = wx.getStorageSync('myautoid')
  this.userInfo.myssidkey = wx.getStorageSync('myssidkey')
  if (!this.userInfo.myssidkey || !this.userInfo.myautoid) {
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