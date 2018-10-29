var App = getApp();
Page({
  data: {
    "friendlist":[
      { "id": "1", "name": "网小类", "subname": "小雷", "sex": "1","time":"下周一","event":"9.24日生日" },
      { "id": "2", "name": "网小类", "subname": "H", "sex": "2", "time": "后天", "event": "9.24日生日"},
      { "id": "3", "name": "网小类", "subname": "小雷", "sex": "0", "time": "明天", "event": "9.24日生日"}
    ]
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
    App.toast("数据已刷新");
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    App.toast("这是我的底线");
  }
})