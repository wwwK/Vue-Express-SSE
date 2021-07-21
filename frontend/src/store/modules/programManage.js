// programManage = 출연진 관리
import { refreshApi, apiUrl, easyAxios } from '@/api/userAPI';
import axios from 'axios'
import { router } from "@/main.js"

// Getters
export const LOADING = 'programManage/LOADING';
export const PROGRAM_DATA = 'programManage/PROGRAM_DATA';
export const TERM_DATA = 'programManage/TERM_DATA';
export const TOTAL_COUNT = 'programManage/TOTAL_COUNT';
export const EPISODE_TOTAL_COUNT = 'programManage/EPISODE_TOTAL_COUNT';
export const PAGE = 'programManage/PAGE';
export const LIST_PAGE = 'programManage/LIST_PAGE';

// 디테일 기본정보
export const DETAIL_INFO_LOADING = 'programManage/DETAIL_INFO_LOADING';
export const DETAIL_INFO_DATA = 'programManage/DETAIL_INFO_DATA';
// 디테일 약관정보
export const DETAIL_TERM_LOADING = 'programManage/DETAIL_TERM_LOADING';
export const DETAIL_TERM_DATA = 'programManage/DETAIL_TERM_DATA';
export const DETAIL_TERM_DETAIL_DATA = 'programManage/DETAIL_TERM_DETAIL_DATA';
export const DETAIL_TERM_PAGE = 'programManage/DETAIL_TERM_PAGE';
export const DETAIL_TERM_TOTAL_COUNT = 'programManage/DETAIL_TERM_TOTAL_COUNT';

// 간편생성
export const EPISODE_EASY_MAKE_LOADING = 'programManage/EPISODE_EASY_MAKE_LOADING';
export const EPISODE_EASY_MAKE_DIALOG = 'programManage/EPISODE_EASY_MAKE_DIALOG';
export const EPISODE_EASY_MAKE_DIALOG_IS_OPEN = 'programManage/EPISODE_EASY_MAKE_DIALOG_IS_OPEN';


export const ADD_EPISODE_EASY_MAKE_DATA = 'programManage/ADD_EPISODE_EASY_MAKE_DATA';

export const MU_SET_EPISODE_EASY_MAKE_DIALOG = 'programManage/MU_SET_EPISODE_EASY_MAKE_DIALOG';

export const MU_SET_EPISODE_EASY_MAKE_LOADING = 'programManage/MU_SET_EPISODE_EASY_MAKE_LOADING';

// 디테일 에피소드 회차 정보
export const DETAIL_EPISODE_LIST_LOADING = 'programManage/DETAIL_EPISODE_LIST_LOADING';
export const DETAIL_EPISODE_LIST_DATA = 'programManage/DETAIL_EPISODE_LIST_DATA';
export const DETAIL_EPISODE_LIST_TOTAL_COUNT = 'programManage/DETAIL_EPISODE_LIST_TOTAL_COUNT';
export const DETAIL_EPISODE_LIST_DIALOG = 'programManage/DETAIL_EPISODE_LIST_DIALOG';
export const DETAIL_EPISODE_LIST_DIALOG_IS_OPEN = 'programManage/DETAIL_EPISODE_LIST_DIALOG_IS_OPEN';
export const DETAIL_EPISODE_SELECTED_CELL = 'programManage/DETAIL_EPISODE_SELECTED_CELL';
// 디테일 에피소드 출연 정보
export const DETAIL_EPISODE_GUEST_LOADING = 'programManage/DETAIL_EPISODE_GUEST_LOADING';
export const DETAIL_EPISODE_GUEST_DATA = 'programManage/DETAIL_EPISODE_GUEST_DATA';
export const DETAIL_EPISODE_GUEST_DIALOG = 'programManage/DETAIL_EPISODE_GUEST_DIALOG';
export const DETAIL_EPISODE_GUEST_DIALOG_IS_OPEN = 'programManage/DETAIL_EPISODE_GUEST_DIALOG_IS_OPEN';

