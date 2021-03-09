# Add project specific ProGuard rules here.
# You can control the set of applied configuration files using the
# proguardFiles setting in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# If your project uses WebView with JS, uncomment the following
# and specify the fully qualified class name to the JavaScript interface
# class:
#-keepclassmembers class fqcn.of.javascript.interface.for.webview {
#   public *;
#}

# Uncomment this to preserve the line number information for
# debugging stack traces.
#-keepattributes SourceFile,LineNumberTable

# If you keep the line number information, uncomment this to
# hide the original source file name.
#-renamesourcefileattribute SourceFile
-ignorewarnings

#关闭某个运营商功能时编译通不过可以加上下面的代码
#-dontpreverify

# for SecVerify
-keep class com.mob.**{*;}
# for CTCC
-keep class cn.com.chinatelecom.account.**{*;}
# for CUCC
-keep class com.sdk.**{*;}
# for CMCC
-keep class com.cmic.sso.sdk.**{*;}
-keep class com.unicom.xiaowo.account.shield.**{*;}