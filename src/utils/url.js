
 let baseUrl=null
let imgurl=null
if(process.env.NODE_ENV === 'development'){
 // 开发接口路径
 baseUrl = 'https://api.dgybjbx.kcshop.vip';
imgurl='https://dgybjbx.s3.cn-south-1.jdcloud-oss.com'
}else{
 // 线上接口路径
 baseUrl = 'https://api.dgybjbx.kcshop.vip';
  imgurl='https://dgybjbx.s3.cn-south-1.jdcloud-oss.com'
  
}

export  {
	baseUrl,
	imgurl
} 

