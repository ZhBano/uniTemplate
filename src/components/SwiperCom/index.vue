<template>
  <swiper
    class="swiper"
    :indicator-dots="!noDots"
    :current="0"
    autoplay
    :interval="interval"
  >
    <swiper-item
      v-for="(item, index) in swiperList"
      :key="index"
      @click="imageClickFn(item)"
    >
      <image :src="item[imageProps]" mode="aspectFill"></image>
    </swiper-item>
  </swiper>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: (_) => [],
    },

    interval: {
      type: Number,
      default: 2000,
    },

    imageProps: {
      type: String,
      default: 'image',
    },
    
    noDots:{
      type:Boolean,
      default:false
    }
  },
  computed: {
    swiperList() {
      if (this.value.length > 0) {
        if (typeof this.value[0] === "string") {
          return this.value.map((item) => {
            return { image: item };
          });
        } else {
          return this.value;
        }
      }
      return [];
    },
  },
  methods: {
    imageClickFn(item) {
      this.$emit("change", item);
    },
  },
};
</script>

<style lang="scss" scoped>
.swiper {
  flex: 1;
  width: 100%;
  height: 100%;
  position: relative;

  image {
    width: 100%;
  }
}
</style>
