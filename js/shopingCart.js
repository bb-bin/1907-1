$(function (){

    if (localStorage.getItem('goods')) {
        // 获取本地数据[]
        var codeArr = JSON.parse( localStorage.getItem('goods') ).code;

        if (codeArr.length == 0) {
            return false;
        }

        $.ajax({
            url: 'data/goods.json',
            type: 'get',
            cache: false,
            dataType: 'json',
            success: function (data){
                var results = '';
                $.each(codeArr,function (i,item){
                    $.each(data,function (index,obj){
                        if (item == obj.code) {
                            results += `<li code="${obj.code}"><img src="${obj.imgurl}" alt=""><h5>${obj.title}</h5><p>${obj.price}</p><span>删除</span></li>`;
                        }
                    });
                });
                $('.list').html(results);
            }
        });

        // 删除商品
        $('.list').on('click','li span',function (){
            // 删除节点
            $(this).parent().remove();

            // 点击商品的编码
            var code = $(this).parent().attr('code');

            // 数组： pop()  shift()  splice(idnex,1)
            // 删除本地存储的数据
            $.each(codeArr,function (index,item){
                if (code == item) {
                    codeArr.splice(index,1);
                }
            });

            var jsonStr = JSON.stringify({"code":codeArr});

            localStorage.setItem('goods',jsonStr);

            alert('商品成功移除购物车');

            if (codeArr.length == 0) {
                $('.list').html('<li class="tips">购物车暂无商品!</li>');
            }

        })

    }

})