(function() {

    var gotop = document.getElementsByClassName('gotop')[0];
    window.onscroll = function() {
        var timer = null;
        var top = document.documentElement.scrollTop || document.body.scrollTop;
        if (top > 30) {
            gotop.style.display = 'block';
        } else {
            gotop.style.display = 'none';
        }
        gotop.onclick = function() {
            timer = setInterval(function() {
                if (top <= 0) {
                    top = 0;
                    clearInterval(timer);
                }
                top -= 100;
                document.documentElement.scrollTop = top;
                document.body.scrollTop = top;
            }, 20)

        }
    }

})();