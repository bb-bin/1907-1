$(function (){
    // 加载数据
    $.ajax({
        url: 'data/goods.json',
        type: 'get',
        cache: false,
        dataType: 'json',
        success: function (data){
            var results = '';
            $.each(data,function (index,item){
                results += '<div class="goods" code="'+item.code+'"><img src="'+item.imgurl+'" alt=""><p>'+item.price+'</p><h4>'+item.title+'</h4><div>加入购物车</div></div>';
            });
            $('.content').html(results);
        }
    });

    //  点击加入购物车
    $('.content').on('click','.goods div',function (){
        // 点击的商品的编码
        var code = $(this).parent().attr('code');
        // localStorage: setItem(key,value)
        // 'goods'  =>  '{"code":["abc2","abc6"]}'
        if (localStorage.getItem('goods')) {
            // 获取本地存储的数据[]
            var codeArr = JSON.parse(localStorage.getItem('goods')).code;
        } else {
            var codeArr = [];
        }
        codeArr.push(code);//添加到购物车的商品编码

        // 把数据更新到本地存储
        var jsonStr = JSON.stringify({"code":codeArr});//json 字符串
        localStorage.setItem('goods',jsonStr);

        alert('加入购物车成功！');
    });





})