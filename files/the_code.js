//*********获取语音验证码*********//

var AddInterValObj; //timer变量，控制时间
var adcount = 60; //间隔函数，1秒执行
var adcount1 = 5;//间隔函数，1秒执行
var addCount;//当前剩余秒数
var urlN = "https://ms2.baojunev.com/cs/api/sms/code/";
// var urlH = "http://222.217.61.75:9005";
var urlH ="https://ms.baojunev.com/promotion";
var qts = true;
var phoneNumber

function sendAddmes() {
    var myreg = /^1[2|3|4|5|7|8|9][0-9]{9}$/;
    if (!myreg.test($("#add_phone").val())) {
        layertest('请输入有效的手机号码')
        return false;
    } else {
        addCount = adcount;
        //设置button效果，开始计时
        $("#addSendCode").attr("disabled", "true");
        $("#addSendCode").val("" + addCount + "秒后重新获取").css({"background-color": "#D1D4D3"});
        AddInterValObj = window.setInterval(SetAddnTime, 1000); //启动计时器，1秒执行一次
        var phoneNumber = $("#add_phone").val();
        var code = $("#code").val();
        $.ajax({
            type: "GET",
            url: urlN + phoneNumber,  //目标地址
            xhrFields: {
                withCredentials: true
            },
            error: function (data) {
                layertest('请求失败');
            },
            success: function (msg) {
            }
        });
    }
}

//timer处理函数
function SetAddnTime() {
    if (addCount == 0) {
        window.clearInterval(AddInterValObj);//停止计时器
        $("#addSendCode").removeAttr("disabled");//启用按钮
        $("#addSendCode").val("重新获取验证码").css({"background-color": "#2367c7"});
    }
    else {
        addCount--;
        $("#addSendCode").val("" + addCount + "秒后重新获取").css({"background-color": "#D1D4D3"});
    }
}

function sendAddmes1() {
    var myreg = /^1[2|3|4|5|7|8|9][0-9]{9}$/;
    if (!myreg.test($("#add_phone1").val())) {
        layertest('请输入有效的手机号码')
        return false;
    } else {
        addCount = adcount1;
        // 设置button效果，开始计时
        $("#addSendCode1").attr("disabled", "true");
        $("#addSendCode1").val("" + addCount + "秒后重新查询").css({"background-color": "#D1D4D3"});
        AddInterValObj = window.setInterval(SetAddnTime1, 1000); //启动计时器，1秒执行一次
        var phoneNumber = $("#add_phone1").val();
        $.ajax({
            headers: {
                Accept: "application/json"
            },
            type: "GET",
            url: urlH + '/api/order/' + phoneNumber, //目标地址
            contentType: "application/json;charset=UTF-8",
            xhrFields: {
                withCredentials: true
            },
            error: function (data) {
                $(".load").css("display", "none");
                layertest('请重试');
            },
            success: function (msg) {
                $('#ecode1').val(msg.data.orderNo);
                if(msg.data.friendused==true){
                    $('.used1').css('display','block');
                }
                else if(msg.data.orderNo==null){
                    layertest('该号码查询不到老带新订单，请手动输入订单号或更换查询手机号码')
                }
            }
        });
    }
}

//timer处理函数
function SetAddnTime1() {
    if (addCount == 0) {
        window.clearInterval(AddInterValObj);//停止计时器
        $("#addSendCode1").removeAttr("disabled");//启用按钮
        $("#addSendCode1").val("重新查询订单号").css({"background-color": "#2367c7"});
    }
    else {
        addCount--;
        $("#addSendCode1").val("" + addCount + "秒后重新查询").css({"background-color": "#D1D4D3"});
    }
}

function telephone() {
    var myreg = /^1[2|3|4|5|7|8|9][0-9]{9}$/;
    if (!myreg.test($("#add_phone").val())) {
        layertest('请输入有效的手机号码');
        $('.login_ipt').addClass('error');
        return false;
    } else {
        $('.login_ipt').removeClass('error');
    }
}

