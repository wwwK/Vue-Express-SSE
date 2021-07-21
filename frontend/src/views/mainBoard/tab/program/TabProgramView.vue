<template>
  <v-col class="table-view">
    <Loading v-if="g_loading" />
    <v-row no-gutters class="mb-5 align-center mb-5">
      <v-form
        @submit.prevent="onSearch"
        class="justify-space-between d-flex"
        style="width: 100%"
      >
        <v-text-field
          v-model="keyword"
          append-icon="mdi-magnify"
          hide-details
          label="프로그램명을 입력하세요"
          class="pa-0 ma-0 mr-md-10 mr-2"
          style="font-size: 15px"
          dense
          height="30"
          single-line
          flat
        />
        <v-btn depressed dark type="submit">검색</v-btn>
      </v-form>
    </v-row>
    <v-row no-gutters class="mb-5 align-center" justify="space-between">
      <v-btn link to="/main/program/add" depressed dark>등록</v-btn>
      <div class="total-info">
        <span>
          프로그램 목록 <b>{{ g_programTotalCount }}</b>
          건
        </span>
      </div>
    </v-row>
    <div style="position:relative">
      <ScrollAlert />
      <v-data-table
        :headers="getHeaders"
        :items="g_programData"
        mobile-breakpoint="0"
        @dblclick:row="onClickRow"
        hide-default-footer
      >
        <!-- NOData -->
        <template v-slot:no-data> 프로그램 리스트가 없습니다. </template>
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
            <span>클릭하시면 디테일 페이지로 넘어갑니다.</span>
          </v-tooltip>
        </template>
        <template v-slot:item.reg_date="props">
          {{ props.value | newDate }}
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
    </div>
  </v-col>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import * as programManage from "@/store/modules/programManage";
import { dateFilterAll } from "@/utils/dateFilter";
import Loading from "@/components/common/Loading";
import ScrollAlert from "@/components/common/ScrollAlert";

export default {
  components: { Loading, ScrollAlert },
  name: "TabProgramView",
  data() {
    return {
      keyword: "",
      page: 1,
      defaultHeaders: [
        {
          text: "프로그램명",
          value: "name",
          width: "150px",
        },
        {
          text: "비고",
          value: "desc",
          width: "100px",
        },
        { text: "등록일시", value: "reg_date" },
      ],
    };
  },
  filters: {
    newDate: function (value) {
      return dateFilterAll(value);
    },
  },
  mounted() {
    // 이전페이지로 돌아갈때 원래 페이지로 돌아가게하기
    if (this.g_programPage.start) {
      const getPage = this.g_programPage.start / 10 + 1;
      this.page = getPage;
      this.getListData(getPage);
    } else {
      this.getListData();
    }
  },
  computed: {
    ...mapGetters({
      g_loading: programManage.LOADING,
      g_programData: programManage.PROGRAM_DATA,
      g_programTotalCount: programManage.TOTAL_COUNT,
      g_programPage: programManage.PAGE,
    }),
    getNavigationTotal: function () {
      if (this.g_programTotalCount) {
        return Math.ceil(this.g_programTotalCount / 10);
      }
      return 0;
    },
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
  },
  methods: {
    ...mapActions({
      a_setProgramData: programManage.SET_PROGRAM_DATA,
    }),
    // 셀 클릭
    onClickRow(e, cell) {
      const {
        item: { cid },
      } = cell;
      this.$router.push({
        params: {
          cid,
        },
        name: "ProgramDetail",
      });
    },
    // 프로그램 리스트를 조회한다.
    async getListData(page = 1, keyword = "") {
      await this.a_setProgramData({ page, keyword });
    },
    // 검색 기능
    onSearch() {
      this.getListData(this.page, this.keyword);
    },
  },
};
</script>

<style lang="scss" >
</style>