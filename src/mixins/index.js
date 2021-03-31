import WXDecode from "@/utils/WXBizDataCrypt";
import * as utils from '@/utils'

import {
	baserul
} from '@/utils/url'
export default {
	methods: {

		//跳转路由
		toRouter(data, type) {
			let routerType = {
				redirectTo: 'redirectTo', //关闭当前页面，跳转到应用内的某个页面
				reLaunch: 'reLaunch', //关闭所有页面，打开到应用内的某个页面。
				switchTab: 'switchTab', //关闭其他所有非 tabBar 页面,跳转到 tabBar 页面

			}

			let url = utils.transParams(data)
			console.log(url, 'ruk')

			if (!type) {
				uni.navigateTo({
					url
				})
				return
			}

			uni[routerType[type]]({
				url
			})
		},

		//返回上一页
		goBack() {
			wx.navigateBack({
				delta: 1
			})
		},

		//获取节点高度
		getHeight(el, num) {
			uni.createSelectorQuery()
				.in(this)
				.select(el)
				.boundingClientRect(data => {
					console.log(data, 'data.top');
					return this.getSystemInfo() - data.top - num;
				})
				.exec();
		},

		//获取屏幕高度
		getSystemInfo() {
			let num = null;
			uni.getSystemInfo({
				success(data) {
					num = data.windowHeight;
				}
			});

			return num;
		},

		//设置本地缓存
		setStorage(key, value) {
			uni.setStorageSync(key, value)
		},

		//获取本地缓存
		getStorage(key) {
			return uni.getStorageSync(key)
		},


		//删除本地缓存
		removeStorage(key) {
			uni.removeStorageSync(key);
		},

		//提示框
		message(title, duration = 1500) {
			uni.showToast({
				title,
				icon: 'none',
				duration
			})
		},

		//模态框
		messageBox(object = { title: '', content: '', showCancel: true }) {
			return new Promise((resolve, reject) => {
				uni.showModal({
					title: object.title,
					content: object.content,
					showCancel: object.showCancel,
					success: success => {
						if (success.confirm) {
							// 确定
							resolve()
						}

						if (success.cancel) {
							// 取消
							reject()
						}
					},
					fail: fail => {
						reject(fail)
					}
				})
			})

		},



		// 腾讯地图-地址解析
		geocoder(key, address) {
			return new Promise((resolve, reject) => {
				new utils.MapWx(key).geocoder(address).then(res => {
					resolve(res)
				}).catch(err => {
					reject(err)
				})
			})
		},

		// 腾讯地图-逆地址解析
		reverseGeocoder(key, location) {
			return new Promise((resolve, reject) => {
				new utils.MapWx(key).reverseGeocoder(location).then(res => {
					resolve(res)
				}).catch(err => {
					reject(err)
				})
			})
		},

		//打电话
		callPhone(phoneNumber) {
			uni.makePhoneCall({
				phoneNumber
			})
		},

		// 打开地图-用于导航
		openLocation(longitude, latitude, name = "测试位置名", address = '测试地址') {
			uni.openLocation({
				longitude: longitude * 1, // 经度
				latitude: latitude * 1, // 纬度
				name,
				address
			})
		},

		// 打开地图-用于搜索地址，选择位置
		searchLocation(longitude, latitude, callback) {
			uni.chooseLocation({
				longitude: Number(longitude), // 经度
				latitude: Number(latitude), // 纬度
				success: res => {
					if (typeof callback === 'function') {
						callback(res)
					}

				},

			})

		},


		// 图片处理-选择图片
		chooseImage(count = 1) {
			return new Promise((resolve, reject) => {
				uni.chooseImage({
					count: count, // 最多可以选择的图片张数 默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: res => {
						resolve(res.tempFilePaths);
					}
				});
			}).catch(e => {
				reject(e)
			})
		},

		// 图片处理-上传图片
		uploadImage(api, url) {
			uni.showLoading({
				title: '上传中'
			});
			return new Promise((resolve, reject) => {
				uni.uploadFile({
					url: api,
					filePath: url,
					name: 'file',
					success: res => {
						res = JSON.parse(res.data);
						if (res.code === 1) {
							uni.hideLoading()
							uni.showToast({
								title: '上传成功',
								icon: 'none'
							});
							resolve(res.data)
						} else {
							uni.hideLoading()
							uni.showModal({
								title: '上传失败',
								content: res.msg
							});
						}
					}
				});
			}).catch(e => {
				reject(e)
			})
		},



		// 图片处理-预览图片
		previewImage(urls = [], current = 0) {
			uni.previewImage({
				urls: urls,
				current: current,
				indicator: 'default',
				loop: true,
				fail(err) {
					console.log('previewImage出错', urls, err)
				},
			})
		},

		// 图片处理-获取图片信息
		getImageInfo(src = '', callback) {
			uni.getImageInfo({
				src: src,
				success: (image) => {
					if (typeof callback === 'function') {
						callback(image)
					}

				},
				fail(err) {
					console.log('getImageInfo出错', src, err)
				},
			})


		},



		// 微信登录
		wxLogin(callback) {
			uni.login({
				provider: 'weixin',
				success: data => {
					if (typeof callback === 'function') {
						callback(data.code)
					}

				}
			});
		},

		// 获取位置
		getLocation(callback) {
			uni.authorize({
				scope: 'scope.userLocation',
				success: _ => {
					uni.getLocation({
						type: 'gcj02',
						success: res => {
							if (typeof callback === 'function') {
								callback(res)
							}

						}
					});
				},

				fail: err => {
					// this.showModal({
					// 	title: '提示',
					// 	content: '建议获取定位授权'
					// }).then(res => {
					// 	uni.openSetting({
					// 		success(res) {

					// 		}
					// 	})
					// })
					this.message('请点击右上角...进行授权')
				}
			})


		},




		//判断是否为空
		isNull(name, tipMsg) {

			if (!name) {
				this.message(tipMsg)
				return true
			} else {
				return false
			}
		},

		/**
		 * 表单验证是否为空，只支持字符串
		 * @param {Object} fields 需要验证的对象
		 * @param {Object} rule 验证对象错误提示
		  * @param {Function} callback 成功回调
		 * */
		validate(fields, rule, callback) {
			let isTrue = false;
			for (let i in rule) {
				if (fields[i] != '') {
					isTrue = true;
				} else {
					this.message(rule[i]);
					isTrue = false;
					return;
				}
			}

			if (isTrue) {
				callback();
			}
		},


		//时间戳转日期格式
		parseTime(date = new Date(), format = '{y}-{m}-{d}') {
			return utils.parseTime(date, format)
		},


		// 解密
		wxDecode(data) {
			let pc = new WXDecode(data.appId, data.sessionKey)
			let val = pc.decryptData(data.encryptedData, data.iv)
			return val
		}

	}
}
