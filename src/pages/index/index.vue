<template>
  <div class="authorize-container">
    <div class="mask-box" v-if="!loginStatus"></div>
    <div class="authorize-btn-box" @click="getUseInfo" v-if="!loginStatus">
      <text>党史答题需要获取您的用户信息</text>
      <text>授权登录</text>
    </div>
  </div>
</template>
<script>
export default {
  onShow() {
    uni.getStorage({
      key: "userInfo",
      success: (res) => {
        if (res.data.data.openid && res.data.data.nickName) {
          this.loginStatus = true;
        }
      },
      fail: (err) => {
        this.loginStatus = false;
      },
    });
  },
  data() {
    return {
      loginStatus: false,
    };
  },
  methods: {
    getUseInfo() {
      const {encryptedInfo} = getApp().globalData;
      uni.getUserProfile({
        desc: "WeiXin",
        lang: "zh_CN",
        success: (res) => {
          this.$http({
            path: "/wxlogin",
            method: "POST",
            data: {
              ...res.userInfo,
              ...encryptedInfo,
            },
            callback: (res) => {
              if (res.success == 1) {
                uni.setStorage({
                  key: "userInfo",
                  data: res,
                  success: () => {
                    this.loginStatus = true;
                  },
                  fail: () => {
                    uni.showToast({
                      title: "未知错误",
                    });
                    this.loginStatus = false;
                  },
                });
              }
            },
          });
        },
        fail: (err) => {
          return;
        },
      });
    },
  },
};
</script>
<style lang="less">
.authorize-container {
  width: 100%;
  height: 100%;
}
.mask-box {
  position: fixed;
  width: 100%;
  height: 100%;
}
.authorize-btn-box {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 85%;
  height: 250rpx;
  background-color: #ffffff;
  border-radius: 25rpx;
  > text:first-child {
    font-size: 40rpx;
  }
  > text:last-child {
    padding: 20rpx 40rpx;
    font-size: 30rpx;
    color: #ffffff;
    background-color: #ef7070;
    border-radius: 10rpx;
    letter-spacing: 6rpx;
  }
}
</style>
