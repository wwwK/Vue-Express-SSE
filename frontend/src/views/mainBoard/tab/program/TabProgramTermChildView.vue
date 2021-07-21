<template>
  <v-col class="default-form">
    <Loading v-if="g_loading" />
    <v-row no-gutters justify="space-between" class="align-center mb-3">
      <h3>약관 {{ usingModify ? "수정" : "등록" }}</h3>
      <v-btn depressed dark link :to="{ name: 'ProgramTerm' }" small>
        약관 목록으로 가기
      </v-btn>
    </v-row>
    <v-form v-model="valid" ref="programTermForm" @submit.prevent="onSubmit">
      <v-list dense>
        <v-list-item class="flex-wrap pa-0 mb-3">
          <v-list-item-title class="mb-2 pl-1"> 약관명 </v-list-item-title>
          <v-text-field
            full-width
            type="text"
            v-model="title"
            label="약관명을 입력해주세요"
            required
            ref="title"
            outlined
            validate-on-blur
            :rules="[rules.required(title, '약관명을 입력해주세요')]"
          />
        </v-list-item>
        <v-list-item class="flex-wrap pa-0 mb-3">
          <v-list-item-title class="mb-2 pl-1">내용</v-list-item-title>
          <v-textarea
            type="text"
            v-model="content"
            label="내용을 입력해주세요"
            ref="content"
            outlined
            full-width
            validate-on-blur
            :rules="[rules.required(content, '내용을 입력해주세요')]"
          />
        </v-list-item>
        <v-list-item class="flex-wrap pa-0 mb-5">
          <v-list-item-title class="mb-2 pl-1">적용일</v-list-item-title>
          <v-menu
            v-model="datepickerMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="apply_regdate"
                label="적용일을 선택해주세요"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                validate-on-blur
                ref="apply_regdate"
                :rules="[
                  rules.required(apply_regdate, '적용일을 선택해주세요'),
                ]"
              />
            </template>
            <v-date-picker
              v-model="apply_regdate"
              @input="datepickerMenu = false"
              locale="ko"
              color="#bb2656"
            />
          </v-menu>
        </v-list-item>
        <v-btn block dark large depressed type="submit">
          {{ usingModify ? "수정" : "등록" }}
        </v-btn>
      </v-list>
    </v-form>
  </v-col>
</template>

<script>
import Loading from "@/components/common/Loading";
import { mapActions, mapGetters } from "vuex";
import * as programManage from "@/store/modules/programManage";
import { dateFilterShort } from "@/utils/dateFilter";

export default {
  components: { Loading },
  name: "TabProgramTermChildView",
  data() {
    return {
      valid: false,
      datepickerMenu: false,
      usingModify: null, // 디테일 페이지인지 아닌지 확인
      title: "",
      content: "",
      apply_regdate: null,
      rules: {
        required: (value, text) => !!value || text,
      },
    };
  },
  mounted() {
    // 수정 or 등록 페이지인지 확인
    this.checkParamsQuery();
  },
  computed: {
    ...mapGetters({
      g_loading: programManage.DETAIL_TERM_LOADING,
      g_detailData: programManage.DETAIL_TERM_DETAIL_DATA,
    }),
  },
  methods: {
    ...mapActions({
      a_addDetailTerm: programManage.ADD_DETAIL_TERM_DATA,
      a_putDetailTerm: programManage.PUT_DETAIL_TERM_DATA,
    }),
    // 수정 or 등록 페이지인지 확인
    checkParamsQuery() {
      if (this.$route.name === "ProgramTermModify") {
        this.usingModify = true;
        this.getVuexData();
      } else {
        this.usingModify = false;
        this.apply_regdate = new Date().toISOString().substr(0, 10);
      }
    },
    // vuex에 있는 detail 데이터를 input에 넣어준다.
    getVuexData() {
      if (!Object.keys(this.g_detailData).length) {
        return this.$router.push({ name: "ProgramTerm" });
      }
      Object.entries(this.g_detailData).map((obj) => {
        if (obj[0] !== "cid") {
          this[obj[0]] = obj[1];
        }
      });
      this.apply_regdate = dateFilterShort(this.g_detailData["apply_regdate"]);
    },
    async onSubmit() {
      if (this.$refs.programTermForm.validate()) {
        const { title, content, apply_regdate } = this;
        const params = {
          title,
          content,
          apply_regdate,
        };

        if (this.usingModify) {
          params["cid"] = this.g_detailData.cid;
          await this.a_putDetailTerm(params);
        } else {
          params["program_cid"] = this.$route.params.cid;
          await this.a_addDetailTerm(params);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>