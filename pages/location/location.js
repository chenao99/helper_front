// pages/location/location.js
var amapFile = require('../../res/amap-wx.js');//如：..­/..­/libs/amap-wx.js
var Latitudemax=29.911897508208103
var Latitudemin=29.902150964271815
var Longitudemax=121.64758433316038
var Longitudemin=121.62651289913939
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userLongitude : 121.63706470940397,
    userLatitude : 29.908879715568357
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
    var _this=this
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标  
      success: function(res) {
        _this.setData({
          userLongitude: res.longitude,
          userLatitude: res.latitude
        })
      }
    })
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

  },
  
  signin:function(){
    
    var _this = this
    console.log(_this.data.userLatitude,_this.data.userLongitude)
    if(_this.data.userLatitude<Latitudemax&&_this.data.userLatitude>Latitudemin&&_this.data.userLongitude<Longitudemax&&_this.data.userLongitude>Longitudemin){
      wx.showToast({
            title: '签到成功',
            image: '/images/info.png',
            duration: 3000
          });
    }
    else{
      wx.showToast({
        title: '签到失败',
        image: '/images/info.png',
        duration: 3000
      });
    }
  }




})