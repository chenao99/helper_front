//index.js
//获取应用实例
var amapFile = require('../../../res/amap-wx.js')
const order = ['demo1', 'demo2', 'demo3']
Page({

  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper',
      title: 'scroll-view',
      path: 'page/component/pages/scroll-view/scroll-view'
    }
  },

  data: {
    weather: {},
    background: [{url:'show1.jpg'}, {url:'show2.jpg'}, {url:'show3.jpg'}],
    indicatorDots: true,
    vertical: true,
    autoplay: true,
    interval: 2000,
    duration: 500,
    toView: 'green',
    cores: [
      [{
        id: 'grkb',
        name: '个人课表',
        //url: '/pages/index/vcode?to=grkb&update=0',
        url: '/pages/scourse/scourse',
        needLogin: true
      }, {
        id: 'jskb',
        name: '教师课表',
        // url: '/pages/classQuery/jskb?type=teacher',
        url: '/pages/table/index',
        needLogin: true
      }, 
      // {
      //   id: 'bjkb',
      //   name: '班级课表',
      //   url: '/pages/classQuery/jskb?type=class',
      //   needLogin: true
      // },
      {
        id: 'fdydh',
        name: '辅导员电话',
        url: '/pages/tel/tel',
        needLogin: false
      },
      {
        id: 'wfcx',
        name: '网费查询',
        url: '/pages/netcost/netcost',
        needLogin: true
      },
      {
        id: 'xl',
        name: '校历',
        url: '/packageA/pages/calendar/calendar',
        needLogin: false
      },
    
      {
        id: 'cjcx',
        name: '成绩查询',
        url: '/pages/score/score',
        needLogin: true
      },
      {
        id: 'dfcx',
        name: '电费查询',
        url: '/pages/elecost/elecost',
        needLogin: true
      },
    // {
    //     id: 'xycx',
    //     name: '校园出行',
    //     url: '/pages/Transport/Transport',
    //     needLogin: false
    //     }
    {
      id: 'xydh',
      name: '校园导航',
      url: '/packageA/pages/map/map',
      needLogin: false
    }],
      // [ {
      //   id: 'xydh',
      //   name: '校园导航',
      //   url: '/packageA/pages/map/map',
      //   needLogin: false
      // }, {
      //   id: 'fdydh',
      //   name: '辅导员电话',
      //   url: '/pages/tel/tel',
      //   needLogin: false
      //   }]
    ]
  },

  changeIndicatorDots() {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },

  changeAutoplay() {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },

  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  
  upper(e) {
    console.log(e)
  },

  lower(e) {
    console.log(e)
  },

  scroll(e) {
    console.log(e)
  },

  scrollToTop() {
    this.setAction({
      scrollTop: 0
    })
  },

  tap() {
    for (let i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1],
          scrollTop: (i + 1) * 200
        })
        break
      }
    }
  },

  tapMove() {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({ key: 'ab6b53d0171976592348e178fefc9e32' });
    myAmapFun.getWeather({
      success: function (data) {
        //成功回调
        that.setData({
          weather: data
        });
      },
      fail: function (info) {
        //失败回调
        console.log(info)
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

  },


   //未登录点击功能
   disabled_item: function(ds) {
    var that = this;
    var uid = wx.getStorageSync('uid');
    var pwd = wx.getStorageSync('newpwd');
    console.log(ds.currentTarget.dataset);
    let index = ds.currentTarget.dataset.id;
    let sindex = ds.currentTarget.dataset.sindex;

    // if (this.data.cores[0][sindex].needLogin == true && (uid == "" || pwd == "")) {
    //   wx.showToast({
    //     icon: 'none',
    //     title: '本功能需要登录',
    //   })
    // } else {
      // console.log(this.data.cores)
      wx.navigateTo({
        url: this.data.cores[index][sindex].url,
      })
    // }

  }
})