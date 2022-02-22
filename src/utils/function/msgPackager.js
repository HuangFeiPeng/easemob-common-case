/*
 * @Author: Neo Huang
 * @Date: 2022-02-21 23:33:44
 * @LastEditTime: 2022-02-22 11:27:01
 * @LastEditors: Neo Huang
 * @Description: 
 * @FilePath: /easemob-common-case/src/utils/function/msgPackager.js
 */
import {
    MSGTYPE,
    CHAT_TYPE
} from '@/constant/msgType'
const msgPackger = (initMsg) => {
    const myId = WebIM.conn.user;
    let packgeredMsg = {
        id: initMsg.mid ? initMsg.mid : initMsg.id,
        to: initMsg.to && initMsg.to || "",
        content: {
            msg: initMsg.msg ? initMsg.msg : initMsg.sourceMsg,
            type: initMsg.contentsType ? MSGTYPE[initMsg.contentsType] : initMsg.type,
        },
        chatType: initMsg.chatType ? initMsg.chatType : CHAT_TYPE[initMsg.type],
        from: initMsg.from ? initMsg.from : "",
        isBeself: initMsg.from === myId ? true : false,
        ext: initMsg.ext,
        time: initMsg.time ? initMsg.time : Date.now(),
    }
    console.log('>>>>>开始处理结构消息', packgeredMsg)
    return packgeredMsg

}
export default msgPackger