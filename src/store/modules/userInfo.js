const UserInfo = {
  state: {
    loginUserInfo: {},
  },
  mutations: {
    SET_USER_INFO: (state, payload) => {
      console.log(payload);
      state.loginUserInfo = {
        ...payload,
      };
    },
  },
  actions: {
    getUserInfo: ({ commit }, params) => {
      console.log('>>getUserInfo>>>', params);
      const { users } = params;
      return new Promise((resolve, reject) => {
        WebIM.conn
          .fetchUserInfoById(users)
          .then((res) => {
            const { data } = res;
            if (!(users instanceof Array)) {
              let infos = data[users];
              infos.users = users;
              commit('SET_USER_INFO', infos);
            }
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    setUserInfo: ({ commit }, data) => {
      return new Promise((resolve, reject) => {
        WebIM.conn
          .updateOwnUserInfo({
            ...data,
          })
          .then((res) => {
            console.log('>>>>设置成功', res);
            const { data } = res;
            commit('SET_USER_INFO', data);
            resolve(true);
          })
          .catch((e) => {
            reject(e);
          });
      });

      // WebIM.conn.updateOwnUserInfo({
      //   ...data
      // }).then((res) => {
      //   console.log('>>>>设置成功', res)
      //   const {
      //     data
      //   } = res;
      //   commit('SET_USER_INFO', data)
      // })
    },
  },
  getters: {
    loginUserInfo: (state) => {
      return state.loginUserInfo;
    },
  },
};

export default UserInfo;
