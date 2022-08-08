/*
 * @Author: liu7i
 * @Date: 2022-08-08 16:26:45
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-08-08 17:13:04
 */

const { writeFile, readFile } = require("node:fs");

// 读取缓存网页内容
const readText = () => {
  console.log("正在读取...");
  readFile("test.html", { encoding: "utf8" }, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("读取成功");
    textVal = data;
    getVal(data);
  });
};

// 处理读取到的内容
const getVal = (text) => {
  console.log("处理ing");
  const obj = {};

  const name = text.match(
    /<h1 id="firstHeading" class="firstHeading" lang="zh">(\S*)<\/h1>/
  );
  obj.name = name[1] || "名称获取失败";

  console.log("------------宝可梦信息-----------------");
  console.log(obj);
};

readText();
