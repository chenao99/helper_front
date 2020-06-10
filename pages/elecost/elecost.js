// miniprogram/pages/elecost/elecost.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    netJson: {
      // 'balance': 34.8, 'useFare': 28, 'monthUseFlow': 1345, 'monthUseLength': 127,'installedPlace':'南门三号楼411'
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var uid = wx.getStorageSync('uid')
    var myThis = this
    console.log(uid)
    let list = this.data.netJson
    wx.request({
      url: 'http://120.26.185.147:10085/CompusSystem/Cost',
      data: {
        studentId: uid,
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        var ele = res.data.eletriCost
        var eb = res.data.eBalance
        var add = res.data.address
        list = { balance: eb, useFare: ele, installedPlace: add }
        console.log(res.data)
        myThis.setData({
          netJson: list
        })
      }
    })
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