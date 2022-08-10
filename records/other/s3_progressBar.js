/*
 * @Author: liu7i
 * @Date: 2022-08-10 15:31:05
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-08-10 15:57:16
 */

import ProgressBar from "progress";

// 创建进度条
const bar = new ProgressBar("  下载中ing [=:bar=] :rate/bps :percent :etas", {
  total: 20,
  complete: "*",
});

const timer = setInterval(() => {
  if (Math.random() > 0.5) {
    bar.tick();
  }

  if (bar.complete) {
    clearInterval(timer);
  } else if (bar.curr === 5) {
    bar.interrupt(
      "this message appears above the progress bar\ncurrent progress is " +
        bar.curr +
        "/" +
        bar.total
    );
  }
}, 100);
