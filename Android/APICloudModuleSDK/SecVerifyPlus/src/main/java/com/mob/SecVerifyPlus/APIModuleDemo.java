package com.mob.SecVerifyPlus;

import android.content.Context;
import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.widget.ImageView;

import com.mob.MobSDK;
import com.mob.mobverify.MobVerify;
import com.mob.secverify.GetTokenCallback;
import com.mob.secverify.PageCallback;
import com.mob.secverify.PreVerifyCallback;
import com.mob.secverify.SecVerify;
import com.mob.secverify.common.exception.VerifyException;
import com.mob.secverify.datatype.UiSettings;
import com.mob.secverify.datatype.VerifyResult;
import com.uzmap.pkg.uzcore.UZWebView;
import com.uzmap.pkg.uzcore.uzmodule.UZModule;
import com.uzmap.pkg.uzcore.uzmodule.UZModuleContext;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.InputStream;


public class APIModuleDemo extends UZModule {

    private UZModuleContext mJsCallback;

    public APIModuleDemo(UZWebView webView) {
        super(webView);
    }


    public void jsmethod_enableDebug(final UZModuleContext moduleContext) {
        boolean enable = moduleContext.optBoolean("enable");
        SecVerify.setDebugMode(enable);
    }

    public void jsmethod_isVerifySupport(final UZModuleContext moduleContext) throws JSONException {
        boolean verifySupport = SecVerify.isVerifySupport();
        JSONObject ret = new JSONObject();
        ret.put("isSupport", verifySupport);
        resultJson(moduleContext, 0, ret, true);
    }

    public void jsmethod_getVersion(final UZModuleContext moduleContext) throws JSONException {
        String version = SecVerify.getVersion();

        JSONObject ret = new JSONObject();
        ret.put("version", version);
        resultJson(moduleContext, 0, ret, true);
    }

    public void jsmethod_manualDismissLoginVC(final UZModuleContext moduleContext) throws JSONException {
        SecVerify.finishOAuthPage();
        resultJson(moduleContext, 0, "手动关闭授权页面", true);
    }

    public void jsmethod_currentOperatorType(final UZModuleContext moduleContext) {

    }

    public void jsmethod_clearPhoneScripCache(final UZModuleContext moduleContext) {

    }

