// user = 관심 제조사 정보

// Getters
export const DATA = 'user/DATA';
export const LOADING = 'user/LOADING';

// Mutations
export const MU_SET_STATE = 'user/MU_SET_STATE';
export const MU_SET_LOADING = 'user/MU_SET_LOADING';
export const MU_SET_DATA = 'user/MU_SET_DATA';

// Actions
export const SET_STATE = 'user/SET_STATE';
export const SET_LOADING = 'user/SET_LOADING';
export const SET_DATA = 'user/SET_DATA';

const initialState = () => {
  return {
    data: {},
    loading: false,
  };
};

const state = initialState();

const getters = {
  [DATA]: state => {
    return state.data;
  },
  [LOADING]: state => {
    return state.loading;
  },
};

const mutations = {
  [MU_SET_DATA]: (state, response) => {
    state.data = response
  },
  [MU_SET_LOADING]: (state, loading) => {
    state.loading = loading;
  },
};

const actions = {
  [SET_LOADING]: ({
    commit
  }, loading) => {
    commit(MU_SET_LOADING, loading);
  },
  [SET_DATA]: ({
    commit
  }, response) => {
    commit(MU_SET_DATA, response);
  },
};

export default {
  state,
  mutations,
  actions,
  getters
};