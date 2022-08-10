#!/usr/bin/node
import http from "http";
import minimist from "minimist";

// 服务运行的地址
const hostName = "127.0.0.1";
// 服务运行的端口
const port = 6702;

// 创建服务
const server = http.createServer((req, res) => {
  // 设置返回状态码
  res.statusCode = 200;
  // 设置返回内容类型
  res.setHeader("Content-Type", "text/html");
  // 结束响应并设置返回内容
  res.end(`
  <!DOCTYPE html>
  <html lang="zh-CN">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>node:http</title>
      <style>
        body{
          margin:0;
          min-height:100vh;
          background:#000;
          color:#fff;
        }
      </style>
  </head>
  <body>
      <div>Hello Word</div>
      <div>hot refresh</div>
  </body>
  </html>
  `);
});

server.listen(port, hostName, () => {
  console.log("服务运行中ing\n");
  console.log(`服务地址：http://${hostName}:${port}/`);
  // 读取启动参数 尝试启动命令ts-node s1_index.ts --name=qbb --age=24 查看效果
  console.log("运行参数：", minimist(process.argv));
});

// next https://nodejs.dev/learn/output-to-the-command-line-using-nodejs
