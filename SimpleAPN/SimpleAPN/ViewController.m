//
//  ViewController.m
//  SimpleAPN
//
//  Created by Gautam Mittal on 9/20/14.
//  Copyright (c) 2014 Gautam Mittal. All rights reserved.
//

#import "ViewController.h"
#import "HTPressableButton.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    
    CGRect frame = CGRectMake((self.view.frame.size.width/2)-130, 220, 260, 50);
    HTPressableButton *roundedRectButton = [[HTPressableButton alloc] initWithFrame:frame buttonStyle:HTPressableButtonStyleRounded];
    [roundedRectButton setTitle:@"Rounded" forState:UIControlStateNormal];
    [self.view addSubview:roundedRectButton];
    // Do any additional setup after loading the view, typically from a nib.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
