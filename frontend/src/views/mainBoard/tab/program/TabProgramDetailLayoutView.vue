<template>
  <v-row
    class="program-detail-view flex-wrap"
    no-gutters
    justify="space-between"
  >
    <v-row cols="12" class="justify-end mb-3" style="width: 100%" no-gutters>
      <v-btn depressed dark link to="/main/program" small>
        프로그램 목록으로 가기
      </v-btn>
    </v-row>
    <v-col cols="12">
      <v-col cols="12" class="pa-0 mb-3">
        <v-btn
          class="tab-btn"
          width="50%"
          height="50px"
          depressed
          tile
          v-for="link in links"
          :key="link.name"
          link
          :to="{
            name: link.name,
            params: {
              cid: $route.params.cid,
            },
          }"
          active-class="btn--active"
        >
          {{ link.title }}
        </v-btn>
      </v-col>
      <router-view />
    </v-col>
    <v-col cols="12">
      <ProgramEpsodeLayout />
    </v-col>
  </v-row>
</template>

<script>
import ProgramEpsodeLayout from "@/components/mainBoard/ProgramEpsodeLayout";

export default {
  components: { ProgramEpsodeLayout },
  name: "TabProgramDetailLayoutView",
  data() {
    return {
      toggleRouter: 0,
      links: [
        {
          name: "ProgramInfo",
          title: "기본정보",
        },
        {
          name: "ProgramTerm",
          title: "프로그램 약관",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.program-detail-view {
  .v-btn.tab-btn {
    .v-btn__content {
      font-size: 0.95rem;
      letter-spacing: -0.0005rem;
    }

    &.btn--active.v-btn--active.v-btn--router {
      background-color: #333333;
      color: #ffffff;
    }
  }
}
</style>