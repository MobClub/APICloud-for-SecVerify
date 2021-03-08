//
//  SecVerifyPlus_Defines.h
//  SecVerifyPlus
//
//  Created by Junjie Pang on 2020/12/29.
//  Copyright © 2020 Junjie Pang. All rights reserved.
//

#ifndef SecVerifyPlus_Defines_h
#define SecVerifyPlus_Defines_h

typedef NS_ENUM(NSUInteger, SVLoginVerfyEventType) {
    otherEvents, // 其他情况
    openAuthPageEvent, // 打开授权页面
    canceLoginAuthEvent, // 取消授权
    loginAuthEvent // 开启请求授权
};

#endif /* SecVerifyPlus_Defines_h */
