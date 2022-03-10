/*
 * @Author: Neo Huang
 * @Date: 2022-02-21 23:33:44
 * @LastEditTime: 2022-02-25 00:11:37
 * @LastEditors: Neo Huang
 * @Description:
 * @FilePath: /easemob-common-case/src/utils/function/msgPackager.js
 */
/* 消息处理工厂函数 */
const defaultContent = (initMsg) => {
  let msgContent = {};
  switch (initMsg.type) {
    case 'txt':
      msgContent = {
        msg: initMsg.msg,
        type: initMsg.type,
      };
      break;
    case 'img':
      msgContent = {
        msg: initMsg.url,
        type: initMsg.type,
        width: initMsg.width,
        height: initMsg.height,
      };
      break;
    case 'file':
      msgContent = {
        msg: initMsg.url,
        type: initMsg.type,
        width: initMsg.width,
        height: initMsg.height,
      };
      break;
    case 'custom':
      msgContent = {
        customEvent: initMsg.customEvent,
        customExts: initMsg.customExts,
        type: initMsg.type,
      };
      break;
    default:
      break;
  }
  return msgContent;
};
/* 处理发送接收消息统一格式 */
const msgPackger = (initMsg) => {
  const myId = WebIM.conn.user;
  let packgeredMsg = {
    id: initMsg.id && initMsg.id,
    to: (initMsg.to && initMsg.to) || '',
    content: defaultContent(initMsg),
    chatType: initMsg.chatType,
    from: initMsg.from ? initMsg.from : myId,
    isBeself: initMsg.from === '' || initMsg.from === myId ? true : false,
    ext: initMsg.ext,
    time: initMsg.time ? initMsg.time : Date.now(),
  };
  return packgeredMsg;
};
export default msgPackger;
