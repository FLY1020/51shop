$(function () {
    var input_email = false;
    var input_password = false;
    var input_passwordRepeat = false;
    var input_tel = false;

    var input_user = false;

    //邮箱失去焦点是
    $("#email").focusout(function () {
        var myreg = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
        var tv_email = $("#email").val();
        input_email = true;
        if (!myreg.test(tv_email)) {
            $("#email").addClass("emailcss");
            $("#email").val("")
            $(this).attr('placeholder','请输入正确的邮箱号');
            input_email = false;
        } else {
            input_email = true;
        }
    });

    //邮箱获得焦点
    $("#email").focus(function () {
        $("#email").removeClass('emailcss');


    });

    //账号失去焦点是
    $("#username").focusout(function () {
        var tv_password = $("#username").val();
        if (tv_password==null||tv_password=="") {
            $("#username").addClass("emailcss");
            $(this).attr('placeholder','密码不能为空')
            input_user = false;
        } else {
            input_user = true;
        }
    });

    //账号获得焦点
    $("#username").focus(function () {
        $("#username").removeClass('emailcss');

    });

    //密码失去焦点是
    $("#password").focusout(function () {
        var tv_password = $("#password").val();
        if (tv_password==null||tv_password=="") {
            $("#password").addClass("emailcss");
            $(this).attr('placeholder','密码不能为空')
            input_password = false;
        } else {
            input_password = true;
        }
    });

    //密码获得焦点
    $("#password").focus(function () {
        $("#password").removeClass('emailcss');

    });


    //确认密码密码失去焦点是
    $("#passwordRepeat").focusout(function () {
        var tv_passwordRepeat = $("#passwordRepeat").val();
        var tv_password = $("#password").val();
        if (tv_passwordRepeat!=tv_password) {
            $("#passwordRepeat").addClass("emailcss");
            $("#passwordRepeat").val("");
            $(this).attr('placeholder','密码不一致')
            input_passwordRepeat = false;
        } else {
            input_passwordRepeat = true;
        }
    });

    //确认密码密码获得焦点
    $("#passwordRepeat").focus(function () {
        $("#passwordRepeat").removeClass('emailcss');
    });


    //手机号码失去焦点是
    $("#tel").focusout(function () {
        var tv_password = $("#tel").val();
        if (tv_password==null||tv_password=="") {
            $("#tel").addClass("emailcss");
            $(this).attr('placeholder','手机号不能为空');
            input_tel = false;
        } else {
            input_tel = true;
        }
    });

    //手机号码密码获得焦点
    $("#tel").focus(function () {
        $("#tel").removeClass('emailcss');

    });

    $("#bt_register").click(function () {
        if (input_email & input_password & input_passwordRepeat & input_tel&input_user) {

        //获取控件消息
        var username=$("#username").val();
        var password=$("#password").val();
        var email=$("#email").val();
        var tel=$("#tel").val();

         //调用ajax异步请求，获取角色下面的资源
        $.ajax({
            type: "POST",//post类型请求。
            data: { "username": username,"password":password,"email":email,"phone":tel},//将每一次获取到角色id传递到后台。
            url: "http://localhost:8081/user/register",//请求后台的路径
            success: function (resourceByRole) {//参数即后台返回的数据。
                console.log(resourceByRole);
                //alert(resourceByRole);//先测试一下返回的数据是否正确
                
                if (resourceByRole.success) {
                  
                    alert("注册成功！");
                   
                } else {
                    alert(resourceByRole.msg);
                }
            }, error: function (textStatus, errorThrown) {
          
                /*弹出其他两个参数的信息*/
                alert("后台服务器出错"+textStatus+" "+errorThrown);
                
            }
        });
        }else{
            alert("注册失败!");
        }
    });

});

