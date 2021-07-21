<template>
  <v-row class="flex-wrap program-epsode-layout pa-4">
    <ProgramEpsodeList />
    <ProgramEpsodeGuest />
  </v-row>
</template>

<script>
import ProgramEpsodeList from "@/components/mainBoard/ProgramEpsodeList";
import ProgramEpsodeGuest from "@/components/mainBoard/ProgramEpsodeGuest";
import * as programManage from "@/store/modules/programManage";
import { mapActions } from "vuex";

export default {
  components: { ProgramEpsodeList, ProgramEpsodeGuest },
  name: "ProgramEpsodeLayout",
  mounted() {
    this.getList();
  },
  methods: {
    ...mapActions({
      a_setEpsodeList: programManage.SET_DETAIL_EPISODE_LIST_DATA,
    }),
    async getList() {
      const params = {
        program_cid: this.$route.params.cid,
        page: 1
      };
      await this.a_setEpsodeList(params);
    },
  },
};
</script>

<style lang="scss">
.program-epsode-layout {
  background-color: #f9f9f9;
}
</style>