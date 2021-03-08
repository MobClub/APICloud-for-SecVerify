/* Copyright.
 */

/**
 * 上传隐私协议状态
 * 在调用秒验其他接口时，必须上传一次隐私协议状态
 * @param {隐私状态} status
 */
function uploadPrivacyStatus(status) {
    var params = {'status': status};
    svModule.submitPrivacyGrantResult(params, function (ret, err) {
        var jsonStr = JSON.stringify(ret);
        api.alert({title: '上传隐私状态结果', msg: jsonStr});
        console.log(jsonStr);
    });
}

/**
 * 获取SecVerify SDK Version
 */
function getSVVersion() {
    svModule.getVersion(function (ret, err) {
        var jsonStr = JSON.stringify(ret);
        api.alert({title: '获取SDK版本结果', msg: jsonStr});
        console.log(jsonStr);
    });
}

/**
 * 获取当前流量卡运营商（结果仅供参考）
 * CMCC:移动 CUCC:联通 CTCC:电信 UNKNOW:未知
 */
function getCurrentOperatorType() {
    svModule.currentOperatorType(function (ret, err) {
        var jsonStr = JSON.stringify(ret);
        api.alert({title: '获取当前流量卡运营商结果', msg: jsonStr});
        console.log(jsonStr);
    });
}

/**
 * 是否开启Debug模式
 * @param {bool} enable
 */
function enableDebug(enable) {
    var params = {'enable': enable};
    svModule.enableDebug(params);
}

/**
 * 清除缓存
 */
function clearCache() {
    svModule.clearPhoneScripCache();
}

/**
 * 秒验功能是否可用
 */
function sdkIsSupport() {
    svModule.isVerifySupport(function (ret, err) {
        var jsonStr = JSON.stringify(ret);
        api.alert({title: '秒验功能是否可用结果', msg: jsonStr});
        console.log(jsonStr);
    });
}

/**
 * 预取号操作
 * 可传入timeout或使用默认timeout = 4.0
 * @param {double} timeout
 */
function preLogin(timeout) {
    var params = {};
    if (timeout != null) {
        params = {'timeout': timeout};
    }

    svModule.preVerify(params, function (ret, err) {
        var jsonStr = JSON.stringify(ret);
        api.alert({title: '预取号结果', msg: jsonStr});
        console.log(jsonStr);
    });
}


function SecVerifyUIConfigIOSCustomLayouts() {
    this.loginBtnLayout = new SecVerifyUIConfigIOSLayout();
    // this.phoneLabelLayout = new SecVerifyUIConfigIOSLayout();
    // this.sloganLabelLayout = new SecVerifyUIConfigIOSLayout();
    // this.logoImageViewLayout = new SecVerifyUIConfigIOSLayout();
    // this.privacyTextViewLayout = new SecVerifyUIConfigIOSLayout();
    // this.loginBtnLayout = new SecVerifyUIConfigIOSPrivacyCheckBoxLayout();
}

function SecVerifyUIConfigIOSLayout() {
    // this.layoutTop = 0.0;
    // this.layoutLeading = 0.0;
    // this.layoutBottom = 0.0;
    // this.layoutTrailing = 0.0;

    this.layoutCenterX = 0.0;
    this.layoutCenterY = 0.0;

    this.layoutWidth = 0.0;
    this.layoutHeight = 0.0;
}

/**
 * CheckBox的位置是相对于隐私协议而言的
 */
function SecVerifyUIConfigIOSPrivacyCheckBoxLayout() {
    // this.layoutTop = 0.0;
    // this.layoutRight = 0.0;
    // this.layoutCenterY = 0.0;
    // this.layoutWidth = 0.0;
    // this.layoutHeight = 0.0;
}

var iOSCustomWidgetNavPosition = {
    navLeft: 'navLeft',
    navRight: 'navRight'
};

var iOSTextAlignment = {
    center: 1,
    left: 0,
    right: 2,
    justified: 3,
    natural: 4
};

var iOSModalTransitionStyle = {
    coverVertical: 0,
    flipHorizontal: 1,
    crossDissolve: 2,
    partialCurl: 3
};

var iOSInterfaceOrientationMask = {
    portrait: 2,
    landscapeLeft: 16,
    landscapeRight: 8,
    portraitUpsideDown: 4,
    landscape: 24,
    all: 30,
    allButUpsideDown: 26,
};

var iOSInterfaceOrientation = {
    portrait: 1,
    portraitUpsideDown: 2,
    landscapeLeft: 4,
    landscapeRight: 3,
    unknown: 0,
};

