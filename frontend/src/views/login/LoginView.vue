<template>
  <v-container class="text-center login-wrap">
    <v-row justify="center" align="center">
      <v-col cols="12" class="cont">
        <Loading v-if="isLoading" />
        <h1 class="logo">
          <img src="@/assets/images/login.png" alt="demasian kipis logo" />
        </h1>
        <!-- <GoogleLogin
          :params="loginParams"
          :renderParams="renderParams"
          :onSuccess="onSuccess"
          :onFailure="onFailure"
        /> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import GoogleLogin from "vue-google-login";
import Loading from "@/components/common/Loading";
import { loginApi } from "@/api/userAPI";

export default {
  name: "LoginView",
  components: {
    // GoogleLogin,
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
  methods: {
    async onSuccess(googleUser) {
      try {
        this.isLoading = true;

        let token;
        for (let key in googleUser) {
          if (googleUser[key].id_token) {
            token = googleUser[key].id_token;
            break;
          }
        }

        const respObj = await loginApi(token);

        if (respObj.status === 200) {
          sessionStorage.setItem('access-token', respObj.headers["access-token"]);
          localStorage.setItem('refresh-token', respObj.headers["refresh-token"]);
          
          this.$router.push({
            name: "MainLayout",
          });
        } else {
          alert(respObj.response.data.message);
        }
      } catch (err) {
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },
    onFailure(googleUser) {
      alert("로그인이 거부되었습니다");
      console.log(googleUser);
    },
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