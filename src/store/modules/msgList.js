/*
 * @Author: Neo Huang
 * @Date: 2021-12-26 18:24:54
 * @LastEditTime: 2022-02-25 00:21:01
 * @LastEditors: Neo Huang
 * @Description:
 * @FilePath: /easemob-common-case/src/store/modules/msgList.js
 */
import msgPackger from '@/utils/function/msgPackager';
import { MESSAGR_ERROR_CODE } from '@/constants/errorCode';
import { Promise } from 'core-js';
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
      console.log('>>>ADD_NEW_MESSAGE>>>>', msgBody);
      //此处重新赋值messageList为解决Vue中监听不到对象内部变化问题。
      const todoUpdateMsgList = Object.assign({}, state.messageList);
      const myId = WebIM.conn.user;

      const key =
        msgBody.chatType === 'singleChat'
          ? msgBody.to === myId
            ? msgBody.from
            : msgBody.to
          : msgBody.to;
      console.log('>>>>>>>key', key);
      if (!todoUpdateMsgList[key]) {
        todoUpdateMsgList[key] = [];
        todoUpdateMsgList[key].push(msgBody);
      } else {
        todoUpdateMsgList[key].push(msgBody);
      }
      state.messageList = todoUpdateMsgList;
    },
    DELETE_MESSAGE: (state, payload) => {
      const todoUpdateMsgList = Object.assign({}, state.messageList);
      const { key, index } = payload;
      todoUpdateMsgList[key].splice(index, 1);
      state.messageList = todoUpdateMsgList;
    },
    UPTATE_MESSAGE: (state, payload) => {
      const todoUpdateMsgList = Object.assign({}, state.messageList);
      const { key, recallId } = payload;
      todoUpdateMsgList[key].map((item) => {
        console.log(recallId);
        if (item.id === recallId) {
          return (item.recallStatus = true);
        }
      });
      state.messageList = todoUpdateMsgList;
    },
  },
  actions: {
    //发送文本消息
    sendTextMessage: ({ commit, dispatch }, params) => {
      const { msgData, em_at_list, chatType, citeMsg, toId } = params;
      console.log('>>sendTextMessage>>>', citeMsg);
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
        };
        if (Object.keys(citeMsg).length > 0) option.ext.citeMsg = citeMsg; //citeMsg不为空则新增citeMsg属性
        let msg = WebIM.message.create(option);

        WebIM.conn
          .send(msg)
          .then((res) => {
            const { serverMsgId } = res;
            msg.id = serverMsgId;
            let msgBody = msgPackger(msg);
            dispatch('getToDoUpdateLastMsg', msgBody);
            commit('ADD_NEW_MESSAGE', msgBody);
            return resolve(res);
          })
          .catch((e) => {
            console.log('error', e);
            return reject(e);
          });
      });
    },
    //合并转发消息 【基于自定义消息实现】
    sendTransmitMessage: ({ rootState, dispatch, commit }, payload) => {
      // console.log('>>>>>>>开始转发', rootState, payload)
      const { usersList, clickMessage } = payload;
      const { conversation } = rootState.Conversation;
      console.log('Conversation', conversation, clickMessage);
      usersList.length > 0 &&
        usersList.forEach((item) => {
          console.log(
            '要发的目标id为',
            item,
            '要发的目标类型为',
            conversation[item].chatType
          );
          let option = {
            chatType: conversation[item].chatType,
            type: 'custom',
            to: item,
            customEvent: 'transmitMsg', // 自定义事件。
            customExts: {
              ...clickMessage,
            }, // 消息内容，key/value 需要 string 类型。
            ext: {}, // 消息扩展。
          };
          let msg = WebIM.message.create(option);
          WebIM.conn
            .send(msg)
            .then((res) => {
              const { serverMsgId } = res;
              msg.id = serverMsgId;
              let msgBody = msgPackger(msg);
              dispatch('getToDoUpdateLastMsg', msgBody);
              commit('ADD_NEW_MESSAGE', msgBody);
              console.log('success', msgBody); // 消息发送成功。
            })
            .catch((e) => {
              console.log('fail', e); // 如禁言或拉黑后消息发送失败。
            });
        });

      // let msg = WebIM.message.create(option)
      // connection.send(msg).then(() => {
      //   console.log('success'); // 消息发送成功。
      // }).catch((e) => {
      //   console.log("fail"); // 如禁言或拉黑后消息发送失败。
      // });
    },
    //删除消息

    //撤回消息
    startRecallMessage: ({ commit }, payload) => {
      const msgData = payload;
      const { id, to, chatType } = msgData;
      let option = {
        mid: id,
        to: to,
        chatType: chatType,
      };
      return new Promise(async (resolve, reject) => {
        try {
          let res = await WebIM.conn.recallMessage(option);
          commit('UPTATE_MESSAGE', {
            key: to,
            recallId: id,
          });
          //todo更新会话列表
          resolve(res);
        } catch (error) {
          // 消息撤回失败 (超过 2 分钟)。
          console.log('fail', error);
          reject(error);
        }
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