var iOSModalPresentationStyle = {
    fullScreen: 0,
    pageSheet: 1,
    formSheet: 2,
    currentContext: 3,
    custom: 4,
    overFullScreen: 5,
    overCurrentContext: 6,
    popOver: 7,
    blurOverFullScreen: 8,
    none: -1,
    automatic: -2 // API_AVAILABLE(ios(13.0))
};

var iOSUserInterfaceStyle = {
    unspecified: 0,
    light: 1,
    dark: 2
};

var iOSCustomWidgetType = {
    label: 'label',
    button: 'button',
    imageView: 'imageView'
}

function SecVerifyUIConfigIOSCustomView(tag, type) {
    this.widgetID = tag;
    this.widgetType = type;
    // this.navPosition = null;

    // imageView
    // this.imaName = null;
    // this.ivCornerRadius = null;

    // button
    this.btnTitle = null;
    this.btnBgColor = null;
    this.btnTitleColor = null;
    this.btnTitleFont = null;
    this.btnImages = null;
    this.btnBorderWidth = null;
    this.btnBorderColor = null;
    this.btnBorderCornerRadius = null;

    // label
    // this.labelText = null;
    // this.labelTextColor = null;
    // this.labelFont = null;
    // this.labelBgColor = null;
    // this.labelTextAlignment = null;

    this.portraitLayout = null;
    this.landscapeLayout = null;
}

var loginAuthTokenInfo = {};

/**
 * 登录验证
 */