    //    本机号认证
    public void jsmethod_mobileAuthToken(final UZModuleContext moduleContext) {
        MobVerify.getToken(new com.mob.mobverify.OperationCallback<com.mob.mobverify.datatype.VerifyResult>() {
            @Override
            public void onComplete(com.mob.mobverify.datatype.VerifyResult verifyResult) {
                JSONObject ret = new JSONObject();
                try {
                    ret.put("opToken", verifyResult.getOpToken());
                    ret.put("token", verifyResult.getToken());
                    ret.put("operator", verifyResult.getOperator());
                    resultJson(moduleContext, 0, ret, true);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }

            @Override
            public void onFailure(com.mob.mobverify.exception.VerifyException e) {
                if (e != null) {
                    resultJson(moduleContext, e.getCode(), e.getMessage(), true);
                } else {
                    resultJson(moduleContext, -1, "VerifyException is null", true);
                }
            }
        });


    }

    public void jsmethod_preVerify(final UZModuleContext moduleContext) {
        double timeout = moduleContext.optDouble("timeout");//获取超时时间
        SecVerify.setTimeOut((int) (timeout * 1000));//设置超时时间
//        预取号
        SecVerify.preVerify(new PreVerifyCallback() {
            @Override
            public void onComplete(Void aVoid) {
                //处理成功的结果
                resultJson(moduleContext, 0, null, true);

            }

            @Override
            public void onFailure(VerifyException e) {
                //处理失败的结果
                if (e != null) {
                    resultJson(moduleContext, e.getCode(), e.getMessage(), true);
                } else {
                    resultJson(moduleContext, -1, "error is null", true);
                }
            }
        });
    }

    public void jsmethod_verify(final UZModuleContext moduleContext) {
        UiSettings.Builder builder = new UiSettings.Builder();

        final JSONObject androidConfig = moduleContext.optJSONObject("androidConfig");
        boolean autoFinishOAuthPage = androidConfig.optBoolean("autoFinishOAuthPage");
        // 状态栏
        boolean immersiveTheme = androidConfig.optBoolean("immersiveTheme");
        boolean immersiveStatusTextColorBlack = androidConfig.optBoolean("immersiveStatusTextColorBlack");
        boolean fullScreen = androidConfig.optBoolean("fullScreen");

        builder.setImmersiveTheme(immersiveTheme)
                .setImmersiveStatusTextColorBlack(immersiveStatusTextColorBlack)
                .setFullScreen(fullScreen);


        // 导航栏
        int navColor = androidConfig.optInt("navColor");
        String navText = androidConfig.optString("navText");
        int navTextSize = androidConfig.optInt("navTextSize");
        int navTextColor = androidConfig.optInt("navTextColor");
        String navCloseImg = androidConfig.optString("navCloseImg");
        int navCloseImgWidth = androidConfig.optInt("navCloseImgWidth");
        int navCloseImgHeight = androidConfig.optInt("navCloseImgHeight");
        int navCloseImgOffsetX = androidConfig.optInt("navCloseImgOffsetX");
        int navCloseImgOffsetRightX = androidConfig.optInt("navCloseImgOffsetRightX");
        int navCloseImgOffsetY = androidConfig.optInt("navCloseImgOffsetY");
        boolean navTransparent = androidConfig.optBoolean("navTransparent");
        boolean navHidden = androidConfig.optBoolean("navHidden");
        boolean navCloseImgHidden = androidConfig.optBoolean("navCloseImgHidden");
        boolean navTextBold = androidConfig.optBoolean("navTextBold");
        int navCloseImgScaleType = androidConfig.optInt("navCloseImgScaleType");

        builder.setNavColorId(navColor)
                .setNavTextId(navText)
                .setNavTextSize(navTextSize)
                .setNavTextColorId(navTextColor)
                .setNavCloseImgId(assetsPathToDrawable(navCloseImg))
                .setNavCloseImgWidth(navCloseImgWidth)
                .setNavCloseImgHeight(navCloseImgHeight)
                .setNavCloseImgOffsetX(navCloseImgOffsetX)
                .setNavCloseImgOffsetRightX(navCloseImgOffsetRightX)
                .setNavCloseImgOffsetY(navCloseImgOffsetY)
                .setNavTransparent(navTransparent)
                .setNavHidden(navHidden)
                .setNavCloseImgHidden(navCloseImgHidden)
                .setNavTextBold(navTextBold);


        ImageView.ScaleType scaleType = ImageView.ScaleType.CENTER_CROP;
        if (navCloseImgScaleType == 0) {
            scaleType = ImageView.ScaleType.MATRIX;
        } else if (navCloseImgScaleType == 1) {
            scaleType = ImageView.ScaleType.FIT_XY;
        } else if (navCloseImgScaleType == 2) {
            scaleType = ImageView.ScaleType.FIT_START;
        } else if (navCloseImgScaleType == 3) {
            scaleType = ImageView.ScaleType.FIT_CENTER;
        } else if (navCloseImgScaleType == 4) {
            scaleType = ImageView.ScaleType.FIT_END;
        } else if (navCloseImgScaleType == 5) {
            scaleType = ImageView.ScaleType.CENTER;
        } else if (navCloseImgScaleType == 6) {
            scaleType = ImageView.ScaleType.CENTER_CROP;
        } else if (navCloseImgScaleType == 7) {
            scaleType = ImageView.ScaleType.CENTER_INSIDE;
        }
        builder.setNavCloseImgScaleType(scaleType);

        // 背景
        boolean backgroundClickClose = androidConfig.optBoolean("backgroundClickClose");
        String backgroundImg = androidConfig.optString("backgroundImg");

        builder.setBackgroundClickClose(backgroundClickClose)
                .setBackgroundImgId(assetsPathToDrawable(backgroundImg));

        // Logo
        String logoImg = androidConfig.optString("logoImg");
        boolean logoHidden = androidConfig.optBoolean("logoHidden");
        int logoWidth = androidConfig.optInt("logoWidth");
        int logoHeight = androidConfig.optInt("logoHeight");
        int logoOffsetX = androidConfig.optInt("logoOffsetX");
        int logoOffsetY = androidConfig.optInt("logoOffsetY");
        int logoOffsetBottomY = androidConfig.optInt("logoOffsetBottomY");
        int logoOffsetRightX = androidConfig.optInt("logoOffsetRightX");
        boolean logoAlignParentRight = androidConfig.optBoolean("logoAlignParentRight");

        builder.setLogoImgId(assetsPathToDrawable(logoImg))
                .setLogoHidden(logoHidden)
                .setLogoWidth(logoWidth)
                .setLogoHeight(logoHeight)
                .setLogoOffsetX(logoOffsetX)
                .setLogoOffsetY(logoOffsetY)
                .setLogoOffsetBottomY(logoOffsetBottomY)
                .setLogoOffsetRightX(logoOffsetRightX)
                .setLogoAlignParentRight(logoAlignParentRight);

        // 脱敏手机号
        int numberColor = androidConfig.optInt("numberColor");
        int numberSizeId = androidConfig.optInt("numberSizeId");
        int numberOffsetX = androidConfig.optInt("numberOffsetX");
        int numberOffsetY = androidConfig.optInt("numberOffsetY");
        int numberOffsetBottomY = androidConfig.optInt("numberOffsetBottomY");
        int numberOffsetRightX = androidConfig.optInt("numberOffsetRightX");
        boolean numberAlignParentRight = androidConfig.optBoolean("numberAlignParentRight");
        boolean numberHidden = androidConfig.optBoolean("numberHidden");
        boolean numberBold = androidConfig.optBoolean("numberBold");
        builder.setNumberColorId(numberColor)
                .setNumberSizeId(numberSizeId)
                .setNumberOffsetX(numberOffsetX)
                .setNumberOffsetY(numberOffsetY)
                .setNumberOffsetBottomY(numberOffsetBottomY)
                .setNumberOffsetRightX(numberOffsetRightX)
                .setNumberAlignParentRight(numberAlignParentRight)
                .setNumberHidden(numberHidden)
                .setNumberBold(numberBold);


//      切换账号
        int switchAccTextSize = androidConfig.optInt("switchAccTextSize");
        int switchAccColor = androidConfig.optInt("switchAccColor");
        boolean switchAccHidden = androidConfig.optBoolean("switchAccHidden");
        int switchAccOffsetX = androidConfig.optInt("switchAccOffsetX");
        int switchAccOffsetY = androidConfig.optInt("switchAccOffsetY");
        int switchAccOffsetBottomY = androidConfig.optInt("switchAccOffsetBottomY");
        int switchAccOffsetRightX = androidConfig.optInt("switchAccOffsetRightX");
        boolean switchAccAlignParentRight = androidConfig.optBoolean("switchAccAlignParentRight");
        String switchAccText = androidConfig.optString("switchAccText");
        boolean switchAccTextBold = androidConfig.optBoolean("switchAccTextBold");

        builder.setSwitchAccTextSize(switchAccTextSize)
                .setSwitchAccColorId(switchAccColor)
                .setSwitchAccHidden(switchAccHidden)
                .setSwitchAccOffsetX(switchAccOffsetX)
                .setSwitchAccOffsetY(switchAccOffsetY)
                .setSwitchAccOffsetBottomY(switchAccOffsetBottomY)
                .setSwitchAccOffsetRightX(switchAccOffsetRightX)
                .setSwitchAccAlignParentRight(switchAccAlignParentRight)
                .setSwitchAccText(switchAccText)
                .setSwitchAccTextBold(switchAccTextBold);


// 隐私协议栏
        boolean checkboxDefaultState = androidConfig.optBoolean("checkboxDefaultState");
        boolean checkboxHidden = androidConfig.optBoolean("checkboxHidden");
        int agreementColor = androidConfig.optInt("agreementColor");
        String agreementName1 = androidConfig.optString("agreementName1");
        int agreementColor1 = androidConfig.optInt("agreementColor1");
        String agreementUrl1 = androidConfig.optString("agreementUrl1");
        String agreementName2 = androidConfig.optString("agreementName2");
        int agreementColor2 = androidConfig.optInt("agreementColor2");
        String agreementUrl2 = androidConfig.optString("agreementUrl2");
        String agreementName3 = androidConfig.optString("agreementName3");
        int agreementColor3 = androidConfig.optInt("agreementColor3");
        String agreementUrl3 = androidConfig.optString("agreementUrl3");
        boolean agreementGravityLeft = androidConfig.optBoolean("agreementGravityLeft");
        int agreementBaseTextColor = androidConfig.optInt("agreementBaseTextColor");
        int agreementOffsetX = androidConfig.optInt("agreementOffsetX");
        int agreementOffsetRightX = androidConfig.optInt("agreementOffsetRightX");
        int agreementOffsetY = androidConfig.optInt("agreementOffsetY");
        int agreementOffsetBottomY = androidConfig.optInt("agreementOffsetBottomY");
        String agreementCmccText = androidConfig.optString("agreementCmccText");
        String agreementCuccText = androidConfig.optString("agreementCuccText");
        String agreementCtccText = androidConfig.optString("agreementCtccText");
        String agreementTextStart = androidConfig.optString("agreementTextStart");
        String agreementTextAnd1 = androidConfig.optString("agreementTextAnd1");
        String agreementTextAnd2 = androidConfig.optString("agreementTextAnd2");
        String agreementTextAnd3 = androidConfig.optString("agreementTextAnd3");
        String agreementTextEnd = androidConfig.optString("agreementTextEnd");
        int agreementTextSize = androidConfig.optInt("agreementTextSize");
        String agreementUncheckHintText = androidConfig.optString("agreementUncheckHintText");
        boolean agreementAlignParentRight = androidConfig.optBoolean("agreementAlignParentRight");
        boolean agreementHidden = androidConfig.optBoolean("agreementHidden");
        boolean agreementTextBold = androidConfig.optBoolean("agreementTextBold");
        boolean agreementTextWithUnderLine = androidConfig.optBoolean("agreementTextWithUnderLine");

        builder.setCheckboxDefaultState(checkboxDefaultState)
                .setCheckboxHidden(checkboxHidden)
                .setAgreementColorId(agreementColor)
                .setCusAgreementNameId1(agreementName1)
                .setCusAgreementColor1(agreementColor1)
                .setCusAgreementUrl1(agreementUrl1)
                .setCusAgreementNameId2(agreementName2)
                .setCusAgreementColor2(agreementColor2)
                .setCusAgreementUrl2(agreementUrl2)
                .setCusAgreementNameId3(agreementName3)
                .setCusAgreementColor3(agreementColor3)
                .setCusAgreementUrl3(agreementUrl3)
                .setAgreementGravityLeft(agreementGravityLeft)
                .setAgreementBaseTextColorId(agreementBaseTextColor)

                .setAgreementOffsetX(agreementOffsetX)
                .setAgreementOffsetRightX(agreementOffsetRightX)
                .setAgreementOffsetBottomY(agreementOffsetBottomY)
                .setAgreementCmccText(agreementCmccText)
                .setAgreementCuccText(agreementCuccText)
                .setAgreementCtccText(agreementCtccText)
                .setAgreementTextStart(agreementTextStart)
                .setAgreementTextAnd1(agreementTextAnd1)
                .setAgreementTextAnd2(agreementTextAnd2)
                .setAgreementTextAnd3(agreementTextAnd3)
                .setAgreementTextEnd(agreementTextEnd)
                .setAgreementTextSize(agreementTextSize)
                .setAgreementUncheckHintText(agreementUncheckHintText)
                .setAgreementAlignParentRight(agreementAlignParentRight)
                .setAgreementHidden(agreementHidden)
                .setAgreementTextBold(agreementTextBold)
                .setAgreementTextWithUnderLine(agreementTextWithUnderLine);

//            登录按钮

        String loginBtnText = androidConfig.optString("loginBtnText");
        int loginBtnTextColor = androidConfig.optInt("loginBtnTextColor");
        int loginBtnTextSize = androidConfig.optInt("loginBtnTextSize");
        int loginBtnWidth = androidConfig.optInt("loginBtnWidth");
        int loginBtnHeight = androidConfig.optInt("loginBtnHeight");
        int loginBtnOffsetY = androidConfig.optInt("loginBtnOffsetY");
        int loginBtnOffsetBottomY = androidConfig.optInt("loginBtnOffsetBottomY");
        boolean loginBtnHidden = androidConfig.optBoolean("loginBtnHidden");
        boolean loginBtnTextBold = androidConfig.optBoolean("loginBtnTextBold");
        builder.setLoginBtnTextId(loginBtnText)
                .setLoginBtnTextColorId(loginBtnTextColor)
                .setLoginBtnTextSize(loginBtnTextSize)
                .setLoginBtnWidth(loginBtnWidth)
                .setLoginBtnHeight(loginBtnHeight)
                .setLoginBtnOffsetY(loginBtnOffsetY)
                .setLoginBtnOffsetBottomY(loginBtnOffsetBottomY)
                .setLoginBtnHidden(loginBtnHidden)
                .setLoginBtnTextBold(loginBtnTextBold);
        //            动画

        boolean translateAnim = androidConfig.optBoolean("translateAnim");
        boolean rightTranslateAnim = androidConfig.optBoolean("rightTranslateAnim ");
        boolean bottomTranslateAnim = androidConfig.optBoolean("bottomTranslateAnim");
        boolean zoomAnim = androidConfig.optBoolean("zoomAnim");
        boolean fadeAnim = androidConfig.optBoolean("fadeAnim");

        builder.setTranslateAnim(translateAnim)
                .setRightTranslateAnim(rightTranslateAnim)
                .setBottomTranslateAnim(bottomTranslateAnim)
                .setZoomAnim(zoomAnim)
                .setFadeAnim(fadeAnim);

//            弹窗模式
        boolean dialogTheme = androidConfig.optBoolean("dialogTheme");
        boolean dialogAlignBottom = androidConfig.optBoolean("dialogAlignBottom");
        int dialogWidth = androidConfig.optInt("dialogWidth");
        int dialogHeight = androidConfig.optInt("dialogHeight");
        boolean dialogMaskBackgroundClickClose = androidConfig.optBoolean("dialogMaskBackgroundClickClose");

        builder.setDialogTheme(dialogTheme)
                .setDialogAlignBottom(dialogAlignBottom)
                .setDialogWidth(dialogWidth)
                .setDialogHeight(dialogHeight)
                .setDialogMaskBackgroundClickClose(dialogMaskBackgroundClickClose);


        UiSettings uiSettings = builder.build();
        SecVerify.setUiSettings(uiSettings);
        SecVerify.autoFinishOAuthPage(autoFinishOAuthPage);
        SecVerify.verify(new PageCallback() {

            @Override
            public void pageCallback(int code, String desc) {
//              授权页面相关回调及错误码，无法打开运营商的授权页面的错误会在这里回调
//                showDebugToast("pageCallback  code:" + code + " desc:" + desc);
//                showDebugLogD("pageCallback  code:" + code + " desc:" + desc);
                resultJson(moduleContext, code, desc, false);
            }
        }, new GetTokenCallback() {
            @Override
            public void onComplete(VerifyResult verifyResult) {
//                showDebugToast("verify success:         " + verifyResult.getOpToken() + "  " + verifyResult.getToken() + "  " + verifyResult.getOperator());
//                showDebugLogD("verify success:         " + verifyResult.getOpToken() + "  " + verifyResult.getToken() + "  " + verifyResult.getOperator());
                JSONObject ret = new JSONObject();
                try {
                    ret.put("opToken", verifyResult.getOpToken());
                    ret.put("token", verifyResult.getToken());
                    ret.put("operator", verifyResult.getOperator());
                    resultJson(moduleContext, 0, ret, true);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
//                if (autoFinishOAuthPage) {
//                    SecVerify.finishOAuthPage();
//                }
            }

            @Override
            public void onFailure(VerifyException e) {
//              TODO处理失败的结果
//                showDebugToast("处理失败的结果" + e.getMessage() + e.getCause().getMessage());
//                showDebugLogD("处理失败的结果" + e.getMessage() + e.getCause().getMessage());

                if (e != null) {
                    resultJson(moduleContext, e.getCode(), e.getMessage(), true);
                } else {
                    resultJson(moduleContext, -1, "VerifyException is null", true);
                }
//                if (autoFinishOAuthPage) {
//                    SecVerify.finishOAuthPage();
//                }
            }
        });
    }

    private Drawable assetsPathToDrawable(String imgPath) {
        try {
//            String backgroundImg = makeRealPath("widget://image/close.png");
            AssetManager assetManager = context().getResources().getAssets();
//            String replace = backgroundImg.replace("file:///android_asset/", "");
            InputStream is = assetManager.open(imgPath);
            Bitmap bitmap = BitmapFactory.decodeStream(is);
            is.close();
            if (bitmap != null) {
                return new BitmapDrawable(bitmap);
            } else {
                System.out.println("bitmap == null");
                return null;
            }
        } catch (Exception e) {
            System.out.println("异常信息:" + e.toString());
            return null;
        }
    }

    /**
     * 从assets 文件夹中读取图片
     */
    public static Drawable loadImageFromAsserts(final Context ctx, String fileName) {
        try {
            InputStream is = ctx.getResources().getAssets().open(fileName);
            return Drawable.createFromStream(is, null);
        } catch (IOException e) {
            if (e != null) {
                e.printStackTrace();
            }
        } catch (OutOfMemoryError e) {
            if (e != null) {
                e.printStackTrace();
            }
        } catch (Exception e) {
            if (e != null) {
                e.printStackTrace();
            }
        }
        return null;
    }

    public static Drawable assets2Drawable(Context context, String fileName) {
        InputStream open = null;
        Drawable drawable = null;
        try {
            open = context.getAssets().open(fileName);
            drawable = Drawable.createFromStream(open, null);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (open != null) {
                    open.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return drawable;
    }

    private void resultJson(final UZModuleContext moduleContext, int code, Object data, boolean deleteJsFunction) {
        JSONObject ret = new JSONObject();
        try {
            ret.put("resultCode", code);
            ret.put("ret", data);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        if (moduleContext != null) {
            moduleContext.success(ret, deleteJsFunction);
        }
    }
}
