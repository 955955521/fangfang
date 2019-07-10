(function(){
    var comment=U.getClass('comment')[0];
    var playTitModule=U.getClass(comment,'play-tit-module')[0];
    var TitModuleh2=playTitModule.getElementsByTagName('h2')[0];

    var textarea=U.getId('textarea');  
    var mount=U.getClass(comment,'mount')[0];
    var btn=U.getId('btn');

    var hotComment=U.getClass('hot-comment')[0];
    var sort=U.getClass('sort')[0];
    var span=sort.getElementsByTagName('span');

    var yanzheng=U.getId('yanzheng');
    var change=U.getId('change');
    
    //塞入html
    var oldbox=getverification(4);
    U.append(yanzheng,oldbox);
    
    //更新验证码
    change.onclick =auto;
    function auto(){
        var newSsoIdcImg2 = getverification(4);
        yanzheng.replaceChild(newSsoIdcImg2,oldbox);
        oldbox=newSsoIdcImg2;

    }

   
    for(i=0;i<span.length;i++){
        span[i].onclick=function(){
            for(i=0;i<span.length;i++){
                span[i].className='';
            }
            this.className='active';
        }
    }

    U.ajax('get', '/baofeng/data/watch-comment.json', null, function(data){
        show(JSON.parse(data),hotComment);
    } )
    textarea.value='';
    //还可以输入多少字
    var mountI=U.create('i');    
    
    textarea.onkeyup=function(){
      mount.innerHTML='还可以输入<i>'+(140-(textarea.value.length))+'</i>条';
    }
    //清空textarea
    btn.onclick=function(){
        textarea.value='';
    }

    function show(data,obj){
        //评论数
        var em=U.create('em');
        em.innerHTML='（共'+data.length+'条）';       
        U.append(TitModuleh2,em);
        var liArr=[];
       for(var i=0;i<data.length;i++){
           var d=data[i];
          var li=U.create('li');
          li.innerHTML='<div class="message clearfix">'+
                            '<a href="'+d.href+'"><img src="'+d.src+'"></a>'+
                            '<span class="name">'+d.name+'</span>'+
                            '<span class="time">'+d.time+'</span>'+
                       '</div>'+
                       '<p class="content">'+d.cotent+'</p>'+
                       '<p class="support">'+
                       '<em>举报</em>'+
                       '<i></i>'+
                       '<b>'+d.count+'</b>'+
                       '</p>';
        liArr.push(li);
        U.append(hotComment,li);

       }   
       var em_conmment=hotComment.getElementsByTagName('em');
       for(i=0;i<liArr.length;i++){
           liArr[i].onmouseover=(function(i){              
                 return function (){
                   em_conmment[i].style.visibility='visible';  
                }
           })(i);
           liArr[i].onmouseout=(function(i){              
            return function (){
              em_conmment[i].style.visibility='hidden';  
           }
      })(i);
       }   
       
    }

})();