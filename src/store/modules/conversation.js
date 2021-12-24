const Conversation = {
  state: {
    conversation: [],
  },
  mutations: {
    INIT_CONVERSATION_LIST: (state, list) => {
      state.conversation = Object.values(list);
    },
  },
  actions: {
    /* ------执行拉取会话列表数据【如获取为空则使用mock数据】------ */
    getSessionList: async ({ dispatch, commit }, params) => {
      const regexp = /.*@easemob.com$/;
      let {
        data: { channel_infos },
      } = await WebIM.conn.getSessionList();
      console.log('++++====', channel_infos);
      let conversationList = {};
      let userIdList = [];
      channel_infos.length > 0 &&
        channel_infos.map((item) => {
          const {
            unread_num,
            channel_id,
            meta: { id, timestamp, payload },
          } = item;
          let msgBody = Object.assign({}, JSON.parse(payload));
          let conversationObj = {
            id,
            timestamp,
            unread_num,
            from: msgBody.from,
            to: msgBody.to,
            ext: msgBody.ext,
            content: msgBody.bodies[0],
          };

          let chatType =
            (regexp.test(channel_id) && 'singleChat') || 'groupChat'; //判断是单聊会话还是群组或聊天室会话
          let channelId =
            WebIM.conn.user &&
            WebIM.conn.user === msgBody.from &&
            chatType === 'singleChat'
              ? msgBody.to
              : chatType === 'groupChat'
              ? msgBody.to
              : msgBody.from; //取相应的 会话id

          if (chatType === 'singleChat') {
            userIdList = [...userIdList, channelId];
          }
          conversationObj.channelId = channelId;
          conversationObj.chatType = chatType;
          return (conversationList[channelId] = conversationObj || {});
        });
      let res = await dispatch('getChannelUserInfo', userIdList);
      for (const key in res) {
        conversationList[key].userInfo = { ...res[key] };
      }
      commit('INIT_CONVERSATION_LIST', conversationList);
      // console.log('conversationList', conversationList);
      /**
        返回参数说明
        channel_infos - 所有会话
        channel_id - 会话id, username@easemob.com表示单聊，groupid@conference.easemob.com表示群聊
        meta - 最后一条消息
            from - last msg的from来源
            id - 该消息的servermsgid
            payload - 该消息的完整体
            timestamp - last msg 时间戳
            to -该消息去向
        unread_num - 当前会话的未读消息数
        
        data{
            channel_infos:[
                {
                    channel_id: 'easemob-demo#chatdemoui_username@easemob.com',
                    meta: {},
                    unread_num: 0
                },
                {
                    channel_id: 'easemob-demo#chatdemoui_93734273351681@conference.easemob.com',
                    meta: {
                        from: "easemob-demo#chatdemoui_zdtest@easemob.com/webim_1610159114836",
                        id: "827197124377577640",
                        payload: "{"bodies":[{"msg":"1","type":"txt"}],"ext":{},"from":"zdtest","to":"93734273351681"}",
                        timestamp: 1610161638919,
                        to: "easemob-demo#chatdemoui_93734273351681@conference.easemob.com"
                    },
                    unread_num: 0
                }
            ]
        }
        */
      // });
    },
    /* --------------------拉取会话用户属性--------------------- */
    getChannelUserInfo: async ({ commit }, params) => {
      console.log('>>>>执行拉取会话用户属性', params);
      let { data } = await WebIM.conn.fetchUserInfoById([...params]);
      return Promise.resolve(data);
    },
  },
  getters: {
    conversationList: (state) => {
      return state.conversation;
    },
  },
};

export default Conversation;
