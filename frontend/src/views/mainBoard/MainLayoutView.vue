<template>
  <v-container class="main-board-layout" no-gutters>
    <v-main class="main-board-content" align-content="start">
      <router-view class="content-box" />
      {{ latitude }}
      {{ longitude }}
    </v-main>
  </v-container>
</template>

<script>
import Loading from "@/components/common/Loading";

export default {
  components: { Loading },
  name: "MainLayoutView",
  data() {
    return {
      latitude: 111,
      longitude: 222,
    };
  },
  mounted() {
    // 이전페이지로 돌아갈때 원래 페이지로 돌아가게하기
    // console.log('갑니다')
    this.getLocation();
  },

  methods: {
    getLocation() {
      if (navigator.geolocation) { // GPS를 지원하면
        navigator.geolocation.getCurrentPosition((position)=> {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
        }, (error) => {
          console.error(error);
        }, {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity
        });
      } else {
        alert('GPS를 지원하지 않습니다');
      }
    }
  }
};
</script>

<style lang="scss">
.main-board-layout {
  max-width: 100%;
  padding: 0;
  display: flex;
  flex-wrap: wrap;

  .main-board-content {
    height: 100%;
    flex-wrap: wrap;

    .v-main__wrap {
      padding: 30px;
    }

    .content-box {
      background-color: #ffffff;
      padding: 2rem;
      height: 100%;
    }
  }
}

@media screen and(max-width:426px) {
  .main-board-layout {
    .main-board-content {
      .v-main__wrap {
        padding: 0;
      }

      .content-box {
        padding: 7% 4%;
      }
    }
  }
}
</style>