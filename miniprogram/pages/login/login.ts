// pages/login/login.ts
import request from "../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  formSubmit(e:any){
    if(!e.detail.value.phone){
      wx.showToast({
        icon:"error",
        title:"手机号不能为空"
      })
      return
    }else if(! /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(e.detail.value.phone)){
      wx.showToast({
        icon:"error",
        title:"手机号格式不正确"
      })
      return
    }
    if(!e.detail.value.password){
      wx.showToast({
        icon:"error",
        title:"密码不能为空"
      })
      return
    }
    this.login(e.detail.value)
  },
  async login(data:any){
    let result = await request('/login/cellphone',{phone:data.phone,password:data.password,isLogin:true});
    if(result.code!==200){
      wx.showToast({
        icon:"error",
        title:"登录异常"
      })
      return
    }
    wx.setStorageSync('userInfo',JSON.stringify( result.profile))
    wx.reLaunch({
      url:"/pages/profile/profile"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

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