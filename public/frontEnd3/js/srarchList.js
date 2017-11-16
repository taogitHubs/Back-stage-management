$(function(){
    // var url=
    getsearchList();
    // 价格排序
    var flag=true;
    $('#jiage').on('tap',function(){
        if(flag==true){
            getsearchList(1,1,2);
            flag=false;
        }else{
            flag=true;
            getsearchList(1, 2, 2);
        } 
    })
    // 库存排序

    $('#xiaoliang').on('tap',function () {
        console.log(1)
        if (flag == true) {
            getsearchList(1, null, 1);
            flag = false;
        } else {
            flag = true;
            getsearchList(1, null, 2);
        } 
    })
    // 点击立即购买进入商品详情
    $('.search-result-list').on('tap','.item-wrap .item',function(){
        // console.log(1)
        var id=$(this).data('id')
        location.href='/frontEnd3/detail.html?id='+id
    })
    
})
// 根据url地址获取数据
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
            price:price||null,
            num:num||2
        },
        success:function(data){
            console.log(data)
            var srarchList = template('searchList-template',data)
            $('.search-result-list').html(srarchList)

        }
    })
}
