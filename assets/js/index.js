$(function() {
        getUserInfo();

        $('#btnLogOut').on('click', function() {
            var layer = layui.layer;
            layer.confirm('确认退出登录?', { icon: 3, title: '提示' }, function(index) {
                //do something
                localStorage.removeItem('token');
                location.href = '/login.html';
                layer.close(index);
            });
        })

    })
    //获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            renderAvatar(res.data);
        }
    })
}
//渲染头像
function renderAvatar(user) {
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text_avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        var first_name = name[0].toUpperCase();
        $('.text_avatar').html(first_name).show();
    }
}