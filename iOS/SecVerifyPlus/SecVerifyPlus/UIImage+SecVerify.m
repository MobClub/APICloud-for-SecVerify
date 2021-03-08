//
//  UIImage+SecVerify.m
//  SecVerifyVerifyPlus
//
//  Created by Sands_Lee on 2020/2/28.
//  Copyright © 2020 李树志. All rights reserved.
//

#import "UIImage+SecVerify.h"


@implementation UIImage (SecVerify)

+ (UIImage *)imageWithFileNameInWidgetRes:(NSString *)fileName
{
    if (!fileName || fileName.length <1) {
        return nil;
    }
    
    return [UIImage imageWithContentsOfFile:[[NSBundle mainBundle] pathForResource:fileName ofType:nil inDirectory:@"widget/res"]];
    
}


+ (UIImage *)createImageWithColor:(UIColor *)color withSize:(CGSize)size
{
    CGRect rect = CGRectMake(0.0f, 0.0f, size.width, size.height);
    UIGraphicsBeginImageContext(rect.size);
    CGContextRef context = UIGraphicsGetCurrentContext();
    CGContextSetFillColorWithColor(context, [color CGColor]);
    CGContextFillRect(context, rect);
    UIImage *theImage = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    return theImage;
}

@end
