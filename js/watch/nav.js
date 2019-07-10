(function(){
    var title_left=U.getClass('title_left')[0];
    var menuGuide=U.getClass(title_left,'menu-guide')[0];
    var menuGuidelist=U.getClass(title_left,'menu-guide-list')[0];

    var tools=U.getClass(title_left,'tools')[0];
    var look=U.getClass(title_left,'look')[0];
    var viewRecordPane=U.getId('viewRecordPane');

    var save=U.getClass(title_left,'save')[0];
    var viewRecordPane1=U.getId('viewRecordPane1');

    var phone=U.getClass(title_left,'phone')[0];
    var phonelist=U.getClass(title_left,'phone-list')[0];

    var goTop=U.getId('goTop');
    var gotop=U.getClass(goTop,'go-top')[0];

    // console.log(title_left,menuGuide,menuGuidelist,tools,look,viewRecordPane,save,viewRecordPane1,phone,phonelist);

    function nav(parent,child){

        parent.onmouseover=show;   //（清定时器）避免从下拉列表重新滑回去的延迟
        parent.onmouseout=hide;    //(定时器)避免刚滑出下拉就消失 找不到    
        child.onmouseover=show;   //（清定时器）避免200毫秒后消失
        child.onmouseout=hide;    //避免从child滑到parent立即消失

        function show(){
            clearTimeout(parent.timer);
            child.style.display='block';
        }
        function hide(){
            parent.timer=setTimeout( function(){
                child.style.display='none';
             },200);    
        }         
    }

    
    nav(menuGuide,menuGuidelist);
    nav(look,viewRecordPane);
    nav(save,viewRecordPane1);
    nav(phone,phonelist);

    
    window.onscroll=function(){
        var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
        var timer=null;
        if(scrollTop>30){
            goTop.style.display='block';
        }else{
            goTop.style.display='none';

            gotop.onclick=function(){
                    document.documentElement.scrollTop = 0;
                    document.body.scrollTop = 0;
            }
        }
    }

   

   

   



})();