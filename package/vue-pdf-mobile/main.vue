<template>
  <div class="page-kuangmo">
    <div
      class="viewer"
      v-if="numPages"
      :style="style"
      @touchstart="handleTouchstart"
      @touchmove="handleTouchmove"
    >
      <button class="btn-download" @click="handleDownload">下载</button>
      <!--
      Definition ( is )
      List Rendering ( v-for )
      Conditionals ( v-if / v-else-if / v-else / v-show / v-cloak )
      Render Modifiers ( v-pre / v-once )
      Unique Attributes ( ref / key )
      Two-Way Binding ( v-model )
      Other Attributes
      Events ( v-on )
      Content ( v-html / v-text )
    -->
      <pdf v-for="i in numPages" :key="i" :src="loadingTask" :page="i" />
    </div>
  </div>
</template>

<script>
import pdf from "vue-pdf";

export default {
  // 1.Side Effects ( el )
  // 2.name/parent ( name/parent )
  name: "VuePdfMobile",
  // 3.Component Type ( functional )
  // 4.Template Modifiers ( delimiters/comments )
  // 5.Template Dependencies ( components/directives/filters )
  components: {
    pdf,
  },
  // 6.Composition ( extends/mixins )
  // 7.Interface ( inheritAttrs/model/props/propsData )
  props: {
    url: {
      type: String,
      required: true,
    },
    scaleRate: {
      type: Number,
      default: 100,
    },
  },
  // 8.Local State ( data/computed )
  data() {
    return {
      loadingTask: "",
      numPages: undefined,

      scrollHeight: 0,
      scrollTop: 0,

      touchData: {
        start: {
          x: 0,
          y: 0,
        },
        end: {
          x: 0,
          y: 0,
        },
      },

      doubleFingleData: {
        start: 0,
        end: 0,
        scale: 1,
      },
    };
  },
  computed: {
    style() {
      const { scale } = this.doubleFingleData;

      let { x, y } = this.touchData.end;

      if (scale === 1) {
        return null;
      } else {
        const scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        return `
          transform: scale(${scale}) translate3d(${x}px, ${
          y + (scale * scrollTop) / this.scaleRate
        }px, 0);
        `;
      }
    },
  },
  // 9.Events ( watch/Lifecycle Events )
  mounted() {
    if (this.url) {
      this.loadingTask = pdf.createLoadingTask(this.url);
      this.loadingTask.promise
        .then((pdf) => {
          this.numPages = pdf.numPages;

          // this.$nextTick(() => {
          //   this.scrollHeight =
          //     document.documentElement.scrollHeight || document.body.scrollHeight;
          // });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  // 10.Non-Reactive Properties ( methods )
  methods: {
    handleTouchstart(e) {
      // 双指操作
      if (e.touches.length > 1) {
        this.doubleFingleData.start = this.getTouchCoordDsitance(e.touches);
      } else {
        const { pageX: x, pageY: y } = e.touches[0];
        const { x: lastX, y: lastY } = this.touchData.end;

        this.touchData.start = { x: x - lastX, y: y - lastY };
      }
    },
    handleTouchmove(e) {
      if (this.doubleFingleData.scale !== 1) {
        e.preventDefault();
      }

      // 双指操作
      if (e.touches.length > 1) {
        this.doubleFingleData.end = this.getTouchCoordDsitance(e.touches);

        this.updateScale();
      } else {
        const { pageX: x, pageY: y } = e.touches[0];
        const { x: starX, y: startY } = this.touchData.start;

        let resultX = x - starX;
        let resultY = y - startY;
        if (resultY <= 0) {
          resultY = 0;
        }

        this.touchData.end = {
          x: resultX,
          y: resultY,
        };
      }
    },

    updateScale() {
      const { start, end } = this.doubleFingleData;
      const currentScale = end / start;

      const scaleSize =
        this.doubleFingleData.scale + (currentScale - 1) / this.scaleRate;

      if (scaleSize <= 1) {
        this.doubleFingleData.scale = 1;
      } else {
        this.doubleFingleData.scale = scaleSize;
      }
    },

    getTouchCoordDsitance(touches) {
      const [{ pageX: x1, pageY: y1 }, { pageX: x2, pageY: y2 }] = touches;

      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    },

    handleDownload() {
      const hrefEle = document.createElement("a");
      hrefEle.href = this.$route.query.url;
      hrefEle.click();
    },
  },
  // 11.Rendering ( template/render/renderError )
};
</script>

<style lang="scss" scoped>
.page-kuangmo {
  .viewer {
    width: 100%;
    overflow: hidden;
  }

  .btn-download {
    position: fixed;
    top: 10px;
    right: 10%;
    z-index: 1;
  }
}
</style>