function loginAuth(isManual) {
    var iOSConfig = {};
    var androidConfig = {};
    var systemType = api.systemType;

    if (systemType == 'ios') {
        // var customBtn = new SecVerifyUIConfigIOSCustomView(2, iOSCustomWidgetType.button);
        // customBtn.btnTitle = 'Hi';
        // customBtn.btnTitleColor = '#483D8B';
        // customBtn.btnBorderWidth = 2.0;
        // customBtn.btnBorderCornerRadius = 5.0;
        // customBtn.btnBorderColor = '#483D8B';

        // var customBtnLayout = new SecVerifyUIConfigIOSLayout();
        // customBtnLayout.layoutCenterX = 0.0;
        // customBtnLayout.layoutCenterY = 0.0;
        // customBtnLayout.layoutWidth = 30;
        // customBtnLayout.layoutHeight = 20;

        // customBtn.portraitLayout = customBtnLayout;
        // customBtn.landscapeLayout = customBtnLayout;

        // var portraitLayouts = new SecVerifyUIConfigIOSCustomLayouts();
        // portraitLayouts.loginBtnLayout = customBtnLayout;
        // var landscapeLayouts = new SecVerifyUIConfigIOSCustomLayouts();
        // landscapeLayouts.loginBtnLayout = customBtnLayout;

        iOSConfig = {
            // 导航栏
            navBarHidden: false,
            // 是否手动关闭
            manualDismiss: isManual,
            // 横竖屏 是否支持自动转屏 (例:@(NO))
            shouldAutorotate: true,
            // 横竖屏 设备支持方向 (例:@(UIInterfaceOrientationMaskAll))
            supportedInterfaceOrientations: iOSInterfaceOrientationMask.all,
            //横竖屏 偏好方向方向（需和支持方向匹配） (例:@(UIInterfaceOrientationPortrait))
            preferredInterfaceOrientationForPresentation: iOSInterfaceOrientation.portrait,
            //Present方法的animate参数
            // presentingWithAnimate: false,

            // modalTransitionStyle系统自带的弹出方式
            // modalTransitionStyle: iOSModalTransitionStyle.coverVertical,
            /*授权页 UIModalPresentationStyle*/
            // modalPresentationStyle: iOSModalPresentationStyle.popOver,

            /*协议页使用模态弹出（默认使用Push)*/
            // showPrivacyWebVCByPresent: true,
            /*协议页 ModalPresentationStyle （协议页使用模态弹出时生效）*/
            // privacyWebVCModalPresentationStyle: iOSModalPresentationStyle.popOver,

            /*授权页 UIUserInterfaceStyle,默认:UIUserInterfaceStyleLight,eg. @(UIUserInterfaceStyleLight)*/
            // overrideUserInterfaceStyle: iOSUserInterfaceStyle.unspecified,

            // 返回按钮图片名字
            // backBtnImageName: "icon_m",

            // 登录按钮
            // loginBtnText: "登录试试",
            // loginBtnBgColor: "#FFFFFF",
            // loginBtnTextColor: "#CD5C5C",
            // loginBtnBorderWidth: 2.0,
            // loginBtnCornerRadius: 5.0,
            // loginBtnBorderColor: "#BC8F8F",
            // loginBtnBgImgNames: ["icon_m"], // 登录按钮背景图片数组 (例:@[激活状态的图片,失效状态的图片,高亮状态的图片])

            // Logo
            // logoHidden: false,
            // logoImageName: "icon_m",
            // logoCornerRadius: 3.0,

            // Phone Label
            // phoneHidden: false,
            // numberColor: "#C71585",
            // numberBgColor: "#EE82EE",
            // numberTextAlignment: iOSTextAlignment.left,
            // phoneCorner: 5.0,
            // phoneBorderWidth: 2.0,
            // phoneBorderColor: "#800080",

            // checkHidden: false,
            // checkDefaultState: false,
            // checkedImgName: "",
            // uncheckedImgName: "",

            // Privacy
            // privacyLineSpacing: 0.0,
            // privacyTextAlignment: iOSTextAlignment.left,
            // privacySettings: [{
            //     text: "",
            //     textFont: 0.0,
            //     textFontName: "",
            //     textColor: "",
            //     webTitleText: "",
            //     textLinkString: "",
            //     isOperatorPlaceHolder: false,
            //     textAttribute: {} // 同iOS富文本属性配置一致
            // }],

            // Slogan
            // sloganHidden: true,
            // sloganText: "sssss",
            // sloganBgColor: "#BA55D3",
            // sloganTextColor: "#4B0082",
            // sloganTextAlignment: iOSTextAlignment.center,
            // sloganCorner: 5.0,
            // sloganBorderWidth: 3.0,
            // sloganBorderColor: "#4169E1",

            //  widgets: [customBtn],

            // portraitLayouts: portraitLayouts,
            // landscapeLayouts: landscapeLayouts
        };
    } else if (systemType == 'android') {
        androidConfig = {
            autoFinishOAuthPage: isManual,//是否自动关闭授权页

            // 状态栏
            immersiveTheme:true, //状态栏是否透明 （5.0以上生效）
            immersiveStatusTextColorBlack:true, // 状态栏文字颜色是否为黑色（6.0以上生效）
            fullScreen:false, // 是否全屏显示

            // 导航栏
            navColor: 0xff03a9f4, // 标题栏背景色 16进制色值，例：0xffffffff
            navText: '一键登录', // 标题栏标题文字 例：“一键登录”
            navTextSize: 16, // 标题栏标题文字大小（单位：sp）例：16
            navTextColor: 0xff03a9f4, // 16进制色值，例：0xffffffff
            navCloseImg: 'widget/image/close.png', // 标题栏左侧关闭按钮图片资源
            navCloseImgWidth: 16, // 标题栏左侧关闭按钮图片宽度（单位：dp） 例：16
            navCloseImgHeight: 16, // 标题栏左侧关闭按钮图片高度（单位：dp） 例：16
            navCloseImgOffsetX: 16, // 标题栏左侧关闭按钮图片左偏移量（单位：dp）例：16
            // navCloseImgOffsetRightX: 16, // 标题栏左侧关闭按钮图片右偏移量（单位：dp）例：16
            // navCloseImgOffsetY: 16, // 标题栏左侧关闭按钮图片上偏移量（单位：dp）例：16
            navTransparent: true, // 标题栏是否透明,默认透明
            navHidden: false, // 标题栏是否隐藏，默认不隐藏
            navCloseImgHidden: false, // 标题栏左侧关闭按钮是否隐藏，默认不隐藏
            navTextBold: true, // 标题栏文字是否加粗，默认不加粗
            navCloseImgScaleType: 7, // 标题栏图片缩放类型 MATRIX(0) FIT_XY(1)  FIT_START(2) FIT_CENTER(3) FIT_END(4) CENTER(5) CENTER_CROP(6) CENTER_INSIDE (7)

            // 背景
            backgroundClickClose: false, // 设置点击授权页面背景是否关闭页面，默认不关闭页面
            backgroundImg: 'widget/image/back.png', // 设置点击授权页面背景是否关闭页面，默认不关闭页面

            // Logo
            logoImg: 'widget/image/logo.png', // Logo图片资源,默认使用应用图标
            logoHidden: false, // Logo是否隐藏，默认false
            logoWidth: 80, // Logo宽度（单位：dp） 例：80
            logoHeight: 80, // Logo高度（单位：dp） 例：80
            // logoOffsetX: 80, // Logo左偏移量（单位：dp） 例：30
            // logoOffsetY: 80, // Logo上偏移量（单位：dp） 例：30
            // logoOffsetBottomY: 80, // Logo下偏移量（单位：dp） 例：30
            // logoOffsetRightX: 80, // Logo右偏移量（单位：dp） 例：30
            logoAlignParentRight: false, //Logo是否靠屏幕右边

            // 脱敏手机号
            numberColor: 0xff03a9f4, //16进制色值，例：0xffffffff
            numberSizeId: 16, //脱敏手机号上偏移量（单位：sp） 例：16
            // numberOffsetX: 16, //脱敏手机号 左偏移量（单位：dp） 例：30
            // numberOffsetY: 16, //脱敏手机号 上偏移量（单位：dp） 例：30
            // numberOffsetBottomY: 16, //脱敏手机号 下偏移量（单位：dp） 例：30
            // numberOffsetRightX: 16, //脱敏手机号 右偏移量（单位：dp） 例：30
            numberAlignParentRight: false, //脱敏手机号是否靠屏幕右边
            numberHidden: false, //脱敏手机号隐藏，默认false
            numberBold: true, //脱敏手机号是否加粗，默认不加粗

            // 切换账号
            switchAccTextSize: 16, //切换账号字体大小（单位：sp） 例：16
            switchAccColor: 0xffffffff, //切换账号字体颜色16进制色值，例：0xffffffff
            switchAccHidden: false, //切换账号是否隐藏，默认false
            // switchAccOffsetX: 30, //切换账号 左偏移量（单位：dp） 例：30
            // switchAccOffsetY: 30, //切换账号 上偏移量（单位：dp） 例：30
            // switchAccOffsetBottomY: 30, //切换账号 下偏移量（单位：dp） 例：30
            // switchAccOffsetRightX: 30, //切换账号 右偏移量（单位：dp） 例：30
            switchAccAlignParentRight: false, //切换账号 是否靠屏幕右边，默认false
            switchAccText: '其他方式登录', //切换账号 文本内容例： 其他方式登录
            switchAccTextBold: false, //切换账号 文本是否加粗，默认false

            // 隐私协议栏
//            checkboxImgId: 'widget://image/back.png', //隐私协议复选框背景图资源ID，建议使用selector
            checkboxDefaultState: false, //隐私协议复选框默认状态，默认为false
            checkboxHidden: false, // 隐私协议复选框是否隐藏，若设置隐藏，则默认状态设置不生效
            agreementColor: 0xff00ffff, // 隐私协议字体颜色16进制色值，例：0xffffffff
            agreementName1: '隐私协议一', // 自定义隐私协议一文字 例：“隐私协议一”
            agreementColor1: 0xff0008ff, // 自定义隐私协议一颜色16进制色值，例：0xffffffff
            agreementUrl1: 'http://www.mob.com', // 自定义隐私协议一URL 例：http://www.mob.com
            agreementName2: '隐私协议一', // 自定义隐私协议一文字 例：“隐私协议一”
            agreementColor2: 0xff5589ff, // 自定义隐私协议一颜色16进制色值，例：0xffffffff
            agreementUrl2: 'http://www.mob.com', // 自定义隐私协议一URL 例：http://www.mob.com
            agreementName: '隐私协议一', // 自定义隐私协议一文字 例：“隐私协议一”
            agreementColor3: 0xffff29ff, // 自定义隐私协议一颜色16进制色值，例：0xffffffff
            agreementUrl3: 'http://www.mob.com', // 自定义隐私协议一URL 例：http://www.mob.com
            agreementGravityLeft: false, // 隐私协议文字是否左对齐,默认false
            agreementBaseTextColor: 0xffff0000, // 隐私协议其他文字颜色 16进制色值，例：0xffffffff
//            agreementOffsetX: 30, // 隐私协议左偏移量（单位：dp） 例：30
//            agreementOffsetRightX: 30, // 隐私协议右偏移量（单位：dp） 例：30
            agreementOffsetY: 30, // 隐私协议上偏移量（单位：dp） 例：30
//            agreementOffsetBottomY: 30, // 隐私协议下偏移量（单位：dp） 例：30
            agreementCmccText: '《中国移动隐私协议》', // 移动隐私协议显示文本 例：“《中国移动隐私协议》”
            agreementCuccText: '《中国联通隐私协议》', // 联通隐私协议显示文本例：“《中国联通隐私协议》”
            agreementCtccText: '《中国电信隐私协议》', // 电信隐私协议显示文本例：“《中国电信隐私协议》”
            agreementTextStart: '登录即同意', // 隐私协议文本开头 例：“登录即同意”
            agreementTextAnd1: '和', // 隐私协议连接文本1 例：“和”
            agreementTextAnd2: '及', // 隐私协议连接文本2 例：“及”
            agreementTextAnd3: '及', // 隐私协议连接文本3 例：“及”
            agreementTextEnd: '并使用本手机号登录', // 隐私协议结束文本 例：“并使用本手机号登录”
            agreementTextSize: 16, // 隐私协议文字大小 （单位：sp） 例：16
            agreementAlignParentRight: false, // 设置隐私协议是否靠屏幕右边，默认false
            agreementHidden: false, // 设置隐私协议隐藏，默认false
            agreementUncheckHintText: '请阅读并勾选隐私协议', // 设置隐私协议复选框未选中时提示的文本 例: "请阅读并勾选隐私协议"
            agreementTextBold: false, // 设置隐私协议是否加粗，默认false
            agreementTextWithUnderLine: false, // 设置隐私协议是否加下划线，默认false

//            登录按钮
            loginBtnText: '一键登录', // 登录按钮文字 例：“一键登录”
            loginBtnTextColor: 0xffffffff, // 登录按钮字体颜色 16进制色值，例：0xffffffff
            loginBtnTextSize: 16, //登录按钮文字大小（单位：sp） 例：16
            loginBtnWidth: 300, //登录按钮宽度大小（单位：dp） 例：30
            loginBtnHeight: 50, //登录按钮高度大小（单位：dp） 例：30
//            loginBtnOffsetY: 16, //登录按钮上偏移量（单位：dp） 例：30
//            loginBtnOffsetBottomY: 16, //登录按钮下偏移量（单位：dp） 例：30
            loginBtnHidden: false, //登录按钮是否隐藏,默认false
            loginBtnTextBold: false, //登录按钮文字是否加粗,默认false

//            动画
            translateAnim: false, //设置授权页面从左往右平移动画
            rightTranslateAnim: false, //设置进入授权页面从从右往左平移动画
            bottomTranslateAnim: true, //设置进入授权页面从下往上平移，退出方向相反
            zoomAnim: false, //设置授权页面从大到小动画
            fadeAnim: false, //设置授权页面从透明到不透明动画

//            弹窗模式
            dialogTheme: false, //设置是否使用弹窗模式，默认false
            dialogAlignBottom: true, //设置弹窗是否靠屏幕底部，默认false
            dialogWidth: 500, //弹窗宽度（单位：dp） 例：100
            dialogHeight: 500, //弹窗高度（单位：dp） 例：200
            dialogMaskBackgroundClickClose: true, //设置点击弹窗蒙版是否关闭页面，默认false
        }
    }

    var params = {'iOSConfig': iOSConfig, 'androidConfig': androidConfig};
    svModule.verify(params, function (ret, err) {
        var jsonStr = JSON.stringify(ret);
        api.alert({
            title: '登录验证结果',
            msg: jsonStr
        });
        console.log(jsonStr);
    });
}

