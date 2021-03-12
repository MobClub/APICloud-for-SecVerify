# 秒验APICloud插件接入文档

## 配置集成

1. 设置appkey和appSecret

   可以在config.xml文件中配置：

   ```
       <feature name="mobSecVerifyPlus">
           <param name="mobSecVerifyAppKey" value="" />
           <param name="mobSecVerifyAppSecret" value="" />
       </feature>
   ```

   也可以在widget网页包的res目录下新建Info.plist文件里面添加键值对，键分别为 MOBAppKey 和 MOBAppSecret，值为在MobTech官网开发者后台申请的appkey和appSecret，云编译时会将里面的内容添加到编译工程里面的Info.plist中。

2. 配置ATS(iOS)

   目前运营商个别接口为http请求，对于全局禁用Http的项目，需要设置Http白名单。建议按以下方式配置Info.plist：

   ```
   <?xml version="1.0" encoding="UTF-8"?>
   <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
   <plist version="1.0">
   <dict>
       <key>NSExceptionDomains</key>
    <dict>
           <key>zzx9.cn</key>
           <dict>
               <key>NSIncludesSubdomains</key>
               <true/>
               <key>NSTemporaryExceptionAllowsInsecureHTTPLoads</key>
               <true/>
           </dict>
           <key>cmpassport.com</key>
           <dict>
               <key>NSIncludesSubdomains</key>
               <true/>
               <key>NSTemporaryExceptionAllowsInsecureHTTPLoads</key>
               <true/>
           </dict>
           <key>id6.me</key>
           <dict>
               <key>NSIncludesSubdomains</key>
               <true/>
               <key>NSTemporaryExceptionAllowsInsecureHTTPLoads</key>
               <true/>
           </dict>
           <key>wostore.cn</key>
           <dict>
               <key>NSIncludesSubdomains</key>
               <true/>
               <key>NSTemporaryExceptionAllowsInsecureHTTPLoads</key>
               <true/>
           </dict>
           <key>mdn.open.wo.cn</key>
           <dict>
               <key>NSIncludesSubdomains</key>
               <true/>
               <key>NSTemporaryExceptionAllowsInsecureHTTPLoads</key>
               <true/>
           </dict>
       </dict>
       <key>NSAllowsArbitraryLoads</key>
       <false/>
   </dict>
   </plist>
   ```

3. 在APICloud的模块Store中搜索SecVerifyPlus插件添加，调用 ```api.require(SecVerifyPlus)```即可使用。

## SDK功能

1. 上传隐私协议状态

   ```
   submitPrivacyGrantResult(params, function(ret,err){});
   ```

   

2. 预取号

   ```
   /*
   * 预取号
   */
   preVerify(params, function(ret,err){});
   ```

   

3. 拉起授权页 + 一键登录

   ```
   
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
   
   verify(iOSConfig, function(ret,err){});
   ```

   

4. 本机认证预请求Token

   ```
   mobileAuthToken(params, function(ret,err){});
   ```

   

5. 本机认证

   ```
   mobileVerify(params, function(ret,err){});
   ```

   

### SDK辅助方法说明 

1. 手动关闭登录页面：

   ```
   manualDismissLoginVC(params, function(ret,err){});
   ```

   

2. 手动关闭授权页自带的一键登录loading：

   ```
   manualDismissLoading();
   ```

   

3. 判断当前网络环境是否可以发起认证（结果仅供参考）:

   ```
   isVerifySupport(function(ret,err){});
   ```

   

4. 获取当前流量卡运营商（结果仅供参考）:

   ```
   currentOperatorType(function(ret,err){});
   ```

   

5. 清空sdk内部预取号缓存:

   ```
   clearPhoneScripCache();
   ```

   

6. 开启debug模式：

   ```
   // 参数格式
   var params = {'enable': enable};
   enableDebug(params);
   ```

   

7. 当前sdk版本号：

   ```
   getVersion(function(ret,err){});
   ```

   

## 注意事项

1. 所有接口的返回格式固定为：

   ```
   {
   	"resultCode":0,
   	"eventType": 0,
   	"ret": {}
   }
   
   resultCode = 0 && err == nil 为操作成功
   eventType用来区分授权页面不同事件：
   typedef NS_ENUM(NSUInteger, SVLoginVerfyEventType) {
       otherEvents, // 其他情况
       openAuthPageEvent, // 打开授权页面
       canceLoginAuthEvent, // 取消授权
       loginAuthEvent // 开启请求授权
   };
   ret为接口返回值
   ```

2. 免密登录能力必须经过运营商网关取号，因此必须在手机打开移动蜂窝网络的前提下才会成功。

3. 必须先预取号成功才可以登录。

4. 登录方法必须传入model,model中必须传入当前控制器。

5. 登录成功使用返回的两个token和运营商类型，向服务端请求手机号等信息。 可参考服务端接入文档

