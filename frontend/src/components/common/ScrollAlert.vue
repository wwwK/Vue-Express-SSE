<template>
  <v-snackbar
    centered
    v-model="isOpen"
    text
    absolute
    timeout="-1"
    content-class="alert"
    vertical
    multi-line
    :class="{ 'dp-block': isOpen }"
  >
    <img
      style="height: 60px"
      src="@/assets/images/handScroll2.png"
      alt="핸드폰 스크롤"
    />
    드래그하여 컨텐츠를 보세요.
    <template v-slot:action>
      <v-btn depressed @click="onClickScroll" block>
        <v-checkbox
          class="ma-0"
          v-model="noSee"
          label="앞으로 안보기"
          hide-details
        />
        <span> 닫기 </span>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "ScrollAlert",
  data() {
    return {
      isOpen: false,
      noSee: false,
    };
  },
  mounted() {
    if (this.$vuetify.breakpoint.xl || this.$vuetify.breakpoint.lg) {
      return;
    }

    if (!this.$vuetify.breakpoint.xl && !this.$vuetify.breakpoint.lg) {
      if (localStorage.getItem("is-mobile-scoll-alert")) {
        this.isOpen = false;
      } else {
        this.isOpen = true;
      }
    }
  },
  methods: {
    onClickScroll() {
      this.isOpen = false;
      if (this.noSee) {
        localStorage.setItem("is-mobile-scoll-alert", true);
      }
    },
  },
};
</script>

<style lang="scss" >
.v-snack--centered.v-snack.v-snack--vertical {
  z-index: 20;

  &.dp-block {
    background-color: rgba($color: #ffffff, $alpha: 0.9);
  }

  .v-snack__wrapper {
    min-width: 300px;
    background: transparent;
    // background-color: rgba($color: #ffffff, $alpha: 0.9);

    &::before {
      display: none;
    }

    .v-snack__content.alert {
      align-items: center;
      justify-content: center;
      width: 100%;
      display: flex;
      letter-spacing: -0.01rem;
    }
    .v-snack__action {
      width: 100%;
      margin: 0;

      .v-btn {
        .v-btn__content {
          letter-spacing: -0.01rem;
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .v-input--checkbox {
            margin: 0;
            padding: 0;

            .v-input__control {
              .v-input__slot {
                .v-input--selection-controls__input {
                  width: 18px;
                  margin-left: 0;
                  margin-right: 0;

                  .v-icon.v-icon {
                    font-size: 18px;
                  }

                  .v-input--selection-controls__ripple {
                    width: 24px;
                    height: 24px;
                    top: calc(50% - 19px);
                    left: -10px;
                  }
                }
                .v-label {
                  letter-spacing: -0.005rem;
                  font-size: 0.6rem;
                  line-height: 1.2;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>