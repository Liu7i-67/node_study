/*
 * @Author: liu7i
 * @Date: 2022-08-08 17:13:34
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-08-10 09:59:19
 *
 * 获取神百指定url宝可梦基本信息
 */

import http from "node:https";
import cheerio from "cheerio";

// 即将抓取的连接
const url = "https://wiki.52poke.com/wiki/%E6%95%B2%E9%9F%B3%E7%8C%B4";

function getText(dom, select) {
  let text = dom(select).prop("innerText");
  if (text) {
    return text.replace(/\n/g, "");
  }
  return text;
}

function getTitle(dom, select) {
  let text = dom(select).prop("title");
  if (text) {
    return text.replace(/\n/g, "");
  }
  return text;
}

function replaceStr(str) {
  if (str) {
    return str.replace(/\n/g, "");
  }
  return str;
}

function getData(str) {
  const $ = cheerio.load(str);
  const obj = {};
  // 名称
  obj.name = getText($, "h1#firstHeading");
  // 全国图鉴编号
  obj.no = getText(
    $,
    "div.mw-parser-output table:nth-child(2) table.roundy.fulltable th.textblack.bgwhite"
  );
  // 属性
  obj.attribute = getText(
    $,
    "div.mw-parser-output table:nth-child(2) tbody tr:nth-child(3) td:nth-child(1) table table a>span>span:last-child"
  );
  // 种族值
  obj.raceValue = {
    hp: getText($, "tr.bgl-HP th div:nth-child(2)"),
    atk: getText($, "tr.bgl-攻击 th div:nth-child(2)"),
    def: getText($, "tr.bgl-防御 th div:nth-child(2)"),
    sAtk: getText($, "tr.bgl-特攻 th div:nth-child(2)"),
    sDef: getText($, "tr.bgl-特防 th div:nth-child(2)"),
    speed: getText($, "tr.bgl-速度 th div:nth-child(2)"),
  };
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
    try {
      getData(str);
    } catch (error) {
      console.log("-------------error----------------");
      console.log(error);
    }
  });
});
