$(function () {
    var getcategoryFirst=function (pageNam) {
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:pageNam||1,
                pageSize:5
            },
            success:function (data) {
                // console.log(data)
                var categoryFirst = template('first-template', data);
                $('tbody').html(categoryFirst);
                // 分页
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
                        getcategoryFirst(page);
                    }
                });
            }
        })
    }
    getcategoryFirst();
    // 校验
    // 添加--校验

    // http://blog.csdn.net/u013938465/article/details/53507109
    $('#first-form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            // 字段名是name属性的值
            categoryName: {
                validators: {
                    notEmpty: {
                        message: '一级分类名称不能为空'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        // Prevent form submission
        e.preventDefault();
        // Get the form instance
        // var $form = $(e.target);
        // console.log($form.serialize());
        // console.log($form); 
        // serialize(); 序列化 
        // send() 对象-- 这是自己传
        // http协议要的是什么 键值对  key=value&key1=value1
        // Get the BootstrapValidator instance
        // var bv = $form.data('bootstrapValidator');
        // 使用ajax提交表单数据 
        var formData=$('#first-form').serialize();
        // console.log(formData)
        $.ajax({
            type:'post',
            url:'/category/addTopCategory',
            data:formData,
            success:function(data){
                if(data.success==true){
                    // $('#firstModal').modal('hide');
                    // getcategoryFirst(); 
                    window.location.reload();
                }
                
            }
        })
    });
 
})