// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "minfo": { "name": "网小类", "subname": "小雷", "sex": "1","birthday":"1993.09.24"},
    "thinglist":[
      {"type":"结婚","time":"1993.09.24","remind":true},
      { "type": "生子", "time": "1993.09.24", "remind": true },
      { "type": "买房", "time": "1993.09.24", "remind": false,"event":"在平谷买房" },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})