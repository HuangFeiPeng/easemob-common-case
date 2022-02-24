/*
 * @Author: Neo Huang
 * @Date: 2021-12-26 18:24:54
 * @LastEditTime: 2022-02-25 00:21:01
 * @LastEditors: Neo Huang
 * @Description: 
 * @FilePath: /easemob-common-case/src/store/modules/msgList.js
 */
import msgPackger from '@/utils/function/msgPackager'

const MsgList = {
  state: {
    messageList: {},
    selectedObject: null, //点击会话列表选中的对象
  },
  mutations: {
    SET_SELECTED_OBJ: (state, data) => {
      state.selectedObject = Object.assign({}, data);
    },
    ADD_NEW_MESSAGE: (state, msgBody) => {
      console.log('>>>ADD_NEW_MESSAGE>>>>', msgBody)
      //此处重新赋值messageList为解决Vue中监听不到对象内部变化问题。
      const todoUpdateMsgList = Object.assign({}, state.messageList);
      const myId = WebIM.conn.user;

      const key = msgBody.chatType === 'singleChat' ? msgBody.to === myId ? msgBody.from : msgBody.to : msgBody.to
      console.log('>>>>>>>key', key)
      if (!todoUpdateMsgList[key]) {
        todoUpdateMsgList[key] = []
        todoUpdateMsgList[key].push(msgBody)
      } else {
        todoUpdateMsgList[key].push(msgBody)
      }

      state.messageList = todoUpdateMsgList;
    },
  },
  actions: {
    //发送文本消息
    sendTextMessage: ({
      commit,
      dispatch
    }, params) => {
      const {
        msgData,
        em_at_list,
        chatType,
        toId
      } = params;
      console.log('>>sendTextMessage>>>', params)
      return new Promise((resolve, reject) => {
        let option = {
          msg: msgData, // 消息内容
          from: WebIM.conn.user,
          to: toId, // 接收消息对象（用户id）
          type: 'txt', // 消息类型。
          chatType: chatType,
          ext: {
            em_at_list,
          }, //扩展消息
        }
        let msg = WebIM.message.create(option);
        WebIM.conn.send(msg).then((res) => {
          const {
            serverMsgId
          } = res;
          msg.id = serverMsgId
          let msgBody = msgPackger(msg)
          dispatch('getToDoUpdateLastMsg', msgBody);
          commit('ADD_NEW_MESSAGE', msgBody);
          return resolve(res);
        }).catch((e) => {
          console.log('error', e)
          return reject(e);
        })
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