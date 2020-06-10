var app = getApp()
Page({
  data: {
    uid: "",
    name: "",
    classroom:"",
    hasUserInfo: 0
  },
  start: function() {
    wx.reLaunch({
      url: '/packageB/pages/index/index',//跳转
    })
  },
  onLoad: function(options) {
    var that = this
    var id=wx.getStorageSync('uid')   //取出本地缓存
    wx.request({
      url: 'http://120.26.185.147:10085/CompusSystem/Student',   //服务器地址
      data: {      //请求的参数
        username: id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
          //成功事件
           //设置本地Storage,维持登录态用
           that.setData({
             uid:id,
             name:res.data.studentClass,
             classroom:res.data.studentName
           }) 
     }
  })
  },
  bindGetUserInfo: function(e) {   //用户绑定
    console.log(e);
    app.globalData.nickName = e.detail.userInfo.nickName;
    this.start();
  }
})
