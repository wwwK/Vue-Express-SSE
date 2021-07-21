<template>
  <v-col class="default-form" sm="12" md="6">
    <Loading v-if="g_loading" />
    <v-row no-gutters justify="space-between" class="align-center mb-3">
      <h3>프로그램 등록</h3>
      <v-btn depressed dark link to="/main/program" small>
        목록으로 가기
      </v-btn>
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
          <v-col v-for="ad in adList" :key='ad'
            cols="12" sm="4" md="4">
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
            label='회차 표시'
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
        <v-btn block dark large depressed type="submit">등록</v-btn>
      </v-list>
    </v-form>
  </v-col>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getCodeCombo } from "@/api/userAPI";
import Loading from "@/components/common/Loading.vue";
import * as programManage from "@/store/modules/programManage";

export default {
  components: { Loading },
  name: "TabProgramAddView",
  data() {
    return {
      valid: false,
      group_cid: "",
      ad_types: [],
      adList: [],
      is_ep_use: "Y",
      rec_time: "",
      groupList: [],
      name: "",
      desc: "",
      rules: {
        required: (value, text) => !!value || text,
        rec_time_Length: (value) =>
          value.length === 5 || "ex) 08:00 로입력해주세요",
      },
      rec_time_mask: '##:##'
    };
  },
  mounted() {
    getCodeCombo.call(
      this,
      [
        ['/programgroup', 'groupList'],
        ['/codemaster/Child/20000', 'adList']
      ]
    );
  },
  computed: {
    ...mapGetters({
      g_loading: programManage.LOADING,
    }),
  },
  methods: {
    ...mapActions({
      a_addProgramData: programManage.ADD_PROGRAM_DATA,
    }),

    async onSubmit() {
      try {
        if (this.$refs.programForm.validate()) {
          const { 
            name, desc, is_ep_use, rec_time,
            group_cid: { cid: group_cid }, 
            ad_types
          } = this;

          const data = { name, desc, group_cid, ad_types, is_ep_use, rec_time };

           if (!desc) {
            delete data["desc"];
          }

          let response = await this.a_addProgramData(data);
          alert(response.data.message);
          this.$router.push("/main/program");
        }
      } catch (err) {
        alert(err.message);
      }
    },
  },
};
</script>