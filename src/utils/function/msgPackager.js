/*
 * @Author: Neo Huang
 * @Date: 2022-02-21 23:33:44
 * @LastEditTime: 2022-02-25 00:11:37
 * @LastEditors: Neo Huang
 * @Description: 
 * @FilePath: /easemob-common-case/src/utils/function/msgPackager.js
 */
const defaultContent = (initMsg) => {
    let msgContent = {}
    switch (initMsg.type) {

        case 'txt':
            msgContent = {
                msg: initMsg.msg,
                type: initMsg.type,
            }
            break;
        case 'img':
            msgContent = {
                msg: initMsg.url,
                type: initMsg.type,
                width: initMsg.width,
                height: initMsg.height
            }
        case 'file':
            msgContent = {
                msg: initMsg.url,
                type: initMsg.type,
                width: initMsg.width,
                height: initMsg.height
            }
        default:
            break;
    }
    return msgContent

}
const msgPackger = (initMsg) => {
    let a =
        console.log('initMsginitMsginitMsg', initMsg, 'a', a)
    const myId = WebIM.conn.user;
    let packgeredMsg = {
        id: initMsg.id && initMsg.id,
        to: initMsg.to && initMsg.to || "",
        content: defaultContent(initMsg),
        chatType: initMsg.chatType,
        from: initMsg.from,
        isBeself: initMsg.from === myId ? true : false,
        ext: initMsg.ext,
        time: initMsg.time ? initMsg.time : Date.now(),
    }
    console.log('>>>>>开始处理结构消息', packgeredMsg)
    return packgeredMsg

}
export default msgPackger