// Mutations
export const MU_SET_LOADING = 'programManage/MU_SET_LOADING';
export const MU_SET_PROGRAM_DATA = 'programManage/MU_SET_PROGRAM_DATA';
export const MU_SET_PAGE = 'programManage/MU_SET_PAGE';
// 디테일 기본정보
export const MU_SET_DETAIL_INFO_LOADING = 'programManage/MU_SET_DETAIL_INFO_LOADING';
export const MU_SET_DETAIL_INFO_DATA = 'programManage/MU_SET_DETAIL_INFO_DATA';
// 디테일 약관정보
export const MU_SET_DETAIL_TERM_LOADING = 'programManage/MU_SET_DETAIL_TERM_LOADING';
export const MU_SET_DETAIL_TERM_DATA = 'programManage/MU_SET_DETAIL_TERM_DATA';
export const MU_SET_DETAIL_TERM_DETAIL_DATA = 'programManage/MU_SET_DETAIL_TERM_DETAIL_DATA';
export const MU_SET_DETAIL_TERM_PAGE = 'programManage/MU_SET_DETAIL_TERM_PAGE';
// 디테일 에피소드 회차 정보
export const MU_SET_DETAIL_EPISODE_LIST_LOADING = 'programManage/MU_SET_DETAIL_EPISODE_LIST_LOADING';
export const MU_SET_DETAIL_EPISODE_LIST_DATA = 'programManage/MU_SET_DETAIL_EPISODE_LIST_DATA';
export const MU_SET_DETAIL_EPISODE_LIST_DIALOG = 'programManage/MU_SET_DETAIL_EPISODE_LIST_DIALOG';
export const MU_SET_DETAIL_EPISODE_SELECTED_CELL = 'programManage/MU_SET_DETAIL_EPISODE_SELECTED_CELL'
export const MU_SET_DETAIL_EPISODE_GUEST_LOADING = 'programManage/MU_SET_DETAIL_EPISODE_GUEST_LOADING';
export const MU_SET_DETAIL_EPISODE_GUEST_DATA = 'programManage/MU_SET_DETAIL_EPISODE_GUEST_DATA';
export const MU_SET_DETAIL_EPISODE_GUEST_DIALOG = 'programManage/MU_SET_DETAIL_EPISODE_GUEST_DIALOG';
export const MU_SET_DETAIL_EPISODE_GUEST_DIALOG_DATA = 'programManage/MU_SET_DETAIL_EPISODE_GUEST_DIALOG_DATA';


// Actions
export const SET_LOADING = 'programManage/SET_LOADING';
export const SET_PROGRAM_DATA = 'programManage/SET_PROGRAM_DATA';
export const ADD_PROGRAM_DATA = 'programManage/ADD_PROGRAM_DATA';
// 디테일 기본정보
export const SET_DETAIL_INFO_DATA = 'programManage/SET_DETAIL_INFO_DATA';
export const PUT_DETAIL_INFO_DATA = 'programManage/PUT_DETAIL_INFO_DATA';
// 디테일 약관정보
export const SET_DETAIL_TERM_DATA = 'programManage/SET_DETAIL_TERM_DATA';
export const SET_DETAIL_TERM_DATA_ALL = 'programManage/SET_DETAIL_TERM_DATA_ALL';
export const ADD_DETAIL_TERM_DATA = 'programManage/ADD_DETAIL_TERM_DATA';
export const PUT_DETAIL_TERM_DATA = 'programManage/PUT_DETAIL_TERM_DATA';
export const DELETE_DETAIL_TERM_DATA = 'programManage/DELETE_DETAIL_TERM_DATA';
// 디테일 에피소드 회차 정보
export const SET_DETAIL_EPISODE_LIST_DATA = 'programManage/SET_DETAIL_EPISODE_DATA';
export const ADD_DETAIL_EPISODE_LIST_DATA = 'programManage/ADD_DETAIL_EPISODE_LIST_DATA';
export const PUT_DETAIL_EPISODE_LIST_DATA = 'programManage/PUT_DETAIL_EPISODE_LIST_DATA';
export const GET_DETAIL_EPISODE_LIST_DATA_DETAIL = 'programManage/GET_DETAIL_EPISODE_LIST_DATA_DETAIL';
export const SET_DETAIL_EPISODE_SELECTED_CELL = 'programManage/SET_DETAIL_EPISODE_SELECTED_CELL';
export const DELETE_DETAIL_EPISODE_SELECTED_CELL = 'programManage/DELETE_DETAIL_EPISODE_SELECTED_CELL';
export const GET_DETAIL_EPISODE_GUEST_CAST_INFO = 'programManage/GET_DETAIL_EPISODE_GUEST_CAST_INFO';
export const GET_DETAIL_EPISODE_GUEST_ALREADY_CAST_INFO = 'programManage/GET_DETAIL_EPISODE_GUEST_ALREADY_CAST_INFO';
export const ADD_DETAIL_EPISODE_GUEST_CAST = 'programManage/ADD_DETAIL_EPISODE_GUEST_CAST';
export const PUT_DETAIL_EPISODE_GUEST_CAST = 'programManage/PUT_DETAIL_EPISODE_GUEST_CAST';
export const DELETE_EPISODE_SELECTED_CELL = 'programManage/DELETE_EPISODE_SELECTED_CELL';

