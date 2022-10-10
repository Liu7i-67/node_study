/*
 * @Author: liu71
 * @Date: 2022-10-10 23:07:07
 * @Last Modified by: liu71
 * @Last Modified time: 2022-10-10 23:55:45
 *
 * 获取神奇宝贝图鉴信息https://www.pokemon.cn/play/pokedex
 * 899之后需要在港服拔https://hk.portal-pokemon.com/play/pokedex
 */

import axios from "axios";
import fs, { createWriteStream } from "node:fs";
import http from "node:https";
import path from "node:path";
import cheerio from "cheerio";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 开始抓取的编号
const start = 899;
// 结束抓取的编号 到N为止
const end = 905;

// 获取dom内的文本
function getText(dom, select) {
  let text = dom(select).prop("innerText");
  if (text) {
    return text.replace(/\n/g, "");
  }
  return text;
}

// 创建一个写入流
const ws = createWriteStream("pokemonList2.json");

// // 将网页内容写入文件
// const writeFn = (index) => {
//   console.log("还剩", pokemonListText.length, "条待写入");
//   if (index > end) {
//     console.log("写入完毕");
//     ws.write("]", () => {
//       ws.close();
//     });
//     return;
//   }

//   const item = pokemonListText.splice(0, 1)[0];
//   ws.write(item, writeFn);
// };

// 抓取网页内容
function getData(str, index) {
  const $ = cheerio.load(str);
  const obj = {};
  // 名称
  obj.name = getText($, "p.pokemon-slider__main-name");
  // 全国图鉴编号
  obj.no = getText($, "p.pokemon-slider__main-no");
  // 属性
  obj.attribute = getText(
    $,
    "div.pokemon-type div.pokemon-type__type:first-child span"
  );
  // 属性2
  obj.attribute2 = getText(
    $,
    "div.pokemon-type div.pokemon-type__type:nth-child(2) span"
  );
  // 身高
  obj.height = getText($, "div.pokemon-info__height span.pokemon-info__value");
  // 分类
  obj.category = getText(
    $,
    "div.pokemon-info__category span.pokemon-info__value"
  );
  // 体重
  obj.weight = getText($, "div.pokemon-info__weight span.pokemon-info__value");
  // 图片
  obj.img = `https://www.pokemon.cn${$("div.pokemon-img img:last-child").prop(
    "src"
  )}`;
  // // 种族值
  // obj.raceValue = {
  //   hp: getText($, "tr.bgl-HP th div:nth-child(2)"),
  //   atk: getText($, "tr.bgl-攻击 th div:nth-child(2)"),
  //   def: getText($, "tr.bgl-防御 th div:nth-child(2)"),
  //   sAtk: getText($, "tr.bgl-特攻 th div:nth-child(2)"),
  //   sDef: getText($, "tr.bgl-特防 th div:nth-child(2)"),
  //   speed: getText($, "tr.bgl-速度 th div:nth-child(2)"),
  // };
  console.log(`开始处理${obj.name}的数据`);

  const href = obj.img;
  try {
    const target_path = path.resolve(__dirname, `./image/${obj.no}.png`);
    console.log("target_path:", target_path);
    axios.get(href, { responseType: "stream" }).then((res) => {
      res.data.pipe(fs.createWriteStream(target_path));
      console.log(`${obj.name}的图片保存成功`);
      ws.write(`${JSON.stringify(obj)},`, () => read(index + 1));
    });
  } catch (e) {
    console.log(`${obj.name}的图片保存失败`, e);
  }
}

function read(index) {
  if (index > end) {
    console.log("----数据抓取完毕----");
    // 关闭文件流
    ws.close();
    return;
  }
  // 即将抓取的连接
  const url = `https://hk.portal-pokemon.com/play/pokedex/${("000" + index).slice(
    -3
  )}`;
  // 发起请求
  http.get(url, function (res) {
    let str = "";
    // 绑定方法获取网页内容
    res.on("data", function (chunk) {
      str += chunk;
    });
    // 输入获取完毕
    res.on("end", function () {
      try {
        getData(str, index);
      } catch (error) {
        console.log("---read-error:", error);
      }
    });
  });
}

// 开始抓取
read(start);
