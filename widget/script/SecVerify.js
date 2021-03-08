/* Copyright.
 */

/**
 * 上传隐私协议状态
 * 在调用秒验其他接口时，必须上传一次隐私协议状态
 * @param {隐私状态} status 
 */
function uploadPrivacyStatus(status) {
    var params = {'status': status};
    svModule.submitPrivacyGrantResult(params, function(ret, err) {
        var jsonStr = JSON.stringify(ret);
        api.alert({title: '上传隐私状态', msg: jsonStr});
        console.log(jsonStr);
    });
}

/**
 * 获取SecVerify SDK Version
 */
function getSVVersion() {
    svModule.getVersion(function(result, err) {
        var jsonStr = JSON.stringify(result);
        console.log(jsonStr);

        if (result != null 
            && err == null 
            && result['resultCode'] == 0) {
            var versionDict = result['ret'];
            var versionElement = document.getElementById('sdkVersion');
            versionElement.innerText = versionDict['version'];
        }
    });
}

/**
 * 获取当前流量卡运营商（结果仅供参考）
 * CMCC:移动 CUCC:联通 CTCC:电信 UNKNOW:未知
 */
function getCurrentOperatorTtype() {
    svModule.currentOperatorType(function(result, err) {
        var jsonStr = JSON.stringify(result);
        console.log(jsonStr);
        if (result != null && result['resultCode'] == 0) {
            var operator = result['ret']['operator'];
            api.alert({title: '当前运营商', msg: operator});
        }
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
    svModule.isVerifySupport(function(ret, err) {
        var jsonStr = JSON.stringify(ret);
        console.log(jsonStr);

        if (ret != null && err == null && ret['resultCode'] == 0) {
            var resultDict = ret['ret'];
            var result = resultDict['isSupport'];
            api.alert({title: '秒验功能是否可用？', msg: result});
        } else {
            api.alert({title: '获取秒验功能是否可用失败'});
        }
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

    svModule.preVerify(params, function(ret, err){
        var jsonStr = JSON.stringify(ret);
        console.log(jsonStr);
        
        if (ret != null && err == null && ret['resultCode'] == 0) {
            var resultDict = ret['ret'];
            api.alert({title: '预取号成功', msg: JSON.stringify(resultDict)});
        } else {
            api.alert({title: '预取号失败', msg: jsonStr});
        }
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
// function SecVerifyUIConfigIOSPrivacyCheckBoxLayout() {
//     this.layoutTop = 0.0;
//     this.layoutRight = 0.0;
//     this.layoutCenterY = 0.0;
//     this.layoutWidth = 0.0;
//     this.layoutHeight = 0.0;
// }

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

var isManualDismiss = false;
var loginAuthTokenInfo = {};
/**
 * 登录验证
 */
function loginAuth(isManual) {
    var iOSConfig = {};
    var androidConfig = {};
    var systemType = api.systemType;
    isManualDismiss = isManual;

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
            // logoImageName: "icon_m.png",
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

    }

    var params = {'iOSConfig': iOSConfig, 'androidConfig': androidConfig};
    svModule.verify(params, function(ret, err) {
        var jsonStr = JSON.stringify(ret);
        console.log(jsonStr);

        if (ret != null && err == null && ret['resultCode'] == 0) {
            if (ret['eventType'] == 3) {
                // 登录验证成功
                loginAuthTokenInfo = ret['ret'];
                console.log(JSON.stringify(loginAuthTokenInfo));
                api.alert({title: '登录验证成功', msg: JSON.stringify(loginAuthTokenInfo)});
            }
        } else {
            api.alert({title: '登录验证失败', msg: jsonStr});
        }
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

    svModule.mobileAuthToken(params, function(ret, err) {
        var jsonStr = JSON.stringify(ret);
        console.log(jsonStr);

        if (ret != null && err == null && ret['resultCode'] == 0) {
            // 本机认证预请求成功
            mobileAuthTokenInfo = ret['ret'];
            console.log(JSON.stringify(loginAuthTokenInfo));
            api.alert({msg: '本机认证预请求成功'});
        } else {
            api.alert({title: '本机认证预请求失败', msg: jsonStr});
        }
    });
}

/**
 * 对所提供的号码进行本机认证
 * 
 * @param phoneNum 
 * @param tokenInfo 
 * @param timeout 
 */
function mobileAuth(phoneNum, timeout) {
    if (phoneNum == null || phoneNum.length == 0 || mobileAuthTokenInfo == null) {
        api.alert({title: '本机认证失败', msg: '本机认证请求参数非法'});
        return;
    }

    var params = {'phoneNum': phoneNum, 'tokenInfo': mobileAuthTokenInfo};

    if (timeout != null && timeout > 0) {
        params['timeout'] = timeout;
    }

    svModule.mobileVerify(params, function(ret, err) {
        var jsonStr = JSON.stringify(ret);
        console.log(jsonStr);

        if (ret != null && err == null && ret['resultCode'] == 0) {
            var retResult = ret['ret'];
            var resultJsonStr = JSON.stringify(retResult);

            console.log(resultJsonStr);
            api.alert({title: '本机认证成功', msg: resultJsonStr});
        } else {
            api.alert({title: '本机认证失败', msg: jsonStr});
        }
    });
}

/**
 * 手动关闭授权页面
 * flag 为传参数
 * @param flag 
 */
function dismissLoginVC(flag) {
    if (flag == null) {
        api.alert({title: '手动关闭授权页面失败', msg: 'flag参数不能为空'});
        return;
    }

    var params = {'flag': flag};
    svModule.manualDismissLoginVC(params, function(ret, err) {
        console.log('关闭授权页面成功');
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
        name:'SecVerifyCustomEvent'
    }, function(ret){
        console.log('Custom Event Msg: ' + JSON.stringify(ret));
        dismissLoginVC(true);
    });
}
