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
        회차 {{ title }}
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <v-col class="default-form">
          <v-form v-model="valid" ref="epsodeForm" @submit.prevent="onSubmit">
            <v-list dense>
              <v-list-item class="flex-wrap pa-0 mb-5">
                <v-list-item-title class="pl-1 wd-100">
                  회차
                </v-list-item-title>
                <v-list-item-subtitle class="mb-2 pl-1 wd-100 wh-normal">
                  미입력시 최신회차 생성
                </v-list-item-subtitle>
                <v-text-field
                  full-width
                  type="number"
                  v-model="ep"
                  label="미입력시 최신회차 생성"
                  required
                  ref="ep"
                  outlined
                  hide-details
                />
              </v-list-item>
              <v-list-item class="flex-wrap pa-0 mb-3">
                <v-list-item-title class="mb-2 pl-1">녹화일</v-list-item-title>
                <v-menu
                  v-model="datepickerMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                  :nudge-right="40"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      class="pa-0 ma-0"
                      v-model="broadcast_date"
                      label="녹화일을 선택해주세요"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      validate-on-blur
                      ref="broadcast_date"
                      :rules="[
                        rules.required(broadcast_date, '녹화일을 선택해주세요'),
                      ]"
                    />
                  </template>
                  <v-date-picker
                    v-model="broadcast_date"
                    @input="datepickerMenu = false"
                    no-title
                    locale="ko"
                    color="#bb2656"
                  />
                </v-menu>
              </v-list-item>
              <v-list-item class="flex-wrap pa-0 mb-3">
                <v-list-item-title class="mb-2 pl-1">업로드일</v-list-item-title>
                <v-menu
                  v-model="datepickerMenu2"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                  :nudge-right="40"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      class="pa-0 ma-0"
                      v-model="upload_date"
                      label="업로드일을 선택해주세요"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      validate-on-blur
                      ref="upload_date"
                      :rules="[
                        rules.required(upload_date, '업로드일을 선택해주세요'),
                      ]"
                    />
                  </template>
                  <v-date-picker
                    v-model="upload_date"
                    @input="datepickerMenu2 = false"
                    no-title
                    locale="ko"
                    color="#bb2656"
                  />
                </v-menu>
              </v-list-item>
              <v-list-item class="flex-wrap pa-0">
                <v-list-item-title class="pl-1 wd-100">
                  회차 옵션
                </v-list-item-title>
                <v-list-item-subtitle class="mb-2 pl-1 wd-100 wh-normal">
                  해당 회차에 대한 기본 옵션들을 넣습니다. 예)"출연료", "교통비"
                </v-list-item-subtitle>

                <v-chip-group class="wd-100" :center-active="true" column>
                  <v-chip
                    v-for="(options, index) in etc_list"
                    close
                    label
                    :ripple="false"
                    :key="options"
                    color="orange"
                    class="mr-1"
                    dark
                    outlined
                    small
                    @click:close="onEtcRemove(index)"
                  >
                    {{ options }}
                  </v-chip>
                </v-chip-group>
                <v-row no-gutters v-if="isAddOption" class="mb-2">
                  <v-text-field
                    full-width
                    type="text"
                    v-model="etc_input"
                    label="옵션 하나를 입력해주세요 예)'출연료','교통비'"
                    class="mr-3"
                    required
                    outlined
                    hide-details
                    @keyup.enter="onRegOption"
                  />
                  <v-btn dark depressed height="45px" @click="onRegOption">
                    옵션등록
                  </v-btn>
                </v-row>
                <v-btn
                  @click="
                    () =>
                      isAddOption ? (isAddOption = false) : (isAddOption = true)
                  "
                  block
                  outlined
                  depressed
                >
                  옵션리스트 {{ isAddOption ? "닫기" : "추가" }}
                </v-btn>
              </v-list-item>
            </v-list>
          </v-form>
        </v-col>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="onClose">취소</v-btn>
        <v-btn dark depressed @click="onSubmit">{{ title }}</v-btn>
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
  name: "Dialog_ProgramEpsodeList",
  data() {
    return {
      valid: false,
      datepickerMenu: false,
      datepickerMenu2: false,
      cid: null,
      ep: null,
      broadcast_date: null,
      upload_date: null,
      etc_list: [],
      rules: {
        required: (value, text) => !!value || text,
      },
      etc_input: "",
      isAddOption: false,
    };
  },
  watch: {
    storeWatch_dialog(isOpen) {
      if (isOpen) {
        this.isModifyDialog();
      }
    },
  },
  computed: {
    ...mapGetters({
      g_loading: programManage.DETAIL_EPISODE_LIST_LOADING,
      g_dialogData: programManage.DETAIL_EPISODE_LIST_DIALOG,
      g_dialogOpen: programManage.DETAIL_EPISODE_LIST_DIALOG_IS_OPEN,
    }),
    title() {
      return !this.g_dialogData.isModify ? "추가" : "수정";
    },
    storeWatch_dialog: function () {
      return this.g_dialogOpen;
    },
  },
  methods: {
    ...mapMutations({
      m_setDialog: programManage.MU_SET_DETAIL_EPISODE_LIST_DIALOG,
    }),
    ...mapActions({
      a_addListDetailData: programManage.ADD_DETAIL_EPISODE_LIST_DATA,
      a_putListDetailData: programManage.PUT_DETAIL_EPISODE_LIST_DATA,
    }),
    // 수정 or 추가 다이어로그 체크
    isModifyDialog() {
      if (this.g_dialogData.isModify) {
        const gData = this.g_dialogData.data;

        for (const info of gData.program_epi_infos) {
          this.etc_list.push(info.key);
        }

        this.ep = gData.ep;
        this.cid = gData.cid;
        this.broadcast_date = gData.broadcast_date.substr(0, 10);
        this.upload_date = gData.upload_date.substr(0, 10);
      } else {
        this.broadcast_date = new Date().toISOString().substr(0, 10);
      }
    },
    // 모달 종료
    onClose() {
      this.valid = false;
      this.datepickerMenu = false;
      this.datepickerMenu2 = false;
      this.cid = null;
      this.ep = null;
      this.broadcast_date = new Date().toISOString().substr(0, 10);
      this.upload_date = null;
      this.etc_list = [];
      this.etc_input = "";
      this.isAddOption = false;

      this.m_setDialog({
        isOpen: false,
        data: {},
      });
    },
    async onSubmit() {
      if (this.$refs.epsodeForm.validate()) {
        const { ep, broadcast_date, etc_list, upload_date, cid } = this;
        const { params: { cid: program_cid } } = this.$route;
        const data = {
          ep,
          broadcast_date,
          etc_list,
          upload_date,
          program_cid,
        }

        if (this.g_dialogData.isModify) {
          await this.a_putListDetailData({cid, ...data});
        } else {
          await this.a_addListDetailData(data);
        }
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