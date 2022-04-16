$(function () {
    tool()
    // a()
    var flag = true
    function tool() {
        if ($(document).scrollTop() >= $(".recommend").offset().top) {
            $(".fixedtool").fadeIn()

        } else {
            $(".fixedtool").fadeOut()
        }
    }
    function a() {
        $(".floor .w").each(function (i, ele) {
            // $(".fixedtool li").eq(i).addClass("current").siblings().removeClass()
            console.log($(ele).index());
        })
    }
    $(window).scroll(function () {
        // console.log(11);
        tool()
        if (flag) {
            $(".floor .w").each(function (i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    $(".fixedtool li").eq(i).addClass("current").siblings().removeClass()
                }
            })
        }


    })
    //点击电梯导航滚动到相应的内容
    $(".fixedtool li").click(function () {
        flag = false
        // console.log($(this).index());
        var index = $(this).index()
        // console.log($(".footer .w"));
        // console.log($(".footer w").eq(index).offset().top)
        var current = $(".floor .w").eq(index).offset().top;
        //页面滚动效果
        $("body , html").stop().animate({
            scrollTop: current
        }, function () {
            flag = true
        })
        $(this).addClass("current").siblings().removeClass()
    })
})