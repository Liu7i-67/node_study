/*
 * @Author: liu7i
 * @Date: 2022-08-09 17:45:10
 * @Last Modified by: liu71
 * @Last Modified time: 2022-10-10 23:15:55
 *
 * @tips：获取神百全国图鉴信息
 */

import http from "node:https";
import { createWriteStream } from "node:fs";
import cheerio from "cheerio";

// 宝可梦列表url
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
const pokemonListText = [];

// 创建一个写入流
const ws = createWriteStream("pokemonList.json");

// 将网页内容写入文件
const writeFn = () => {
  console.log("还剩", pokemonListText.length, "条待写入");
  if (pokemonListText.length === 0) {
    console.log("写入完毕");
    ws.write("]", () => {
      ws.close();
    });
    // 开始读取内容中的有效信息
    return;
  }

  const item = pokemonListText.splice(0, 1)[0];
  ws.write(item, writeFn);
};

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

// 获取宝可梦信息
function getData(str) {
  const $ = cheerio.load(str);

  for (let index = 0; index < area.length; index++) {
    const name = area[index];
    $(`table.s-${name}>tbody tr`).each(function (i) {
      if ([0, 1].includes(i)) {
        return;
      }
      const item = {
        id: `${index}-${i - 1}`,
        no: replaceStr($(this).find("td:nth-child(1)").prop("innerText")),
        img: replaceStr($(this).find("td:nth-child(2) a").attr("href")),
        name: replaceStr($(this).find("td:nth-child(3) a").prop("innerText")),
        japaneseName: replaceStr(
          $(this).find("td:nth-child(4)").prop("innerText")
        ),
        englishName: replaceStr(
          $(this).find("td:nth-child(5)").prop("innerText")
        ),
        mainAttr: replaceStr(
          $(this).find("td:nth-child(6) a").prop("innerText")
        ),
        secondAttr: replaceStr(
          $(this).find("td:nth-child(7) a").prop("innerText")
        ),
      };
      pokemonList.push(item);
    });
  }

  console.log("-------------------开始写入宝可梦信息-----------------");
  for (let i = 0; i < pokemonList.length; i++) {
    let text = JSON.stringify(pokemonList[i]);
    if (i < pokemonList.length - 1) {
      text += ",";
    }
    pokemonListText.push(text);
  }

  ws.write("[", writeFn);
}

console.log("数据读取...");

// 获取宝可梦列表信息
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
