// 该文件的功能是用来写首页的js交互的
NProgress.configure({ showSpinner :false});
// 进度条开始
$(window).ajaxStart(function () {
    NProgress.start();
})
$(function(){
    // toggle 切换
    $('.nav a:first-child').on('click',function(){
        // console.log(1);
        $('.lt_aside').toggle();
        $('.main').toggleClass('cc')
    })
    // 点击分类管理滑出菜单
    $('.menu').on('click','[href="javascript:;"]',function (){
        $(this).siblings('.fenlei').stop().slideToggle();
    })
    // 点击退出按钮
    $('#myModal').on('click','.btn-primary',function(){
        $.ajax({
            type:'get',
            url:'/employee/employeeLogout',
            data:{},
            dataType:'json',
            success:function (data) {
                if(data.success === true){
                    setTimeout(function(){
                        location.href='./login.html';
                    },500)
                }
            }
        })
    })
})
// 进度条完成
$(window).ajaxComplete(function () {
    NProgress.done();
})