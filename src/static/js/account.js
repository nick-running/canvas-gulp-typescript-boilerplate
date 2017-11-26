
(function($, owner) {
	/**
	 * 用户登录
	 **/
	owner.login = function(loginInfo, callback) {
		callback = callback || $.noop;
		loginInfo = loginInfo || {};
		loginInfo.phoneNumber = loginInfo.phoneNumber || '';
		loginInfo.captch = loginInfo.captch || '';
        var phone_pattern = /^1[3|4|5|7|8][0-9]{9}$/;
        if (!phone_pattern.test(loginInfo.phoneNumber)) {
			return callback('请输入正确的手机号');
        }
		if (loginInfo.captch.length < 3) {
			return callback('请输入4位的验证码');
		}
		var users = JSON.parse(localStorage.getItem('$users') || '[]');
		var authed = users.some(function(user) {
			return loginInfo.phoneNumber == user.phoneNumber && loginInfo.captch == user.captch;
		});
		if (authed) {
			return owner.createState(loginInfo.phoneNumber, callback);
		} else {
			return callback('用户名或密码错误');
		}
	};
}(mui, window.app = {}));