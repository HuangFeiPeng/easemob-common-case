const MsgList = {
  state: {
    messageList: {},
    selectedObject: null, //点击会话列表选中的对象
  },
  mutations: {
    SET_SELECTED_OBJ: (state, data) => {
      state.selectedObject = Object.assign({}, data);
    },
    ADD_NEW_MESSAGE: (state, payload) => {
      console.log('>>>>>>开始执行添加一条新的消息', payload);
      let { key, msgBody } = payload;
      if (state.messageList[key]) {
        state.messageList[key].push(msgBody);
      } else {
        state.messageList[key] = [];
        state.messageList[key].push(msgBody);
      }
    },
  },
  actions: {
    //发送文本消息
    sendTextMessage: ({ commit, dispatch }, params) => {
      const { msgData, em_at_list, chatType, toId } = params;
      return new Promise((resolve, reject) => {
        let id = WebIM.conn.getUniqueId(); // 生成本地消息id
        let msg = new WebIM.message('txt', id); // 创建文本消息
        msg.set({
          msg: msgData, // 消息内容
          to: toId, // 接收消息对象（用户id）
          chatType: chatType, // 设置为单聊
          ext: {
            em_at_list,
          }, //扩展消息
          success: function (id, serverMsgId) {
            console.log('send private text Success');
          },
          fail: function (e) {
            // 失败原因:
            // e.type === '603' 被禁言
            // e.type === '605' 群组不存在
            // e.type === '602' 不在群组或聊天室中
            // e.type === '504' 撤回消息时超出撤回时间
            // e.type === '505' 未开通消息撤回
            // e.type === '506' 没有在群组或聊天室白名单
            // e.type === '501' 消息包含敏感词
            // e.type === '502' 被设置的自定义拦截捕获
            // e.type === '503' 未知错误
            console.log('Send private text error');
          },
        });
        WebIM.conn
          .send(msg.body)
          .then((res) => {
            const { serverMsgId } = res;
            let body = {
              id: serverMsgId,
              to: toId,
              from: WebIM.conn.user,
              content: {
                msg: msgData,
                type: 'txt',
              },
              isBeself: true,
              ext: msg.body.ext,
              time: Date.now(),
            };
            console.log('>>>消息发++++++送成功', body);
            commit('ADD_NEW_MESSAGE', { key: toId, msgBody: body });
            dispatch('getToDoUpdateLastMsg', { key: toId, msgBody: body });
            return resolve(res);
            // console.log('发送成功', res);
          })
          .catch((e) => {
            console.log('发送失败', e);
            return reject(e);
          });
      });
    },
  },
  getters: {
    selectedObject: (state) => {
      return state.selectedObject;
    },
  },
};
export default MsgList;
