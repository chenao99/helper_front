// packageA/pages/calendar/calendar.js
var util = require('../../../utils/time.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading: false,
    jsonContent: '',
    week:'',
    state:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 调用函数时，传入new Date()参数，返回值是日期和时间  
    var time = util.formatTime(new Date());
    console.log(time);
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    var that = this;
    this.calulateWeek();//计算当前第几周
    wx.request({
      url: 'http://120.26.185.147:10085/CompusSystem/Calendar',   //服务器地址
      data: {      //请求的参数
        week: that.data.week
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.info)
          //成功事件
          that.setData({
            state:res.data.state
          })
        }
      })


  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */

  showPic: function() {
    wx.previewImage({
      current: 'http://120.26.185.147:10085/CompusSystem/SchoolPicture?pic=schoolDate.jpg', // 当前显示图片的http链接
      urls: ["http://120.26.185.147:10085/CompusSystem/SchoolPicture?pic=schoolDate.jpg"] // 需要预览的图片http链接列表
    })
  },
  calulateWeek:function()    //计算现在第几周了
  {
      //var finishTime = new Date(value.time);    //年月日
      var myDate=new Date()
      myDate.setFullYear(2020,2,1)//入学时间
      var currentTime = new Date();      //当前年月日
      var remain = currentTime-myDate;    //两个时间相减
      this.data.week =parseInt((Math.floor(remain/1000/60/60/24) + 1)/7);
      console.log(this.data.week);
      this.setData({
        week:this.data.week
      })
    }
})