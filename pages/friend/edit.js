var App = getApp();
Page({
  data: {
    id:0,
    data: { "date": "","addr":[]},
    userInfo: App.userInfo
  },
  onLoad:function(options){
    var id = options["id"];
    if(!id){
      App.toast("参数错误：ID！","error",function(){
        wx.navigateBack({ delta: 1 });
      });
      return ;
    }
    this.setData({id:id});
    this.init();
  },
  init:function(){
    wx.showNavigationBarLoading();
    var that = this;
    App.request('friend/detail', {id:this.data.id}, function (data) {
      wx.hideNavigationBarLoading();
      if (data.code == "success") {
       for(var i in data.info){
         if(!data.info[i]){
           data.info[i]="";
         }
       }
        that.setData({"data":data.info});
      } else {
        wx.showModal({
          content: 'fail:' + data.code,showCancel: false,success:function(res){
            wx.navigateBack({ delta: 1 });
          }
        })
      }
    },"GET");
  },
  bindTimeChange: function (e) {
    this.data.data['date'] = e.detail.value;
    this.setData({
      "data": this.data.data
    })
  }, bindRegionChange: function (e) {
    this.data.data['addr'] = e.detail.value;
    this.setData({
      "data": this.data.data
    })
  },
  binddel:function(e){
    wx.showModal({
      title:"确认",
      content: '确认要删除该信息吗？',
      success:res=>{
        if (res.confirm) {
          wx.showLoading({ title: '正在删除...', mask: true });
          App.request('friend/delete', {"id":this.data.data["id"]}, function (data) {
            if (data.code == "success") {
              App.toast("删除成功！", "success",function(){
                wx.navigateBack({ delta: 2 });
              });
            } else {
              wx.hideLoading();
              wx.showModal({
                content: 'fail:' + data.code,showCancel: false
              })
            }
          });
        }
      }
    })
  },
  bindsubmit: function (e) {
    e.detail.value["formId"] = e.detail.formId;
    wx.showLoading({ title: '正在提交...', mask: true });
    App.request('friend/edit', e.detail.value, function (data) {
      if (data.code == "success") {
        App.toast("修改成功！", "success",function(){
          wx.navigateBack({ delta: 1 });
        });
      } else {
        wx.hideLoading();
        wx.showModal({
          content: 'fail:' + data.code,
          showCancel: false
        })
      }
    });
  }
})