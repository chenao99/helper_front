Page({

  /**
   * 页面的初始数据
   */
  data: {
    deptIndex: 0,
    activeIndex: 1,
    name: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  inputname: function (e) {
    this.setData({
      name: e.detail.detail.value
    })
  },
  search:function()
  {
    console.log(this.data.name)
    if(this.data.name!='')
    {
      wx.navigateTo({
        url: '../tcourse/tcourse?name='+this.data.name
      });
    }
    else{
      wx.showModal({
        content: '请输入教师姓名',
        showCancel: false
      })
    }

  },
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
    return {
      title: '课表查询',
      desc: '「文经课表」提供烟台大学文经学院在校生班级与教师课表和空闲教室、图书馆藏及考试安排等查询服务。',
      path: '/pages/core/table/index'
    }
  }
})