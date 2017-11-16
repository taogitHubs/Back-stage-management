$(function(){
    getDetail();
})
var getDetail=function(){
    var url=new URLSearchParams(location.search)
    var id = url.get('id')
    console.log(id)
    $.ajax({
        type:'get',
        url:'/product/queryProductDetail',
        data:{
            id:id
        },
        success:function(data){
            console.log(data)
            var detailmb = template('detailtemplate',data)
            $('.lt-detail').html(detailmb)
        }
    })
}