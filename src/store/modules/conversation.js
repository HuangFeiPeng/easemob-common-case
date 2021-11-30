 const Conversation = {
   state: {
     index: 1
   },
   mutations: {

   },
   actions: {
     getSessionList: ({
       commit
     }, params) => {
       WebIM.conn.getSessionList().then((res) => {
         console.log(res)
         /**
         返回参数说明
         channel_infos - 所有会话
         channel_id - 会话id, username@easemob.com表示单聊，groupid@conference.easemob.com表示群聊
         meta - 最后一条消息
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

       })
     }
   },
   getters: {

   }
 }

 export default Conversation