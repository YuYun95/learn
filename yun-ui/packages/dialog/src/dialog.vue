<template>
  <transition name="dialog-fade">
    <!-- 对话框的遮罩 .self代表只有点击自己才触发-->
    <div v-show="visible" class="yun-dialog__wrapper" @click.self="handleClose">
      <div class="yun-dialog" :style="{width:width,marginTop:top}">
        <div class="yun-dialog__header">
          <slot name="title">
            <slot name="title">
              <span class="yun-dialog__title">{{title}}</span>
            </slot>
          </slot>
          <button class="yun-dialog__headerbtn" @click="handleClose">
            <i class="yun-icon-close"></i>
          </button>
        </div>
        <div class="yun-dialog__body">
          <!-- 默认插槽 -->
          <slot></slot>
        </div>
        <div v-if="$slots.footer" class="yun-dialog__footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'YunDialog',
  props: {
    title: {
      type: String,
      default: '提示'
    },
    width: {
      type: String,
      default: '50%'
    },
    top: {
      type: String,
      default: '15vh'
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClose () {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.yun-dialog__wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
  z-index: 2001;
  background-color: rgba(0, 0, 0, .5);

  .yun-dialog {
    position: relative;
    margin: 15vh auto 50px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
    box-sizing: border-box;
    width: 30%;

    &__header {
      padding: 20px 20px 10px;

      .yun-dialog__title {
        line-height: 24px;
        font-size: 18px;
        color: #303133;
      }

      .yun-dialog__headerbtn {
        position: absolute;
        top: 20px;
        right: 20px;
        padding: 0;
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        font-size: 16px;

        .el-icon-close {
          color: #909399;
        }
      }
    }

    &__body {
      padding: 30px 20px;
      color: #606266;
      font-size: 14px;
      word-break: break-all;
    }

    &__footer {
      padding: 10px 20px 20px;
      text-align: right;
      box-sizing: border-box;

      .yun-button:first-child {
        margin-right: 20px;
      }
    }
  }
}

.dialog-fade-enter-active {
  animation: dialog-fade-in .4s;
}

.dialog-fade-leave-active {
  animation: dialog-fade-out .4s;
}

@keyframes dialog-fade-in {
  0% {
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@keyframes dialog-fade-out {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% {
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
}
</style>
