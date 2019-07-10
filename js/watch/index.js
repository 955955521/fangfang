
	
/***************首页banner图******************/
/*var film = {
	name:'',
	videotime:120,
	href:'具体的播放地址',
	shangyingtime:'2019-06-12'
	bigPic:,
	smallPic:,
	导演
	主演
	编剧
	简介
	评分
}*/

/*
关于参数设计
id: 父元素id
data数据：也需要传递
 */
// window.onload = function(){
// 	slider_pic( 'mainBanner' )
// }
// slider_pic( 'mainBanner11' )

slider_pic( 'mainBanner' )
function slider_pic( id ) {

	// 1. 选元素

	var mainBanner = byId(id)//baner最外层的父容器
	console.log(mainBanner,'1111111111111')
	var btnPrev = mainBanner.getElementsByTagName('span')[0]//上一张按钮
	var btnNext = mainBanner.getElementsByTagName('span')[1]//下一张按钮
	var bannerSlider = mainBanner.getElementsByTagName('ul')[0]//大图片容器
	var bannerDotsContainer = mainBanner.getElementsByTagName('ul')[1]//小图片容器

	var bigPicItem = bannerSlider.getElementsByTagName('li')//大图的每一项
	var smallPicItem = bannerDotsContainer.getElementsByTagName('li')//小图的每一项

	var films = [
		{
			name:'大话西游11',
			bigPic:'banner_1.jpg',
			smallPic:'banner_pic_1.jpg'
		},
		{
			name:'大话西游22',
			bigPic:'banner_2.jpg',
			smallPic:'banner_pic_2.jpg'
		},
		{
			name:'大话西游33',
			bigPic:'banner_3.jpg',
			smallPic:'banner_pic_3.jpg'
		},
		{
			name:'大话西游2',
			bigPic:'banner_4.jpg',
			smallPic:'banner_pic_4.jpg'
		},
		{
			name:'大话西游2',
			bigPic:'banner_5.jpg',
			smallPic:'banner_pic_5.jpg'
		},
		{
			name:'大话西游2',
			bigPic:'banner_6.jpg',
			smallPic:'banner_pic_6.jpg'
		},
		{
			name:'大话西游2',
			bigPic:'banner_7.jpg',
			smallPic:'banner_pic_7.jpg'
		},
		{
			name:'大话西游2',
			bigPic:'banner_8.jpg',
			smallPic:'banner_pic_8.jpg'
		},
		{
			name:'大话西游2',
			bigPic:'banner_9.jpg',
			smallPic:'banner_pic_9.jpg'
		}
	] //前端程序员自己定义的数据，后期后端程序员一定会给咱们的

	var len = films.length//数据的长度

	/**** 页面初始化 *****/ 
	var bigPicStr = ''  //大图容器需要拼接出的代码
	var smallPicStr = ''//小图容器需要拼接出的代码
	for(var i=0;i<len;i++){

		bigPicStr += '<li><a href=""><img src="static/images/'+ films[i].bigPic +'"></a></li>'
		smallPicStr += '<li><a href=""><img src="static/images/'+ films[i].smallPic +'"></a></li>'
	}
	bannerSlider.innerHTML = bigPicStr
	bannerDotsContainer.innerHTML = smallPicStr

	var index = 0// 只要index值变了，大图和小图都会变
	slider()
	function slider() {

		for( var i=0;i<len;i++ ){
			//bigPicItem[i].className = ''
			bigPicItem[i].style.opacity = '0'
			bigPicItem[i].style.filter = 'alpha(opacity=100)'
			clearInterval( bigPicItem[i].timer ) //除了把透明样式变为0，同时把不需要改变透明的大图 定时器清除
			smallPicItem[i].className = ''
		}	
		//bigPicItem[index].className = 'active'
		smallPicItem[index].className = 'active'

		sMove( bigPicItem[index],{ opacity:100 } )
		/*
			sMove( 元素,{ aaa: } )
		 */ 
		//console.log(1111)
	}

	//console.log( bigPicStr )

	/******** 加事件 **********/
	btnNext.onclick = function(){
		nextFn()
	}

	function nextFn(){
		index++
		if( index >= len ){
			index = 0
		}
		slider()
	}

	btnPrev.onclick = function(){
		prevFn()
	}

	function prevFn(){
		index--
		if( index < 0 ){
			index = len - 1
		}
		slider()
	}

	for(var i=0;i<len;i++){
		smallPicItem[i].index = i
		smallPicItem[i].onmouseenter = function(){
			//console.log(123)
			 index = this.index//图片切换的index这个桥梁，变了  先改变index值。后为大图和小图添加className='active'
			 slider() 
			 //console.log( this.index )
		}
	}


	//  开定时器。定时器就是和按钮的下一张逻辑一模一样 。所以把下一张的功能封装
	var timer = null
	clearInterval(timer)
	timer = setInterval(nextFn,4000)

	mainBanner.onmouseenter = function(){
		clearInterval(timer)
	}

	mainBanner.onmouseleave = function(){
		timer = setInterval(nextFn,4000)
	}
}



/*********** VIP特权轮播 ***************/
/*
比如：
	我们都喜欢起len为变量名。
	所以如果不考虑全局，一定会出现问题，而且实际工作当中，就应该把它们包在函数中，当作局部变量
 */  
vip_slider()
function vip_slider(){

	//1. 选元素
	var mainVipSlider = byId('mainVipSlider')//slider最外层的容器
	var btnPrev = mainVipSlider.getElementsByTagName('span')[0]//上一页
	var btnNext = mainVipSlider.getElementsByTagName('span')[1]//下一页
	var ulSlider = mainVipSlider.getElementsByTagName('ul')[0]//图片的容器，后期要改变宽度和left值
	var aLi = ulSlider.getElementsByTagName('li')
	var len = aLi.length;
	var liWidth = parseInt(getStyle(aLi[0],'width')) + parseInt(getStyle(aLi[0],'marginRight'))
	//   单个项的宽为 li的宽+li的margin-right的值

	//2. 为图片容器设置宽度
	var ulWidth = liWidth*len;
	ulSlider.style.width = ulWidth + 'px' //为图片容器设置宽度
	// console.log( liWidth*len )	

	/*
	只要是图片轮播，都在外层设置一个index值
	index ------  left
	1				(1-1)*215
	2				-(2-1)*215
	3				-(3-1)*215
	 */
	//3. 添加事件
	/*
	//len = 10   (len/num)-1 = 1    假设：15个 一共3页
	  liWidth= 200
	  totalWidth = 200*15 = 3000
	  每次滚动5个 liWidth*5 = 1000     3000/1000 = 3
	 */
	var index = 0 //滚动的第几屏数
	var num = 5//每次滚动5个为一屏

	var w = liWidth*num//一屏的宽度 滚动5个
	var n = ulWidth/w;//最多滚动n屏

	btnNext.onclick = function () {
		index++
		if( index > n-1 ){
			index = n-1
		}
		
		//ulSlider.style.left = -w * index + 'px'
		sMove( ulSlider,{left:-w * index} )
	}

	btnPrev.onclick = function () {
		index--
		if( index < 0 ){
			index = 0
		}
		
		//ulSlider.style.left = -w * index + 'px'
		sMove( ulSlider,{left:-w * index} )
	}
}