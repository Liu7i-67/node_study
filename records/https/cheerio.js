/*
 * @Author: liu7i
 * @Date: 2022-08-08 17:13:34
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-08-09 17:37:47
 *
 * cheerio爬虫
 */

const http = require("node:https");
const cheerio = require("cheerio");

// 即将抓取的连接
const url = "https://wiki.52poke.com/wiki/%E6%95%B2%E9%9F%B3%E7%8C%B4";
// const url =
//   "https://wiki.52poke.com/wiki/%E7%B4%A2%E5%B0%94%E8%BF%A6%E9%9B%B7%E6%AC%A7";

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
  // 介绍
  obj.tips = getText($, "div.mw-parser-output p:nth-child(3)");
  // 公布时间
  obj.publicTime = getText($, "div.mw-parser-output p:nth-child(4)");
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
  // 类型
  obj.type = getText(
    $,
    "div.mw-parser-output table:nth-child(2) tbody tr:nth-child(3) td:nth-child(2) table table td"
  );

  const characteristics = [];

  // $(
  //   "div#mw-content-text>div.mw-parser-output>table:nth-child(2)>tbody>tr:nth-child(1)>td>table>tbody>tr:nth-child(4)>td:nth-child(1)>table table tr td"
  // ).each(function () {
  //   characteristics.push({
  //     content: replaceStr($(this).prop("innerText")),
  //     title: replaceStr($(this).find("a").prop("innerText")),
  //     isHidden: !!$(this).find("small").length,
  //   });
  // });
  $(
    "div.mw-parser-output>table:nth-child(2)>tbody>tr:nth-child(4) td table table tr td"
  ).each(function () {
    characteristics.push({
      content: replaceStr($(this).prop("innerText")),
      title: replaceStr($(this).find("a").prop("innerText")),
      isHidden: !!$(this).find("small").length,
    });
  });
  // 特性
  obj.characteristics = characteristics;
  // 100级所需经验值
  obj.exp100 = getText(
    $,
    "div.mw-parser-output table:nth-child(2) tbody tr:nth-child(5) table table td"
  );
  // 身高
  obj.height = getText(
    $,
    "div.mw-parser-output table:nth-child(2) tbody tr:nth-child(8)>td:nth-child(1) table table td"
  );
  // 体重
  obj.weight = getText(
    $,
    "div.mw-parser-output table:nth-child(2) tbody tr:nth-child(8)>td:nth-child(2) table table td"
  );
  // 体型
  obj.bodyType = getTitle(
    $,
    "div.mw-parser-output table:nth-child(2) tbody tr:nth-child(9)>td:nth-child(1) table table a"
  );
  // 脚印
  obj.footType = getTitle(
    $,
    "div.mw-parser-output table:nth-child(2) tbody tr:nth-child(9)>td:nth-child(2) table table a"
  );
  // 图鉴颜色
  obj.galleryColor = getText(
    $,
    "div.mw-parser-output table:nth-child(2) tbody tr:nth-child(10)>td:nth-child(1) table table a span"
  );
  // 捕获率
  obj.captureRate = {
    content: getText(
      $,
      "div.mw-parser-output table:nth-child(2) tbody tr:nth-child(10)>td:nth-child(2) table table td"
    ),
    rate: getText(
      $,
      "div.mw-parser-output table:nth-child(2) tbody tr:nth-child(10)>td:nth-child(2) table table td span"
    ),
    rateTips: getTitle(
      $,
      "div.mw-parser-output table:nth-child(2) tbody tr:nth-child(10)>td:nth-child(2) table table td span"
    ),
  };

  let noSex =
    getText(
      $,
      "div.mw-parser-output table:nth-child(2) tbody tr:nth-child(11) td  table table table tr:nth-child(2) td"
    ) === "无性别";

  // 性别比例
  obj.sexRatio = noSex
    ? "无性别"
    : {
        man: getText(
          $,
          "div.mw-parser-output table:nth-child(2) tbody tr:nth-child(11) td  table table table tr:nth-child(2) span:nth-child(1)"
        ),
        woman: getText(
          $,
          "div.mw-parser-output table:nth-child(2) tbody tr:nth-child(11) td  table table table tr:nth-child(2) span:nth-child(2)"
        ),
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