const initialState = () => {
  return {
    loading: false,
    programData: [],
    totalCount: null,
    page: {
      start: 0,
      limit: 10
    },
    // 디테일 페이지 사용
    detail: {
      info: {
        loading: false,
        data: {}
      },
      term: {
        totalCount: null,
        loading: false,
        data: [],
        detailData: {},
        page: {
          start: 0,
          limit: 10
        },
      },
      episode: {
        easymake: {
          totalCount: null,
          loading: false,
          data: [],
          selectedCell: {},
          dialog: {
            isOpen: false,
            data: {},
            isModify: false // add or modify
          }
        },
        list: {
          totalCount: null,
          loading: false,
          data: [],
          selectedCell: {},
          dialog: {
            isOpen: false,
            data: {},
            isModify: false // add or modify
          },
          page: {
            start: 0,
            limit: 10
          },
        },
        guest: {
          totalCount: null,
          loading: false,
          data: [],
          page: {
            start: 0,
            limit: 10
          },
          dialog: {
            isOpen: false,
            data: {},
            isModify: false // add or modify
          }
        },
      }
    }
  };
};

const state = initialState();

const getters = {
  [LOADING]: state => {
    return state.loading;
  },
  [PROGRAM_DATA]: state => {
    return state.programData;
  },
  [TOTAL_COUNT]: state => {
    return state.totalCount;
  },
  [EPISODE_TOTAL_COUNT]: state => {
    return state.detail.episode.list.totalCount;
  },
  [PAGE]: state => {
    return state.page;
  },
  [LIST_PAGE]: state => {
    return state.detail.episode.list.page;
  },
  // 디테일 기본정보
  [DETAIL_INFO_LOADING]: state => {
    return state.detail.info.loading;
  },
  [DETAIL_INFO_DATA]: state => {
    return state.detail.info.data;
  },
  // 디테일 약관정보
  [DETAIL_TERM_LOADING]: state => {
    return state.detail.term.loading;
  },
  [DETAIL_TERM_DATA]: state => {
    return state.detail.term.data;
  },
  [DETAIL_TERM_DETAIL_DATA]: state => {
    return state.detail.term.detailData;
  },
  [DETAIL_TERM_PAGE]: state => {
    return state.detail.term.page;
  },
  [DETAIL_TERM_TOTAL_COUNT]: state => {
    return state.detail.term.totalCount;
  },
  
  // 에피소드 간편생성 정보

  [EPISODE_EASY_MAKE_LOADING]: state => {
    return state.detail.episode.easymake.loading;
  },
  [EPISODE_EASY_MAKE_DIALOG]: state => {
    return state.detail.episode.easymake.dialog;
  },

  [EPISODE_EASY_MAKE_DIALOG_IS_OPEN]: state => {
    return state.detail.episode.easymake.dialog.isOpen;
  },

  // 디테일 에피소드 정보
  [DETAIL_EPISODE_LIST_LOADING]: state => {
    return state.detail.episode.list.loading;
  },
  [DETAIL_EPISODE_LIST_DATA]: state => {
    return state.detail.episode.list.data;
  },
  [DETAIL_EPISODE_LIST_TOTAL_COUNT]: state => {
    return state.detail.episode.list.totalCount;
  },
  [DETAIL_EPISODE_LIST_DIALOG]: state => {
    return state.detail.episode.list.dialog;
  },
  [DETAIL_EPISODE_LIST_DIALOG_IS_OPEN]: state => {
    return state.detail.episode.list.dialog.isOpen;
  },
  [DETAIL_EPISODE_SELECTED_CELL]: state => {
    return state.detail.episode.list.selectedCell;
  },
  // 디테일 에피소드 출연 정보
  [DETAIL_EPISODE_GUEST_LOADING]: state => {
    return state.detail.episode.guest.loading;
  },
  [DETAIL_EPISODE_GUEST_DATA]: state => {
    return state.detail.episode.guest.data;
  },
  [DETAIL_EPISODE_GUEST_DIALOG]: state => {
    return state.detail.episode.guest.dialog;
  },
  [DETAIL_EPISODE_GUEST_DIALOG_IS_OPEN]: state => {
    return state.detail.episode.guest.dialog.isOpen;
  },
};

