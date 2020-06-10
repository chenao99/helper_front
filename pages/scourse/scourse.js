// miniprogram/pages/scourse/scourse.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorArrays: ["#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD"],
    wlist: [
      // { "xqj": 1, "skjc": 1, "skcd": 3, "kcmc": "高等数学@教A-301" },
      // { "xqj": 1, "skjc": 5, "skcd": 3, "kcmc": "高等数学@教A-301" },
      // { "xqj": 2, "skjc": 1, "skcd": 2, "kcmc": "高等数学@教A-301" },
      // { "xqj": 2, "skjc": 8, "skcd": 2, "kcmc": "高等数学@教A-301" },
      // { "xqj": 3, "skjc": 4, "skcd": 1, "kcmc": "高等数学@教A-301" },
      // { "xqj": 3, "skjc": 8, "skcd": 1, "kcmc": "高等数学@教A-301" },
      // { "xqj": 3, "skjc": 5, "skcd": 2, "kcmc": "高等数学@教A-301" },
      // { "xqj": 4, "skjc": 2, "skcd": 3, "kcmc": "高等数学@教A-301" },
      // { "xqj": 4, "skjc": 8, "skcd": 2, "kcmc": "高等数学@教A-301" },
      // { "xqj": 5, "skjc": 1, "skcd": 2, "kcmc": "高等数学@教A-301" },
      // { "xqj": 6, "skjc": 3, "skcd": 2, "kcmc": "高等数学@教A-301" },

      // { "xqj": 7, "skjc": 5, "skcd": 3, "kcmc": "高等数学@教A-301" },

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var myThis=this
    var uid=wx.getStorageSync('uid')
    let list = this.data.wlist
    wx.request({
      url: 'http://120.26.185.147:10085/CompusSystem/TimeTable',
      data: {
        studentId: uid,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.info)
        var i=0
        while(res.data.info[i])
        {
          var cname = res.data.info[i].courseName
          var tname = res.data.info[i].teacherName
          var week = res.data.info[i].week
          var room = res.data.info[i].room
          var stime = res.data.info[i].startTime
          var total = res.data.info[i].total
          var xq
          var jc
          switch(week){
            case 'monday':
              xq=1
              break;
            case 'tuesday':
              xq=2
              break;
            case 'wednesday':
              xq=3
              break;
            case 'thusday':
              xq=4
              break;
            case 'friday':
              xq=5
              break;
            case 'saturday':
              xq=6
              break;
            case 'sunday':
              xq=7
              break;
          }
          switch (stime) {
            case '08:00:00 AM':
              jc = 1
              break;
            case '10:00:00 AM':
              jc = 3
              break;
            case '01:00:00 PM':
              jc = 5
              break;
            case '03:00:00 PM':
              jc = 7
              break;
            case '06:30:00 PM':
              jc = 9
              break;
            case '08:10:00 PM':
              jc = 11
              break;
          }
          console.log(xq)
          list.push({xqj:xq, skjc: jc, skcd: total, kcmc:cname+"@"+room})
          i++
        }  
        myThis.setData({
          wlist: list
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