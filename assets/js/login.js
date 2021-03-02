$(function () {
	// 表单验证
	var form = layui.form;
	var layer = layui.layer;
	form.verify({
		pwd: [/^[\S]{6,12}$/, '必须是6-12位且不能包含空格'],
		repwd: function (res) {
			if (res !== $('[name=password]').val()) {
				return '两次密码不相同请重新确认！';
			}
		},
	});
	//点击去注册按钮隐藏登录表单，显示注册表单
	$('.zhuce').on('click', function () {
		$('.login-log').hide();
		$('.login-reg').show();
	});
	$('.denglu').on('click', function () {
		$('.login-log').show();
		$('.login-reg').hide();
	});
	//点击注册按钮提交注册
	$('.login-reg').on('submit', function (e) {
		e.preventDefault();
		//快速获取表单元素
		var data = $(this).serialize();
		// console.log(data);
		$.ajax({
			type: 'post',
			url: '/api/reguser',
			data: data,
			success: function (res) {
				// console.log(res);
				if (res.status !== 0) {
					return layer.msg(res.message);
				}
				layer.msg(res.message);
				$('.denglu').click();
				form.val('formLogin', data);
			},
		});
	});
	//点击登录按钮跳转到index页面
	$('.login-log').on('submit', function (e) {
		e.preventDefault();
		// localStorage.setItem('token', 'res.token');

		$.ajax({
			type: 'post',
			url: '/api/login',
			data: $(this).serialize(),
			success: function (res) {
				if (res.status === 0) {
					layer.msg(res.message);
					localStorage.setItem('token', res.token);
					location.href = '/index.html';
				}
				return layer.msg(res.message);
			},
		});
	});
});
