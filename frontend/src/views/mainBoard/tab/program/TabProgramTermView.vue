<template>
  <v-col class="table-view">
    <Loading v-if="g_loading" />
    <v-row no-gutters class="mb-5 align-center" justify="space-between">
      <v-btn link :to="{ name: 'ProgramTermAdd' }" depressed dark>등록</v-btn>
      <div class="total-info">
        <span>
          약관 목록 <b>{{ g_programTotalCount }}</b>
          건
        </span>
      </div>
    </v-row>
    <v-data-table
      :headers="getHeaders"
      :items="g_programData"
      mobile-breakpoint="0"
      @dblclick:row="onClickRow"
      hide-default-footer
    >
      <!-- NOData -->
      <template v-slot:no-data>
        약관 리스트가 없습니다.
      </template>
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
          <span>클릭하시면 수정 페이지로 넘어갑니다.</span>
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
      <template v-slot:item.apply_regdate="props">
        {{ props.value | newDate }}
      </template>
      <template v-slot:footer="props">
        <v-pagination
          v-model="page"
          :length="getNavigationTotal"
          class="mt-2 pagination"
          color="#333333"
          @input="getTermList"
        />
      </template>
    </v-data-table>
  </v-col>
</template>

<script>
import Loading from "@/components/common/Loading";
import { mapActions, mapGetters, mapMutations } from "vuex";
import * as programManage from "@/store/modules/programManage";
import { dateFilterShort } from "@/utils/dateFilter";

export default {
  components: { Loading },
  name: "TabProgramTermView",
  data() {
    return {
      page: 1,
      defaultHeaders: [
        {
          text: "약관명",
          value: "title",
          width: "100px",
        },
        {
          text: "내용",
          value: "content",
          width: "100px",
        },
        { text: "적용일", value: "apply_regdate" },
      ],
    };
  },
  filters: {
    newDate: function (value) {
      return dateFilterShort(value);
    },
  },
  mounted() {
    this.getTermList();
  },
  computed: {
    ...mapGetters({
      g_programTotalCount: programManage.DETAIL_TERM_TOTAL_COUNT,
      g_loading: programManage.DETAIL_TERM_LOADING,
      g_programData: programManage.DETAIL_TERM_DATA,
      g_programPage: programManage.DETAIL_TERM_PAGE,
    }),
    getHeaders() {
      return [
        {
          text: "수정 및 삭제",
          value: "detail",
          width: "100px",
          sortable: false,
          align: "center",
        },
      ].concat(this.defaultHeaders);
    },
    getNavigationTotal() {
      if (this.g_programTotalCount) {
        return Math.ceil(this.g_programTotalCount / 10);
      }
      return 0;
    },
  },
  methods: {
    ...mapActions({
      a_setData: programManage.SET_DETAIL_TERM_DATA,
      a_deleteData: programManage.DELETE_DETAIL_TERM_DATA,
    }),
    ...mapMutations({
      m_setDetailData: programManage.MU_SET_DETAIL_TERM_DETAIL_DATA,
    }),
    // 셀 클릭
    onClickRow(e, cell) {
      this.m_setDetailData(cell.item);
      this.$router.push({
        name: "ProgramTermModify",
      });
    },
    async onClickDelete(e, cell) {
      if (confirm("정말 삭제하시겠습니까?")) {
        await this.a_deleteData({
          cid: cell.item.cid,
          program_cid: this.$route.params.cid,
        });
      }
    },
    // 약관 조회
    async getTermList(page = 1) {
      const params = {
        page,
        cid: this.$route.params.cid,
      };
      await this.a_setData(params);
    },
  },
};
</script>

<style lang="scss">
</style>