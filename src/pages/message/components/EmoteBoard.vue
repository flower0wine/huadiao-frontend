<template>
  <div class="emote-board">
    <div class="emote-header">
      <div class="emote-title">表情板</div>
      <div class="emote-close" @click.stop="clickCloseBoard">
        <CloseIcon width="18" height="18" />
      </div>
    </div>
    <div class="emote-container">
      <div class="emote-list">
        <div class="emote-item"
             v-for="emote in emotes[navActiveIndex]?.emotes || []"
             @click="chooseEmote(emote)"
             :key="emote.id">
          <div class="emote-img" :style="{
            backgroundImage: `url(${huadiaoEmoteLink(emote.filename)})`
          }"></div>
        </div>
      </div>
    </div>
    <div class="emote-nav">
      <div class="emote-nav-item"
           v-for="(emote, index) in emotes"
           :key="emote.id"
           @click="clickNavItem(index)"
           :class="{ active: index === navActiveIndex }">
        <div class="emote-img" :style="{
          backgroundImage: `url(${huadiaoEmoteLink(emote.filename)})`
        }"></div>
      </div>
    </div>
  </div>
</template>

<script>
import CloseIcon from "@/pages/components/svg/CloseIcon";
import {getEmotes} from "@/pages/message/apis";
import {flatPromise} from "@/util";
import {ResponseHandler} from "@/assets/js/utils";
import {huadiaoEmoteLink} from "@/util/huadiao-tool";

export default {
  name: "EmoteBoard",
  components: {
    CloseIcon,
  },
  emits: [
      "close",
      "choose",
  ],
  data() {
    return {
      navActiveIndex: 0,
      emotes: [],
    };
  },
  async created() {
    const emotesKey = "emotes";
    const emotes = window.localStorage.getItem(emotesKey);
    if (emotes) {
      this.emotes = JSON.parse(emotes);
      return;
    }

    const [err, res] = await flatPromise(getEmotes());

    if (err) {
      console.error(err);
      return;
    }

    new ResponseHandler(res).succeed((data) => {
      console.log(data)
      this.emotes = data;

      window.localStorage.setItem(emotesKey, JSON.stringify(data));
    });
  },
  mounted() {
    const emotes = this.$refs.emotes;
    new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = emotes.indexOf(entry.target);
          if (index > 0) {
            emotes.scrollLeft = index * 24;
          }
        }
      });
    });
  },
  methods: {
    huadiaoEmoteLink,

    chooseEmote(emote) {
      this.$emit("choose", emote);
    },

    clickNavItem(index) {
      this.navActiveIndex = index;
    },

    clickCloseBoard() {
      this.$emit("close");
    },
  },
}
</script>

<style lang="scss" scoped>
$borderRadius: 5px;

.emote-board {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%, -100%);
  z-index: 1000;
  width: 378px;
  border-radius: #{$borderRadius};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.emote-container {
  height: 200px;
}

.emote-list {
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  padding: 4px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 3px;
  }

  .emote-item {
    padding: 8px;

    .emote-img {
      width: 36px;
      height: 36px;
    }
  }
}

.emote-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 10px;
  font-size: 14px;

  .emote-close {
    width: 24px;
    height: 24px;
    text-align: center;
    line-height: 24px;
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #eaeaea;
    }
    
    ::v-deep svg {
      width: 12px;
      height: 12px;
      fill: #afafaf;
      vertical-align: 0;
    }
  }
}

.emote-img {
  background: center/cover no-repeat;
}

.emote-nav {
  display: flex;
  align-items: center;
  overflow-x: auto;
  overflow-y: hidden;
  border-bottom-left-radius: #{$borderRadius};
  border-bottom-right-radius: #{$borderRadius};
  background-color: #efefef;

  .emote-nav-item {
    padding: 5px 10px;

    &.active {
      background-color: #ffffff;
    }
  }

  .emote-img {
    width: 24px;
    height: 24px;
  }
}
</style>