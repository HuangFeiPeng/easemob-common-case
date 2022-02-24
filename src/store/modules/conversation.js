import {
  data
} from '@/mock/conversation'
import {
  MSGTYPE
} from '@/constant/msgType'
const Conversation = {
  state: {
    conversation: {},
  },
  mutations: {
    INIT_CONVERSATION_LIST: (state, list) => {

      state.conversation = list;
    },
    UPDATE_CONVERSATION_LIST: (state, payload) => {

      const conversation = Object.assign({}, state.conversation);
      const {
        key,
        msgBody,
      } = payload;
      //如果该消息为自己所发送
      let converTarget = conversation[key] || [];
      if (msgBody.isBeself) {

        for (const key in msgBody) {

          converTarget[key] = msgBody[key]
        }
        state.conversation = conversation
      } else {
        for (const key in msgBody) {

          converTarget[key] = msgBody[key]
        }
        state.conversation = conversation
      }
    },
    SET_GROUPINFO: (state, data) => {
      let conversation = Object.assign({}, state.conversation);
      let {
        id
      } = data;
      conversation[id].groupInfo = data;
      state.conversation = conversation;

    },
  },
  actions: {
    /* ------执行拉取会话列表数据【如获取为空则使用mock数据】------ */
    getSessionList: async ({
      dispatch,
      commit
    }, params) => {

      const regexp = /.*@easemob.com$/;
      const {
        data: {
          channel_infos
        }
      } = data; //从mock中取

      /* 注释部分为从接口调用取会话的方法 */
      // let {
      //   data: {
      //     channel_infos
      //   },
      // } = await WebIM.conn.getSessionList(); //取出会话列表channel_infos

      let conversationList = {};
      let userIdList = [];
      let groupIdList = [];
      //遍历会话列表
      channel_infos.length > 0 &&
        channel_infos.map(async (item) => {
          const {
            unread_num,
            channel_id,
            meta: {
              id,
              timestamp,
              payload
            },
          } = item; //取出会话数据
          let msgBody = Object.assign({}, JSON.parse(payload)); //转换payload数据
          let conversationObj = {
            id,
            timestamp,
            unread_num,
            from: msgBody.from,
            to: msgBody.to,
            ext: msgBody.ext,
            content: msgBody.bodies[0],
          }; //重组会话数据结构
          let chatType =
            (regexp.test(channel_id) && 'singleChat') || 'groupChat'; //判断是单聊会话还是群组或聊天室会话
          let channelId =
            WebIM.conn.user &&
            WebIM.conn.user === msgBody.from &&
            chatType === 'singleChat' ?
            msgBody.to :
            chatType === 'groupChat' ?
            msgBody.to :
            msgBody.from; //取相应的 会话id 主要差异在于取单聊或者群组的差异 单聊取from 或to 群组则只取to

          if (chatType === 'singleChat') {
            //如果类型为单聊则放入userIdList 等待取其对应的用户属性
            userIdList = [...userIdList, channelId];
          }
          if (chatType === 'groupChat') {
            groupIdList = [...groupIdList, channelId];
          }
          conversationObj.channelId = channelId; //conversationObj中追加 channelId
          conversationObj.chatType = chatType; //conversationObj中追加 会话类型
          return (conversationList[channelId] = conversationObj || {}); //conversationList中以channelId 为key 加上对应的conversationObj
        });
      let res = await dispatch('getChannelUserInfo', userIdList); //执行取对应的用户属性
      for (const key in res) {
        conversationList[key].userInfo = {
          ...res[key]
        };
      }
      if (groupIdList.length != 0) dispatch('getGroupInfo', {
        groupIdList
      });
      commit('INIT_CONVERSATION_LIST', conversationList);
    },
    /* --------------------拉取会话用户属性--------------------- */
    getChannelUserInfo: async ({
      commit
    }, params) => {
      console.log('>>>>>拉取会话用户属性', params)
      let {
        data
      } = await WebIM.conn.fetchUserInfoById([...params]);
      return Promise.resolve(data);
    },
    /* --------------------拉取群组详情--------------------- */
    getGroupInfo: async ({
      commit
    }, params) => {

      let {
        groupIdList
      } = params;
      groupIdList.length > 0 &&
        groupIdList.forEach(async (item) => {
          WebIM.conn.getGroupInfo({
            groupId: item
          }).then((res) => {
            let groupInfo = res['data'][0];
            commit('SET_GROUPINFO', groupInfo);
          });
        });

      //
    },
    /* --------------------拿到要更新的lastMsg--------------------- */
    getToDoUpdateLastMsg: ({
      commit
    }, parmas) => {
      console.log('>>>getToDoUpdateLastMsg>>', parmas)
      const myId = WebIM.conn.user;
      if (parmas.from === myId) {
        let key = parmas.to
        commit('UPDATE_CONVERSATION_LIST', {
          key,
          msgBody: parmas
        });

      } else {
        let key = parmas.chatType === ("groupChat" || "chatRoom") ? parmas.to : parmas.from;
        console.log('>>>>>>>>>接收他人的消息', key, parmas)
        commit('UPDATE_CONVERSATION_LIST', {
          key,
          msgBody: parmas
        });
      }

    },
  },
  getters: {
    conversationList: (state) => {
      return state.conversation;
    },
  },
};

export default Conversation;