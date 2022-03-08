import request from "../../utils/request"

// pages/profile/profile.ts
let startY:number = 0,moveY:number=0,distanceY:number=0

Page({

  /**
   * 页面的初始数据
   */
  data:{
    coverTransform:"translateY(0rpx)",
    coverTransition:"0",
    userInfo:null,
    recentPlayList:[]
  },
  toLogin(){
    if(this.data.userInfo){
      return
    }
    wx.navigateTo({
      url:"/pages/login/login"
    })
  },
  async getRecord(){
    if(!this.data?.userInfo?.userId){
      return
    }
    let recentPlay = await request("/user/record",{uid:this.data?.userInfo?.userId,typr:0})
    if(!recentPlay.weekData||!recentPlay.weekData.length){
      return
    }
    recentPlay=recentPlay.weekData.slice(0,10)
    recentPlay.forEach((v,i)=>{
      v.id=i
    })
    this.setData({recentPlayList:recentPlay})
    
  },
  handleTouchStart(event:any){
    this.setData({coverTransition:"1s"})
    startY=event.touches[0].clientY
  },
  handleTouchMove(event:any){
    moveY=event.touches[0].clientY
    distanceY=moveY-startY
    if(distanceY<0){
      return
    }else if(distanceY>=80){
      this.setData({coverTransform:`translateY(${80}rpx)`})
    }else{
      this.setData({coverTransform:`translateY(${distanceY}rpx)`})
    }
  },
  handleTouchEnd(){
    this.setData({coverTransform:`translateY(0rpx)`,coverTransition:"1s"})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    let tempInfo = wx.getStorageSync("userInfo");
    if(tempInfo){
      this.setData({userInfo:JSON.parse(tempInfo)})
      
    }
    this.getRecord()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})