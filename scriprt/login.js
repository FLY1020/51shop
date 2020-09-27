/*登录页面 */
$(function () {
    $("#bt_login").click(function () {
        // if (username()) {
        //     if (password()) {
        //         
        //     } else {
        //         alert("密码有误!");
        //     }
        // } else {
        //     alert("账号有误!");
        // }

        var username=$("#user").val();
        var password=$("#password").val();
        //调用ajax异步请求，获取角色下面的资源
        $.ajax({
            type: "POST",//post类型请求。
            data: { "username": username,"password":password},//将每一次获取到角色id传递到后台。
            url: "http://localhost:8081/user/login",//请求后台的路径
            success: function (resourceByRole) {//参数即后台返回的数据。
                console.log(resourceByRole);
                //alert(resourceByRole);//先测试一下返回的数据是否正确
                
                if (resourceByRole.success) {
                   
                    window.location.href = "index_.html";
                   
                } else {
                    alert("账号或密码有误！");
                }
            },
            error: function (errorThrown) {
          
                /*弹出其他两个参数的信息*/
                alert("后台服务器出错"+errorThrown);
                
            }
        });

    });



    //验证账号
    function username() {
        return true;
    }
    //验证密码
    function password() {
        return true;
    }

    //账号得到焦点
    $("#user").focus(function () {
        $("#name_span").addClass("textname").removeClass('textnameWr');
        $("#name_span").click(function () {
            $("#user").val("");
        });
        $("#user").removeClass('emailcss');
    });


    //失去焦点是
    $("#user").focusout(function () {
        $("#name_span").addClass("textnameWr").removeClass("textname")
        
        var user = $("#user").val();
        if (user==null||user=="") {
            $("#user").addClass("emailcss");
            $(this).attr('placeholder','账号不能为空')
        } 
    });


    //密码获得焦点
    $("#password").focus(function () {
        $(this).removeClass('emailcss');
        $("#pwd_span").addClass("textname").removeClass('textnameWr');
        $("#pwd_span").click(function () {
            $("#password").val("");
        });
    });


    //失去焦点是
    $("#password").focusout(function () {
        $("#pwd_span").addClass("textnameWr").removeClass("textname")
        var user = $(this).val();
        if (user==null||user=="") {
            $(this).addClass("emailcss");
            $(this).attr('placeholder','密码不能为空')
        } 
    });
});
