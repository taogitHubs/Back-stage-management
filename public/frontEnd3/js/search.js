$(function(){
    lishi();
    // 获取数据 呈现列表
    $('#search-btn').on('tap',function(){
        var ipt = $('.search-box input').val();
        // console.log(ipt)
        setStorage(ipt)
        // console.log(getStorage('key'))
        getStorage('key')
        lishi();
    })
    // 点击删除单条数据
    $(".search-history-list").on('tap', 'i', function (e) {
        // e.stopPropagation();
        var deleteData = $(this).siblings('span').html();
        // console.log(deleteData);
        removeData(deleteData);
        lishi();
    })
    // 清空历史记录
    $('#clear-history').on('tap', function () {
        // 为什么不用localStorage.clear(); 怕影响其他网站或本网站的功能
        localStorage.removeItem('key');
        lishi()
    })
    // 点击跳转
    $('.search-history-list').on('tap','span',function(){
       var proName=$(this).html()
        location.href ='/frontEnd3/searchList.html?proName='+ proName
    })

})

var getStorage=function(){
    return JSON.parse(localStorage.getItem('key')||'[]')
}

var setStorage=function(value){
    var list= getStorage()
    if(value==''){
        return;
    }
    $.each(list,function(i,item){
        if(value == item){
            list.splice(i,1)
        }
    })
     list.push(value)
    localStorage.setItem('key',JSON.stringify(list))
}
var lishi=function(){
    var list= getStorage()
    console.log(list)
    // if()
    if(list.length == 0){
        $('.search-history').hide()
        $('.lt-search p').show()
    }else{
        $('.lt-search p').hide()
        var html = template('searchtemp', { list: list })
        $('.search-history-list').html(html)
        $('.search-history').show()
    }
}
// 删除单条数据
var removeData = function (value) {
    var list = getStorage();//获取历史记录
    $.each(list, function (i, item) {
        if (value == item) {
            list.splice(i, 1);
        }
    })

    // 把切掉的后的数组 放回历史记录中
    window.localStorage.setItem('key', JSON.stringify(list));
}
