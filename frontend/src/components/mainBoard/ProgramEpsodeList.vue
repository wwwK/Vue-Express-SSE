<template>
  <v-col cols="12" md="6" class="table-view">
    <Loading v-if="g_loading" />
    <v-row no-gutters justify="space-between" class="align-center mb-3">
      <h4>회차 리스트</h4>
      <div>
        <v-btn depressed outlined small style="margin-right: 4px;" @click="onDialogEasy"> 간편 생성 </v-btn>
        <v-btn depressed outlined small @click="onDialog"> 추가 </v-btn>
      </div>
    </v-row>
    <v-divider />
    <v-data-table
      v-model="rowSelected"
      item-key="cid"
      :headers="getHeaders"
      :items="g_programData"
      mobile-breakpoint="0"
      @click:row="onClickRow"
      hide-default-footer
    >
      <!-- NOData -->
      <template v-slot:no-data> 회차 리스트가 없습니다. </template>
      <template v-slot:item.detail="props">
        <v-row v-if="!props.item.is_cancel">
          <v-tooltip bottom color="#333333">
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              color="#333333"
              v-on="on"
              @click.stop="onDetailRow($event, props)"
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
        </v-row>
      </template>
      <template v-slot:footer="props">
          <v-pagination
            v-model="page"
            :length="getNavigationTotal"
            class="mt-2 pagination"
            color="#333333"
            @input="getListData"
          />
        </template>
    </v-data-table>
    <DialogProgramEpsodeList />
    <DialogProgramEpsodeEasyMake />
  </v-col>
</template>

<script>
import Loading from "@/components/common/Loading";
import { mapActions, mapGetters, mapMutations } from "vuex";
import * as programManage from "@/store/modules/programManage";
import { dateFilterShort } from "@/utils/dateFilter";
import DialogProgramEpsodeList from "@/components/mainBoard/Dialog_ProgramEpsodeList";
import DialogProgramEpsodeEasyMake from "@/components/mainBoard/Dialog_ProgramEpsodeEasyMake";

export default {
  components: { Loading, DialogProgramEpsodeList, DialogProgramEpsodeEasyMake },
  name: "ProgramEpsodeList",
  data() {
    return {
      rowSelected: [],
      page: 1,
      defaultHeaders: [
        {
          text: "회차",
          value: "ep",
          width: "80px",
        },
        {
          text: "녹화일",
          value: "broadcast_date",
          width: "100px",
        },
        {
          text: "업로드일",
          value: "upload_date",
        },
        {
          text: "취소여부",
          value: "is_cancel",
        }
      ],
    };
  },
  mounted() {
    this.m_setSelectedRow();
    this.m_setDialog({
      isOpen: false,
      data: {},
    });
    if (this.program_list_Page.start) {
      const getPage = this.program_list_Page.start / 10 + 1;
      this.page = getPage;
      this.getListData(getPage);
    } else {
      this.getListData();
    }
  },
  filters: {
    newDate: function (value) {
      return dateFilterShort(value);
    },
  },
  computed: {
    ...mapGetters({
      g_loading: programManage.DETAIL_EPISODE_LIST_LOADING,
      g_programEpiTotalCount: programManage.EPISODE_TOTAL_COUNT,
      g_programData: programManage.DETAIL_EPISODE_LIST_DATA,
    }),
    getHeaders() {
      return [
        {
          text: "상세보기",
          value: "detail",
          width: "75px",
          sortable: false,
          align: "center",
        },
      ].concat(this.defaultHeaders);
    },
    getNavigationTotal: function () {
      const totalCount = this.g_programEpiTotalCount;
      if (totalCount) {
        return Math.ceil(totalCount / 10);
      }
      return 0;
    },
  },
  methods: {
    ...mapMutations({
      program_list_Page: programManage.LIST_PAGE,
    }),
    ...mapMutations({
      m_setSelectedRow: programManage.MU_SET_DETAIL_EPISODE_SELECTED_CELL,
      m_setDialog: programManage.MU_SET_DETAIL_EPISODE_LIST_DIALOG,
      m_setDialogEasy: programManage.MU_SET_EPISODE_EASY_MAKE_DIALOG,
    }),
    ...mapActions({
      a_setSelectedRow: programManage.SET_DETAIL_EPISODE_SELECTED_CELL,
      a_getDataDetail: programManage.GET_DETAIL_EPISODE_LIST_DATA_DETAIL,      
      a_deleteEpisode: programManage.DELETE_EPISODE_SELECTED_CELL,
      a_programEpisodeList: programManage.SET_DETAIL_EPISODE_LIST_DATA
    }),
    // 셀 클릭
   
   async onClickRow(e, cell) {
      const { item } = cell;
      this.rowSelected = [item];
      await this.a_setSelectedRow({
        program_cid: this.$route.params.cid,
        cell: item
      });
    },
    // 수정 dialog 띄우기
    async onDetailRow(e, cell) {
      const {
        item: { cid },
      } = cell;
      await this.a_getDataDetail({ cid });
    },
    // dialog 오픈
    onDialog() {
      this.m_setDialog({
        isOpen: true,
        data: {},
      });
    },

    onDialogEasy() {
      this.m_setDialogEasy({
        isOpen: true,
        data: {},
      });
    },
    async onClickDelete(e, cell) {
      if (confirm("정말 삭제하시겠습니까?")) {
        const {
          item: { cid },
        } = cell;
        await this.a_deleteEpisode({
          program_cid: this.$route.params.cid,
          cid,
        });
      }
    },
    async getListData(page = 1) {
      await this.a_programEpisodeList({ 
        page,
        program_cid: this.$route.params.cid,
      });
    },
  },
};
</script>

<style lang="scss">
</style>