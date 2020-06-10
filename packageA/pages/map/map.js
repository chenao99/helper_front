// miniprogram/pages/map/map.js
var amapFile = require('../../../res/amap-wx.js');//如：..­/..­/libs/amap-wx.js
var sliderWidth = 96;
var markersData = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mapHeight: "800",
    placeName: "",
    hideOrNot: 0,
    activePlaceID: -1,
    markers: [{
      id: 0,
      latitude: 29.910981485284793,
      longitude: 121.63705934498594,
      iconPath: "../../images/nav/xiaomen.png",
      width: 30,
      height: 32,
      callout: {
        content: '北大门',
        display: 'ALWAYS'
      }
    }, {
      id: 1,
      latitude: 29.909570235511957,
      longitude: 121.64179344389723,
      iconPath: "../../images/nav/xiaomen.png",
      width: 30,
      height: 32,
      callout: {
        content: '东大门',
        display: 'ALWAYS'
      }
    },{
      id: 2,
      latitude: 29.909570235511957,
      longitude: 121.64179344389723,
      iconPath: "../../images/nav/xiaomen.png",
      width: 30,
      height: 32,
      callout: {
        content: '东大门',
        display: 'ALWAYS'
      }
    },{
      id: 3,
      latitude: 29.906605848388136,
      longitude: 121.6418604991226,
      iconPath: "../../images/nav/xiaomen.png",
      width: 30,
      height: 32,
      callout: {
        content: '南大门',
        display: 'ALWAYS'
      }
    },{
      id: 4,
      latitude: 29.911207004403323,
      longitude: 121.62896175596998,
      iconPath: "../../images/nav/xiaomen.png",
      width: 30,
      height: 32,
      callout: {
        content: '西校区大门',
        display: 'ALWAYS'
      }
    },{
      id: 5,
      latitude: 29.90713363200383,
      longitude: 121.64442200873182,
      iconPath: "../../images/nav/xingzheng.png",
      width: 30,
      height: 32,
      callout: {
        content: '南门隔离点',
        display: 'ALWAYS'
      }
    },{
      id: 6,
      latitude: 29.905933908377406,
      longitude: 121.64566655371473,
      iconPath: "../../images/nav/xingzheng.png",
      width: 30,
      height: 32,
      callout: {
        content: '南门隔离点',
        display: 'ALWAYS'
      }
    },{
      id: 7,
      latitude: 29.905933908377406,
      longitude: 121.64566655371473,
      iconPath: "../../images/nav/xingzheng.png",
      width: 30,
      height: 32,
      callout: {
        content: '甬江隔离点',
        display: 'ALWAYS'
      }
    },{
      id: 8,
      latitude: 29.90821709092531,
      longitude: 121.64044161055372,
      iconPath: "../../images/nav/xingzheng.png",
      width: 30,
      height: 32,
      callout: {
        content: '本部隔离点',
        display: 'ALWAYS'
      }
    },{
      id: 9,
      latitude: 29.9088029908399,
      longitude: 121.63722832415388,
      iconPath: "../../images/nav/xingzheng.png",
      width: 30,
      height: 32,
      callout: {
        content: '本部隔离点',
        display: 'ALWAYS'
      }
    },{
      id: 10,
      latitude: 29.905243363227886,
      longitude: 121.63708080265806,
      iconPath: "../../images/nav/xingzheng.png",
      width: 30,
      height: 32,
      callout: {
        content: '本部隔离点',
        display: 'ALWAYS'
      }
    },{
      id: 11,
      latitude: 29.908405416274558,
      longitude: 121.62914146397398,
      iconPath: "../../images/nav/xingzheng.png",
      width: 30,
      height: 32,
      callout: {
        content: '西区隔离点',
        display: 'ALWAYS'
      }
    },{
      id: 12,
      latitude: 29.908405416274558,
      longitude: 121.62914146397398,
      iconPath: "../../images/nav/xingzheng.png",
      width: 30,
      height: 32,
      callout: {
        content: '西区隔离点',
        display: 'ALWAYS'
      }
    },],
    distance: '',
    cost: '',
    polyline: [],
    userLongitude: 121.63706470940397,
    userLatitude: 29.908879715568357,
    inSchool: false,
    isLoading: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    console.log(e)
    var _this = this

    if (e.markerId !== '' && Object.keys(e).length !== 0) {
      _this.makertap(e);
    }
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
  onReady: function() {
    var that = this;
    setTimeout(function() {
      that.setData({
        isLoading: false
      });
    }, 800);

  },
  makertap: function(e) {
    console.log(e)
    var id = e.markerId;
    var that = this;
    const markers = that.data.markers;
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标  
      success: function(res) {
        that.setData({
          userLongitude: res.longitude,
          userLatitude: res.latitude
        });
        that.setData({
          activePlaceID: id,
          placeName: that.data.markers[id].callout.content
        })
        var userLocation = that.data.userLongitude + ',' + that.data.userLatitude;
        var destination = that.data.markers[id].longitude + ',' + that.data.markers[id].latitude;
        that.planPolyline(userLocation, destination);
      }
    })

  },
  planPolyline: function(origin, destination) {
    var that = this;
    var id = that.data.activePlaceID;
    //规划步行路线
    var myAmapFun = new amapFile.AMapWX({
      key: '8dea7dc0beb4fcde9461759d0a2143e9'
    });
    myAmapFun.getWalkingRoute({
      origin: origin,
      destination: destination,
      success: function(data) {
        var points = [];
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          var steps = data.paths[0].steps;
          for (var i = 0; i < steps.length; i++) {
            var poLen = steps[i].polyline.split(';');
            for (var j = 0; j < poLen.length; j++) {
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            }
          }
        }
        that.setData({
          json: data.paths[0],
          polyline: [{
            points: points,
            color: "#7acfa6",
            width: 6
          }]
        });
        if (data.paths[0] && data.paths[0].distance) {
          that.setData({
            distance: data.paths[0].distance + '米'
          });
        }
        if (data.paths[0] && data.paths[0].duration) {
          that.setData({
            cost: parseInt(data.paths[0].duration / 60) + '分钟'
          });
        }
        var markers = that.data.markers;
        var points = that.data.polyline[0].points;
        //暂时一共70个坐标点
        markers[71] = {
          id: 71,
          latitude: points[0].latitude,
          longitude: points[0].longitude,
          iconPath: '../../images/nav/mapicon_navi_s.png',
          width: 23,
          height: 33
        };
        markers[72] = {
          id: 72,
          latitude: points[points.length - 1].latitude,
          longitude: points[points.length - 1].longitude,
          iconPath: '../../images/nav/mapicon_navi_e.png',
          width: 24,
          height: 34
        }

        that.setData({
          markers: markers,
        })
      },
    })
  },
  location: function() {
    var _this = this
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
  moveSchool: function() {
    //视图返回学校
    var _this = this;
    _this.setData({
      userLongitude: 121.63706470940397,
      userLatitude: 29.908879715568357,
    })
  },
  jtt: function() {
    const db = wx.cloud.database();
    const dbget=db.collection('student');
    dbget
      .where({
        'id': "176000770"
      })
      .get({
        success: function(res) {
          console.log(res.data[0].paw)
        }
      }),
    wx.previewImage({
      current: 'http://120.26.185.147:10085/CompusSystem/SchoolPicture?pic=schoolmap.jpeg', // 当前显示图片的http链接
      urls: ["http://120.26.185.147:10085/CompusSystem/SchoolPicture?pic=schoolmap.jpeg"] // 需要预览的图片http链接列表
    })
  },
  goDetail: function() {
    var that = this;
    const latitude = that.data.markers[that.data.activePlaceID].latitude;
    const longitude = that.data.markers[that.data.activePlaceID].longitude;
    const name = that.data.markers[that.data.activePlaceID].callout.content;
    wx.openLocation({
      latitude,
      longitude,
      name,
      address: '宁波大学',
      scale: 18
    })
  }
})