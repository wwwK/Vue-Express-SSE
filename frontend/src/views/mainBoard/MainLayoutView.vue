<template>
  <v-container class="main-board-layout" no-gutters>
    <v-main class="main-board-content" align-content="start">
      <!-- <router-view class="content-box"/> -->
      {{ latitude }}
      {{ longitude }}
      {{ numbbb }}
      <br>
      <v-text-field
        type="text"
        label="이름"
        v-model="name"
      ></v-text-field>
      <v-btn
        @click="connectSSE"
      >입장</v-btn>
      <v-btn
        @click="endSSE"
      >퇴장</v-btn>
      <p v-html="sseMessage"></p>
    </v-main>
  </v-container>
</template>

<script>
import Loading from "@/components/common/Loading";
import { sse } from "@/common/sse";

export default {
  components: { Loading },
  name: "MainLayoutView",
  data() {
    return {
      latitude: 111,
      longitude: 222,
      numbbb: 0,
      sseMessage: '',
      name: '',
      sseClient: null
    };
  },
  mounted() {
    this.getLocation();

    setInterval(() => {
      this.numbbb += 1;
    }, 100);
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
    },

    SSE(name) {
      if (this.sseClient) {
        this.sseMessage = ''
      }
      console.log('연결', this.sseClient)
      this.sseClient = new sse(name);
      console.log(this.sseClient);
      
      this.sseClient.onmessage = ({ data }) => {
        console.log('왔다')
        this.sseMessage += `${data} <br/>`;
      }
    },
    connectSSE() {
      const { name } = this;
      this.SSE(name);
    },

    endSSE() {
      const { name } = this;
      this.sseClient.destroy(name);
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