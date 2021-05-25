<script>
export default {
  globalData: {
    encryptedInfo: {},
    subjectList: [],
  },
  created() {
    this.getOpenId();
	this.getSubject()
  },
  methods: {
    // 获取用户openid
    getOpenId() {
      uni.login({
        success: (res) => {
          this.$http({
            path: "/wxgetopenid",
            method: "GET",
            data: {
              js_code: res.code,
            },
            callback: (res) => {
              getApp().globalData.encryptedInfo = res;
            },
          });
        },
      });
    },
    // 获取题目
    getSubject() {
      this.$http({
        path: "/wxgetsubject",
        method: "GET",
        data: {},
        callback: (res) => {
          getApp().globalData.subjectList = res;
        },
      });
    },
  },
};
</script>
<style lang="less">
page {
  width: 100%;
  height: 100%;
  background-color: #e0e0e0;
}
* {
  box-sizing: border-box;
}
</style>
