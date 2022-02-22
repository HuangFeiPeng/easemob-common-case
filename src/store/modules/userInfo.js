/*
 * @Author: Neo Huang
 * @Date: 2021-11-25 17:02:16
 * @LastEditTime: 2022-02-22 11:07:14
 * @LastEditors: Neo Huang
 * @Description: 
 * @FilePath: /easemob-common-case/src/store/modules/userInfo.js
 */
const UserInfo = {
  state: {
    loginUserInfo: {},
  },
  mutations: {
    SET_USER_INFO: (state, payload) => {

      state.loginUserInfo = {
        ...payload,
      };
    },
  },
  actions: {
    getUserInfo: ({
      commit
    }, params) => {

      const {
        users
      } = params;
      return new Promise((resolve, reject) => {
        WebIM.conn
          .fetchUserInfoById(users)
          .then((res) => {
            const {
              data
            } = res;
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
    setUserInfo: ({
      commit
    }, data) => {
      return new Promise((resolve, reject) => {
        WebIM.conn
          .updateOwnUserInfo({
            ...data,
          })
          .then((res) => {

            const {
              data
            } = res;
            commit('SET_USER_INFO', data);
            resolve(true);
          })
          .catch((e) => {
            reject(e);
          });
      });


    },
  },
  getters: {
    loginUserInfo: (state) => {
      return state.loginUserInfo;
    },
  },
};

export default UserInfo;