const mutations = {
  [MU_SET_LOADING]: (state, loading) => {
    state.loading = loading;
  },
  [MU_SET_PROGRAM_DATA]: (state, response) => {
    state.programData = response.data;
    state.totalCount = response.totalCount
  },
  [MU_SET_PAGE]: (state, response) => {
    state.page.start = response;
  },
  // 디테일 정보
  // 기본 정보
  [MU_SET_DETAIL_INFO_LOADING]: (state, loading) => {
    state.detail.info.loading = loading;
  },
  [MU_SET_DETAIL_INFO_DATA]: (state, response) => {
    state.detail.info.data = response;
  },
  // 약관 정보
  [MU_SET_DETAIL_TERM_LOADING]: (state, loading) => {
    state.detail.term.loading = loading;
  },
  [MU_SET_DETAIL_TERM_DATA]: (state, response) => {
    state.detail.term.data = response;
    state.detail.term.totalCount = response.length;
  },
  [MU_SET_DETAIL_TERM_DETAIL_DATA]: (state, response) => {
    state.detail.term.detailData = response;
  },
  [MU_SET_DETAIL_TERM_PAGE]: (state, response) => {
    state.detail.term.page.start = response;
  },

  // 에피소드 간편생성
  [MU_SET_EPISODE_EASY_MAKE_DIALOG]: (state, response) => {
    state.detail.episode.easymake.dialog.isOpen = response.isOpen;
    state.detail.episode.easymake.dialog.data = response.data;
    if (Object.keys(response.data).length) {
      state.detail.episode.easymake.dialog.isModify = true;
    } else {
      state.detail.episode.easymake.dialog.isModify = false;
    }
  },
  [MU_SET_EPISODE_EASY_MAKE_LOADING]: (state, loading) => {
    state.detail.episode.easymake.loading = loading;
  },
  // 에피소드 정보
  // 에피소드 리스트 정보
  [MU_SET_DETAIL_EPISODE_LIST_LOADING]: (state, loading) => {
    state.detail.episode.list.loading = loading;
  },
  [MU_SET_DETAIL_EPISODE_LIST_DATA]: (state, response) => {
    state.detail.episode.list.data = response.result;
    state.detail.episode.list.totalCount = response.totalCount;
  },
  [MU_SET_DETAIL_EPISODE_LIST_DIALOG]: (state, response) => {
    state.detail.episode.list.dialog.isOpen = response.isOpen;
    state.detail.episode.list.dialog.data = response.data;
    if (Object.keys(response.data).length) {
      state.detail.episode.list.dialog.isModify = true;
    } else {
      state.detail.episode.list.dialog.isModify = false;
    }
  },
  [MU_SET_DETAIL_EPISODE_SELECTED_CELL]: (state, response) => {
    if (!response) {
      // 초기화 작업
      state.detail.episode.list.selectedCell = {};
      state.detail.episode.guest.data = [];
      return
    }
    state.detail.episode.list.selectedCell = response;
  },
  // 에피소드 출연 정보
  [MU_SET_DETAIL_EPISODE_GUEST_LOADING]: (state, loading) => {
    state.detail.episode.guest.loading = loading;
  },
  [MU_SET_DETAIL_EPISODE_GUEST_DATA]: (state, response) => {
    state.detail.episode.guest.data = response;
    state.detail.episode.guest.totalCount = response.length;
  },
  [MU_SET_DETAIL_EPISODE_GUEST_DIALOG]: (state, response) => {
    state.detail.episode.guest.dialog.isOpen = response.isOpen;
    state.detail.episode.guest.dialog.isModify = response.isModify;
  },
  [MU_SET_DETAIL_EPISODE_GUEST_DIALOG_DATA]: (state, response) => {
    state.detail.episode.guest.dialog.data = response;
  },
};

