(function () {
    //登录
    var login = U.getId('login');
    var change_register = U.getId('change_register');
    var rl_label = U.getId('rl_label');
    var login_remeber = U.getId('login_remeber');
    var newssobox2 = U.getClass(login, 'new-sso-box')[0]; //登录盒子
    var ssoerrormessage1 = U.getClass(newssobox2, 'sso-error-message')[0];//错误信息提示
    var login_user = U.getId('login_user');//手机号
    var login_pwd = U.getId('login_pwd');//密码
    var login_botton = U.getId('login_botton'); //登录按钮
    //注册
    var register = U.getId('register');
    var change_login = U.getId('change_login'); //立即登录
    var rr_label = U.getId('rr_label');
    var register_remeber = U.getId('register_remeber');//同意协议
    var newssobox1 = U.getClass(register, 'new-sso-box')[0]; //注册盒子
    var ssoerrormessage = U.getClass(newssobox1, 'sso-error-message')[0];//错误信息提示
    var register_phone = U.getId('register_phone');//手机号
    var register_pwd = U.getId('register_pwd');//密码
    var newSsoShortMatch = U.getClass('new-sso-short-match')[0];//输入验证码
    var newSsoIdcImg = U.getClass('new-sso-idc-img')[0];//验证码
    var newSsoFesBtn = U.getClass('new-sso-fes-btn')[0];//更新验证码
    var newSsoshortPhone = U.getClass('new-sso-short-phone')[0];//短信验证码
    var freeMessage = U.getClass('free-message')[0];//发送免费短信
    var register_button = U.getId('register_button'); //注册按钮





    //登录


    //立即注册
    function register_change() {
        login.style.display = 'none';
        register.style.display = 'block';
    }

    change_register.onclick = register_change;

    var login_re = {
        tel: /^1[3|5|7|8]\d{9}$/,
        email: /^\w+@[a-z0-9]+(\.[a-z]+){1,3}$/,
        pwd: /\w{6,32}/
    }


    var login_matchArr = [];
    //手机号验证
    // login_user.focus();
    ssoerrormessage1.innerHTML = '';
    login_user.onblur = function () {
        if (login_re.tel.test(this.value) || login_re.email.test(this.value)) {
            login_pwd.focus();
            ssoerrormessage1.innerHTML = '';
            login_matchArr[0] = true;
        } else {
            ssoerrormessage1.innerHTML = '账号或密码错误';
            this.value = '';
            login_matchArr[0] = false;
        }
    }
    //密码验证
    login_pwd.onblur = function () {
        if (login_re.pwd.test(this.value)) {
            ssoerrormessage1.innerHTML = '';
            login_matchArr[1] = true;
        } else {
            ssoerrormessage1.innerHTML = '账号或密码错误';
            this.value = '';
            login_matchArr[1] = false;
        }
    }
    //我同意注册协议
    rl_label.onclick = function () {
        if (login_remeber.checked) {
            rl_label.className = '';      //如果当前为真，则点击后为假
        } else {
            rl_label.className = 'active';
        }
    }

    //登录
    login_botton.onclick = function () {
        login_user.focus();
        login_user.blur();

        login_pwd.blur();

        //判断是否都为真
        var login_n = login_matchArr.every(function (item) {
            return item;
        });
        //数据
        var login_str = 'name=' + login_user.value + '&pwd=' + login_pwd.value;

        if (login_n) {
            U.ajax('get', './data/index_content.json', login_str, function (data) { });
            alert("登录成功");
        }
    }




    //注册 
    //立即登录

    function login_change() {
        login.style.display = 'block';
        register.style.display = 'none';
    }
    change_login.onclick = login_change;

    function messageerror(str) {
        if (!ssoerrormessage.innerHTML) {
            ssoerrormessage.innerHTML = str;
        }
    }
    var re = {
        "tel": /^1[3|5|7|8]\d{9}$/,
        "pwd": /\w{6,32}/
    }
    var matchArr = [];
    //手机号验证
    register_phone.focus();
    register_phone.onblur = function () {
        if (!re.tel.test(this.value)) {
            messageerror('请输入正确手机号');
            this.value = '';
            matchArr[0] = false;
        } else {
            register_pwd.focus();
            ssoerrormessage.innerHTML = '';
            matchArr[0] = true;
        }
    }
    //密码验证
    register_pwd.onblur = function () {
        if (!re.pwd.test(this.value)) {
            messageerror('请输入6到32位由字符组成的密码');
            this.value = '';
            matchArr[1] = false;
        } else {
            newSsoShortMatch.focus();
            ssoerrormessage.innerHTML = '';
            matchArr[1] = true;
        }
    }
    //验证码验证
    newSsoShortMatch.onblur = function () {
        //  console.log(newSsoIdcImg.innerText);
        if (newSsoShortMatch.value.toUpperCase() !== newSsoIdcImg.innerText.toUpperCase()) {
            messageerror('验证码错误，请重新输入');
            this.value = '';
            auto();
            matchArr[2] = false;
        } else {
            newSsoshortPhone.focus();
            ssoerrormessage.innerHTML = '';
            matchArr[2] = true;

        }
    }
    var timer = null;
    var onoff = true;
    freeMessage.onclick = function () {
        if (onoff) {
            onoff = false;
        } else {
            return;
        }
        clearInterval(timer);
        var i = 5;
        var str = '';
        freeMessage.style.fontSize = '12';
        timer = setInterval(function () {
            i--;
            if (i <= 0) {
                str = '点击重新发送';
                onoff = true;
            } else {
                str = i + '秒后重新发送';
            }
            freeMessage.innerHTML = str;
        }, 1000)
    }
    //我同意注册协议
    rr_label.onclick = function () {
        if (register_remeber.checked) {
            rr_label.className = '';      //如果当前为真，则点击后为假
        } else {
            rr_label.className = 'active';
        }
    }
    //注册
    register_button.onclick = function () {
        if (!register_remeber.checked) {
            messageerror('请点击同意按钮');
            return;
        } else {
            ssoerrormessage.innerHTML = '';
        }
        register_phone.focus();
        register_phone.blur();

        register_pwd.blur();

        newSsoShortMatch.blur();

        newSsoshortPhone.blur();

        //判断是否都为真
        var n = matchArr.every(function (item) {
            return item;
        });
        //数据
        var str = 'tel=' + register_phone.value + '&pwd=' + register_pwd.value;

        if (n) {
            U.ajax('get', './data/index_content.json', str, function (data) {
            });
            messageerror('2s后跳转登录页面');
            setTimeout(login_change, 2000);
        }

    }
    //塞入html
    var oldbox = getverification(4);
    U.append(newSsoIdcImg, oldbox);

    //更新验证码
    newSsoFesBtn.onclick = auto;
    function auto() {
        var newSsoIdcImg2 = getverification(4);
        newSsoIdcImg.replaceChild(newSsoIdcImg2, oldbox);
        oldbox = newSsoIdcImg2;
    }
})();