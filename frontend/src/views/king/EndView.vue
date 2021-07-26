<template>
  <v-container class="text-center login-wrap">
    <v-row justify="center" align="center">
      <v-col cols="12" class="cont">
        <Loading v-if="isLoading" />
        <h1 class="logo">
          페이지이동 끝
        </h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Loading from "@/components/common/Loading";

export default {
  name: "EndView",
  components: {
    Loading,
  },
  data() {
    return {
      loginParams: {
        client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID,
      },
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true,
      },
      isLoading: false,
    };
  },
};
</script>

<style lang="scss">
.login-wrap {
  align-items: center;
  display: flex;
  height: 100%;
  background-color: #ffffff;

  .cont {
    position: relative;
    max-width: 600px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    .logo {
      line-height: 1;
      margin-bottom: 10%;
      width: 100%;

      img {
        width: 200px;
      }
    }
  }
}
</style>