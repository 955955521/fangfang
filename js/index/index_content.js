(function() {
    var advertise = document.getElementsByClassName('advertise')[0];
    var recommend = document.getElementById('recommend');
    var hot = document.getElementById('hot');
    ajax('get', '/baofeng/data/index_content.json', null, function(data) {
        use(JSON.parse(data).insert_ad);
        list(recommend, JSON.parse(data).recommend);
        list(hot, JSON.parse(data).hot);
        
    })

    function use(d) { 
        advertise.innerHTML = ' <a href="' + d[0].href + '" target="' + d[0].target + '">' +
            '<img src="' + d[0].src + '" alt="">' +
            '</a>';  
    }
    function list(obj, data) {
        for (var i = 0; i < data.length; i++) {
            var d = data[i];

            var arrli = [];
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