const actions = {
  // 프로그램 리스트 조회
  [SET_PROGRAM_DATA]: async ({ commit, state }, payload) => {
    try {
      commit(MU_SET_LOADING, true)
      await refreshApi();
      const { page, keyword } = payload
      const accessToken = sessionStorage.getItem("access-token")
      const axiosParams = {
        method: "get",
        url: apiUrl + "/program",
        headers: {
          Authorization: accessToken
        },
        params: {
          start: state.page.limit * (page - 1),
          limit: state.page.limit,
          name: keyword
        }
      };

      const respObj = await axios(axiosParams)
      if (respObj && respObj.status === 200) {
        commit(MU_SET_PROGRAM_DATA, respObj.data)
        commit(MU_SET_PAGE, state.page.limit * (page - 1))
      }

    } catch (err) {
      console.error(err);
      return err;
    } finally {
      commit(MU_SET_LOADING, false)
    }
  },
  // 프로그램 등록
  [ADD_PROGRAM_DATA]: async ({ commit }, payload) => {
    try {
      commit(MU_SET_LOADING, true)
      await refreshApi();

      const axiosData = {
        method: "post",
        url: apiUrl + "/program",
        data: payload,
        headers: {
          authorization: sessionStorage.getItem("access-token"),
        },
      };
      const respObj = await axios(axiosData);
      if (respObj && respObj.status === 200) {
        return respObj;
      }
    } catch (err) {
      throw new Error(err.message);
    } finally {
      commit(MU_SET_LOADING, false)
    }
  },
  // 프로그램 디테일 기본내용 조회
  [SET_DETAIL_INFO_DATA]: async ({ commit }, payload) => {
    try {
      commit(MU_SET_DETAIL_INFO_LOADING, true)
      await refreshApi();
      const axiosData = {
        method: "get",
        url: apiUrl + "/program/" + payload,
        headers: {
          authorization: sessionStorage.getItem("access-token"),
        },
      };
      const respObj = await axios(axiosData);
      if (respObj && respObj.status === 200) {
        commit(MU_SET_DETAIL_INFO_DATA, respObj.data.data)
      }

    } catch (err) {
      console.error(err);
      return err;
    } finally {
      commit(MU_SET_DETAIL_INFO_LOADING, false)
    }
  },
  // 프로그램 디테일 기본내용  수정
  [PUT_DETAIL_INFO_DATA]: async ({ commit, dispatch }, payload) => {
    try {
      commit(MU_SET_DETAIL_INFO_LOADING, true)
      await refreshApi();
      const { cid, ...data } = payload;

      const axiosData = {
        method: "put",
        url: apiUrl + "/program/" + cid,
        data,
        headers: {
          authorization: sessionStorage.getItem("access-token"),
        },
      };
      const respObj = await axios(axiosData);
      if (respObj && respObj.status === 200) {
        alert(respObj.data.message);
        dispatch(SET_DETAIL_INFO_DATA, cid)
      }

    } catch (err) {
      console.error(err);
      return err
    } finally {
      commit(MU_SET_DETAIL_INFO_LOADING, false)
    }
  },
  // 프로그램 디테일 약관 내용 조회
  [SET_DETAIL_TERM_DATA]: async ({ state, commit }, payload) => {
    try {
      commit(MU_SET_DETAIL_TERM_LOADING, true)
      await refreshApi();
      const limit = state.detail.term.page.limit;
      const axiosData = {
        method: "get",
        url: apiUrl + "/program/allow/" + payload.cid,
        headers: {
          authorization: sessionStorage.getItem("access-token"),
        },
        params: {
          start: limit * (payload.page - 1),
          limit
        }
      };
      const respObj = await axios(axiosData);
      if (respObj && respObj.status === 200) {
        commit(MU_SET_DETAIL_TERM_DATA, respObj.data.data)
        commit(MU_SET_DETAIL_TERM_PAGE, limit * (payload.page - 1))
      }

    } catch (err) {
      console.error(err);
      alert(err.response.data.message)
    } finally {
      commit(MU_SET_DETAIL_TERM_LOADING, false)
    }
  },
  // 프로그램 디테일 약관 내용 모두 조회
  [SET_DETAIL_TERM_DATA_ALL]: async ({ commit }, payload) => {
    try {
      commit(MU_SET_DETAIL_TERM_LOADING, true)
      await refreshApi();
      const axiosData = {
        method: "get",
        url: apiUrl + "/program/allow/" + payload.cid,
        headers: {
          authorization: sessionStorage.getItem("access-token"),
        },
      };
      const respObj = await axios(axiosData);
      if (respObj && respObj.status === 200) {
        commit(MU_SET_DETAIL_TERM_DATA, respObj.data.data)
      }

    } catch (err) {
      console.error(err);
      alert(err.response.data.message)
    } finally {
      commit(MU_SET_DETAIL_TERM_LOADING, false)
    }
  },
  // 프로그램 디테일 약관 내용 삭제
  [DELETE_DETAIL_TERM_DATA]: async ({ dispatch, commit }, payload) => {
    try {
      commit(MU_SET_DETAIL_TERM_LOADING, true)
      await refreshApi();
      const axiosData = {
        method: "delete",
        url: apiUrl + "/program/allow/" + payload.cid,
        headers: {
          authorization: sessionStorage.getItem("access-token"),
        },
      };
      const respObj = await axios(axiosData);
      if (respObj && respObj.status === 200) {
        alert(respObj.data.message)
        dispatch(SET_DETAIL_TERM_DATA, {
          page: 1,
          cid: payload.program_cid
        })
      }
    } catch (err) {
      console.error(err);
      alert(err.response.data.message)
    } finally {
      commit(MU_SET_DETAIL_TERM_LOADING, false)
    }
  },
  // 프로그램 디테일 약관 추가
  [ADD_DETAIL_TERM_DATA]: async ({ commit }, payload) => {
    try {
      commit(MU_SET_DETAIL_TERM_LOADING, true)
      await refreshApi();
      const axiosData = {
        method: "post",
        url: apiUrl + "/program/allow",
        headers: {
          authorization: sessionStorage.getItem("access-token"),
        },
        data: payload
      };
      const respObj = await axios(axiosData);
      if (respObj && respObj.status === 200) {
        alert(respObj.data.message);
        router.push({ name: 'ProgramTerm' })
      }
    } catch (err) {
      console.error(err);
      alert(err.response.data.message)
    } finally {
      commit(MU_SET_DETAIL_TERM_LOADING, false)
    }
  },
  // 프로그램 디테일 약관 수정
  [PUT_DETAIL_TERM_DATA]: async ({ commit }, payload) => {
    try {
      commit(MU_SET_DETAIL_TERM_LOADING, true)
      await refreshApi();
      const { cid, ...data } = payload
      const axiosData = {
        method: "put",
        url: apiUrl + "/program/allow/" + payload.cid,
        headers: {
          authorization: sessionStorage.getItem("access-token"),
        },
        data
      };
      const respObj = await axios(axiosData);
      if (respObj && respObj.status === 200) {
        alert(respObj.data.message);
        router.push({ name: 'ProgramTerm' })
      }

    } catch (err) {
      console.error(err);
      alert(err.response.data.message)
    } finally {
      commit(MU_SET_DETAIL_TERM_LOADING, false)
    }
  },
  // 프로그램 디테일 에피소드 회차 리스트 조회
  [SET_DETAIL_EPISODE_LIST_DATA]: async ({ commit }, payload) => {
    try {
      commit(MU_SET_DETAIL_EPISODE_LIST_LOADING, true);
      
      const limit = state.detail.episode.list.page.limit;
      const { data: { data, totalCount }, status } = await easyAxios(
        true,
        'get',
        `/program/epi/${payload.program_cid}`,
        {
          start: limit * ((payload.page || 1) - 1),
          limit
        }
      );
      if (status === 200) {
        const result = data.map((obj) => {
          obj.is_cancel = obj.is_cancel === 'Y' ? '취소' : '';
          return obj;
        })
        commit(MU_SET_DETAIL_EPISODE_SELECTED_CELL, {});
        commit(MU_SET_DETAIL_EPISODE_GUEST_DATA, []);
        commit(MU_SET_DETAIL_EPISODE_LIST_DATA, {result, totalCount});
      }


    } catch (err) {
      console.error(err);
      alert(err.response.data.message)
    } finally {
      commit(MU_SET_DETAIL_EPISODE_LIST_LOADING, false)
    }
  },
  // 프로그램 회차간편 생성
  [ADD_EPISODE_EASY_MAKE_DATA]: async ({ commit, dispatch }, payload) => {
    try {
      commit(MU_SET_EPISODE_EASY_MAKE_LOADING, true);

      const { cid, ...datas } = payload;
      const respObj = await easyAxios(
        true,
        'post',
        `/program/epi/auto/${cid}`,
        { ...datas }
      );
      
      if (respObj && respObj.status === 200) {
        alert(respObj.data.message)
        await dispatch(SET_DETAIL_EPISODE_LIST_DATA, {
          program_cid: cid
        })
      }
    } catch (err) {
      console.error(err);
      alert(err.response.data.message)
    } finally {
      commit(MU_SET_EPISODE_EASY_MAKE_LOADING, false)
    }
  },
  // 프로그램 디테일 에피소드 회차 리스트 추가
  [ADD_DETAIL_EPISODE_LIST_DATA]: async ({ commit, dispatch }, payload) => {
    try {
      commit(MU_SET_DETAIL_EPISODE_LIST_LOADING, false)
      await refreshApi();
      const axiosData = {
        method: "post",
        url: apiUrl + "/program/epi",
        headers: {
          authorization: sessionStorage.getItem("access-token"),
        },
        data: payload
      };
      const respObj = await axios(axiosData);
      if (respObj && respObj.status === 200) {
        alert(respObj.data.message)
        await dispatch(SET_DETAIL_EPISODE_LIST_DATA, {
          program_cid: payload.program_cid
        })
      }
    } catch (err) {
      console.error(err);
      alert(err.response.data.message)
    } finally {
      commit(MU_SET_DETAIL_EPISODE_LIST_LOADING, false)
    }
  },
  // 프로그램 디테일 에피소드 회차 리스트 수정 
  [PUT_DETAIL_EPISODE_LIST_DATA]: async ({ commit, dispatch }, payload) => {
    try {
      commit(MU_SET_DETAIL_EPISODE_LIST_LOADING, false)
      await refreshApi();
      const { cid, ...data } = payload
      const axiosData = {
        method: "put",
        url: apiUrl + "/program/epi/" + cid,
        headers: {
          authorization: sessionStorage.getItem("access-token"),
        },
        data
      };
      const respObj = await axios(axiosData);
      if (respObj && respObj.status === 200) {
        alert(respObj.data.message)
        await dispatch(SET_DETAIL_EPISODE_LIST_DATA, { program_cid: data.program_cid })
      }
    } catch (err) {
      console.error(err);
      alert(err.response.data.message)
    } finally {
      commit(MU_SET_DETAIL_EPISODE_LIST_LOADING, false)
    }
  },
  // 프로그램 디테일 에피소드 회차 리스트 - 디테일데이터 조회
  [GET_DETAIL_EPISODE_LIST_DATA_DETAIL]: async ({ commit }, payload) => {
    try {
      commit(MU_SET_DETAIL_EPISODE_LIST_LOADING, false)
      await refreshApi();
      const axiosData = {
        method: "get",
        url: apiUrl + "/program/epi/detail/" + payload.cid,
        headers: {
          authorization: sessionStorage.getItem("access-token"),
        },
      };
      const respObj = await axios(axiosData);
      if (respObj && respObj.status === 200) {
        commit(MU_SET_DETAIL_EPISODE_LIST_DIALOG, {
          isOpen: true,
          data: respObj.data.data,
        })
      }
    } catch (err) {
      console.error(err);
      alert(err.response.data.message)
    } finally {
      commit(MU_SET_DETAIL_EPISODE_LIST_LOADING, false)
    }
  },
  // 프로그램 디테일 에피소드 회차 리스트 셀렉트된 셀에 참조된 출연정보 조회
  [SET_DETAIL_EPISODE_SELECTED_CELL]: async ({ commit }, payload) => {
    try {
      commit(MU_SET_DETAIL_EPISODE_GUEST_LOADING, true)

      const { cell } = payload;
      const respObj = await easyAxios(
        true,
        'get',
        `/program/epi_cast_info/${cell.cid}`,
      );

      if (respObj && respObj.status === 200) {
        commit(MU_SET_DETAIL_EPISODE_SELECTED_CELL, cell)
        commit(MU_SET_DETAIL_EPISODE_GUEST_DATA, respObj.data.data)
      }
    } catch (err) {
      console.error(err);
      alert(err.response.data.message)
    } finally {
      commit(MU_SET_DETAIL_EPISODE_GUEST_LOADING, false)
    }
  },

  [DELETE_EPISODE_SELECTED_CELL]: async ({ state, commit, dispatch }, payload) => {
    try {
      commit(MU_SET_DETAIL_EPISODE_LIST_LOADING, false)

      const respObj = await easyAxios(
        true,
        'delete',
        `/program/epi/${payload.cid}`,
      );
      
      if (respObj && respObj.status === 200) {
        alert(respObj.data.message)
        await dispatch(SET_DETAIL_EPISODE_LIST_DATA, {
          program_cid: payload.program_cid
        })
      }

    } catch (err) {
      console.error(err);
      alert(err.response.data.message)
    } finally {
      commit(MU_SET_DETAIL_EPISODE_LIST_LOADING, false)
    }
  },

  // 프로그램 디테일 에피소드 회차 리스트 셀렉트된 셀에 참조된 출연정보 삭제
  [DELETE_DETAIL_EPISODE_SELECTED_CELL]: async ({ state, commit, dispatch }, payload) => {
    try {
      commit(MU_SET_DETAIL_EPISODE_GUEST_LOADING, true)
      await refreshApi();
      const { cid, program_cid } = payload
      const axiosData = {
        method: "delete",
        url: apiUrl + "/castinfo/" + cid,
        headers: {
          authorization: sessionStorage.getItem("access-token"),
        }
      };
      const respObj = await axios(axiosData);
      if (respObj && respObj.status === 200) {
        alert(respObj.data.message)
        const { detail: { episode: { list: { selectedCell } } } } = state
        await dispatch(SET_DETAIL_EPISODE_SELECTED_CELL, {
          program_cid,
          cell: selectedCell,
          ep: selectedCell.ep
        })
      }
    } catch (err) {
      console.error(err);
      alert(err.response.data.message)
    } finally {
      commit(MU_SET_DETAIL_EPISODE_GUEST_LOADING, false)
    }
  },
  // 프로그램 디테일 에피소드 회차 리스트 셀렉트된 셀에 참조된 출연정보 추가 시 나오는 회차 기본정보 가져오기
  [GET_DETAIL_EPISODE_GUEST_CAST_INFO]: async ({ commit }, payload) => {
    try {
      commit(MU_SET_DETAIL_EPISODE_GUEST_LOADING, true)
      await refreshApi();
      const { ep, program_cid } = payload
      const axiosData = {
        method: "get",
        url: apiUrl + "/program/epi_info/" + program_cid,
        headers: {
          authorization: sessionStorage.getItem("access-token"),
        },
        params: {
          ep
        }
      };
      const respObj = await axios(axiosData);
      if (respObj && respObj.status === 200) {
        return respObj
      }
    } catch (err) {
      console.error(err);
      alert(err.response.data.message)
    } finally {
      commit(MU_SET_DETAIL_EPISODE_GUEST_LOADING, false)
    }
  },
  // 프로그램 디테일 에피소드 회차 리스트 셀렉트된 셀에 참조된 출연정보 수정 시 나오는 출연 정보 조회
  [GET_DETAIL_EPISODE_GUEST_ALREADY_CAST_INFO]: async ({ state, commit }) => {
    try {
      commit(MU_SET_DETAIL_EPISODE_GUEST_LOADING, true)
      await refreshApi();
      const { detail: { episode: { guest: { dialog: { data: { cid } } } } } } = state
      const axiosData = {
        method: "get",
        url: apiUrl + "/castinfo/" + cid,
        headers: {
          authorization: sessionStorage.getItem("access-token"),
        }
      };
      const respObj = await axios(axiosData);
      if (respObj && respObj.status === 200) {
        commit(MU_SET_DETAIL_EPISODE_GUEST_DIALOG_DATA, respObj.data.data)
      }
    } catch (err) {
      console.error(err);
      alert(err.response.data.message)
    } finally {
      commit(MU_SET_DETAIL_EPISODE_GUEST_LOADING, false)
    }
  },
  // 프로그램 디테일 에피소드 회차 리스트 셀렉트된 셀에 참조된 출연정보 추가
  [ADD_DETAIL_EPISODE_GUEST_CAST]: async ({ state, commit, dispatch }, payload) => {
    try {
      commit(MU_SET_DETAIL_EPISODE_GUEST_LOADING, true)
      await refreshApi();
      const axiosData = {
        method: "post",
        url: apiUrl + "/castinfo",
        headers: {
          authorization: sessionStorage.getItem("access-token"),
        },
        data: payload
      };
      const respObj = await axios(axiosData);
      if (respObj && respObj.status === 200) {
        alert(respObj.data.message)
        const { detail: { episode: { list: { selectedCell } } } } = state
        await dispatch(SET_DETAIL_EPISODE_SELECTED_CELL, {
          program_cid: payload.program_cid,
          cell: selectedCell,
          ep: selectedCell.ep
        })
      }
    } catch (err) {
      console.error(err);
      alert(err.response.data.message)
    } finally {
      commit(MU_SET_DETAIL_EPISODE_GUEST_LOADING, false)
    }
  },
  // 프로그램 디테일 에피소드 회차 리스트 셀렉트된 셀에 참조된 출연정보 추가
  [PUT_DETAIL_EPISODE_GUEST_CAST]: async ({ state, commit, dispatch }, payload) => {
    try {
      commit(MU_SET_DETAIL_EPISODE_GUEST_LOADING, true)
      await refreshApi();
      const { detail: { episode: { guest: { dialog: { data: { cid } } } } } } = state
      const axiosData = {
        method: "put",
        url: apiUrl + "/castinfo/" + cid,
        headers: {
          authorization: sessionStorage.getItem("access-token"),
        },
        data: payload
      };
      const respObj = await axios(axiosData);
      if (respObj && respObj.status === 200) {
        alert(respObj.data.message)
        const { detail: { episode: { list: { selectedCell } } } } = state
        await dispatch(SET_DETAIL_EPISODE_SELECTED_CELL, {
          program_cid: payload.program_cid,
          cell: selectedCell,
          ep: selectedCell.ep
        })
      }
    } catch (err) {
      console.error(err);
      alert(err.response.data.message)
    } finally {
      commit(MU_SET_DETAIL_EPISODE_GUEST_LOADING, false)
    }
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};