<template>
  <div class="huadiao-poem-container">
    <ul class="poem"
        @click="clickToCopyAllPoems"
        title="点击复制全部诗句"
        ref="poem"
    >
      <li v-for="(poem, index) in huadiaoPoemAfterHandle"
          :key="index"
      >{{poem}}</li>
    </ul>
    <span class="poet">—— {{huadiaoPoet}}</span>
  </div>
</template>

<script>
export default {
  name: "HuadiaoPoem",
  data() {
    return {
      huadiaoPoet: "徐备",
      huadiaoPoem: [
          "芳菲移自越王台，最似蔷薇好并栽。",
          "秾艳尽怜胜彩绘，嘉名谁赠作玫瑰。",
          "春藏锦绣风吹拆，天染琼瑶日照开。",
          "为报朱衣早邀客，莫教零落委苍苔。",
      ]
    }
  },
  computed: {
    // 如果视口高度小于 620px 就将诗句分段, 以逗号再分割
    huadiaoPoemAfterHandle() {
      let res = this.huadiaoPoem;
      if(window.innerHeight <= 620) {
        let temp = [];
        for(let item of this.huadiaoPoem) {
          let split = item.split(/，/)
          temp.push(split[0] + "，");
          temp.push(split[1]);
        }
        res = temp;
      }
      return res;
    },
  },
  methods: {
    // 点击复制全部诗句
    async clickToCopyAllPoems() {
      let poem = "";
      for(let p of this.huadiaoPoem) {
        poem += p;
      }
      // 写入剪贴板
      await navigator.clipboard.writeText(poem);
      // 中屏提示
      this.huadiaoMiddleTip("诗句复制成功!")
    }
  },
  beforeDestroy() {
    this.clearAllRefsEvents();
  }
}
</script>

<style scoped>

.huadiao-poem-container {
  position: absolute;
  z-index: 1;
  top: 90px;
  right: 41px;
  color: #c5c5c5;
}

.poem {
  display: flex;
  /* 诗句从右向左 */
  flex-direction: row-reverse;
}

.poet {
  float: right;
}

.poem li,
.poet {
  /* 华文楷体 */
  font-family: STKaiti,serif;
  font-size: 20px;
  /* 实现文字竖排 */
  writing-mode: vertical-lr;
}

</style>