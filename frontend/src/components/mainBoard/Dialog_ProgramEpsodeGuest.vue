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
        출연정보 {{ title }}
      </v-card-title>
      <v-divider />

      <v-card-text>
        <v-col class="default-form">
          <v-form v-model="valid" ref="epsodeForm" @submit.prevent="onSubmit">
            <v-list dense>
              <h4 class="pb-1 pl-1">출연 기본정보</h4>
              <v-list-item class="flex-wrap pa-0 mb-5">
                <v-list-item-title class="mb-2 pl-1 wd-100">
                  회차
                </v-list-item-title>
                <v-text-field
                  full-width
                  type="number"
                  v-model="storeWatch_selectCellEp"
                  required
                  ref="ep"
                  outlined
                  hide-details
                  readonly
                />
              </v-list-item>
              <v-list-item class="flex-wrap pa-0 mb-1">
                <v-list-item-title class="mb-2 pl-1 wd-100">
                  출연자
                </v-list-item-title>
                <v-select
                  ref="cast_member_cid"
                  v-model="cast_member_cid"
                  :items="g_castData"
                  full-width
                  label="출연자를 선택하세요"
                  :rules="[
                    rules.required(cast_member_cid, '출연자를 선택해주세요'),
                  ]"
                  outlined
                  item-value="cid"
                  item-text="name"
                  return-object
                  validate-on-blur
                  :readonly="!!this.g_dialog.data.cid"
                >
                  <v-text-field
                    full-width
                    type="text"
                    v-model="searchCast"
                    solo
                    hide-details
                    label="출연진 검색"
                  />

                  <template v-slot:item="{ item }">
                    {{ item.name }}
                  </template>
                  <template v-slot:no-data>
                    출연자 리스트가 없습니다.
                  </template>
                </v-select>
              </v-list-item>
              <v-list-item class="flex-wrap pa-0 mb-4">
                <v-list-item-title class="mb-2 pl-1">비고</v-list-item-title>
                <v-textarea
                  type="text"
                  v-model="bigo"
                  label="비고를 입력해주세요"
                  ref="bigo"
                  outlined
                  full-width
                  hide-details
                />
              </v-list-item>
              <v-divider class="mb-4" />
              <h4 class="pb-2 pl-1">회차 기본정보</h4>
              <v-col v-if="!ep_info_list.length" class="grey lighten-4">
                기본정보가 없습니다.
              </v-col>
              <v-list-item
                v-for="epInfo in ep_info_list"
                :key="epInfo.cid"
                class="flex-wrap pa-0 mb-5"
              >
                <v-col
                  md="3"
                  cols="12"
                  class="pa-0 pr-1"
                  :class="[
                    $vuetify.breakpoint.xs && 'pb-1',
                    $vuetify.breakpoint.sm && 'pr-1',
                  ]"
                >
                  <v-list-item-title class="pl-1 wh-normal">
                    {{ g_dialog.isModify ? epInfo.key : epInfo.title }}
                  </v-list-item-title>
                </v-col>
                <v-col md="9" cols="12" class="pa-0">
                  <v-text-field
                    v-model="epInfo.value"
                    type="text"
                    required
                    outlined
                    hide-details
                  />
                </v-col>
              </v-list-item>
              <v-divider class="mb-4" />
              <h4 class="pb-2 pl-1">프로그램 약관</h4>
              <v-col v-if="!allow_list.length" class="grey lighten-4">
                약관정보가 없습니다.
              </v-col>
              <v-list-item
                v-for="allowInfo in allow_list"
                :key="allowInfo.cid"
                class="flex-wrap pa-0"
              >
                <v-col
                  md="3"
                  cols="12"
                  class="pa-0"
                  :class="[
                    $vuetify.breakpoint.xs && 'pb-1',
                    $vuetify.breakpoint.md && 'pr-1',
                  ]"
                >
                  <v-list-item-title class="pl-1 wh-normal">
                    {{ g_dialog.isModify ? allowInfo.key : allowInfo.title }}
                  </v-list-item-title>
                </v-col>
                <v-col md="9" cols="12" class="pa-0">
                  <v-radio-group
                    v-model="allowInfo.value"
                    row
                    class="ma-0 pa-0"
                    hide-details
                  >
                    <v-radio label="동의" value="Y" />
                    <v-radio label="미동의" value="N" />
                  </v-radio-group>
                </v-col>
              </v-list-item>
            </v-list>
          </v-form>
        </v-col>
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />
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
import * as castManage from "@/store/modules/castManage";

