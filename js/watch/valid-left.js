(function(){
    var guessLikeList=document.getElementsByClassName('guess-like-list')[0];
    var hotRecommendList=document.getElementsByClassName('hot-recommend-list')[0];
    var movieList=document.getElementsByClassName('movie-list')[0];
    ajax('get', '/baofeng/data/watch.json', null, function(data) {
        guesslike(JSON.parse(data).guess_like);
        hotrecommend(JSON.parse(data).hot_recommend);
        movielist(JSON.parse(data).movie_rank);
    })
    // 猜你喜欢
    function guesslike(d1){
        var guesslikeArr=[];
        for(var i=0;i<d1.length;i++){
            var d=d1[i]; //单条数据
            var li=document.createElement('li');
            li.innerHTML=' <a href="'+d.href+'">'+
                                '<div class="guess-img">'+
                                    '<img src="'+d.src+'" alt="'+d.title+'">'+
                                    '<span></span>'+
                                    '<i></i>'+
                                '</div> '+                       
                                '<div class="desc clearfix">'+
                                    '<h3 class="movie_name">'+d.title+'</h3>'+
                                    '<span class="score">'+d.score+'</span>'+
                                    '<span class="movie_desc">'+d.message+'</span>'+
                                '</div>'+
                            '</a>';
                guesslikeArr.push(li); 
                guessLikeList.appendChild(li);        
        }
        var guessImg=guessLikeList.getElementsByClassName('guess-img');
        for(var i=0;i<guessImg.length;i++){
            guessImg[i].index=i;
            guessImg[i].onmouseover=function(){
                this.getElementsByTagName('i')[0].style.display='block';
            }
            guessImg[i].onmouseout=function(){
                this.getElementsByTagName('i')[0].style.display='none';
            }
        
        }
    }
     // 强烈推荐
    function hotrecommend(d2){
        var hotrecommendArr=[];
        for(var i=0;i<d2.length;i++){
            var d=d2[i]; //单条数据
            var li=document.createElement('li');
            li.innerHTML='<a href="'+d.href+'">'+
                            '<div class="hrecommend-list-content">'+
                                    '<img src="'+d.src+'" alt="'+d.title+'">'+
                                    '<span></span>'+
                                    '<i>'+d.title+'</i>'+
                                '</div>'+
                            '</a>';
            hotrecommendArr.push(li); 
            hotRecommendList.appendChild(li);        
        }
    }
    // 电影榜
    function movielist(d3){
        var movieListArr=[];
        for(var i=0;i<d3.length;i++){
            var d=d3[i]; //单条数据
            var li=document.createElement('li');
            li.innerHTML='<div class="mr-list-content">'+
                                '<a href="'+d.href+'">'+
                                '<img src="'+d.src+'" alt="'+d.title+'">'+
                                '<span class="over"></span>'+
                                '<span class="name"><i>'+(i+1)+'</i>'+d.title+'</span>'+
                                '</a>'+     
                            '</div>'+
                            '<div class="mr-list-text clearfix">'+
                                '<span class="name"><i>'+(i+1)+'</i>'+d.title+'</span>'+
                                '<span class="score">'+d.score+'</span>'+
                            '</div>';
            movieListArr.push(li); 
            movieList.appendChild(li);
        }

        var mrlistcontent=movieList.getElementsByClassName('mr-list-content');           
        var mrlisttext=document.getElementsByClassName('mr-list-text');
        //  mrlistcontent[0].display=block;
        for(var i=0;i<mrlisttext.length;i++){
            if(i==0){
                mrlistcontent[i].style.display='block';
                mrlisttext[i].style.display='none';
            }
            mrlisttext[i].index=i;
            mrlisttext[i].onmouseover=function(){
                for(var i=0;i<mrlisttext.length;i++){
                    mrlistcontent[i].style.display='none';
                    mrlisttext[i].style.display='block';
                }
                mrlistcontent[this.index].style.display='block';
                this.style.display='none';
            }
        }

    }
   
})();