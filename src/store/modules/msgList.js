const MsgList = {
  state: {
    selectedObject: null,
  },
  mutations: {
    SET_SELECTED_OBJ: (state, data) => {
      state.selectedObject = Object.assign({}, data);
    },
  },
  actions: {},
  getters: {
    selectedObject: (state) => {
      return state.selectedObject;
    },
  },
};
export default MsgList;
