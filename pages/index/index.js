//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userName:null,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls:[],
    indicatorDots: true,
    goodClassList:[],
    autoplay: true,
    interval: 5000,
    duration: 1000
    
   
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  removeItem:function(){  //移除数据
    wx.removeStorage({
      key: 'keys',
      success: function(res) {
        console.log("移除了..."); 
        console.log(res.data);
      },
    })
  },
  clearStorage:function(){  //清空数据
   wx.clearStorageSync(); 
  },
  handleClick:function(e){
     this.setData({
       num:e.currentTarget.dataset.index
     }) 
  },
  scroll: function (e) {
    this.setData({
      scrollY: e.detail.scrollTop
    });
    console.log(e.detail.scrollTop);
  },
  onLoad: function () {
    var that=this;
    wx.request({
      url: 'https://www.easy-mock.com/mock/5b7d02eb151681528a184cda/example/homelist', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var result=res.data.data;
        that.setData({ imgUrls: result.bannerList, goodClassList:                            result.goodClassList})

      } 
    });
    
  },
  
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
