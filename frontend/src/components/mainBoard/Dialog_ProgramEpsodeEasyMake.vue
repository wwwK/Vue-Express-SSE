<template>
  <v-dialog
    :value="g_dialogOpen"
    width="500"
    @click:outside="onClose"
    content-class="g2-dialog"
  >
    <Loading v-if="g_loading" />
    <v-card flat>
      <v-card-title dark class="text-h6 white--text grey darken-3">
        회차 간편 생성
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <v-col class="default-form">
          <v-form v-model="valid" ref="easyForm" @submit.prevent="onSubmit">
            <v-list dense>
              <v-list-item class="flex-wrap pa-0 mb-5">
                <v-list-item-title class="mb-2 pl-1 wd-100">
                  반복주기 (주)
                </v-list-item-title>
                <v-text-field
                  full-width
                  type="number"
                  v-model="week"
                  required
                  ref="week"
                  outlined
                  validate-on-blur
                  :rules="[
                    rules.required(week, '반복 주기를 입력해주세요'),
                    rules.isZero,
                  ]"
                />
              </v-list-item>
              <v-list-item class="flex-wrap pa-0 mb-5">
                <v-list-item-title class="mb-2 pl-1 wd-100">
                  반복 요일
                </v-list-item-title>
                <v-chip-group
                  v-model="day_of_weeks"
                  multiple
                  active-class="blue--text text--accent-4"
                  mandatory
                >
                  <v-chip
                    v-for="day in days"
                    :key="day.title"
                    :value="day.value"
                  >
                    {{ day.title }}
                  </v-chip>
                </v-chip-group>           
              </v-list-item>
              <v-list-item class="flex-wrap pa-0 mb-5">
                <v-list-item-title class="mb-2 pl-1 wd-100">
                  업로드 예정일 (녹화 후 업로드일 간격)
                </v-list-item-title>
                <v-text-field
                  full-width
                  type="number"
                  v-model="upload_delay"
                  required
                  ref="upload_delay"
                  outlined
                  hide-details
                />
              </v-list-item>
              
              
              
            </v-list>
          </v-form>
        </v-col>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="onClose">취소</v-btn>
        <v-btn dark depressed @click="onSubmit">생성</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Loading from "@/components/common/Loading";
import { mapActions, mapGetters, mapMutations } from "vuex";
import * as programManage from "@/store/modules/programManage";

export default {
  components: { Loading },
  name: "Dialog_ProgramEpsodeEasyMake",
  data() {
    return {
      valid: false,
      week: 1,
      day_of_weeks: [],
      upload_delay: 1,
      days: [
        { title: '일', value: 0},
        { title: '월', value: 1},
        { title: '화', value: 2},
        { title: '수', value: 3},
        { title: '목', value: 4},
        { title: '금', value: 5},
        { title: '토', value: 6}
      ],
      rules: {
        required: (value, text) => !!value || text,
        isZero: (value) => value >= 1 || "반복주기는 최소 1주입니다."
      }
    };
  },

  computed: {
    ...mapGetters({
      g_loading: programManage.EPISODE_EASY_MAKE_LOADING,
      g_dialogData: programManage.EPISODE_EASY_MAKE_DIALOG,
      g_dialogOpen: programManage.EPISODE_EASY_MAKE_DIALOG_IS_OPEN,
    }),
    storeWatch_dialog: function () {
      return this.g_dialogOpen;
    },
  },
  methods: {
    ...mapMutations({
      m_setDialog: programManage.MU_SET_EPISODE_EASY_MAKE_DIALOG,
    }),
    ...mapActions({
      a_addEpiEasyMake: programManage.ADD_EPISODE_EASY_MAKE_DATA
    }),
    // 모달 종료
    onClose() {
      this.valid = false;
      this.week = 1;
      this.upload_delay = 1;
      this.day_of_weeks = [];

      this.m_setDialog({
        isOpen: false,
        data: {},
      });
    },
    async onSubmit() {
      if (this.$refs.easyForm.validate()) {
        const { week, upload_delay, day_of_weeks } = this;
        const { params: { cid } } = this.$route;
        const data = {
          cid,
          week,
          upload_delay,
          day_of_weeks
        }

        await this.a_addEpiEasyMake(data);
        
        this.onClose();
      }
    },
    // 옵션 리스트 추가
    onRegOption() {
      this.etc_list.push(this.etc_input);
      this.etc_input = "";
    },
    // 옵션 리스트 삭제
    onEtcRemove(idx) {
      this.etc_list.splice(idx, 1);
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/dialog.scss";
</style>