
function getverification(n) {
    str = 'abcdefghigklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var B=U.create('b');
    for (var i = 0; i < n; i++) {
        var em = U.create('em');
        em.style.display = 'inline-block';
        em.style.color = getcolor();
        em.style.fontSize = 20 + 'px';
        em.style.transform = getrotate();
        em.innerHTML = str[U.getRandom(0, str.length - 1)];
        U.append(B, em);
    }
    return B;
}
function getcolor() {
    var r = U.getRandom(0, 255);
    var g = U.getRandom(0, 255);
    var b = U.getRandom(0, 255);

    var str = 'rgb(' + r + ',' + g + ',' + b + ')';
    return str;
}

function getrotate() {
    d = Math.random() > 0.5 ? 1 : -1;
    var m = U.getRandom(0, 45) * d;
    return 'rotate(' + m + 'deg)';
}