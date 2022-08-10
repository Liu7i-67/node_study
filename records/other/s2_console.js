/*
 * @Author: liu7i
 * @Date: 2022-08-10 15:13:48
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-08-10 15:30:32
 */
import chalk from "chalk";

/**
 * 变量输出
 * %s 将变量格式化为字符串
 * %d 将变量格式化为数字
 * %i 仅将变量格式化为其整数部分
 * %o 将变量格式化为对象
 */
// console.log(
//   "宇宙第%s咆哮虎，速度高达%d，一掌打出了%i点伤害，使用率%o",
//   "一",
//   85,
//   "86.11",
//   { s11: "85%", s12: "86%" }
// );

// 输出计时器
// const oranges = ["orange", "orange"];
// const apples = ["just one apple"];
// oranges.forEach((fruit) => {
//   console.count(fruit);
// });
// apples.forEach((fruit) => {
//   console.count(fruit);
// });

// 输出堆栈追踪
// const function2 = () => console.trace();
// const function1 = () => function2();
// function1();

// 设置输出颜色
console.log("\x1b[33m%s\x1b[0m", "hi!");

console.log(chalk.red("红色"));

console.log(chalk.red.bold.underline("Hello", "world"));

console.log(chalk.rgb(0, 0, 0).bgRgb(255, 255, 255)("背景色输出测试"));
