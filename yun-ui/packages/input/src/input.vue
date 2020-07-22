<template>
  <div class="yun-input" :class="{'yun-input--suffix': showSuffix}">
    <input
      :placeholder="placeholder"
      :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
      :name="name"
      :disabled="disabled"
      :value="value"
      :class="{'is-disabled': disabled}"
      class="yun-input__inner"
      @input="handleInput"
    >
    <span class="yun-input__suffix" v-if="showSuffix">
      <i v-if="clearable && value"
         class="yun-input__icon yun-icon-close yun-icon-circle-close yun-input__clear"
         @click="clear"
      />
      <i v-if="showPassword" class="yun-input__icon yun-icon-view yun-input__clear" @click="handlePassword"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'YunInput',

  props: {
    value: [String, Number],
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    name: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      // 用于控制是否显示密码
      passwordVisible: false
    }
  },

  computed: {
    showSuffix () {
      return this.clearable || this.showPassword
    }
  },

  methods: {
    handleInput (e) {
      this.$emit('input', e.target.value)
    },

    clear () {
      this.$emit('input', '')
    },

    handlePassword () {
      this.passwordVisible = !this.passwordVisible
    }
  }
}
</script>

<style lang="scss" scoped>
.yun-input {
  width: 180px;
  position: relative;
  font-size: 14px;
  display: inline-block;

  .yun-input__inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #000;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    width: 100%;

    &:focus {
      outline: none;
      border-color: #409eff;
    }

    &.is-disabled {
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }
}

.yun-input--suffix {
  .yun-input__inner {
    padding-right: 30px;
  }

  .yun-input__suffix {
    position: absolute;
    height: 100%;
    right: 10px;
    top: 0;
    line-height: 40px;
    text-align: center;
    color: #c0c4cc;
    transition: all .3s;
    z-index: 900;

    i {
      color: #c0c4cc;
      font-size: 14px;
      cursor: pointer;
      transition: color .2s cubic-bezier(.645, .045, .355, 1);
    }
  }
}

</style>
