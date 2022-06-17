import config from "./config";
// import Vue from "vue";

interface ObjectMapType {
  [key: string]: any | ObjectMapType | Function;
}

let webSocketMap: ObjectMapType = {};

let tips = {
  errorTips: (e: object) => `WebSocket: 错误，${JSON.stringify(e)}`,
  connectTips: "WebSocket: 已连接",
  messageTips: "WebSocket: 收到新消息",
  disconnectTips: "WebSocket: 已断开",
  noConnectTips: "请先建立WebSocket连接",
  repeatTips: "已存在相同的链接，请断开后再试",
};
let listeners = {
  onerror(e: object, msg: string) {},
  onopen(e: object, msg: string) {},
  onmessage(e: object, msg: string) {},
  onclose(e: object, msg: string) {},
};

function CWebSocket(this: any, key: string) {
  this.wsKey = null;
  this.ws = null;
  this.msg = [];
  this.createWebSocket = (url: string, options: ObjectMapType) => {
    // 默认监听器及提示语
    let _options: ObjectMapType = {
      ...tips,
      ...listeners,
      ...options,
    };
    if ("WebSocket" in window) {
      if (webSocketMap[key]) {
        // Vue.prototype.$message.warning({ text: _options.repeatTips });
        return;
      }
      this.ws = new WebSocket(`${config.webSocketURL}${url}`);
      webSocketMap[key] = this;
      this.ws.onerror = (e: ObjectMapType, msg: string) => {
        console.log("onerror", e);
        _options.onerror(e, msg);
        // Vue.prototype.$message.error({
        //   text: _options.errorTips(msg),
        // });
      };
      this.ws.onopen = (e: ObjectMapType, msg: string) => {
        console.log("onopen", e, msg);
        _options.onopen(e, msg);
        // Vue.prototype.$message.success({ text: _options.connectTips });
      };
      this.ws.onmessage = (e: ObjectMapType, msg: string) => {
        console.log("onmessage", e, msg);
        this.msg.push(msg);
        _options.onmessage(e, msg);
        // Vue.prototype.$message.success({ text: _options.messageTips })
      };
      this.ws.onclose = (e: ObjectMapType, msg: string) => {
        console.log("onclose", e, msg);
        delete webSocketMap[key];
        _options.onclose(e, msg);
        // if (e.code == 1000 || e.code == 1005)
        // Vue.prototype.$message.success({ text: _options.disconnectTips });
        // else
        //   Vue.prototype.$message.error({
        //     text: `连接已断开：${e.reason}` || _options.disconnectTips,
        //   });
      };
      if (_options.callback) _options.callback(this.ws);
    } else {
      alert("当前浏览器不支持");
      if (_options.callback) _options.callback(null);
      return;
    }
  };
  this.closeWebSocket = (options = {}) => {
    // 默认提示语
    let _options = {
      ...tips,
      ...options,
    };
    if (!this.ws) {
      // Vue.prototype.$message.warning({ text: _options.noConnectTips });
      return;
    }
    // this.ws.close(options.closeCode || 1000, options.closeReason || '')
    this.ws.close();
  };
  this.sendWebSocketMsg = (text: string, options: ObjectMapType) => {
    // 默认提示语
    let _options = {
      ...tips,
      ...options,
    };
    if (!this.ws) {
      // Vue.prototype.$message.warning({ text: _options.noConnectTips });
      return;
    }
    this.ws.send(text);
  };
}
CWebSocket.prototype.getWebSocketMap = () => {
  return webSocketMap;
};
CWebSocket.prototype.closeWebSocketByKey = (key: string, options = {}) => {
  if (!webSocketMap[key]) return false;
  webSocketMap[key].closeWebSocket(options);
  return true;
};

export default CWebSocket;
