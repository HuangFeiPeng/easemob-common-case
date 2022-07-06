/*
 * @Author: Neo Huang
 * @Date: 2022-02-16 15:11:16
 * @LastEditTime: 2022-02-16 15:54:40
 * @LastEditors: Neo Huang
 * @Description:
 * @FilePath: /easemob-common-case/src/mock/conversation.js
 */

export const data = {
  data: {
    channel_infos: [
      {
        channel_id: 'easemob-demo#chatdemoui_pfh@easemob.com',
        meta: {
          from: 'easemob-demo#chatdemoui_pfh@easemob.com/ios_a1f94896-25f8-fd22-163a-d7348adf2fc1',
          id: '976806269845243900',
          payload:
            '{"bodies":[{"file_length":95129,"filename":"image","secret":"EAKtgI73EeyAQdE5rOBg-OKO0QQXcvMZ3_T92wg6h8JGawoB","size":{"height":1076.0,"width":497.0},"type":"img","url":"http://a1.easemob.com/easemob-demo/chatdemoui/chatfiles/10028670-8ef7-11ec-a465-3f4020dbce22"}],"ext":{},"from":"pfh","to":"hfp"}',
          timestamp: Date.now(),
          to: 'easemob-demo#chatdemoui_hfp@easemob.com',
        },
        unread_num: 1,
      },
      {
        channel_id: 'easemob-demo#chatdemoui_pfh2@easemob.com',
        meta: {
          from: 'easemob-demo#chatdemoui_hfp@easemob.com/ios_a1f94896-25f8-fd22-163a-d7348adf2fc1',
          id: '976806269845243902',
          payload:
            '{"bodies":[{"file_length":95129,"filename":"image","secret":"EAKtgI73EeyAQdE5rOBg-OKO0QQXcvMZ3_T92wg6h8JGawoB","size":{"height":1076.0,"width":497.0},"type":"img","url":"http://a1.easemob.com/easemob-demo/chatdemoui/chatfiles/10028670-8ef7-11ec-a465-3f4020dbce22"}],"ext":{},"from":"hfp","to":"pfh2"}',
          timestamp: Date.now(),
          to: 'easemob-demo#chatdemoui_pfh2@easemob.com',
        },
        unread_num: 1,
      },
      {
        channel_id:
          'easemob-demo#chatdemoui_186227793920002@conference.easemob.com',
        meta: {
          from: 'easemob-demo#chatdemoui_pfh3@easemob.com/android_3792e6fd-6ea6-4382-b0d7-3ee99ead3c08',
          id: '976816703709124664',
          payload:
            '{"bodies":[{"msg":"@我的昵称 你好","type":"txt"}],"ext":{"em_at_list":["hfp"]},"from":"pfh3","to":"186227793920002"}',
          timestamp: 1644997661878,
          to: 'easemob-demo#chatdemoui_186227793920002@conference.easemob.com',
        },
        unread_num: 14,
      },
    ],
  },
};
