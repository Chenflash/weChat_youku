//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    avatarUrl:null,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
    name: '此时此刻',
    author: '许巍',
    src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
   
  },
  onReady:function(e){
    //绘制上下文
    this.audioCtr = wx.createAudioContext('myAudio');
    wx.playBackgroundAudio({
      dataUrl: this.src,
      success:function(res){
        console.log("渲染完成======");
        console.log(res);
        wx.startRecord({
          success: function (res) {
            var tempFilePath = res.tempFilePath;
            console.lgo(res);
            wx.playVoice({
              filePath: tempFilePath,
              complete: function () {

              }
            })
          }
        })
      }
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  playVideo:function(){
    
  },
  pauseVideo:function(){

  },
  getImage:function(){
    var that=this;
    //选择图片
    // wx.chooseImage({
    //   count:9,
    //   sizeType:['original','compressed'],
    //   sourceType:['album','camera'], //选择指定来源
    //   success: function(res) {
    //     //选定照片的本地文件路径列表,templateFilepath可以作用img标签
    //     // var  temFilePath=res.tempFilePaths[0];
    //     // that.setData({ avatarUrl:temFilePath})
    //     var tempFilePaths = res.tempFilePaths[0];
    //     debugger;
    //     wx.uploadFile({
    //       url: 'http://tongcheng.cn/mobile/index.php?act=member_index&op=memberUploadImages',
    //       filePath:tempFilePaths,
    //       name: 'file',
    //       formData:{
    //         'key':'b861ac81e4315f7c4e8abb3eb3c995f8',
    //       },
    //       success:function(result){
    //         var data=result.data;
    //         console.log(data);
    //       },
    //       fail:function(res){
    //         console.log(res);
    //       }
    //     })

    //   },
     
    // })
    wx.downloadFile({
      url:"http://img3.imgtn.bdimg.com/it/u=1426574229,2506823160&fm=27&gp=0.jpg",
          success:function(res){ //服务器响应
            console.log(res.tempFilePath[0]);
            if(res.statusCode==200){
              // that.setData({ avatarUrl: res.tempFilePath[0]})
              // wx.playVoice({
              //   filePath:res.tempFilePath
              // })
            }

          }
        })
  },
  openWebsocket: function () { //开启连接
    wx.connectSocket({
      url: 'wss://example.qq.com',
      data:{
        x:'',
        y:'',
      },
      header:{
        'content-type':'application/json'
      },
      protocols: ['protocol1'],
      method: "GET",
      success:function(res){
        console.log(res);
      }
    })
    //链接打开事件
    wx.onSocketOpen(function(res){
      console.log("链接打开了");
    });
    wx.onSocketError(function(res){
      console.log("链接失败");
    })
  },
  sendWebsocket:function(){  //发送链接

  },
  closeWebsocket:function(){ //关闭链接
     wx.onSocketClose(function(res){
       console.log("关闭");
     })
  },

  getViewImage:function(){  //预览
    // wx.previewImage({
    //   current: this.avatarUrl, // 当前显示图片的http链接
    //   urls: '' // 需要预览的图片http链接列表
    // })
    // wx.getImageInfo({
    //   src: this.avatarUrl,
    //   success:function(res){
    //     console.log(res.width);
    //     console.log(res.height);
    //   },
    //   fail:function(res){
    //     console.log(res);
    //   }
    // })
    wx.saveImageToPhotosAlbum({
      filePath: this.avatarUrl,
      success(res){
        console.log(res);
      }
    })
  },
  onLoad: function () {
    wx.onBackgroundAudioPlay(function(){
      console.log("播放");
    })
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
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
