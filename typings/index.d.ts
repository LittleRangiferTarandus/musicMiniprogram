/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    isMusicPlay?:boolean,
    musicId?:string
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}