// pages/Grade/Grade.js
const app = getApp()
var usingMode2 = false
const buttons = [
{
  label: '导出成绩',
  icon: "../../images/Export.png",
}
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
   tables:[],
    count: 0,
    terms: [],
    termsIndex: 0,
    grades: undefined,
    datas: [],
    heads: ["课程名", "成绩"],
    vcodeImage: "",
   
    buttons,
    postion: ["bottomRight", "bottomLeft"],
    showed: false,
    termName: ["大一", "大二", "大三", "大四"],
    termName_: ["上学期", "下学期"],
    termIndex: 0,
    termIndex_: 0,
    visible: false,
    showExportModal: false,
  },
  closethis() {
    this.setData({
      showExportModal: false
    })
  },
  // export(e) {
  //   API.newAPI({
  //     url: "v2/ExportGrade",
  //     data: {
  //       name: app.globalData.name,
  //       passwd: app.globalData.passwd,
  //       type: e.currentTarget.dataset.filetype
  //     },
  //     callBack: (data) => {
  //       if (data) {
  //         this.setData({
  //           showExportModal: false
  //         })
  //         wx.setClipboardData({
  //           data: data["url"],
  //         })
  //         wx.showModal({
  //           title: '导出成功',
  //           content: '文件链接复制到剪贴板，可粘贴到浏览器中下载',
  //           confirmText: "好的",
  //           confirmColor: "#79bd9a",
  //           showCancel: false
  //         })
  //       }
  //     }
  //   })
  // },

  onTermClick(e) {//年级点击事件
    // console.log(this.data.tables)

    let termsIndex = e.currentTarget.dataset.index * 2 + this.data.termIndex_
    if (termsIndex + 1 > this.data.count) {
      this.setData({
        visible: true,
        datas: [],
        termIndex: e.currentTarget.dataset.index
      })
    } else {
      this.setData({
        visible: false,
        datas: this.data.tables[termsIndex],
        termIndex: e.currentTarget.dataset.index
      })
    }
   //吐槽，没找到代码复用方法，这一部分重用了三次，By陈冰
    var j = 0
    var k=0
    let lis = this.data.datas
    while (this.data.tables[j]) {
      
      
      if (this.data.tables[j].year == this.data.termName[this.data.termIndex] && this.data.tables[j].term == this.data.termName_[this.data.termIndex_]) {
        //console.log(j)
        var cname = this.data.tables[j].cname
        var score = this.data.tables[j].score
        lis.push({ 'Course_Name': cname, 'Course_score': score })
        k++
      }
      j++
    }
    if (k > 0)
      this.setData({
      visible : false
      })
    else
      this.setData({
        visible: true
      })
    this.setData({
      datas: lis
    })
  },
  onTermClick_(e) {//学期点击
    let termsIndex = this.data.termIndex * 2 + e.currentTarget.dataset.index
    if (termsIndex + 1 > this.data.count) {
      this.setData({
        datas: [],
        termIndex_: e.currentTarget.dataset.index
      })
    } else {
      this.setData({
        visible: false,
        datas: this.data.tables[termsIndex],
        termIndex_: e.currentTarget.dataset.index
      })
    }
    //console.log(this.data.termIndex, this.data.termIndex_)
    var j = 0
    var k=0
    let lis = this.data.datas
    while (this.data.tables[j]) {


      if (this.data.tables[j].year == this.data.termName[this.data.termIndex] && this.data.tables[j].term == this.data.termName_[this.data.termIndex_]) {
        console.log(j)
        var cname = this.data.tables[j].cname
        var score = this.data.tables[j].score
        lis.push({ 'Course_Name': cname, 'Course_score': score })
        k++
      }
      j++
    }
    if (k > 0)
      this.setData({
        visible: false
      })
    else
      this.setData({
        visible: true
      })
    this.setData({
      datas: lis
    })
  },
  // onClick:function(e) {
  //     this.setData({
  //       showExportModal: true
  //     })

  // },
  // copy: function (e) {
  //   wx.showLoading({
  //     title: '加载中',
  //   })
  //   wx.downloadFile({
  //     url: 'https://dreace.top/GPA.pdf',
  //     success: function (res) {
  //       var filePath = res.tempFilePath
  //       wx.openDocument({
  //         filePath: filePath,
  //         success: function (res) {
  //           wx.hideLoading()
  //         }
  //       })
  //     }
  //   })
  // },
  // refresh: function () {
  //   this.getGrade()
  // },
  // preventTouchMove: function () { },
  // showModel: function (e) {
  //   this.setData({
  //     isShowModel: true,
  //     ModelContent: e.ModelContent
  //   })
  // },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var uid = wx.getStorageSync('uid')
    let list=this.data.tables
    let lis = this.data.datas
    //console.log(uid)
    wx.request({
      url: 'http://120.26.185.147:10085/CompusSystem/ScoreTable',
      data: {
        studentId: uid,
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
       // console.log(res.data)
        var i=0
        while(res.data.scinfoList[i])
        {
          var cname = res.data.scinfoList[i].courseName
          var score = res.data.scinfoList[i].score
          var year = res.data.scinfoList[i].year
          var term = res.data.scinfoList[i].term
          list.push({ 'cname':cname, 'score':score,'year':year,'term':term})
          i++
        }
        //console.log(list)
        that.setData({
          tables: list
        })
        var j=0
        var k=0
        while (list[j]) {
          
          if (list[j].year == that.data.termName[that.data.termIndex] && list[j].term == that.data.termName_[that.data.termIndex_]) {
            var cname = list[j].cname
            var score = list[j].score
            lis.push({ 'Course_Name': cname, 'Course_score': score })
            k++
          }
          j++
        }
        console.log(j)
        if (k > 0)
          that.setData({
            visible: false
          })
        else
          that.setData({
            visible: true
          })
        //console.log(lis)
        that.setData({
          datas: lis
        })
      }
    })
  },
  onUnload: function () {
    
  },
  
})