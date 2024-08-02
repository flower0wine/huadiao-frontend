/**
 * 功能描述：
 * 创建日期：2024 年 04 月 26 日
 */

// 使用严格模式
'use strict';

export default {
  computed: {
      authorUid() {
          return this.$route.params.authorUid;
      },
  }
}