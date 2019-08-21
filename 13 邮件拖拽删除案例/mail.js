$(function () {

    var $bgUrl = ['img/list-1.png', 'img/list-2.png', 'img/list-3.png', 'img/list-4.png', 'img/list-5.png', 'img/list-6.png', 'img/list-7.png', 'img/list-8.png', 'img/list-9.png', 'img/list-10.png']

    var $text = ['写信', '收信', '通讯录', '收件箱', '星标邮件', '群邮件', '草稿箱', '已发送', '已删除', '垃圾箱']

    //邮件菜单栏添加内容
    for (var i = 0; i < $text.length; i++) {

        var lis = `<li style ='background:url(${$bgUrl[i]}) no-repeat 24px 15px'><a>${$text[i]}</a></li>`;
        if (i > $text.length - 3) {

            lis = `<li style ='background:url(${$bgUrl[i]}) no-repeat 24px 15px'><a>${$text[i]}<span>清空</span></li>`;
        }
        $('#asideLi').append(lis);

        $('#asideLi li:nth-child(4)').addClass('active');
    }


    //邮件内容区添加内容
    var conLi = list.map(function (item) {

        return ` <li id="${item.id}"><input type="checkbox"><h4 >${item.caption}</h4><span  >${item.time}</span><p  >${item.desc}</p></li>`;

    })

    $('#check').append(conLi);


    //全选控制
    $('#checkAll').click(function () {

        var checkedAllOff = $('#checkAll').prop('checked');

        if (checkedAllOff) {

            $('#check input').prop('checked', true).parent().addClass('bg');

        } else {

            $('#check input').prop('checked', false).parent().removeClass('bg');

        }


    })

    //通过获取每个input的cheked属性来确定是否添加class
    for (var i = 0; i < $('#check  input').length; i++) {

        $($('#check  input')[i]).click(function () {

            var checkedoff = $(this).prop('checked');

            $(this).parent()[checkedoff ? 'addClass' : 'removeClass']('bg');

            checkAll()
        })

    }
    // 数组方法every 控制全选框是否选中
    function checkAll() {

        var checkAll = [...$($('#check li'))].every(item => { return $(item).find('input').prop('checked');});

        checkAll ? $('#checkAll').prop('checked', true) : $('#checkAll').prop('checked', false);

    }



    $('#delete').click(function () {

        var selectLi = $('li[class="bg"]');

        //删除选中的li 即class="bg" 的li
        selectLi.remove();

        $('#checkAll').prop('checked', false);


        // 删除数据
        // for (var i = 0; i < list.length; i++) {

        //     //得到id值 与list中id 比较 相同则删除
        //     var dateId = selectLi.attr('id');

        //     if (list[i].id == dateId) {

        //         list.splice(i, 1)

        //     }

        // }
        

    })

    for (var i = 0; i < $('#check li').length; i++) {

        $($('#check li')[i]).mousedown(function (e) {

            var PZ = null;

            if ($(this).hasClass('bg')) {


                $(document).mousemove(function (e) {

                    //计算目标元素到定位父级的距离
                    var tipX = e.pageX - $('#tip').width() / 2 - $('#wrap').offset().left;

                    var tipY = e.pageY - $('#tip').height()*2- $('#wrap').offset().top ;

                    //  e.clientX, e.clientY 窗口可视区域, e.pageX, e.pageY 整个文档
                    $('#tip').css({ 'display': 'block', 'top': tipY + 'px', 'left': tipX + 'px' });

                    $('#tip').find('span').html($('#check li[class="bg"]').length)

                    //取消默认行为（标准）
                    // e.preventDefault();
                    
                    //碰撞检测 碰上为true 没碰上为false
                    var delL = $('#asideLi li:nth-last-child(2)').offset().left;
                    var delT =  $('#asideLi li:nth-last-child(2)').offset().top;
                   
                    if(tipX-delL<100 && delT-tipY > -20&& delT-tipY < 40 ){

                        PZ = true;

                    }else{

                        PZ = false;

                    }
                });

                $(document).mouseup(function () {

                    $(this).off();

                    $('#tip').css('display', 'none');
                    //碰撞后删除
                    if(PZ){

                        $('li[class="bg"]').remove();
                        
                        if( $('#checkAll').prop('checked', false)){ 

                            return;

                        }else{

                        $('#checkAll').prop('checked', false);

                        }
                    }
                })

            } else {

                $('#tip').css('display', 'none');
            }

            return false;
        });
    }
})