export default {
  components: { Loading },
  name: "Dialog_ProgramEpsodeGuest",
  data() {
    return {
      valid: false,
      cast_member_cid: {}, // 출연자 cid
      bigo: "", // 비고
      ep_info_list: [], // 회차 기본정보
      allow_list: [], // 프로그램 약관 정보
      rules: {
        required: (value, text) => !!value || text,
      },
      searchCast: "", // 출연진 검색
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
      g_loading: programManage.DETAIL_EPISODE_GUEST_LOADING,
      g_epsodeSelectCell: programManage.DETAIL_EPISODE_SELECTED_CELL,
      g_dialog: programManage.DETAIL_EPISODE_GUEST_DIALOG,
      g_dialogOpen: programManage.DETAIL_EPISODE_GUEST_DIALOG_IS_OPEN,
      g_castData: castManage.CAST_DATA,
      g_termData: programManage.DETAIL_TERM_DATA,
    }),
    title() {
      return this.g_dialog.isModify ? "수정" : "추가";
    },
    storeWatch_dialog: function () {
      return this.g_dialogOpen;
    },
    storeWatch_selectCellEp: function () {
      return this.g_epsodeSelectCell.ep;
    },
  },
  methods: {
    ...mapGetters({
      g_epsodeListSelectedCell: programManage.DETAIL_EPISODE_SELECTED_CELL,
    }),
    ...mapMutations({
      m_setDialog: programManage.MU_SET_DETAIL_EPISODE_GUEST_DIALOG,
      m_setDialogData: programManage.MU_SET_DETAIL_EPISODE_GUEST_DIALOG_DATA,
      m_setCastData: castManage.MU_SET_CAST_DATA,
    }),
    ...mapActions({
      a_getCastInfo: programManage.GET_DETAIL_EPISODE_GUEST_CAST_INFO,
      a_setCastData: castManage.SET_CAST_DATA_ALL,
      a_getGuestInfo: programManage.GET_DETAIL_EPISODE_GUEST_ALREADY_CAST_INFO,
      a_setTermData: programManage.SET_DETAIL_TERM_DATA_ALL,
      a_addEpisodeGuest: programManage.ADD_DETAIL_EPISODE_GUEST_CAST,
      a_putEpisodeGuest: programManage.PUT_DETAIL_EPISODE_GUEST_CAST,
    }),
    // 수정 or 추가 다이어로그 체크
    isModifyDialog() {
      // 출연자정보 데이터 초기화
      this.m_setCastData({
        data: [],
      });
      // 출연자 리스트 가져오기
      this.getCastList();
      if (this.g_dialog.isModify) {
        this.getGuestInfo();
      } else {
        this.getSelectCellInfo();
      }
    },
    // 다이어로그 종료
    onClose() {
      // 다이어로그 데이터 초기화
      this.m_setDialog({
        isOpen: false,
        isModify: false,
      });
      this.m_setDialogData({});
      this.cast_member_cid = {};
      this.bigo = "";
      this.ep_info_list = [];
      this.allow_list = [];
    },
    // 출연자 리스트 가져오기
    async getCastList() {
      // 이미 출연자 정보가 있으면 조회하지 않는다.
      if (!this.g_castData.length) {
        await this.a_setCastData();
      }
    },
    // 추가 시 셀렉트 셀에 참조된 회차 기본정보, 프로그램 약관정보 가져오기
    async getSelectCellInfo() {
      const respObj = await this.a_getCastInfo({
        program_cid: this.$route.params.cid,
        ep: this.storeWatch_selectCellEp,
      });
      const epInfoNewList = respObj.data.data.map((list) => {
        list["value"] = "";
        return list;
      });
      this.ep_info_list = epInfoNewList;

      await this.a_setTermData({
        cid: this.$route.params.cid,
      });
      const arrowNewList = this.g_termData.map((list) => {
        list["value"] = "N";
        return list;
      });
      this.allow_list = arrowNewList;
    },
    // 수정 시 출연진 정보 가져오기.
    async getGuestInfo() {
      let ddd = await this.a_getGuestInfo();

      for (const key in this.g_dialog.data) {
        if (key === "cast_member_cid") {
          this[key] = { cid: this.g_dialog.data[key] };
          return;
        }
        this[key] = this.g_dialog.data[key];
      }
    },
    async onSubmit() {
      const { cast_member_cid, bigo, ep_info_list, allow_list } = this;

      const newAllowList = allow_list.map((list) => {
        return {
          key: String(list.cid),
          value: list.value,
        };
      });

      const data = {
        cast_member_cid: cast_member_cid.cid,
        program_epi_cid: this.g_epsodeSelectCell.cid,
        program_cid: Number(this.$route.params.cid),
        bigo,
        allow_list: newAllowList,
      };

      if (this.g_dialog.data.cid) {
        const newEpInfoList = ep_info_list.map((list) => {
          return {
            cid: list.cid,
            key: String(list.program_epi_info_cid),
            value: list.value,
          };
        });
        data["ep_info_list"] = newEpInfoList;
        data["cid"] = this.g_dialog.data.cid;
        await this.a_putEpisodeGuest(data);
      } else {
        const newEpInfoList = ep_info_list.map((list) => {
          return {
            key: list.cid,
            value: list.value,
          };
        });
        data["ep_info_list"] = newEpInfoList;
        await this.a_addEpisodeGuest(data);
      }

      this.onClose();
    },
  },
};
</script>
