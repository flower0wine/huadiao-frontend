<template>
  <div ref="teleportNode">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Teleport",

  props: {
    to: {
      type: [String, HTMLElement],
      required: true
    },

    disabled: {
      type: Boolean,
      default: false
    },
  },

  computed: {
    teleportNode() {
      if (!this.$slots.default.length) return [];
      return this.$slots.default.reduce((pre, cur) => {
        pre.push(cur.elm);
        return pre;
      }, []);
    },

    toNode() {
      if (typeof this.to === "string") {
        const node = document.querySelector(this.to);
        if (!node) {
          throw new Error(`document.querySelector('${this.to}') returned null`);
        }
        return node;
      }
      return this.to;
    }
  },

  watch: {
    toNode() {
      this.transform();
    },

    disabled(val) {
      if (!val) {
        this.transform();
      }
    },
  },

  mounted() {
    if (!this.disabled) {
      this.transform();
    }

    this.$refs.teleportNode.remove();
  },

  methods: {
    transform() {
      this.toNode.append(...this.teleportNode);
    },
  },

  beforeDestroy() {
    // 因为 DOM 节点被加到其他位置，Vue 无法移除，需要自己手动移除
    this.teleportNode.forEach(node => {
      node.remove();
    });
  },
}
</script>