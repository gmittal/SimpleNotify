//
//  FirstViewController.m
//  SimpleNotifyDemo
//
//  Created by Gautam Mittal on 8/29/14.
//  Copyright (c) 2014 Gautam Mittal. All rights reserved.
//

#import "FirstViewController.h"

@interface FirstViewController ()
            

@end

@implementation FirstViewController
            
- (void)viewDidLoad {
    [super viewDidLoad];
    CGRect frame = CGRectMake(30, 260, 260, 50);
    HTPressableButton *roundedRectButton = [[HTPressableButton alloc] initWithFrame:frame buttonStyle:HTPressableButtonStyleRounded];
    [roundedRectButton setTitle:@"Send APN" forState:UIControlStateNormal];
    [self.view addSubview:roundedRectButton];
    // Do any additional setup after loading the view, typically from a nib.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


-(UIBarPosition)positionForBar:(id<UIBarPositioning>)bar {
    return UIBarPositionTopAttached;
}


@end