var mobileAuthTokenInfo = {};

/**
 * 本机认证预请求
 * 在进行本机认证前，需先调用该函数
 * @param {double} timeout
 */
function preMobileAuth(timeout) {
    var params = {};
    if (timeout != null && timeout > 0) {
        params = {'timeout': timeout};
    }

    svModule.mobileAuthToken(params, function (ret, err) {
        var jsonStr = JSON.stringify(ret);
        api.alert({title: '本机认证预请求结果', msg: jsonStr});
        console.log(jsonStr);
    });
}

/**
 * 手动关闭授权页面
 * flag 为传参数
 * @param flag
 * 安卓端参数随便传，无返回值
 */
function dismissLoginVC(flag) {
    if (flag == null && api.systemType == 'ios') {
        api.alert({title: '手动关闭授权页面失败', msg: 'flag参数不能为空'});
        return;
    }

    var params = {'flag': flag};
    svModule.manualDismissLoginVC(params, function (ret, err) {
        var jsonStr = JSON.stringify(ret);
        api.alert({title: '手动关闭授权页面结果', msg: jsonStr});
        console.log(jsonStr);
    });
}

/**
 * 关闭加载动画
 */
function dismissLoading() {
    svModule.manualDismissLoading();
}

/**
 * 添加自定义视图响应事件的回调函数
 */
function addCustomEventListener() {
    api.addEventListener({
        name: 'SecVerifyCustomEvent'
    }, function (ret) {
        console.log('Custom Event Msg: ' + JSON.stringify(ret));
        dismissLoginVC(true);
    });
}
