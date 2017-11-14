$(function () {
    var getproductManage = function (pageNum) {
        $.ajax({
            type: 'get',
            url: '/product/queryProductDetailList',
            data: {
                page: pageNum || 1,
                pageSize:5
            },
            success: function (data) {
                // console.log(data)
                var productManaget = template('productManage', data)
                $('tbody').html(productManaget)
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
                        getproductManage(page);
                    }
                });
            }
        })
    }
    getproductManage();
})