//订单号 验证
function code_test() {
    if ($('#code').val() == '') {
        layertest('验证码不能为空');
        $('#code').addClass('error');
    } else {
        $('#code').removeClass('error');
    }
}

//ecode 验证
function ecode_test() {
    if ($('#ecode').val() == '') {
        layertest('订单号不能为空');
        $('#ecode').addClass('error1');
    } else {
        $('#ecode').removeClass('error1');
    }
}

// 老带新手机号验证
function telephone1() {
    var myreg = /^1[2|3|4|5|7|8|9][0-9]{9}$/;
    if (!myreg.test($("#add_phone1").val())) {
        layertest('请输入有效的手机号码');
        $('#add_phone1').addClass('error1');
        return false;
    } else {
        $('#add_phone1').removeClass('error1');
    }
}

// 老带新姓名验证
function nname_test() {
    if ($(".nname").val() == '') {
        layertest('请输入老带新用户姓名');
        $('.nname').addClass('error1');
    }
    else {
        $('.nname').removeClass('error1');
    }
}

//老带新订单号 验证
function ecode1_test() {
    if ($('#ecode1').val() == '') {
        layertest('老带新订单号不能为空');
        $('#ecode1').addClass('error1');
    } else {
        $('#ecode1').removeClass('error1');
        $('#ecode').removeClass('error1');
    }
}

// 奖品验证
function prize_test() {
    if ($(".prize").find("option:selected").val() == 'prize') {
        layertest('请选择奖品');
        $('.prize').addClass('error2');
    } else if ($(".prize").find("option:selected").val() == 11) {
        if ($("#sdprize").val() == '') {
            layertest('请输入奖品名称');
            $('.prize').addClass('error2');
            $('#sdprize').addClass('error2');
        }
        else {
            $('#sdprize').removeClass('error2');
            $('.prize').removeClass('error2');
        }
    }
    else {
        $('.prize').removeClass('error2');
    }
}

function prize1_test() {
    if ($(".prize1").find("option:selected").val() == 'prize1') {
        layertest('请选择奖品');
        $('.prize1').addClass('error2');
    } else if ($(".prize1").find("option:selected").val() == 11) {
        if ($("#sdprize1").val() == '') {
            layertest('请输入奖品名称');
            $('.prize1').addClass('error2');
            $('#sdprize1').addClass('error2');
        }
        else {
            $('#sdprize1').removeClass('error2');
            $('.prize1').removeClass('error2');
        }
    }
    else {
        $('.prize1').removeClass('error2');
    }
}

// 提车点验证
function province_test() {
    if ($(".province").find("option:selected").val() == 'province') {
        layertest('请选择省市自治区');
        $('.province').addClass('error2');
    }
    else {
        $('.province').removeClass('error2');
    }
}

function city_test() {
    if ($(".city").find("option:selected").val() == 'city') {
        layertest('请选择所在城市');
        $('.city').addClass('error2');
    }
    else {
        $('.city').removeClass('error2');
    }
}

function store_test() {
    if ($(".store").find("option:selected").val() == 'store') {
        layertest('请选择领奖门店');
        $('.store').addClass('error2');
    }
    else if ($(".store").find("option:selected").val() == 'qt') {
        if ($("#sdstore").val() == '') {
            layertest('请输入门店');
            $('.store').addClass('error2');
            $('#sdstore').addClass('error2');
        }
        else {
            $('#sdstore').removeClass('error2');
            $('.store').removeClass('error2');
        }
    }
    else {
        $('.store').removeClass('error2');
    }
}

// 销售顾问验证
function sname_test() {
    if ($(".sname").val() == '') {
        layertest('请输入销售顾问的名字');
        $('.sname').addClass('error3');
    }
    else {
        $('.sname').removeClass('error3');
    }
}

// 密码验证
function ycode_test() {
    if ($(".ycode").val() == '') {
        layertest('请输入验证码');
        $('.ycode').addClass('error3');
    }
    else {
        $('.ycode').removeClass('error3');
    }
}

