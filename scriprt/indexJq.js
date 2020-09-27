$(function () {

    var id=0;//商品id
    var username=null;

    //调用ajax异步请求
    $.ajax({
        type: "GET",//post类型请求。
        // data: { "id": "username"},//将每一次获取到角色id传递到后台。
        url: "http://localhost:8086/index/product",//请求后台的路径
        success: function (resourceByRole) {//参数即后台返回的数据。
            console.log(resourceByRole);
            //alert(resourceByRole);//先测试一下返回的数据是否正确
            // alert(resourceByRole.msg.length);


            for (var i = 0; i < resourceByRole.msg.length; i++) {

                var mony = resourceByRole.msg[i].price;
                var introduction = resourceByRole.msg[i].information;
                var shopkeeper = resourceByRole.msg[i].shopkeeper;
                var payers = resourceByRole.msg[i].number;
                var img = resourceByRole.msg[i].img;
                var proid = resourceByRole.msg[i].id;

                $(".procd").append("<div class='pro_one'><div class='pro_img'><img src='" + img + "' ></div><div><span id='pro_mony'>" + mony + "</span>" +
                "<span id='pro_baoyou'>包邮</span><span id='proid'>"+proid+"</span></div><div class='pro_cla_introduction'><span class='pro_introduction'>" + introduction + "</span> </div><div><span class='pro_shopkeeper'>" + shopkeeper + "</span><span class='pro_payers'>" + payers + "" + "人付款</span></div><div class='bt'><input type='button' class='gouwu' value='添加购物车'></div></div>")
           
           
              
            }

            $('.pro_one').each(function(index){
                $(this).on('click',function(){
                    // alert($(this).find("#proid").text());
                     id=Number($(this).find("#proid").text());
                    getSession(id);
                 // alert(index);
                })
              })

        },
        error: function (errorThrown) {

            /*弹出其他两个参数的信息*/
            alert("后台服务器出错" + errorThrown);

        }
    });


    function getSession(id){
        
        //调用ajax异步请求，调转页面
        $.ajax({
            type: "GET",//post类型请求。
            url: "http://localhost:8086/index/session",//请求后台的路径
            success: function (resourceByRole) {//参数即后台返回的数据。
                console.log(resourceByRole);
                //alert(resourceByRole);//先测试一下返回的数据是否正确
                
                if (resourceByRole.success) {
                    setCart(id,resourceByRole.msg);
                    window.location.href = "shopCart_.html?user="+resourceByRole.msg;
                } else {
                    alert("您未登录，请登录");
                    window.location.href = "login_.html";
                }
            },
            error: function (textStatus, errorThrown) {
          
                /*弹出其他两个参数的信息*/
                alert("后台服务器出错"+textStatus+" "+errorThrown);
                
            }
        });
    }

    function setCart(id,username){
       //调用ajax异步请求，添加一个商品
       $.ajax({
        type: "POST",//post类型请求。
        data: { "username": username,"productid":id},//将每一次获取到角色id传递到后台。
        url: "http://localhost:8087/cart/setpro",//请求后台的路径
        success: function (resourceByRole) {//参数即后台返回的数据。
            console.log(resourceByRole);
            //alert(resourceByRole);//先测试一下返回的数据是否正确
            
            if (resourceByRole.success) {
               
               
               
            } else {
                alert("添加失败！");
            }
        },
        error: function (errorThrown) {
      
            /*弹出其他两个参数的信息*/
            alert("后台服务器出错"+errorThrown);
            
        }
    });
    }
    

});

