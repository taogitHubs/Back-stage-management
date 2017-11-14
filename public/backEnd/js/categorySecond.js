$(function(){
    var getSecondData=function(pageNum){
        $.ajax({
            typa:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:pageNum||1,
                pageSize:5
            },
            success:function(data){
                // console.log(1)
                // console.log(data)
                var categorySecond = template('second-template',data)
                $('tbody').html(categorySecond)
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
                        getSecondData(page);
                    }
                });
            }
        })
    }
    getSecondData();
    $('#secondform').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            // 字段名是name属性的值
            brandName: {
                validators: {
                    notEmpty: {
                        message: '二级分类名称不能为空'
                    }
                }
            },
            categoryId: {
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
        var $form=$(e.target);
     
        // var $form = $(e.target);
        // console.log($form.serialize());
        // console.log($form); 
        // serialize(); 序列化 
        // send() 对象-- 这是自己传
        // http协议要的是什么 键值对  key=value&key1=value1
        // Get the BootstrapValidator instance
        // var bv = $form.data('bootstrapValidator');
        // 使用ajax提交表单数据 
        // console.log($form)
        // console.log($('#categoryId').val())
        var data = $form.serialize();
        // console.log(data)
        $.ajax({
            type:'post',
            url:'/category/addSecondCategory',
            data:data,
            success:function(data){
                // console.log(data)
                window.location.reload();
            }
        })
    });



    var initDropDown =function(){
        var dripdownMenu = $('.dropdown-menu')
       $('.dropdown button').on('click',function(){
            $.ajax({
                type:'get',
                url:'/category/queryTopCategoryPaging',
                data:{
                    page:1,
                    pageSize:100
                },
                success:function(data){
                    console.log(data)
                    var html=''
                    $.each(data.rows,function (i,item) {
                        console.log(item.id)
                        html += '<li><a href="javascript:;" data-id="'+item.id+'">' + item.categoryName+'</a></li>'
                    })
                    $('.dropdown-menu').html(html)
                    $('.dropdown-menu').on('click','a',function(){
                        $('.dropdown-text').html($(this).html())
                        $('#categoryId').val($(this).data('id'))
                    })
                }
            })
        })
    }
    initDropDown();
    var initUpload = function () {
        // 下面的id是type=file类型的input的id
        $("#secondupload").fileupload({
            // 找到上传图片的接口
            url: "/category/addSecondCategoryPic",
            done: function (e, data) {
                // console.log(data);
                $('#previewimg').attr('src', data.result.picAddr);
                $('#brandLogo').val(data.result.picAddr);
            }
        })
    }
    initUpload();
})