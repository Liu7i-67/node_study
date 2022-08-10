import http from "http";

// 服务运行的地址
const hostName = "127.0.0.1";
// 服务运行的端口
const port = 6702;

// 创建服务
const server = http.createServer((req, res) => {
  /**
   * 设置返回值状态码
   *
   * 100-Continue（继续）
   * 这个临时响应表明，如果请求已经完成，客户应该继续请求或忽略该响应。
   *
   * 101-Switching Protocols（切换协议）
   * 该代码是在响应客户端的升级请求头时发送的，并表明服务器正在切换到哪种协议。
   *
   * 102-Processing（处理）
   * 该代码表示服务器已经收到并正在处理该请求，但还没有回应。
   *
   * 103-Early Hints（预告）
   * 这个状态代码主要是为了与链接头一起使用，让用户代理在服务器准备响应时开始预加载资源。
   *
   * 未完待续...
   * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
   *
   */
  res.statusCode = 200;
  // 设置返回内容
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World\n");
});

server.listen(port, hostName, () => {
  console.log("服务运行中ing\n");
  console.log(`服务地址：http://${hostName}:${port}/`);
});
