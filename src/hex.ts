/*
 * @Author: lrqnew
 * @Date: 2022-01-07 16:59:50
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-07 17:12:59
 * @FilePath: \q-utils\src\hex.ts
 * @Description: 16进制转化方法
 */


/**
 * 16 进制转ascll码
 * @param hexCharCodeStr 16进制字符
 * @returns 
 */
export function hexCharCodeToStr(hexCharCodeStr: string) {
	let trimedStr = hexCharCodeStr.trim();
	let rawStr =
		trimedStr.substr(0, 2).toLowerCase() === "0x" ?
		trimedStr.substr(2) :
		trimedStr;
	let len = rawStr.length;
	let curCharCode;
	let resultStr = [];
	for (let i = 0; i < len; i = i + 2) {
		curCharCode = parseInt(rawStr.substr(i, 2), 16);
		resultStr.push(String.fromCharCode(curCharCode));
	}
	return resultStr.join("");
};

/**
 * 16进制转ArrayBuffer
 * @param hex 16进制字符
 * @returns 
 */
export function str2ab(hex: { match: (arg0: RegExp) => any[]; }) {
	return new Uint8Array(
		hex.match(/[\da-f]{2}/gi).map(function(h) {
			return parseInt(h, 16);
		})
	).buffer;
};

/**
 * 字符串转16进制
 * @param str 要转的字符串
 * @param zeroX 是否带上0x前缀
 * @returns 
 */
export function strToHexCharCode(str: string, zeroX = true)  {
	if (str === "") return "";
	let hexCharCode = [];
	zeroX && hexCharCode.push("0x");
	for (let i = 0; i < str.length; i++) {
		hexCharCode.push(str.charCodeAt(i).toString(16));
	}
	return hexCharCode.join("");
};

/**
 * 10进制转16进制补0
 * @param dec 10进制数
 * @param len 返回的16进制个数 如：len=3 返回00A
 * @returns 
 */
export function dec2hex(dec: number, len: number) { 
	let hex = "";
	while (dec) {
		let last = dec & 15;
		hex = String.fromCharCode(((last > 9) ? 55 : 48) + last) + hex;
		dec >>= 4;
	}
	if (len) {
		while (hex.length < len) hex = '0' + hex;
	}
	return hex;
}