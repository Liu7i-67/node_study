/*
 * @Author: liu7i
 * @Date: 2022-08-10 13:52:18
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-08-10 13:53:47
 */

/** @enum tips  http请求返回的状态码
 ** HTTP 响应状态代码指示特定HTTP请求是否已成功完成。响应分为五类：
 ** 信息响应( 100- 199)
 ** 成功响应( 200- 299)
 ** 重定向消息( 300- 399)
 ** 客户端错误响应( 400- 499)
 ** 服务器错误响应( 500- 599)
 */
export enum EHttpStatus {
  /** @member 这个临时响应表明，如果请求已经完成，客户应该继续请求或忽略该响应。 */
  CONTINUE = 100,
  /** @member  该代码是在响应客户端的升级请求头时发送的，并表明服务器正在切换到哪种协议。 */
  SWITCHING_PROTOCOLS = 101,
  /** @member 该代码表示服务器已经收到并正在处理该请求，但还没有回应。 */
  PROCESSING = 102,
  /** @member 这个状态代码主要是为了与链接头一起使用，让用户代理在服务器准备响应时开始预加载资源。 */
  EARLY_HINTS = 103,
  /**
   * @member 请求成功了。成功 "的结果含义取决于HTTP方法。
   ** -GET：该资源已被获取并在信息体中传输。
   ** -HEAD：代表性标题包括在响应中，而没有任何消息正文。
   ** -PUT/POST：描述行动结果的资源在消息正文中传送。
   ** -TRACE：消息主体包含服务器收到的请求消息。
   */
  OK = 200,
  /** @member 请求成功了，并因此创建了一个新的资源。这通常是在POST请求或一些PUT请求之后发送的响应。 */
  CREATED = 201,
  /** @member 该请求已被接收，但尚未采取行动。它是不确定的，因为在HTTP中没有办法随后发送一个异步响应来表明请求的结果。它适用于另一个进程或服务器处理请求的情况，或用于批处理。 */
  Accepted = 202,
  /**
   * @member 这个响应代码意味着返回的元数据与原服务器提供的元数据不完全相同，而是从本地或第三方副本收集的。
   * 这主要用于另一个资源的镜像或备份。除了这种特殊情况，200 OK响应比这种状态更受欢迎。
   */
  NON_AUTHORITATIVE_INFORMATION = 203,
  /** @member 这个请求没有内容可以发送，但头信息可能是有用的。用户代理可以用新的头信息更新其对该资源的缓存头信息。 */
  NO_CONTENT = 204,
  /** @member 告诉用户代理重置发送此请求的文件。 */
  RESET_CONTENT = 205,
  /** @member 当客户端发送Range头，只请求资源的一部分时，就会使用这个响应代码。  */
  PARTIAL_CONTENT = 206,
  /** @member 揭示关于多个资源的信息，用于可能适合多个状态代码的情况。 */
  MULTI_STATUS = 207,
  /** @member 在<dav:propstat>响应元素中使用，以避免重复列举同一集合的多个绑定的内部成员。 */
  ALREADY_REPORTED = 208,
  /** @member 服务器已经完成了对该资源的GET请求，并且响应是应用于当前实例的一个或多个实例处理结果的表示。 */
  IM_USED = 226,
  /** 未完待续... https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#redirection_messages */
}
