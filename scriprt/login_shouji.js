/*登录页面 */
$(function () {
    var myVar=null;//定时器
    var i=60;//定时
    var star=true;//判断是否发送过验证码
    $("#bt_yanzhengma").click(function () {
  

       if(star){
        var phone=$("#phone").val();
      
        //调用ajax异步请求，发送验证码
        $.ajax({
            type: "POST",//post类型请求。
            data: { "phone": phone},//将每一次获取到角色id传递到后台。
            url: "http://localhost:8081/user/code",//请求后台的路径
            success: function (resourceByRole) {//参数即后台返回的数据。
                console.log(resourceByRole);
                //alert(resourceByRole);//先测试一下返回的数据是否正确
                
                if (resourceByRole.success) {
                    i=60;
                    $(".bt_yanzheng").text("60"+"秒后重新发送");
                     myVar=  setInterval(getLoc,1000);
                    star=false;
                } else {
                    alert(resourceByRole.msg);
                }
            },
            error: function (textStatus, errorThrown) {
          
                /*弹出其他两个参数的信息*/
                alert("后台服务器出错"+textStatus+" "+errorThrown);
                
            }
        });
       }

    });

    

    //验证码循环
    function getLoc(){
        if(i<1){
            clearInterval(myVar);
            star=true;
            $(".bt_yanzheng").text("发送验证码");
        }else{
            i--;
            $(".bt_yanzheng").text(i+"秒后重新发送");
        }
        
    }

    $("#bt_login").click(function(){
        var code=$("#yanzhengma").val();
        console.log(code);
        //调用ajax异步请求，获取角色下面的资源
        $.ajax({
            type: "POST",//post类型请求。
            data: { "code": code},//将每一次获取到角色id传递到后台。
            url: "http://localhost:8080/user/verificationcode",//请求后台的路径
            success: function (resourceByRole) {//参数即后台返回的数据。
                console.log(resourceByRole);
                //alert(resourceByRole);//先测试一下返回的数据是否正确
                
                if (resourceByRole.success) {
                    window.location.href = "index_.html";
                } else {
                    $("#yanzhengma").addClass('yanzheng_input');
                    $(".tishi").attr("style","display:block;");//显示div
                }
            },
            error: function (textStatus, errorThrown) {
          
                /*弹出其他两个参数的信息*/
                alert("后台服务器出错"+textStatus+" "+errorThrown);
                
            }
        });
    });



    //手机号码密码获得焦点
    $("#yanzhengma").focus(function () {
        $(".tishi").attr("style","display:none;");//显示div
        $("#yanzhengma").removeClass('yanzheng_input');
    });

});
