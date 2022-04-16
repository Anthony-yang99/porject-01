$(function () {
    load()
    $("#title").on("keydown", function (event) {
        //判断是否按下回车键
        if (event.keyCode === 13) {
            if ($(this).val() === "") {
                alert("请勿提交为空")
            } else {
                //先读取本地存储数据
                var loca = getDate()
                console.log(loca);
                //把数组进行更新数据，把最新的数据追加给local数组，再把数组保存到本地存储
                loca.push({ title: $(this).val(), done: false })
                saveDate(loca)
                //加载数据到页面
                load()
                $(this).val("")
            }

        }
    })

    //todolist 删除操作
    $("#todolist ,#donelist").on("click", "a", function () {
        //先获取本地存储
        var data = getDate()
        //获取到a标签的索引，修改数据
        var index = $(this).attr("class")
        // console.log(index);
        data.splice(index, 1)
        saveDate(data)
        load()
    })
    //正在进行和已完成选项操作
    $("ol,ul").on("click", "input", function () {
        //获取本地存储
        var data = getDate()
        //修改数据
        var index = $(this).siblings("a").attr("class")
        data[index].done = $(this).prop("checked")
        // console.log(data);
        saveDate(data)
        load()
    })

    //获取本地存储数据
    function getDate() {
        var date = localStorage.getItem("todolist")
        //判断是否有本地存储数据，如果有就把数据转换为数组格式返回
        //如果没有就返回一个空数组
        if (date !== null) {
            return JSON.parse(date)
        } else {
            return []
        }
    }
    //保存数据到本地存储
    function saveDate(data) {
        localStorage.setItem("todolist", JSON.stringify(data))
    }
    //把数据渲染加载到页面
    function load() {
        //获取到本地数据
        var data = getDate()
        //但是在遍历本地数据之前要想清空ol中的标签，要不然会出现重复数据
        $("ol,ul").empty()
        var con = 0//正在进行的
        var done = 0//已完成的
        //遍历本地数据
        $.each(data, function (i, ele) {
            //添加标签
            if (ele.done) {

                $("#donelist").prepend("<li><input type='checkbox' checked = 'checked'><p>" + ele.title + "</p><a href='javascript:;' class=" + i + "></a></li>")
                done++
            } else {
                $("#todolist").prepend("<li><input type='checkbox' ><p>" + ele.title + "</p><a href='javascript:;' class=" + i + "></a></li>")
                con++
            }

        })
        $("#todocount").text(con)
        $("#donecount").text(done)

    }
})