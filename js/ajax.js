// 参数：打开方式(get/post)、地址、发给后端的数据、请求成功的回调
function ajax(method, url, data, callback) {
    // 1、创建xhr
    var xhr = new XMLHttpRequest();

    // 判断打开方式
    if (method === 'get') {
        // get打开
        if (data) {
            url += '?' + data;
        }
        xhr.open('get', url, true);
        xhr.send();
    } else {
        // post打开
        xhr.open('post', url, true);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        if (data) {
            xhr.send(data);
        } else {
            xhr.send();
        }
    }

    // 等待服务器返回
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // 成功
                callback && callback(xhr.responseText);
            } else {
                alert('出错了，服务器状态码是：' + xhr.status);
            }
        }
    }
}