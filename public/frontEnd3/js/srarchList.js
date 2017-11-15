$(function(){
    // var url=
    getsearchList();
})
var getsearchList=function(pageNum,price,num){
    var url = new URLSearchParams(location.search)
    console.log(url)
    var proName=url.get('proName')
    console.log(proName)
    $.ajax({
        type:'get',
        url:'/product/queryProduct',
        data:{
            proName:proName,
            page:pageNum||1,
            pageSize:6,
            price:price||2,
            num:num||2
        },
        success:function(data){
            console.log(data)
            var srarchList = template('searchList-template',data)
            $('.search-result-list').html(srarchList)
        }
    })
}