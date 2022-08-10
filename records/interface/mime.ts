/*
 * @Author: liu7i
 * @Date: 2022-08-10 14:01:01
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-08-10 14:31:15
 */

/**
 * @type tips 媒体类型（也称为多用途 Internet 邮件扩展或 MIME 类型）指示文档、文件或字节分类的性质和格式 。MIME 类型在 IETF 的RFC 6838中定义和标准化。
 ** MIME 类型最常见的仅由两部分组成：类型和子类型，由斜线 ( /) 分隔 — 之间没有空格：
 ** 类型表示数据类型所属的一般类别，例如video或text。有两类类型：离散和多部分。离散类型是代表单个文件或媒体的类型，例如单个文本或音乐文件或单个视频。多部分类型是一种表示由多
 个组成部分组成的文档的类型，每个组成部分都可以有自己的独立 MIME 类型；或者，多部分类型可以封装在一个事务中一起发送的多个文件。例如，在将多个文件附加到电子邮件时使用多部分 MIME 类型。
 ** 子类型标识 MIME 类型所代表的指定类型的确切数据类型 。例如，对于 MIME 类型text，子类型可能是plain（纯文本）、html（HTML源代码）或calendar（对于 iCalendar/ .ics）文件。
 ** 每种类型都有自己的一组可能的子类型。MIME 类型总是同时具有类型和子类型，而不仅仅是其中一个。可以添加一个可选参数以提供更多详细信息：
 ** 例如，对于任何主类型为 的 MIME 类型text，您可以添加可选charset参数来指定用于数据中字符的字符集。如果没有charset指定，默认为ASCII ( US-ASCII)，除非被用户代理的设置覆盖。
 要指定 UTF-8 文本文件，请使用 MIME 类型text/plain;charset=UTF-8。
 ** 详见https://www.iana.org/assignments/media-types/media-types.xhtml#application
 ** 参考https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
 */
export type TMime =
  | "application/octet-stream"
  | "application/pdf"
  | "application/pkcs8"
  | "application/zip"
  | "audio/mpeg"
  | "text/plain"
  | "text/html"
  | string;