// layer modal
function layertest(content) {
    layer.open({
        content: content
        , btn: '我知道了'
    });
}

//layer loading
function loading(content) {
    layer.open({
        type: 2
        , content: content
    });
}

// update btn click
$(document).on('click', '.updateBtn', function () {
    phoneNumber = $("#add_phone").val();
    var code = $("#code").val();
    code_test();
    telephone();
    if ($('.error').length > 0) {
        return false;
        console.log(error)
    }
    else {
        // loading('跳转中');
        $(".load").css("display", "block");
        //向后台发送处理数据
        $.ajax({
            type: "GET",
            url: urlN + phoneNumber + '/' + code, //目标地址
            xhrFields: {
                withCredentials: true
            },
            error: function (data) {
                $(".load").css("display", "none");
                layertest('认证失败');
            },
            success: function (msg) {
                $.ajax({
                    headers: {
                        Accept: "application/json"
                    },
                    type: "GET",
                    url: urlH + '/api/order/' + phoneNumber, //目标地址
                    contentType: "application/json;charset=UTF-8",
                    xhrFields: {
                        withCredentials: true
                    },
                    error: function (data) {
                        $(".load").css("display", "none");
                        layertest('请重试');
                    },
                    success: function (msg) {
                        console.log(msg);
                        if(msg.data.used==true){
                            $('.used').css('display','block');
                        }
                        $("#big-box1").css('background','url(files/bg1.jpg) no-repeat top center')
                        $('#big-box1').css('background-size','cover')
                        $("#big-box2").css('background','url(files/bg1.jpg) no-repeat top center')
                        $('#big-box2').css('background-size','cover')
                        $("#big-box3").css('background','url(files/bg1.jpg) no-repeat top center')
                        $('#big-box3').css('background-size','cover')
                        $("#big-box").hide(300);
                        $('#big-box1').show(300);
                        $(".load").css("display", "none");
                        $('#big-box1').find(".bottom").append('<img src="files/hammer.png" class="hammer">');
                        $('.ecode').val(msg.data.orderNo);
                    }
                })
            }
        })
    }
    return phoneNumber
})
$(document).on('click', '.updateBtn1', function () {

    if ($('#add_phone1').val() != '' || $('#nname').val() != '' || $('#ecode1').val() != '') {
        ecode1_test();
        telephone1();
        nname_test();
    }
    else{
        ecode_test();
    }
    if ($('.error1').length > 0) {
        return false;
    }
    else {
        $("#big-box1").hide(300);
        $('#big-box2').show(300);
        $('#big-box2').find(".bottom").append('<img src="files/hammer.png" class="hammer">');
        var ecode1 = $('#ecode1').val();
        if (ecode1 != '') {
            $(document).ready(function () {
                $('.prize').after('<select name="prize1" class="prize1 psel error2">'
                    + '<option value="prize1">请选择老带新礼品</option>\n' +
                    '<option value="1">E100北欧极简风方向盘套</option>' +
                    '<option value="2">E100无骨雨刮</option>' +
                    '<option value="3">E200方向盘套</option>' +
                    '<option value="4">E200雨眉</option>' +
                    '<option value="5">E200无骨雨刮</option>' +
                    '<option value="6">棒球帽</option>' +
                    '<option value="7">保温杯</option>' +
                    '<option value="8">蜡刷</option>' +
                    '<option value="9">反向伞</option>' +
                    '<option value="10">香薰停车号码牌</option>' +
                    '<option value="11">其他</option>' +
                    '</select>')
                var pr1 = true;
                $('.prize1').change(function () {
                    if ($(".prize1").find("option:selected").val() == 11 && pr1) {
                        $(this).after('<input type="sdprize1" name="sdprize1" class="sdprize1 psel error2" id="sdprize1" value="" placeholder="手动输入奖品名称" />');
                        return pr1 = false;
                    }
                    else {
                        $('#sdprize1').remove();
                        return pr1 = true;
                    }
                })
            })
        }
        // 获取门店
        var arrp = [];
        $.ajax({
            headers: {
                Accept: "application/json"
            },
            type: "GET",
            url: urlH + '/api/province', //目标地址
            contentType: "application/json",
            xhrFields: {
                withCredentials: true
            },
            error: function (data) {
                $(".load").css("display", "none");
                layertest('请重试');
            },
            success: function (msg) {
                for (var i = 0; i < msg.data.length; i++) {
                    if (arrp.indexOf(msg.data[i].name) == -1) {
                        arrp.push(msg.data[i].name);
                        $(".province").append("<option class='province1' value='" + msg.data[i].id + "'>" + msg.data[i].name + "</option>")
                    }
                }
            }
        })
    }
})
$(document).on('click', '.updateBtn2', function () {
    store_test();
    city_test();
    province_test();
    prize_test();
    var ecode1 = $('#ecode1').val();
    if (ecode1 != '') {
        prize1_test();
    }
    if ($('.error2').length > 0) {
        return false;
    }
    else {
        $("#big-box2").hide(300);
        $('#big-box3').show(300);
        $('#big-box3').find(".bottom").append('<img src="files/hammer.png" class="hammer">');
    }
})
$(document).on('click', '.updateBtn3', function () {
    ycode_test();
    sname_test();
    if ($('.error3').length > 0) {
        return false;
    }
    else {
        $(".load").css("display", "block");
        var password = $('#ycode').val();
        var store;
        if ($(".store").find("option:selected").val() == 'qt') {
            store = $('#sdstore').val()
        }
        else {
            store = $(".store").find("option:selected").html()
        }
        var mobile = $('#add_phone').val();
        var orderNo = $('#ecode').val();
        var salesConsultantName = $('#sname').val();
        var friendName = $('#nname').val();
        var friendmobile = $('#add_phone1').val();
        var friendOrderNo = $('#ecode1').val();
        var gift;
        if ($(".prize").find("option:selected").val() == '11') {
            gift = $('#sdprize').val()
        }
        else {
            gift = $(".prize").find("option:selected").html()
        }
        var friendgift;
        if ($(".prize1").find("option:selected").val() == '11') {
            friendgift = $('#sdprize1').val()
        }
        else {
            friendgift = $(".prize1").find("option:selected").html()
        }
        arr = {
            "password": password,
            "name": "",
            "store": store,
            "mobile": mobile,
            "orderNo": orderNo,
            "salesConsultantName": salesConsultantName,
            "friendName": friendName,
            "friendmobile": friendmobile,
            "friendOrderNo": friendOrderNo,
            "gift": gift,
            "friendgift": friendgift
        }
        console.log(arr);
        $.ajax({
            headers: {
                Accept: "application/json"
            },
            type: "POST",
            url: urlH + '/api/order/' + mobile, //目标地址
            contentType: "application/json",
            xhrFields: {
                withCredentials: true
            },
            data: JSON.stringify(arr),
            error: function (data) {
                $(".load").css("display", "none");
                layertest('请重试');
            },
            success: function (msg) {
                console.log(msg);
                $(".load").css("display", "none");
                if (msg.code == 3) {
                    layertest('验证码错误');
                }
                else {
                    $("#big-box3").hide(300);
                    $('#box2').css('background','url(files/bg3.jpg) no-repeat top center');
                    $('#box2').css('background-size','cover');
                    $('#box2').show(300);
                }
            }
        })
    }
})
// 下拉框监听变换
$(document).ready(function () {
    var pr = true;
    $('.prize').change(function () {
        if ($(".prize").find("option:selected").val() == 11 && pr) {
            $(this).after('<input type="sdprize" name="sdprize" class="sdprize psel error2" id="sdprize" value="" placeholder="手动输入奖品名称" />');
            return pr = false;
        }
        else {
            $('#sdprize').remove();
            return pr = true;
        }
    })
    // 城市接口
    $('.province').change(function () {
        $('.city1').remove();
        $('.store1').remove();
        $('#sdstore').remove();
        qts = true;
        $('.store').append('<option class="store1" value="store">请先选择所在城市</option>');
        var pval = $(".province").find("option:selected").val();
        if(pval!='province'){
            $.ajax({
                headers: {
                    Accept: "application/json"
                },
                type: "GET",
                url: urlH + '/api/city/' + pval, //目标地址
                contentType: "application/json",
                xhrFields: {
                    withCredentials: true
                },
                error: function (data) {
                    $(".load").css("display", "none");
                    layertest('请重试');
                },
                success: function (msg) {
                        var arrc = [];
                        $(".city").append('<option class="city1" value="city">请选择所在城市</option>')
                        for (var i = 0; i < msg.data.length; i++) {
                            if (arrc.indexOf(msg.data[i].name) == -1) {
                                arrc.push(msg.data[i].name);
                                $(".city").append("<option class='city1' value='" + msg.data[i].id + "'>" + msg.data[i].name + "</option>")
                            }
                        }
                }
            })
        }
        else{
            $('.city').append('<option class="city1" value="city">请先选择省市自治区</option>');
        }
    })
    // 门店接口
    $('.city').change(function () {
        $('.store1').remove();
        $('#sdstore').remove();
        qts = true;
        var cval = $(".city").find("option:selected").val();
        if(cval!='city'){
            $.ajax({
                headers: {
                    Accept: "application/json"
                },
                type: "GET",
                url: urlH + '/api/store/' + cval, //目标地址
                contentType: "application/json",
                xhrFields: {
                    withCredentials: true
                },
                error: function (data) {
                    $(".load").css("display", "none");
                    layertest('请重试');
                },
                success: function (msg) {
                        var arrs = [];
                        $('.store').append('<option  class="store1" value="store">请选择领取礼品门店</option>');
                        for (var i = 0; i < msg.data.length; i++) {
                            if (arrs.indexOf(msg.data[i].name) == -1) {
                                arrs.push(msg.data[i].name);
                                $(".store").append("<option class='store1' value='" + msg.data[i].id + "'>" + msg.data[i].name + "</option>")
                            }
                        }
                        $('.store').append('<option  class="store1" value="qt">手动填写</option>');
                }
            })
        }
        else{
            $('.store').append('<option class="store1" value="store">请先选择所在城市</option>');
        }

    })
    $('.store').change(function () {
        if ($(".store").find("option:selected").val() == 'qt' && qts) {
            $(this).after('<input type="sdstore" name="sdstore" class="sdstore psel error2" id="sdstore" value="" placeholder="手动输入门店" />');
            return qts = false;
        }
        else {
            $('#sdstore').remove();
            return qts = true;
        }

    })
    // 获取失去焦点验证订单是否使用
$('#ecode').focus(function(){
    $('.used').css('display','none')
});
    $('#ecode').blur(function(){
        var order=$('#ecode').val();
        $.ajax({
            headers: {
                Accept: "application/json"
            },
            type: "GET",
            url: urlH + '/api/order/' + phoneNumber +'/'+order, //目标地址
            contentType: "application/json;charset=UTF-8",
            xhrFields: {
                withCredentials: true
            },
            error: function (data) {
                layertest('请重试');
            },
            success: function (msg) {
                if(msg.data.status==1||msg.data.status==3){
                    $('.used').css('display','block') ;
                }
            }
        })
    });
    $('#ecode1').focus(function(){
        $('.used1').css('display','none')
    });
    $('#ecode1').blur(function(){
        var orderFriend=$('#ecode1').val();
        $.ajax({
            headers: {
                Accept: "application/json"
            },
            type: "GET",
            url: urlH + '/api/order/' + phoneNumber +'/'+orderFriend, //目标地址
            contentType: "application/json;charset=UTF-8",
            xhrFields: {
                withCredentials: true
            },
            error: function (data) {
                layertest('请重试');
            },
            success: function (msg) {
                console.log(msg.msg);
                if(msg.data.status==2||msg.data.status==3){
                    $('.used1').css('display','block') ;
                }
            }
        })
    });
})
