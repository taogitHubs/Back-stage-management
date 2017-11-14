$(function(){
    // 获取数据
    var getUserManageData= function(pageNum){
        $.ajax({
            type:'get',
            url:'/user/queryUser',
            data:{
                page: pageNum || 1,
                pageSize: 5
            },
            success:function (data) {
                var userManageList = template('usermanage-template', data);
                $('tbody').html(userManageList);
                $('.pagination').bootstrapPaginator({
                    /*当前使用的是3版本的bootstrap*/
                    bootstrapMajorVersion: 3,
                    /*配置的字体大小是小号*/
                    size: 'small',
                    /*当前页*/
                    currentPage: data.page,
                    /*一共多少页*/
                    // 总页数=数据的总数/每页显示多少条数据
                    totalPages: Math.ceil(data.total / data.size),
                    /*点击页面事件*/
                    onPageClicked: function (event, originalEvent, type, page) {
                        /*改变当前页再渲染 page当前点击的按钮的页面*/
                        getUserManageData(page);
                    }
                })
            }
        })
    }
    getUserManageData();
    $('tbody').on('click','.btn',function () {
        var id=$(this).data('id')
        var name = $(this).data('name');
        // console.log(name)
        var isDelete = $(this).hasClass('btn-danger')?0:1
        if (isDelete == 1) {
            $('#userModal').find('p').html('<i class="glyphicon glyphicon-info-sign"></i>你确定要禁用' + name + '吗？');
            // console.log(1);
        } else {
            $('#userModal').find('p').html('<i class="glyphicon glyphicon-info-sign"></i>你确定要起用' + name + '吗？');
            // console.log(0);
        }
        $('#userModal').on('click', '.btn-primary', function () {
            $.ajax({
                type:'post',
                url: ' /user/updateUser',
                data:{
                    id:id,
                    isDelete: isDelete
                },
                success:function (data) {
                    console.log(data)
                    if(data.success=true){
                        $('#userModal').modal('hide');
                        getUserManageData();
                    }
                }
            })
        })
    })
})