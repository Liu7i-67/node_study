/*
 * @Author: liu7i
 * @Date: 2022-08-09 17:45:52
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-08-10 10:00:36
 *
 * @tips 下载网页到本地文件
 */

import http from "node:https";
import { createWriteStream } from "node:fs";
import { Buffer } from "node:buffer";

// 创建一个写入流
const ws = createWriteStream("list.html");

// 数据存储
const arr = [];

// 将网页内容写入文件
const writeFn = () => {
  console.log("还剩", arr.length, "条待写入");
  if (arr.length === 0) {
    console.log("没了");
    ws.close();
    // 开始读取内容中的有效信息
    return;
  }

  const item = arr.splice(0, 1);
  ws.write(item[0], writeFn);
};

// 发起请求读取网页内容
http
  .get(
    "https://wiki.52poke.com/wiki/%E5%AE%9D%E5%8F%AF%E6%A2%A6%E5%88%97%E8%A1%A8%EF%BC%88%E6%8C%89%E5%85%A8%E5%9B%BD%E5%9B%BE%E9%89%B4%E7%BC%96%E5%8F%B7%EF%BC%89",
    (res) => {
      console.log("statusCode:", res.statusCode);
      console.log("headers:", res.headers);

      res.on("data", (d) => {
        arr.push(Buffer.from(d, {}));
      });

      res.on("end", () => {
        console.log("读取完毕，开始写入");
        writeFn();
      });
    }
  )
  .on("error", (e) => {
    console.error(e);
  });
