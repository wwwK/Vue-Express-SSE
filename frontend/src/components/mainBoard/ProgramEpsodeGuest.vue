<template>
  <v-col cols="12" md="6" class="table-view">
    <Loading v-if="g_loading" />
    <v-row no-gutters justify="space-between" class="align-center mb-3">
      <h4>출연정보</h4>
      <v-btn depressed outlined small @click="onClickRow"> 추가 </v-btn>
    </v-row>
    <v-divider />
    <v-data-table
      :headers="getHeaders"
      :items="g_guestData"
      mobile-breakpoint="0"
      @dblclick:row="onClickRow"
      hide-default-footer
    >
      <!-- NOData -->
      <template v-slot:no-data> 출연정보가 없습니다. </template>
      <template v-slot:item.detail="props">
        <v-tooltip bottom color="#333333">
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              color="#333333"
              v-on="on"
              @click="onClickRow($event, props)"
            >
              <v-icon size="20"> mdi-page-next-outline </v-icon>
            </v-btn>
          </template>
          <span>클릭하시면 디테일 모달이 뜹니다.</span>
        </v-tooltip>
        <v-tooltip bottom color="#333333">
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              color="#333333"
              v-on="on"
              @click="onClickDelete($event, props)"
            >
              <v-icon size="20"> mdi-trash-can-outline </v-icon>
            </v-btn>
          </template>
          <span>클릭하시면 삭제됩니다.</span>
        </v-tooltip>
      </template>
      <!-- 등록일 -->
      <template v-slot:item.reg_date="props">
        {{ props.value | newDate }}
      </template>
    </v-data-table>
    <DialogProgramEpsodeGuest />
  </v-col>
</template>

<script>
import Loading from "@/components/common/Loading";
import { mapActions, mapGetters, mapMutations } from "vuex";
import * as programManage from "@/store/modules/programManage";
import { dateFilterAll } from "@/utils/dateFilter";
import DialogProgramEpsodeGuest from "@/components/mainBoard/Dialog_ProgramEpsodeGuest";

export default {
  components: { Loading, DialogProgramEpsodeGuest },
  name: "ProgramEpsodeGuest",
  data() {
    return {
      defaultHeaders: [
        {
          text: "이름",
          value: "name",
          width: "80px",
        },
        { text: "등록일", value: "reg_date" },
      ],
    };
  },
  filters: {
    newDate: function (value) {
      return dateFilterAll(value);
    },
  },
  computed: {
    ...mapGetters({
      g_loading: programManage.DETAIL_EPISODE_GUEST_LOADING,
      g_guestData: programManage.DETAIL_EPISODE_GUEST_DATA,
      g_epsodeListSelectedCell: programManage.DETAIL_EPISODE_SELECTED_CELL,
    }),
    getHeaders() {
      return [
        {
          text: "상세보기",
          fixed: true,
          value: "detail",
          width: "100px",
          sortable: false,
          align: "center",
        },
      ].concat(this.defaultHeaders);
    },
  },
  methods: {
    ...mapMutations({
      m_setDialog: programManage.MU_SET_DETAIL_EPISODE_GUEST_DIALOG,
      m_setDialogData: programManage.MU_SET_DETAIL_EPISODE_GUEST_DIALOG_DATA,
    }),
    ...mapActions({
      a_deleteGuestData: programManage.DELETE_DETAIL_EPISODE_SELECTED_CELL,
    }),
    // 셀 더블 클릭
    onClickRow(e, cell) {
      if (Object.keys(this.g_epsodeListSelectedCell).length) {
        if (cell) {
          // 수정 다이어로그
          this.m_setDialog({
            isOpen: true,
            isModify: true,
          });
          this.m_setDialogData({
            cid: cell.item.cid,
          });
        } else {
          // 추가 다이어로그
          this.m_setDialog({
            isOpen: true,
            isModify: false,
          });
        }
      } else {
        alert("회차를 선택해주세요");
      }
    },
    async onClickDelete(e, cell) {
      if (confirm("정말 삭제하시겠습니까?")) {
        const {
          item: { cid },
        } = cell;
        await this.a_deleteGuestData({
          program_cid: this.$route.params.cid,
          cid,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>