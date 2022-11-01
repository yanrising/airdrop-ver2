<template>
  <div class="button-step">
    <div>
      {{title}}
    </div>
    <div>
      <a-button @click="handleClick" :type="checkIsDone ? 'default' : 'primary'" :disabled="!checkIsThisStep && !checkIsDone">
        {{checkIsDone ? 'Done' : buttonText}}
      </a-button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      buttonText: {
        type: String,
        default: ''
      },
      isDone: {
        type: Boolean,
        default: false
      },
      isThisStep: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        checkIsDone: false,
        checkIsThisStep: false
      }
    },
    created() {
      this.checkIsDone = this.isDone;
      this.checkIsThisStep = this.isThisStep;
    },
    methods: {
      handleClick() {
        if (this.checkIsDone) {
          return;
        }
        this.$emit('buttonClick');
      }
    },
    watch: {
      isDone: {
        handler: function (val) {
          this.checkIsDone = val;
        },
        immediate: true
      },
      isThisStep: {
        handler: function (val) {
          this.checkIsThisStep = val;
        },
        immediate: true
      }
    }
  }
</script>

<style lang="scss">
  @import '~/assets/scss/_variables.scss';

  .button-step{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border: 2px solid #e8e8e8;
    border-radius: 4px;
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: bold;
    color: #e8e8e8;
    background: rgba($color: #3e88c9, $alpha: 1);

    @media (max-width: 767px) {
      font-size: 16px;
    }
  }
</style>