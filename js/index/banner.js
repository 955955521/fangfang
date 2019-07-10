(function(){
    var banner = document.getElementById('banner');
            var advertise_data = null;
            ajax('get', '/baofeng/data/banner.json', null, function(data) {
                show(JSON.parse(data), banner);
            })
    function show(data, obj) {
        var ul = document.createElement('ul');
        ul.className = 'banner_ul';
        var arr_li = []; //存储li的数组
        for (var i = 0; i < data.banner.length; i++) {
            var d = data.banner[i]; //单条数据
            var banner_li = document.createElement('li');
            banner_li.innerHTML = '<a href="' + d.href + '" target="' + d.target + '"><img src="' + d.src + '" alt="' + d.alt + '"></a>';
            arr_li.push(banner_li);
            ul.appendChild(banner_li);
        }
        obj.appendChild(ul);
    
        var timer = null; //定时器
        var count = 0; //计数器
        arr_li[0].style.opacity = 1;
    
        timer = setInterval(auto, 2000);
    
        //滑上停止
        obj.onmouseover = function() {
            clearInterval(timer);
        };
        //滑离开始
        obj.onmouseout = function() {
            clearInterval(timer);
            timer = setInterval(auto, 2000);
        }
    
        //上一张
        var left = document.createElement('span');
        left.className = 'left';
        left.style.background = 'url("' + data.vip_tips[0].src + '") -1px -51px';
        left.onclick = function() {
            clearInterval(timer);
            if (count <= 0) {
                count = data.banner.length;
            }
            count--;
            change();
        }
        obj.appendChild(left);
    
        //下一张
        var right = document.createElement('span');
        right.style.background = 'url("' + data.vip_tips[0].src + '") -43px -51px';
        right.className = 'right';
        right.onclick = function() {
            clearInterval(timer);
            auto();
        }
        obj.appendChild(right);
    
        //切换
        var page = document.createElement('ul');
        page.style.background = 'url("' + data.vip_tips[0].src + '") 2px -100px';
        page.className = 'page';
    
        var page_li_arr = [];
        for (var i = 0; i < data.page.length; i++) {
            var p = data.page[i]; //单条数据
            var page_li = document.createElement('li');
            page_li.innerHTML = '<a href="' + p.href + '" target="' + p.target + '"><img src="' + p.src + '"></a>';
            page_li_arr.push(page_li);
            page.appendChild(page_li);
        }
        page_li_arr[0].className = 'active';
        obj.appendChild(page);
    
        // 滑上分页
        for (var i = 0; i < data.page.length; i++) {
            page_li_arr[i].index = i;
            page_li_arr[i].onmouseover = function() {
                count = this.index;
                change();
            }
        }
    
        function auto() {
            if (count >= data.banner.length - 1) {
                count = -1;
            }
            count++;
            change();
        }
    
        function change() {
            // for (var i = 0; i < data.banner.length; i++) {
            //     arr_li[i].style.opacity = 0;
            //     page_li_arr[i].className = '';
            //     arr_li[i].style.zIndex = 0;
            // }
            // move(arr_li[count], {
            //     opacity: 100
            // })
            // page_li_arr[count].className = 'active';
            // arr_li[count].style.zIndex = 1;
    
            for (var i = 0; i < data.banner.length; i++) {
                if (i === count) {
                    move(arr_li[i], {
                        opacity: 100
                    })
                    page_li_arr[i].className = 'active';
                    arr_li[i].style.zIndex = 1;
                } else {
                    move(arr_li[i], {
                        opacity: 0
                    })
                    page_li_arr[i].className = '';
                    arr_li[i].style.zIndex = 1;
                }
            }
        }
    }
})()



