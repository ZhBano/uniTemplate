import bmap from './bmap-wx.min.js';

/**
 * 转换日期
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
	if (arguments.length === 0) {
		return null
	}
	const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
	let date
	if (typeof time === 'object') {
		date = time
	} else {
		if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
			time = parseInt(time)
		}
		if ((typeof time === 'number') && (time.toString().length === 10)) {
			time = time * 1000
		}
		date = new Date(time)
	}
	const formatObj = {
		y: date.getFullYear(),
		m: date.getMonth() + 1,
		d: date.getDate(),
		h: date.getHours(),
		i: date.getMinutes(),
		s: date.getSeconds(),
		a: date.getDay()
	}
	const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
		let value = formatObj[key]
		// 注意:getDay()在周日返回0
		if (key === 'a') {
			return ['日', '一', '二', '三', '四', '五', '六'][value]
		}
		if (result.length > 0 && value < 10) {
			value = '0' + value
		}
		(value)
		return value || 0
	})
	return time_str
}


/**
 * 月份相减 时间格式以'-'连接
 * @param  {string} date1
 * @param  {string} date2
 */
export function getMonths(date1, date2) {
	// 用-分成数组
	date1 = date1.split('-')
	date2 = date2.split('-')
	// 获取年,月数
	var year1 = parseInt(date1[0])
	var month1 = parseInt(date1[1])
	var year2 = parseInt(date2[0])
	var month2 = parseInt(date2[1])
	// 通过年,月差计算月份差
	var months = (year2 - year1) * 12 + (month2 - month1) + 1
	return months
}


/**
 * 参数转换为字符串
 * @param  {data.url} 路径
 * @param  {data.params} 参数
 */
export const transParams = data => {
	let arr = []
	let str = ''
	if (data.params) {
		for (let i in data.params) {
			arr.push(`${i}=${data.params[i]}`)
		}
		str = arr.join('&')
	}
	console.log(data)
	return data.params ? data.url + '?' + str : data.url

}


//获取地址栏参数
export const transUrl = () => {
	let url = location.href;
	let params = url.slice(url.indexOf("?") + 1).split("&");
	let paramsObj = {};
	params.forEach((item) => {
		let data = item.split("=");
		// console.log(data,'data')
		paramsObj[data[0]] = data[1];
	});
	return paramsObj
}


//百度地图
export class BMapwx {
	constructor(ak) {
		this.BMap = new bmap.BMapWX({ ak });
	}

	// 地址解析
	geocoding(address) {
		return new Promise((resolve, reject) => {
			this.BMap.geocoding({
				address,
				fail: fail => {
					reject(fail)
				},
				success: data => {
					console.log(data)
					resolve(data.wxMarkerData)
				}
			});

		})

	}

	/** 
	 * 逆地址解析
	 *  @param {String} location  'latitude,longitude'
	 */

	regeocoding(location) {
		return new Promise((resolve, reject) => {
			this.BMap.regeocoding({
				location,
				fail: fail => {
					reject(fail)

				},
				success: data => {
					resolve(data.wxMarkerData[0])


				},

			});
		})


	}





}
