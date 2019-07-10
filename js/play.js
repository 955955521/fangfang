(function() {
    //一级导航元素获取
    var vipFilmFilter = document.getElementsByClassName('vip-film-filter')[0];
    var vipFilmFilter_li = vipFilmFilter.getElementsByTagName('li');
    var vipFilmFilter_a = vipFilmFilter.getElementsByTagName('a');
    //二级导航元素获取
    var vipFilmClassify = document.getElementsByClassName('vip-film-classify')[0];
    var vipFilmClassify_li = vipFilmClassify.getElementsByTagName('li');
    var vipFilmClassify_a = vipFilmClassify.getElementsByTagName('a');

    var play_list = document.getElementById('play_list');

    // console.log(vipFilmClassify, vipFilmClassify_li, vipFilmClassify_a);

    function change(li, a) {
        for (var i = 0; i < li.length; i++) {
            li[i].index = i;
            li[i].onclick = function() {
                for (i = 0; i < li.length; i++) {
                    a[i].className = '';
                }
                a[this.index].className = 'active';
                // fn(aa,bb);
            }
        }
    }
    //一级菜单切换
    change(vipFilmFilter_li, vipFilmFilter_a);
    //二级菜单切换
    change(vipFilmClassify_li, vipFilmClassify_a);

    ajax('get', '/baofeng/data/all_new.json', null, function(data) {
        list(play_list, JSON.parse(data));
    })
   //渲染数据
    function list(obj, data) {
        for (var i = 0; i < data.length; i++) {
            var d = data[i];
            d.type = d.type === 1 ? 'vip_type' : 'vip_free';
            var score = d.score.toString();
            if (score.indexOf('.') === -1) {
                score += '.0';
            }

            var li = document.createElement('li');
            li.innerHTML =
                ' <a href="' + d.href + '">' +
                '<img src="' + d.src + '" alt="">' +
                '<span class="film_type ' + d.type + '"></span>' +
                '<span class="film_quality">' + d.quality + '</span>' +
                '<div class="desc">' +
                '<h3 class="movie_name">' + d.title + '</h3>' +
                '<span class="movie_desc">' + d.message + '</span>' +
                '<div class="score">' +
                '<i>' + score[0] + '</i>.' + score[2] +
                '</div>' +
                '</div>' +
                '</a>';

            obj.appendChild(li);
        }
    }


})();