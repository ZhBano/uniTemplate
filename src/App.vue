<script>
export default {
  onLaunch: function () {
    console.log("App Launch");
    this.getIphone();
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
   methods: {
    getIphone() {
      let iphone = wx.getSystemInfoSync().model;
      let iphoneList=['iPhone X','iPhone 11','iPhone 12']
      let isPhone =iphoneList.some(item=>iphone.includes(item))
      if (isPhone) {
        this.setStorage("iphone", true);
        console.log(211);
      } else {
        this.setStorage("iphone", false);
      }
    },
  },
};
</script>

<style lang="scss">
/*每个页面公共css */
@import url("./styles/index.css");

/*单行文本溢出省略号*/
.one-t {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  transition: all linear 0.2s;
}

/*多行文本溢出省略号*/
.more-t {
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  transition: all linear 0.2s;
}

.line-clamp3 {
  -webkit-line-clamp: 3;
}

.line-clamp4 {
  -webkit-line-clamp: 4;
}

/* 暂无数据	 */
.nodata {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #ccc;
}

/* 微信按钮样式清除	 */
.wxBtn {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  &::after {
    border: 2rpx solid transparent;
  }
}
</style>
