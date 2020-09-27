$(function () {

    var username = null;

    var prodiv="";//存贮循环的div

    var id=0;//商品id

    //调用ajax异步请求，判断是否登录
    $.ajax({
        type: "GET",//post类型请求。
        url: "http://localhost:8087/cart/session",//请求后台的路径
        success: function (resourceByRole) {//参数即后台返回的数据。

            //alert(resourceByRole);//先测试一下返回的数据是否正确

            if (resourceByRole.success) {
                username = resourceByRole.msg;
                getUserCart(resourceByRole.msg);
            } else {
                alert("您未登录，请登录");
                window.location.href = "login_.html";
            }
        },
        error: function (textStatus, errorThrown) {

            /*弹出其他两个参数的信息*/
            alert("后台服务器出错" + textStatus + " " + errorThrown);

        }
    });



    function getUserCart(username) {
        //调用ajax异步请求，读取商品
        $.ajax({
            type: "POST",//post类型请求。
            data: { "username": username },//将每一次获取到角色id传递到后台。
            url: "http://localhost:8087/cart/usercart",//请求后台的路径
            success: function (resourceByRole) {//参数即后台返回的数据。
                console.log(resourceByRole);
                //alert(resourceByRole);//先测试一下返回的数据是否正确

                if (resourceByRole.success) {

                    for (var i = 0; i < resourceByRole.msg.length; i++) {

                        var mony = resourceByRole.msg[i].price;
                        var introduction = resourceByRole.msg[i].information;
                        var shopkeeper = resourceByRole.msg[i].shopkeeper;
                        var payers = resourceByRole.msg[i].number;
                        var img = resourceByRole.msg[i].img;
                        var proid = resourceByRole.msg[i].id;
                        var pri_mony = Number(mony) + 100.00;

                        //显示商品的div
                        prodiv += '<ul class="item-content clearfix"><li class="td td-chk"><div class="cart-checkbox "><input class="check" id="J_CheckBox_170037950254" name="items[]"value="170037950254" type="checkbox"><label for="J_CheckBox_170037950254"></label></div></li>' +
                            '<li class="td td-item"><div class="item-pic"><a href="#" target="_blank" data-title="' + introduction + '" class="J_MakePoint" data-point="tbcart.8.12"><img src="' + img + '" width="80px" height="80px"class="itempic J_ItemImg"></a> </div><div class="item-info"><div class="item-basic-info"><a href="#" target="_blank" title="' + introduction + '" class="item-title J_MakePoint" data-point="tbcart.8.11">' + introduction + '   店家 :' + shopkeeper + '</a></div></div> </li>' +
                            '<li class="td td-info"><div class="item-props item-props-can"><span id="class_proid"></span><span class="sku-line">颜色：白色</span><span class="sku-line">包装：裸装</span><span tabindex="0" class="btn-edit-sku theme-login">修改</span> <i class="theme-login mr-icon-sort-desc"></i></div></li>' +
                            ' <li class="td td-price"><div class="item-price price-promo-promo"><div class="price-content"><div class="price-line"> <em class="price-original">' + pri_mony + '</em></div><div class="price-line"><em class="J_Price price-now" id="one_price" tabindex="0">' + mony + '</em></div></div></div></li>' +
                            '<li class="td td-amount"><div class="amount-wrapper "><div class="item-amount "><div class="sl"><input class="min mr-btn" id="bt_min_one" name="" type="button" value="-" /><input class="text_box" id="tv_num_one" name="" type="text" value="1" style="width:30px;" /><input class="add mr-btn" id="bt_add_one" name="" type="button" value="+" /></div></div></div></li>' +
                            '<li class="td td-sum"><div class="td-inner"><em tabindex="0" id="one_money" class="J_ItemSum number">' + mony + '</em></div></li>' +
                            '<li class="td td-op"><div class="td-inner"><a title="购买" class="btn-fav" href="#">购买</a><a href="javascript:;" data-point-url="#" class="delete">删除</a></div></li></ul>';


                    }

                    $(".bundle .bundle-last .bundle-main").append(prodiv);

                    $('.btn-fav').each(function (index) {
                        $(this).on('click', function () {
                            // alert($(this).find("#proid").text());
                             id = resourceByRole.msg[index].id;
                             addOrder(username,id);
                            
                        })
                    });

                    $('.delete').each(function (index) {
                        $(this).on('click', function () {
                            // alert($(this).find("#proid").text());
                             id = resourceByRole.msg[index].id;
                             delect(id);
                        })
                    });


                } else {
                    alert("您还没有添加任何商品！");
                }
            },
            error: function (errorThrown) {

                /*弹出其他两个参数的信息*/
                alert("后台服务器出错" + errorThrown);

            }
        });
    }


    //生成一条订单cart/addorder
    function addOrder(username, id) {
        //调用ajax异步请求，生成一个订单
        $.ajax({
            type: "POST",//post类型请求。
            data: { "username": username, "productid": id ,"delivered":0},//将每一次获取到角色id传递到后台。
            url: "http://localhost:8087/cart/addorder",//请求后台的路径
            success: function (resourceByRole) {//参数即后台返回的数据。
                console.log(resourceByRole);
                //alert(resourceByRole);//先测试一下返回的数据是否正确

                if (resourceByRole.success) {
                    alert("下单成功");
                    delect(id);
                    window.location.href = "orderCart_%20.html";

                } else {
                    alert("下单失败");
                }
            },
            error: function (errorThrown) {

                /*弹出其他两个参数的信息*/
                alert("后台服务器出错" + errorThrown);

            }
        });
    }

    // 删除数据
    function delect(id){
              //调用ajax异步请求，删除一条商品
              $.ajax({
                type: "POST",//post类型请求。
                data: { "username": username,"productid":id},//将每一次获取到角色id传递到后台。
                url: "http://localhost:8087/cart/delectpro",//请求后台的路径
                success: function (resourceByRole) {//参数即后台返回的数据。
                    console.log(resourceByRole);
                    //alert(resourceByRole);//先测试一下返回的数据是否正确
                    
                    if (resourceByRole.success) {
                        alert("删除成功");
                        window.location.href = "shopCart_.html";
                       
                    } else {
                        alert("删除失败！");
                    }
                },
                error: function (errorThrown) {
              
                    /*弹出其他两个参数的信息*/
                    alert("后台服务器出错"+errorThrown);
                    
                }
            });
    }

});