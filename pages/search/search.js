// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "friendlist": [],
    "ishidden":true,
    "searchinput":"",
    "focus":true
  },
  search: function (value, cursor, keyCode){
    var friendlist = [];
    this.setData({
      "ishidden": value.detail.cursor==0
    })
    if (value.detail.value=="小雷"){
      friendlist.push({ "id": "1", "name": "网小类", "subname": "小雷", "sex": "1" });
      this.setData({
        "friendlist": friendlist
      })
    }
  },
  reset:function(){
    this.setData({
      "searchinput": "",
      "friendlist":[],
      "ishidden":true
    })
  },
  onShow:function(){
    this.setData({
      "focus": true
    })
  }
})