// pages/mine/mine.js
var app = getApp()    //获取实例
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var uid = wx.getStorageSync('uid');     //读取缓存
    var pwd = wx.getStorageSync('newpwd');
    wx.showToast({
      title: "loading",
      icon: "loading",
      duration: 5000
    })
    if (uid != '' && pwd != '') {
      that.setData({          //设置数据
        uid: uid,
        pwd: pwd,
      });
      // console.log(that.data.uid + '-' + that.data.pwd)
    }
    wx.hideToast()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    that.onLoad();
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
  logout: function() {
    try {
      wx.clearStorageSync()//清空内存
    } catch (e) {
      // Do something when catch error
    }
    app.globalData.uid = "";
    app.globalData.pwd = "";
    app.globalData.newpwd = "";
    wx.setStorageSync('uid', '');
    wx.setStorageSync('pwd', '');
    wx.redirectTo({
      url: '/pages/login/login'
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})