/*
 * @Author: liu7i
 * @Date: 2022-08-09 17:45:10
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-08-09 17:57:58
 *
 * @tips：获取神百全国图鉴信息
 */

const http = require("node:https");
const cheerio = require("cheerio");

let url =
  "https://wiki.52poke.com/wiki/%E5%AE%9D%E5%8F%AF%E6%A2%A6%E5%88%97%E8%A1%A8%EF%BC%88%E6%8C%89%E5%85%A8%E5%9B%BD%E5%9B%BE%E9%89%B4%E7%BC%96%E5%8F%B7%EF%BC%89";

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

const pokemonList = [];

// 需要抓取的地区
const area = [
  "关都",
  "城都",
  "丰缘",
  "神奧",
  "合眾",
  "卡洛斯",
  "阿羅拉",
  "伽勒尔",
];

function getData(str) {
  const $ = cheerio.load(str);

  //   area.forEach((i) => {

  //   });

  $("table.s-关都>tbody:nth-child(2) tr").each(function (i) {
    const item = {
      id: i,
      no: replaceStr($(this).find("td:nth-child(1)").prop("innerText")),
      name: replaceStr($(this).find("td:nth-child(3) a").prop("innerText")),
    };
    console.log(item);
    pokemonList.push(item);
  });

  console.log("-------------------宝可梦信息-----------------");
  console.log(pokemonList);
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
