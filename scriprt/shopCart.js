$(function () {

    var num_one = 0;//商品数量

    var price_one = Number($("#one_money").text())//获取第一商品价格
    var price_tow = Number($("#tow_money").text())//获取第二商品价格
    var price_three = Number($("#three_money").text())//获取第三商品价格

    //把金额存贮进数组
    var Arrmonyall = new Array();
    Arrmonyall[0] = price_one;
    Arrmonyall[1] = price_tow;
    Arrmonyall[2] = price_three;

    var monyall = 0;//总金额



    //第一个商品减少数量按钮
    $(document).ready(function () {
        $("#bt_min_one").click(function () {
            var num = Number($("#tv_num_one").val());
            if (num < 2) {
            } else {
                var num_one = num - 1;
                $("#tv_num_one").val(num_one);
                price_one = price_one - Number($("#one_price").text());
                $("#one_money").text(price_one);
                Arrmonyall[0] = price_one;

            }

        });
    });

    //第一个商品数量添加按钮
    $(document).ready(function () {
        $("#bt_add_one").click(function () {
            var num = Number($("#tv_num_one").val());
            var num_one = num + 1;
            $("#tv_num_one").val(num_one);
            price_one = price_one + Number($("#one_price").text());
            $("#one_money").text(price_one);
            Arrmonyall[0] = price_one;

        });
    });

    //第二个商品减少数量按钮
    $(document).ready(function () {
        $("#bt_min_two").click(function () {
            var num = Number($("#tv_num_two").val());
            if (num < 2) {
            } else {
                var num_one = num - 1;
                $("#tv_num_two").val(num_one);
                price_tow = price_tow - Number($("#two_price").text());
                $("#tow_money").text(price_tow);
                Arrmonyall[1] = price_tow;

            }

        });
    });

    //第二个商品数量添加按钮
    $(document).ready(function () {
        $("#bt_add_two").click(function () {
            var num = Number($("#tv_num_two").val());
            var num_one = num + 1;
            $("#tv_num_two").val(num_one);
            price_tow = price_tow + Number($("#two_price").text());
            console.log(price_tow);
            $("#tow_money").text(price_tow);
            Arrmonyall[1] = price_tow;

        });
    });

    //第三个商品减少数量按钮
    $(document).ready(function () {
        $("#bt_min_three").click(function () {
            var num = Number($("#tv_num_three").val());
            if (num < 2) {
            } else {
                var num_one = num - 1;
                $("#tv_num_three").val(num_one);
                price_three = price_three - Number($("#three_price").text());
                $("#three_money").text(price_three);
                Arrmonyall[2] = price_three;

            }

        });
    });

    //第三个商品数量添加按钮
    $(document).ready(function () {
        $("#bt_add_three").click(function () {
            var num = Number($("#tv_num_three").val());
            var num_one = num + 1;
            $("#tv_num_three").val(num_one);
            price_three = price_three + Number($("#three_price").text());
            console.log(price_three);
            $("#three_money").text(price_three);
            Arrmonyall[2] = price_three;

        });
    });

    //结算按钮
    $("#bt_j_go").click(function () {
       
        monyall=0;
        var i = 0;
        //总金额
        $("input[name='items[]']:checked").each(function () { // 遍历选中的checkbox
            n = $(this).parents("ul").index();  // 获取checkbox所在行的顺序
           
            monyall += Arrmonyall[n];
            i++;
        });
        //总金额
        $("#J_Total").text(monyall);

        //商品数量
        $("#J_SelectedItemsCount").text(i);
       
    });




    //全选按钮
    //J_SelectAllCbx2为点击全选和反选的复选框的id，items[]为复选框的name值
    $("#J_SelectAllCbx2").click(function () {
        var check = $('#J_SelectAllCbx2').is(':checked');
        if (check) {
            $("input[name='items[]']").attr("checked", true);
        }
        else {
            $("input[name='items[]']").attr("checked", false);
        }

    });

    //删除一个商品
    $(document).ready(function () {
        $('.delete').click(function () {
            var context = this;
            $(".mask").show(); //显示背景色
            showDialog(); //设置提示对话框的Top与Left
            $(".dialog").show(); //显示提示对话框

            $("#Button2").click(function () {//注册确定按钮点击事件
                $(".dialog").hide();
                $(".mask").hide();
                $(context).parents("ul").remove();
            });

        });
    });

    //删除选中的行
    $(".deleteAll").click(function () {
        $(".mask").show(); //显示背景色
        showDialog(); //设置提示对话框的Top与Left
        $(".dialog").show(); //显示提示对话框

        $("#Button2").click(function () {//注册确定按钮点击事件
            $(".dialog").hide();
            $(".mask").hide();
            $("input[name='items[]']:checked").each(function () { // 遍历选中的checkbox
                n = $(this).parents("ul").index();  // 获取checkbox所在行的顺序
                $(this).parents("ul").remove();
            });
        });

    });


    // 确定删除弹窗使用

    /*
    *根据当前页面与滚动条位置，设置提示对话框的Top与Left
    */
    function showDialog() {
        var objW = $(window); //当前窗口
        var objC = $(".dialog"); //对话框
        var brsW = objW.width();
        var brsH = objW.height();
        var sclL = objW.scrollLeft();
        var sclT = objW.scrollTop();
        var curW = objC.width();
        var curH = objC.height();
        //计算对话框居中时的左边距
        var left = sclL + (brsW - curW) / 2;
        //计算对话框居中时的上边距
        var top = sclT + (brsH - curH) / 2;
        //设置对话框在页面中的位置
        objC.css({ "left": left, "top": top });
    }

    $(window).resize(function () {//页面窗口大小改变事件
        if (!$(".dialog").is(":visible")) {
            return;
        }
        showDialog(); //设置提示对话框的Top与Left
    });

    $(".title img").click(function () { //注册关闭图片点击事件
        $(".dialog").hide();
        $(".mask").hide();
    })

    $("#Button3").click(function () {//注册取消按钮点击事件
        $(".dialog").hide();
        $(".mask").hide();
    })




});