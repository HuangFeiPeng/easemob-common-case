import websdk from 'easemob-websdk'; //引入环信SDK
import config from './EasemobConfig'; //引入Config配置文件
let WebIM = {};
let conn = {};
WebIM = websdk;
WebIM.config = config;
WebIM.config = config;
conn = WebIM.conn = new WebIM.connection({
  appKey: WebIM.config.appkey,
  isHttpDNS: WebIM.config.isHttpDNS,
  isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
  https: WebIM.config.https,
  url: WebIM.config.socketServer,
  apiUrl: WebIM.config.restServer,
  isAutoLogin: WebIM.config.isAutoLogin,
  autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
  autoReconnectInterval: WebIM.config.autoReconnectInterval,
  delivery: WebIM.config.delivery,
  useOwnUploadFun: WebIM.config.useOwnUploadFun,
});

export default WebIM;
