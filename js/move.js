function getStyle(obj, attr) {
    if (window.getComputedStyle) {
        return getComputedStyle(obj)[attr];
    } else {
        return obj.currentStyle[attr];
    }
}

// 透明度运动
function move(obj, json, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        // 建一个开关
        var onOff = true;

        // 如果某一个属性还没有到，则在for-in循环中，把开关置为假
        for (var attr in json) {
            var target = json[attr]; // target即目标，attr即属性
            // 现在的位置
            var iNow;
            if (attr === 'opacity') {
                iNow = Math.round(getStyle(obj, 'opacity') * 100);
            } else {
                iNow = parseInt(getStyle(obj, attr));
            }
            // 方向
            var dir = (target - iNow) / 10; // 0.9
            dir = dir < 0 ? Math.floor(dir) : Math.ceil(dir);

            var speed = iNow + dir; // 下一步应该运动到的位置

            if ((speed >= target && dir > 0) || (speed <= target && dir < 0)) {
                speed = target;
            }

            // 设置
            if (attr === 'opacity') {
                obj.style.opacity = speed / 100;
                obj.style.filter = 'alpha(opacity=' + speed + ')';
            } else {
                obj.style[attr] = speed + 'px';
            }

            if (speed !== target) {
                onOff = false;
            }
        }

        // 如果开关是真，则停止定时器
        if (onOff) {
            clearInterval(obj.timer);
            callback && callback.call(obj);
        }
    }, 20);
}