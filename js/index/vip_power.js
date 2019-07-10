(function() {
    var vip_power_list = document.getElementsByClassName('vip_power_list')[0];
    var li = vip_power_list.getElementsByTagName('li');
    var vip_left = document.getElementsByClassName('vip_left')[0];
    var vip_right = document.getElementsByClassName('vip_right')[0];
    for (var i = 0; i < li.length; i++) {
        li[i].style.backgroundPositionY = 0;
        li[i].style.backgroundPositionX = -(i * 200) + 'px';
    }
    var onoff = true;
    vip_right.onclick = function() {
        if (onoff) {
            move(vip_power_list, {
                left: -1075
            })
        }
        onoff = false;
    }
    vip_left.onclick = function() {
        if (!onoff) {
            move(vip_power_list, {
                left: 0
            })
        }
        onoff = true;
    }
})();