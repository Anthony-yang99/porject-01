$(function () {
    //全选功能
    //把全选框的属性值赋值给单个商品的选择框，就可以完成全选功能
    $(".checkall").change(function () {
        console.log($(this).prop("checked"));
        $(".j-checkbox, .checkall").prop("checked", $(this).prop("checked"))
        // getSum()
        getBsum()
        if ($(this).prop("checked")) {
            $(".cart-item").addClass("check-cart-item")
        } else {
            $(".cart-item").removeClass("check-cart-item")
        }
    })
    //所有的商品复选框被选中，全选按钮也要被选中
    //:checked可以用来得到当前已选中的复选框的个数
    $(".j-checkbox").change(function () {
        if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
            $(".checkall").prop("checked", true)
            getSum()
        } else {
            $(".checkall").prop("checked", false)
            getBsum()
        }
        if ($(this).prop("checked")) {
            $(this).parents(".cart-item").addClass("check-cart-item")
        } else {
            $(this).parents(".cart-item").removeClass("check-cart-item")
        }
    })
    //增减商品数量，声明一个变量，把数量赋值个这个变量，增加商品就是变量++
    //减少商品就是变量--,但是商品数量为1时就不能再减少了
    $(".increment").click(function () {
        var num = $(this).siblings(".itxt").val()
        num++
        $(this).siblings(".itxt").val(num)
        //商品价格小计模块
        // var p = $(this).parent().parent().siblings(".p-price").html()
        var p = $(this).parents(".p-num").siblings(".p-price").html()
        // console.log(p); 获取到单价，用字符串剪切的方法吧数字切出来
        p = p.substr(1)
        // console.log(p); 用获取到的单价*数量就得出小计，用html方法赋值小计标签
        //toFixed方法用来保留小数点后多少位，参数写几就保留几位
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * num).toFixed(2))
        getBsum()
    })
    $(".decrement").click(function () {
        var num = $(this).siblings(".itxt").val()
        if (num == 1) {
            return false
        }
        num--
        $(this).siblings(".itxt").val(num)
        //商品价格小计模块
        var p = $(this).parent().parent().siblings(".p-price").html()
        // console.log(p); 获取到单价，用字符串剪切的方法吧数字切出来
        p = p.substr(1)
        // console.log(p); 用获取到的单价*数量就得出小计，用html方法赋值小计标签
        $(this).parent().parent().siblings(".p-sum").html("￥" + (p * num).toFixed(2))
        getBsum()
    })

    //修改文本框中数量，计算小计模块
    $(".itxt").change(function () {
        //先得到文本框中的值，在乘当前商品的单价
        var num = $(this).val()
        //获取当前商品的单价
        var p = $(this).parents(".p-num").siblings(".p-price").html()
        p = p.substr(1)
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * num).toFixed(2))
        getBsum()

    })

    //自己添加的模块，我认为应该选择商品后再计算总数和总价，
    //所有商品都不选时因为总数和总价为0
    // $(".j-checkbox").change(function () {
    //     var counnt = 0 //总数
    //     var money = 0 //总价
    //     $(".j-checkbox").each(function (i, ele) {
    //         if (ele.prop("checked") == true) {

    //         }
    //     })
    // })

    function getBsum() {
        var counnt = 0 //总数
        var money = 0 //总价
        /**
         * 通过循环复选框，来判断哪一个复选框被选中，如果被选中则把所有被选中的商品数量和小计都相加，就得出总量和总价
         * 这里不应该用循环，这样的操作麻烦了，这里都是做一样的操作，应该采用隐式迭代。不对 计算总价和总数还是要用循环
         */
        $(".j-checkbox").each(function (i, ele) {
            if ($(ele).prop("checked")) {
                //$(this).parents(".p-checkbox").siblings(".p-sum").text()
                money += parseFloat($(this).parents(".p-checkbox").siblings(".p-sum").text().substr(1))
                counnt += parseInt($(this).parents(".p-checkbox").siblings(".p-num").children(".quantity-form").children(".itxt").val())
            }
        })
        $(".price-sum em").text("￥" + money.toFixed(2))
        $(".amount-sum em").text(counnt)

    }

    // console.log($(".j-checkbox").parents(".p-checkbox").siblings(".p-num").children(".quantity-form").children(".itxt").val())


    //计算全选商品总数和总价的函数
    function getSum() {
        var counnt = 0 //总数
        var money = 0 //总价
        $(".itxt").each(function (i, ele) {
            counnt += parseInt($(ele).val())
        })
        $(".amount-sum em").text(counnt)
        $(".p-sum").each(function (i, ele) {
            money += parseFloat($(ele).text().substr(1))
        })
        $(".price-sum em").text("￥" + money.toFixed(2))
    }

    //删除商品模块
    //商品后面的删除按钮
    $(".p-action a").click(function () {
        $(this).parents(".cart-item").remove()
        getBsum()
    })
    //删除选中的商品
    $(".remove-batch").click(function () {
        $(".j-checkbox:checked").parents(".cart-item").remove()
        if ($(".j-checkbox:checked").length === 0) {
            $(".checkall").prop("checked", false)
        }
        getBsum()
    })
    //清空购物车
    $(".clear-all").click(function () {
        $(".cart-item").remove()
        $(".checkall").prop("checked", false)
        getBsum()
    })
})