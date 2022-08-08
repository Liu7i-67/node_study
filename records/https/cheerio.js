/*
 * @Author: liu7i
 * @Date: 2022-08-08 17:13:34
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-08-08 18:07:08
 *
 * cheerio爬虫
 */

const http = require("node:https");
const cheerio = require("cheerio");

// 即将抓取的连接
const url = "https://wiki.52poke.com/wiki/%E6%95%B2%E9%9F%B3%E7%8C%B4";

function getText(dom, select) {
  return dom(select).prop("innerText").replace(/\n/g, "");
}

function getData(str) {
  const $ = cheerio.load(str);
  const obj = {};
  obj.name = getText($, "h1#firstHeading");
  obj.tips = getText($, "div.mw-parser-output p:nth-child(3)");
  obj.publicTime = getText($, "div.mw-parser-output p:nth-child(4)");
  obj.no = getText(
    $,
    "div.mw-parser-output table:nth-child(2) table.roundy.fulltable th.textblack.bgwhite"
  );
  obj.attribute = getText(
    $,
    "div.mw-parser-output table:nth-child(2) tbody tr:nth-child(3) td:nth-child(1) table table a>span>span:last-child"
  );
  obj.type = getText(
    $,
    "div.mw-parser-output table:nth-child(2) tbody tr:nth-child(3) td:nth-child(2) table table td"
  );

  console.log("-------------------宝可梦信息-----------------");
  console.log(obj);
}

console.log("数据读取...");

http.get(url, function (res) {
  let str = "";
  // 绑定方法获取网页内容
  res.on("data", function (chunk) {
    str += chunk;
  });
  // 输入获取完毕
  res.on("end", function () {
    console.log("数据处理...");
    getData(str);
  });
});
