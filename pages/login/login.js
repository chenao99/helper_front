var app = getApp()
Page({
  data: {
    uid: '',
    pwd: '',
    angle: 0,
    PreInfo: {},
    isLoading: true,
  },
  onLoad: function() {
    var that = this;
    var uid = app.globalData.uid;
    var pwd = app.globalData.newpwd;
    wx.cloud.init();
    this.getVcode();
    if (this.checkHasLogin()) {} else {
      this.onReady();
    }
  },
  checkHasLogin: function() {    //查看本地缓存
    var uid = wx.getStorageSync('uid');
    var pwd = wx.getStorageSync('newpwd');
    if (uid != '' && pwd != '') {
      return true;
    } else {
      return false;
    }
  },
  submitInfo: function(e) {     //按钮事件
    wx.showToast({
      title: "登录中...",
      icon: "loading",
      duration: 10000    //页面时间
    })
    var that = this;
    var uid = e.detail.value.uid;
    var pwd = e.detail.value.pwd;
    var vcode = e.detail.value.vcode;
    if ((uid.length == 0 || pwd.length == 0) || vcode.length != 4) {
      wx.showToast({
        title: '输入有误',
        image: '/images/info.png',
        icon: 'none',
        duration: 1000
      });
    } else {     //数据库连接
      wx.request({
        url: 'http://120.26.185.147:10085/CompusSystem/Login',   //服务器地址
        data: {      //请求的参数
          username: uid,
          password: pwd
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res.data.info)
          if(res.data.info=='true')
          {
            //成功事件
            //wx.setStorageSync("rbFlag", rbFlag);     //存在缓存中
             //设置本地Storage,维持登录态用
             wx.setStorageSync('uid', uid);
             wx.setStorageSync('newpwd', pwd);
             wx.navigateTo({
               url: '/pages/welcome/welcome?uid=' + uid ,
             })
          }
          else {
            wx.showToast({
              title: '账号密码错误',
              image: '/images/info.png',
              icon: 'none',
              duration: 1000
            })
          }
          }
        })
    }
  },
  tapHelp: function(e) {
    if (e.target.id == 'help') {
      this.hideHelp();
    }
  },
  showHelp: function(e) {
    this.setData({
      'help_status': true
    });
  },
  hideHelp: function(e) {
    this.setData({
      'help_status': false
    });
  },
  UidInput: function(e) {
    if (e.detail.value.length >= 9) {
      wx.hideKeyboard();
    }
  },
  onReady: function() {
    var that = this;
    setTimeout(function() {
      that.setData({
        isLoading: false
      });
    }, 1000);
    
    wx.onAccelerometerChange(function(res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) {
        angle = 14;
      } else if (angle < -14) {
        angle = -14;
      }
      if (that.data.angle !== angle) {
        that.setData({
          angle: angle
        });
      }
    });
  },
  getVcode: function() {
  },
})