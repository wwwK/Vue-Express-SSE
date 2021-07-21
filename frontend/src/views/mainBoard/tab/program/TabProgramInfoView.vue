<template>
  <v-col class="default-form">
    <Loading v-if="g_loading" />
    <v-row no-gutters justify="space-between" class="align-center mb-3">
      <h3>프로그램 정보</h3>
    </v-row>
    <v-form v-model="valid" ref="programForm" @submit.prevent="onSubmit">
      <v-list dense>
        <v-list-item class="flex-wrap pa-0 mb-3">
          <v-list-item-title class="mb-2 pl-1">그룹명</v-list-item-title>
          <v-select
            ref="group_cid"
            v-model="group_cid"
            :items="groupList"
            full-width
            label="프로그램 그룹을 선택하세요"
            :rules="[rules.required(group_cid, '프로그램 그룹을 선택하세요')]"
            outlined
            item-value="cid"
            item-text="name"
            return-object
            validate-on-blur
          />
        </v-list-item>
        <v-list-item class="flex-wrap pa-0 mb-3">
          <v-list-item-title class="mb-2 pl-1"> 프로그램명 </v-list-item-title>
          <v-text-field
            full-width
            type="text"
            v-model="name"
            label="프로그램명을 입력해주세요"
            required
            ref="name"
            outlined
            validate-on-blur
            :rules="[rules.required(name, '프로그램명을 입력해주세요')]"
          />
        </v-list-item>
        <v-list-item class="flex-wrap pa-0 mb-3">
          <v-list-item-title class="mb-2 pl-1">녹화 시간</v-list-item-title>
          <v-text-field
            v-model="rec_time"
            v-mask="rec_time_mask"
            label="ex) 08:00"
            required
            ref="rec_time"
            outlined
            full-width
            validate-on-blur
            maxlength="5"
            :rules="[
              rules.required(
                rec_time,
                'ex) 08:00'
              ),
              rules.rec_time_Length
            ]"
          />
        </v-list-item>
        <v-list-item class="flex-wrap pa-0">
          <v-list-item-title class="pl-1">광고 종류</v-list-item-title>
          <v-col v-for="ad in adList" cols="12" sm="4" md="4">
            <v-checkbox
              v-model="ad_types"
              :value="ad.code"
              :label="ad.title"
              style="margin: '0 3px 0 0';"
            ></v-checkbox>
          </v-col>
        </v-list-item>
        <v-list-item class="flex-wrap pa-0 mb-3">
          <v-checkbox
            v-model="is_ep_use"
            true-value="Y"
            false-value="N"
            label="회차 표시"
          ></v-checkbox>
        </v-list-item>
        <v-list-item class="flex-wrap pa-0 mb-5">
          <v-list-item-title class="mb-2 pl-1">비고</v-list-item-title>
          <v-textarea
            type="text"
            v-model="desc"
            label="비고를 입력해주세요"
            ref="bigo"
            outlined
            full-width
            hide-details
          />
        </v-list-item>
        <v-btn block dark large depressed type="submit">수정</v-btn>
      </v-list>
    </v-form>
  </v-col>
</template>

<script>
import Loading from "@/components/common/Loading";
import { mapActions, mapGetters } from "vuex";
import { getCodeCombo } from "@/api/userAPI";
import * as programManage from "@/store/modules/programManage";

export default {
  components: { Loading },
  name: "TabProgramInfoView",
  data() {
    return {
      valid: false,
      group_cid: "",
      ad_types: [],
      adList: [],
      groupList: [],
      is_ep_use: "",
      rec_time: "",
      name: "",
      desc: "",
      rules: {
        required: (value, text) => !!value || text,
        rec_time_Length: (value) =>
          value.length === 5 || "ex) 08:00 로입력해주세요",
      },
      rec_time_mask: '##:##'
    }
  },
  async mounted() {
    getCodeCombo.call(
      this,
      [
        ['/programgroup', 'groupList'],
        ['/codemaster/Child/20000', 'adList']
      ]
    );
    // 프로그램 디테일 정보 조회
    await this.a_setData(this.$route.params.cid);
    const { name, desc, group_cid, is_ep_use, ad_types, rec_time } = this.g_data;
    this.name = name;
    this.desc = desc;
    this.is_ep_use = is_ep_use;
    this.group_cid = group_cid;
    this.rec_time = rec_time ? rec_time.substr(0, 5) : '';
    this.ad_types = ad_types;
  },
  computed: {
    ...mapGetters({
      g_loading: programManage.DETAIL_INFO_LOADING,
      g_data: programManage.DETAIL_INFO_DATA,
    }),
  },
  methods: {
    ...mapActions({
      a_setData: programManage.SET_DETAIL_INFO_DATA,
      a_putData: programManage.PUT_DETAIL_INFO_DATA,
    }),
    async onSubmit() {
      try {
        if (this.$refs.programForm.validate()) {
          const { name, desc, group_cid, is_ep_use, ad_types, rec_time } = this;
          const data = {
            name,
            desc,
            is_ep_use,
            group_cid,
            ad_types,
            rec_time,
            cid: this.$route.params.cid,
          };
          await this.a_putData(data);
        }
      } catch (err) {
        console.log(err)
        alert(err?.response?.data?.message);
      }
    },
  },
};
</script>

<style lang="scss" >
</style>