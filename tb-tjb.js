
var storage = storages.create("tb_123");
var width=device.width;
var height=device.height;
var tb_copy=false;
auto();
var options = ["淘宝", "淘宝分身"]
var i = dialogs.select("确定本次是否执行分身", options);
if(i >= 0){
    if(i==0){
        tb_copy=true;
    }
    beginBefore();
    if(enteyTaobao()){
        console.log("已进淘宝");
        var jb=new jinbixiaozhen();
        jb.begin();
    }else{
        console.log("未进淘宝");
    }
    over();
}else{
    toast("您取消了选择");
}

function jinbixiaozhen(){
    this.receive=['购物返','今日签到','好友助力'];
    this.重新定位=function(){
            console.log("抛出异常_重新定位");
            switch (this.catch_error_nowpage_text()) {
                case "金币店铺承接页":
                    console.log("当前 金币店铺承接页 返回逛金币首页 重新开始");
                    back();
                    sleep(random(500,1500));
                    back();
                    sleep(random(500,1500));
                    this.beginRun();
                    break;
        
                case "做任务赚金币":
                    console.log("当前 做任务赚金币 返回逛金币首页 重新开始");
                    back();
                    sleep(random(500,1500));
                    this.beginRun();
                    break;
        
                case "金币小镇-首页":
                    this.beginRun();
                    break;        
                case "好店任务":
                    console.log("当前 好店任务 返回逛金币首页 重新开始");
                    back();
                    sleep(random(500,1500));
                    this.beginRun();
                    break;
        
                case "金币小镇好友互动":
                    console.log("当前 金币小镇好友互动 返回逛金币首页 重新开始");
                    back();
                    sleep(random(500,1500));
                    this.beginRun();
        
                    break;
                case "淘金币精选好货来了"://返回 今日任务
                    console.log("当前淘金币精选好货来了 返回逛金币首页 重新开始");
                    back();
                    sleep(random(500,1500));
                    back();
                    sleep(random(500,1500));
                    this.beginRun();
                    break;
                case "淘金币精选爆款"://返回 今日任务
                    console.log("当前淘金币精选爆款 返回逛金币首页 重新开始");
                    back();
                    sleep(random(500,1500));
                    back();
                    sleep(random(500,1500));
                    this.beginRun();
                    break;
                case "答题赚金币"://返回 今日任务
                    console.log("当前答题赚金币 返回逛金币首页 重新开始");
                    back();
                    sleep(random(500,1500));
                    back();
                    sleep(random(500,1500));
                    this.beginRun();
                    break;
                case "验证码拦截"://返回 重新判断
                    console.log("当前验证码拦截 返回 重新判断");
                    back();
                    sleep(random(500,1500));
                    this.重新定位();
                    break;
                case "天天特卖超级抵钱":
                    console.log("当前 天天特卖超级抵钱 返回 重新判断");
                    back();
                    sleep(random(500,1500));
                    this.重新定位();
                    break;
                case "返回":
                    console.log("当前 返回按钮 返回 重新判断");
                    back();
                    sleep(random(500,1500));
                    this.重新定位();
        
                    break;
                                                 
                default://返回 重新判断
                    console.log("未知页面 尝试返回后再次判断页面");
                    back();
                    sleep(random(500,1500));
                    this.重新定位();
                    break;
            }
    },
    this.nowJBnumber=function(){
        sleep(1000);//
        var w =textStartsWith("我的金币").findOne(6000);
        if(w != null){
            var num=parseInt(w.text().substr(4));
            console.log("获取当前金币数量为:"+num);
            storage.put('tb_now_jb_nubmer',num);//记录当前金币
            return num;
        }else{
            console.log("获取当前金币数量失败");
            storage.put('tb_now_jb_nubmer',0);//记录当前金币
            return 0;
        }

    }
    this.receiveRun=function(){
        console.log("执行收集金币..");
        for(var i=0,j=this.receive.length;i<j;i++){
            var w = text(this.receive[i]).findOne(random(1,3)*1000);
            if(w != null){
                console.log("点击:"+this.receive[i]);
                randomClick(w);
                sleep(500*random(1,5));
            }else{
                console.log("没有:"+this.receive[i]);
            }
        }
        return true;
    }
    this.qiandao=function(){
        console.log("执行签到..");
        var w = className("android.view.View").clickable(true).depth(9).find();
        if(w != null){
            if(w.size()==1){
                w[0].click();
                console.log("签到完成");
                sleep(500*random(1,5));
                return true; 
            }else{
                w[0].click();
                console.log("签到完成-签到标识发现多个,尝试点击第一个标识");
                sleep(500*random(1,5));
                return true; 
            }
        }
        console.log("不需要签到");
        return false;
    }
    this.BacktoTaskRun=function(){
        console.log("判断是否回到今日任务,返回一次");
        back();
        this.updateApp();
        sleep(300*random(1,5));
        if(className("android.webkit.WebView").findOne(1000) != null&&className("android.webkit.WebView").findOne(1000).text()=="做任务赚金币"){
            return true;
        }else{
            return this.BacktoTaskRun();
        }
    }
    this.todayTaskRun_see=function(test,ti){
        sleep(800*random(3,5));
        console.log("今日任务-"+test);
        var w = text(test).findOne(2000);
        if(w != null){
            if(w.bounds().bottom>height-10){
                slideGesture(1);
                sleep(800*random(1,5));
                return this.todayTaskRun_see(test,ti);
            }
            if(w.bounds().top<0){
                slideGesture_(1);
                sleep(800*random(1,5));
                return this.todayTaskRun_see(test,ti);
            }
            console.log("需要: "+test);
            if(w.parent().findOne(textContains("蚂蚁庄园"))!=null||w.parent().findOne(textContains("蚂蚁森林"))!=null){
                console.log("发现支付宝-蚂蚁任务");
                randomClick(w);
                sleep(500*random(1,5));
                this.BacktoTaskRun();
                this.updateApp();
                sleep(500*random(1,5));
                var w = text('领取奖励').findOne(6000);
                if(w != null){
                    randomClick(w);
                    console.log("领取奖励 成功");
                }else{
                    console.log("领取奖励 失败");
                }
                return false;
            }
            if(w.parent().findOne(textContains("福气兑无门槛"))!=null){
                console.log("发现福气兑无门槛-需要跳转天猫APP-结束"+test);
                return false;
            }
            if(w.parent().findOne(textContains("募捐"))!=null){
                console.log("捐款-需要募捐跳过-结束"+test);
                return false;
            }
            if(see_time(w,ti)){
                back();
                console.log(test+" 完成");
                console.log("领取"+test+"奖励");
                sleep(500*random(2,5));
                var w = text('领取奖励').findOne(6000);
                if(w != null){
                    randomClick(w);
                    console.log("领取奖励 成功");
                }else{
                    console.log("领取奖励 失败");
                }
            }else{
                console.log(test+"失败");
            }
            return this.todayTaskRun_see(test,ti);
        }else{
            console.log("无需 "+test);
            return false;
        }
    }
    this.todayTaskRun_jiangli=function(){
        sleep(1000*random(1,5));
        console.log("领取奖励检测");
        var w = text('领取奖励').findOne(6000);
        if(w != null){
            if(w.bounds().bottom>height-10){
                slideGesture(1);
                sleep(800*random(1,5));
                return this.todayTaskRun_jiangli();
            }
            if(w.bounds().top<10){
                slideGesture_(1);
                sleep(800*random(1,5));
                return this.todayTaskRun_jiangli();
            }
            randomClick(w);
            console.log("发现领取奖励 成功");
            return this.todayTaskRun_jiangli();
        }else{
            console.log("没有发现领取奖励");
        }
        sleep(500*random(1,5));
        return false;
    }
    this.todayTaskRun=function(){
        console.log("执行今日任务..赚金币..");
        var w = className("android.widget.Button").text('赚金币').findOne(6000);
        if(w != null){
            console.log("打开赚金币:");
            randomClick(w);
            sleep(800*random(1,5));
            console.log("今日任务-签到");
            var w = text('去签到').findOne(4000);
            if(w != null){
                randomClick(w);
                console.log("签到完成");
                sleep(800*random(1,5));
            }else{
                console.log("无需签到");
            }
            this.todayTaskRun_see("去看看",4);
            // console.log("今日任务-去看看");
            // var w = text('去看看').findOne(2000);
            // if(w != null){
            //     console.log("准备去看看");
            //     randomClick(w);
            //     sleep(1000*random(1,5));
            //     console.log("看完返回");
            //     back();
            //     sleep(1000*random(1,5));
            //     console.log("领取去看看奖励");
            //     var w = text('领取奖励').findOne(6000);
            //     if(w != null){
            //         randomClick(w);
            //         console.log("领取奖励 成功");
            //     }else{
            //         console.log("领取奖励 失败");
            //     }
            //     sleep(500*random(1,5));
            // }else{
            //     console.log("无需去看看");
            // }

            sleep(500*random(1,5));
            console.log("今日任务-找答案");
            var w = text('找答案').findOne(2000);
            if(w != null){
                console.log("准备找答案");
                randomClick(w);
                sleep(1200*random(1,5));
                if(className("android.widget.Button").clickable(true).depth(7).find().length>0){
                    var random_d=random(1,className("android.widget.Button").clickable(true).depth(7).find().length)-1;
                    console.log("生成随机答案:"+className("android.widget.Button").clickable(true).depth(7).find()[random_d].text());
                    randomClick(className("android.widget.Button").clickable(true).depth(7).find()[random_d]);
                }else{
                    console.log("找答案-失败");
                }
                back();
                sleep(1000*random(1,5));
                console.log("领取找答案奖励");
                var w = text('领取奖励').findOne(6000);
                if(w != null){
                    randomClick(w);
                    console.log("领取奖励 成功");
                }else{
                    console.log("领取奖励 失败");
                }
            }else{
                console.log("无需 找答案");
            }

            this.todayTaskRun_see("逛一下",4);
            // sleep(500*random(1,5));
            // console.log("今日任务-逛一下");
            // var w = text('逛一下').findOne(2000);
            // if(w != null){
            //     if(see_10(w)){
            //         back();
            //         console.log("逛一下 完成");
            //         console.log("领取逛一下奖励");
            //         var w = text('领取奖励').findOne(6000);
            //         if(w != null){
            //             randomClick(w);
            //             console.log("领取奖励 成功");
            //         }else{
            //             console.log("领取奖励 失败");
            //         }
            //     }else{
            //         console.log("逛一下失败");
            //     }
            // }else{
            //     console.log("无需 逛一下");
            // }

            this.todayTaskRun_see("去完成",9);
            // sleep(500*random(1,5));
            // console.log("今日任务-去完成");
            // var w = text('去完成').findOne(2000);
            // if(w != null){
            //     if(see_14(w)){
            //         back();
            //         console.log("去完成 完成");
            //         console.log("领取去完成奖励");
            //         var w = text('领取奖励').findOne(6000);
            //         if(w != null){
            //             randomClick(w);
            //             console.log("领取奖励 成功");
            //         }else{
            //             console.log("领取奖励 失败");
            //         }
            //     }else{
            //         console.log("去完成失败");
            //     }
            // }else{
            //     console.log("无需 去完成");
            // }
            this.todayTaskRun_see("去逛逛",10);
            // sleep(500*random(1,5));
            // console.log("今日任务-去逛逛");
            // var w = text('去逛逛').findOne(2000);
            // if(w != null){
            //     if(see_15(w)){
            //         console.log("去逛逛 完成");
            //         console.log("领取去逛逛奖励");
            //         var w = text('领取奖励').findOne(6000);
            //         if(w != null){
            //             randomClick(w);
            //             console.log("领取奖励 成功");
            //         }else{
            //             console.log("领取奖励 失败");
            //         }
            //     }else{
            //         console.log("去逛逛失败");
            //     }
            // }else{
            //     console.log("无需 去逛逛");
            // }

            
            this.todayTaskRun_see("去查看",0);
            // console.log("今日任务-去查看");
            // var w = text('去查看').findOne(2000);
            // if(w != null){
            //     console.log("准备去查看");
            //     randomClick(w);
            //     sleep(1000*random(1,5));
            //     console.log("看完返回");
            //     back();
            //     sleep(1000*random(1,5));
            //     console.log("领取去看看奖励");
            //     var w = text('领取奖励').findOne(6000);
            //     if(w != null){
            //         randomClick(w);
            //         console.log("领取奖励 成功");
            //     }else{
            //         console.log("领取奖励 失败");
            //     }
            //     sleep(500*random(1,5));
            // }else{
            //     console.log("无需去看看");
            // }

            this.todayTaskRun_jiangli();
            sleep(500*random(1,5));
            back();
            console.log("今日任务 赚金币完成");
            sleep(500*random(1,5));
        }else{
            console.log("无需 今日任务 赚金币");
            return false;
        }
    }
    this.guangdianpu=function(){
        console.log("执行 逛店铺");
        var w = className("android.widget.Button").text('赚金币').findOne(6000);
        if(w != null&&className("android.widget.Button").text("赚金币").findOne(6000).parent().parent().childCount()>0){
            randomClick(className("android.widget.Button").text("赚金币").findOne(6000).parent().parent().child(0));
            sleep(800*random(1,5));
            this.guangdianpuRun();
            console.log("逛店铺 完成");
            console.log("下一个查看金币成就");
            var target = className("android.support.v7.widget.RecyclerView").findOne(6000).child(1).findOne(className("android.widget.ImageView"));
            if(target){
                console.log("准备执行金币成就");
                randomClick(target);
                if(this.jinbichengjiuRun()){
                    back();
                }
                sleep(800*random(1,5));
            }else{
                console.log("不需要执行金币成就");
            }
            console.log("逛店铺 完成");
            back();
            sleep(800*random(1,5));
        }else{
            console.log("执行 逛店铺 失败");
            return false;
        }
    }
    this.yanzhengma=function(){
        if(text("验证码拦截").findOne(1000)!=null){
            console.log("验证码拦截,尝试验证");
            var w2 =className("android.view.View").text("").findOne(10);
            if(w2!=null){
                gesture(500,[w2.bounds().centerX(),w2.bounds().centerY()],[width,w2.bounds().centerY()]);
                sleep(800*random(2,5));
                return this.yanzhengma();
            }else{
                sleep(800*random(1,5));
                back();
                console.log("验证码拦截,验证失败,返回上一页");
                return false;
            }
        }else{
            return true;
        }
    }
    this.guangdianpuRun=function(){
        sleep(400*random(1,5));
        if(className("android.widget.TextView").text("好店任务").findOne(6000)){
            var w =className("android.view.View").desc("逛10秒+10").findOne(6000);
            if(w != null){
                console.log("准备逛店");
                if(w.bounds().bottom>height-10){
                    slideGesture(1);
                    sleep(800*random(1,5));
                    return this.guangdianpuRun();
                }
                if(w.bounds().top<0){
                    slideGesture_(1);
                    sleep(800*random(1,5));
                    return this.guangdianpuRun();
                }
                see_10(w);
                var w =textStartsWith('订阅').findOne(100);
                if(w!=null){
                    console.log("发现订阅店铺,订阅");
                    className("android.view.View").text("订阅+10").findOne().parent().click();
                    sleep(800*random(1,5));
                    this.yanzhengma();
                }
                back();
                sleep(800*random(1,5));
                return this.guangdianpuRun();
            }else{
                try {
                    if(className("android.support.v7.widget.RecyclerView").findOne(6000).child(1).findOne(className("android.widget.ImageView"))){
                        return false;
                    }else{
                        console.log("没找到 逛10秒+10 上滑一个位置");
                        slideGesture(1);
                        return this.guangdianpuRun();
                    }
                } catch (error) {
                    console.log("没找到 逛10秒+10 上滑一个位置");
                    slideGesture(1);
                    return this.guangdianpuRun();
                }
            }
        }else{
            console.log("执行 逛店铺 失败 页面不对");
            return false;
        }
    }
    this.jinbichengjiuRun=function(){
        sleep(500*random(1,5));
        if(className("android.widget.TextView").text("金币成就").findOne(6000)){
            console.log("检查成就奖励");
            var w =className("android.view.View").desc("领取奖励").findOne(6000);
            if(w != null){
                console.log("存在奖励准备领取奖励");
                if(w.bounds().bottom>height-10){
                    slideGesture(1);
                    sleep(800*random(1,5));
                    return this.jinbichengjiuRun();
                }
                if(w.bounds().top<0){
                    slideGesture_(1);
                    sleep(800*random(1,5));
                    return this.jinbichengjiuRun();
                }
                see_10(w);
                back();
                sleep(800*random(1,5));
                return this.jinbichengjiuRun();
            }else{
                console.log("金币成就奖励全部领取完成 ");
                return true;
            }
        }else{
            console.log("执行金币成就 失败 页面不对");
            return false;
        }
    }
    this.toujinbDown=function(){
        //滑到最下面
        console.log("加载全部");
        var w = className("android.widget.Button").text("O1CN01UyfwR41TM8E0bATUo_!!6000000002367-2-tps-96-96").findOne(1000);
        if(w !=null){
            console.log("加载完成");
            return true;
        }else{
            console.log("未加载完成继续加载");
            sleep(800*random(1,5));
            slideGesture(1);
            return this.toujinbDown();
        }
    }
    this.toujibiList=function(){
        var w1 =idContains('friendItem_1').findOne(100);//标记
      var w =w1.parent().children();
      if(w1 != null&&w != null){
          console.log("准备获取失好友列表");
          var new_info=new Array();
          var k=0;
          for(var i=0,j=w.size();i<j;i++){
              if(w[i].findOne(className('android.widget.Button').textMatches("\\d+"))!=null &&parseInt(w[i].findOne(className('android.widget.Button').textMatches("\\d+")).text()) >0){
                  k++;
                  // console.log(k);//排除名单
                  if(!(w[i].child(1).text()=="爱吃面条的赵"||w[i].child(1).text()=="*润")){
                      var one={
                        'ui_id': i,
                        'ui': w[i].findOne(className('android.widget.Button').textMatches("\\d+")),//点击控件
                        'id': parseInt(w[i].findOne(className('android.widget.Button').textMatches("\\d+")).text()),//数量
                        'name':w[i].child(1).text(),//名称
                      };
                      new_info.push(one);
                  }
              }else{
            //    console.log("不满足");
              }
          }
        //   console.log(new_info);
          return paixu_id(new_info);
      }else{
          console.log("偷金币 好友列表获取失败");
          return [];
      }
    }
    this.toujibiBangzhuta=function(){
        var w =className('android.widget.Button').depth(12).find();
        if(w != null){
            for(var i=0,j=w.size();i<j;i++){
                if(w[i].text()=="getAvatar"){
                    if(w[i].parent().child(1).text()=="爱吃面条的赵"||w[i].parent().child(1).text()=="*润"){
                        if(w[i].parent().find(className('android.widget.Button').text("助力Ta")).size()){
                            w[i].parent().find(className('android.widget.Button').text("助力Ta")).click()
                            console.log("助力Ta:"+w[i].parent().child(1).text()+"成功");
                            return true;
                        }
                    }
                }
            }
            console.log("助力指定好友失败,未找到");
            return false;
        }else{
            console.log("助力指定好友失败");
            return false;
        }
    }
    this.toujinbi=function(){
        //互助  指定昵称
        console.log("执行 偷金币");
        var w = className("android.widget.Button").text('赚金币').findOne(6000);
        if(w != null&&className("android.widget.Button").text("赚金币").findOne(6000).parent().parent().childCount()>0){
            randomClick(className("android.widget.Button").text("赚金币").findOne(6000).parent().parent().child(4));
            sleep(800*random(1,5));
            this.toujinbDown();//加载列表
            var list=this.toujibiList();
            
            this.toujibiBangzhuta();//帮助他-待完善
            if(list.length<1){
                console.log("没有可偷取列表");
                back();
                sleep(400*random(1,5));
                return false;
            }
            for(var i=0,j=list.length<10?list.length:10;i<j; i++){
                console.log("偷取第"+(i+1)+"次,偷取:"+list[i].name);
                list[i].ui.click();
                random3_5();
            }
            console.log("执行 偷金币 完成");
            back();
            sleep(400*random(1,5));
        }else{
            console.log("执行 偷金币 失败");
            return false;
        }

    }
    this.nfl_choujiang=function(){
        console.log("执行 拿福利");
        var w = className("android.widget.Button").text('赚金币').findOne(6000);
        if(w != null&&className("android.widget.Button").text("赚金币").findOne(6000).parent().parent().childCount()>0){
            randomClick(className("android.widget.Button").text("赚金币").findOne(6000).parent().parent().child(1));
            sleep(800*random(2,5));
            var w=descStartsWith("免费可抽").findOne(5000);
            if(w!=null){
                randomClick(w);
                sleep(5000);
                console.log("免费抽取成功");
            }else{
                console.log("没有免费抽取机会");
            }
            back();
        }else{
            console.log("执行 拿福利 失败");
            return false;
        }
    }
    this.begin=function(){
        console.log("begin");
        if(this.enterPage()){
            this.beginRun();
            return true;
        }else{
            console.log("进入金币小镇失败,结束");
            return false;
        }
    }
    this.beginRun=function(){
        try {
            console.log("进入金币小镇,开始任务");
            this.updateApp(); //检查更新
            this.nowJBnumber();//获取当前金币数量
            this.receiveRun();//依次收取金币
            // this.qiandao();//签到 无法准确判断
            this.nfl_choujiang();//拿福利 抽奖
            this.receiveRun();//领金币
            this.todayTaskRun();//今日任务
            this.guangdianpu();//逛店铺 + 领金币成就
            this.toujinbi();//偷金币 待完善，从多到少
            console.log("在本次运行中累计获取金币:"+(-(storage.get('tb_now_jb_nubmer')-this.nowJBnumber())));
            back();
            sleep(random(100,2000));
            back();
            sleep(random(100,2000));
            back();
            console.log("退出淘宝");
        } catch (error) {
            console.log("抛出异常");
            if((error.message=="不是淘宝APP,结束运行")){
                return false;
            }else{
                console.log(error);
                this.重新定位();
            }
        }
    }
    this.catch_error_nowpage_text=function(){
        console.log("判断当前页面");
        var w = className("android.widget.TextView").depth(1).findOne(1000);
        if(w != null){
            console.log(w.text());
            return w.text();
        }
        var w = className("android.webkit.WebView").findOne(1000);
        if(w != null){
            console.log(w.text());
            return w.text();
        }
        if(currentPackage()!='com.taobao.taobao'){
            toastLog("不是淘宝APP,结束运行");
            throw new Error("不是淘宝APP,结束运行");
        }
        console.log("未知页面");
        return "未知页面";
    }
    this.enterPage=function(){
        console.log("准备进入金币小镇");
        var w = desc("领淘金币").findOne(6000);
        //如果找到控件则点击
        if(w != null){
            w.click();
            return true;
        }else{
            if(this.nowJBpage()){
                return true;
            }else{
                return this.backHomepage(this.enterPage);
            }
        }
    }
    this.nowJBpage=function(){
        console.log("当前页面判断");
        var w = text("金币小镇-首页").findOne(6000);
        if(w != null){
            console.log("当前页面金币小镇");
            return true;
        }else{
            console.log("当前页面不是金币小镇");
            return false;
        }
    }
    this.backHomepage=function(funx){
        console.log("准备返回tb首页");
        var w = desc("首页").findOne(6000);
        if(w != null){
            console.log("准备返回tb首页-发现首页按钮");
            randomClick(w);
            return this.backFunc(funx);
        }
        var i=id("uik_public_menu_action_icon").findOne(6000);
        if(i != null){
            randomClick(i);
            console.log("准备返回tb首页-发现分享按钮");
            sleep(1000);
            var w = text("回到首页").findOne(6000);
            if(w != null){
                console.log("准备返回tb首页-发现回到首页");
                randomClick(w);
                return this.backHomepage(funx);
            }
        }
        var w = text("返回").findOne(6000);
        if(w != null){
            console.log("准备返回tb首页-发现返回按钮");
            randomClick(w);
            return this.backHomepage(funx);
        }
        var i= desc("更多").depth(3).findOne(3000);
        if(i != null){
            randomClick(i);
            console.log("准备返回tb首页-发现分享按钮");
            sleep(1000);
            var w = text("回到首页").findOne(6000);
            if(w != null){
                console.log("准备返回tb首页-发现回到首页");
                randomClick(w);
                return this.backHomepage(funx);
            }
        }
        return false;
    }
    this.backFunc=function(funx){
        if(this.tbApp()){
            if(typeof(funx) == "undefined"){
                console.log("没有回调方法"+typeof(funx));
                return false;
            }else{
                console.log("回调方法");
                return funx();
            }
        }else{
            console.log("没有在淘宝APP中 结束jinbixiaozhen");
            return false;
        }
    }
    this.tbApp=function(){
        if(currentPackage()=='com.taobao.taobao'){
            console.log("判断在淘宝APP中");
            return true;
        }else{
            console.log("判断没有在淘宝APP中"+currentPackage());
            return false;
        }
    }
    this.updateApp=function(){
        var w = id("update_imageview_cancel_v2").findOne(2000);
        if(w != null){
            console.log("发现更新按钮,取消");
            sleep(500);
            w.click();
            return true;
        }
        
        var w = text("立即下载").findOne(1000);
        if(w != null){
            console.log("发现立即下载按钮,取消");
            className("android.widget.ImageView").findOne(100).click();
            return true;
        }
        return false;

    }
}
//进淘宝
function enteyTaobao(){
    if(currentPackage()=='com.taobao.taobao'){
        console.log("已经进入淘宝1");
        return true;
    }else{
        console.log("准备进入淘宝");
        launchApp("淘宝");
        sleep(1000);
        if(currentPackage()=='com.taobao.taobao'){
            console.log("已经进入淘宝2");
            return true;
        }else{
            var moreBtn=text("请选择要使用的应用").find();
            if(moreBtn.length>0){
                console.log("存在淘宝分身");
                if(tb_copy){
                    console.log("打开淘宝");
                    randomClick(moreBtn[0].parent().child(1).child(0));//淘宝
                }else{
                    console.log("打开淘宝分身");
                    randomClick(moreBtn[0].parent().child(2).child(0));//淘宝
                }
                random3_5();
                return enteyTaobao();
            }else{
                return enteyTaobao();
            }
        }
    }
}
function see_time(widget,ti){
    console.log('开始浏览');
    randomClick(widget);
    random3_5();
    slideGesture(ti);
    console.log('浏览完成');
    return true;
}
//点击 浏览15s  返回 
function see_10(widget){
    console.log('开始浏览');
    randomClick(widget);
    random3_5();
    slideGesture(4);
    console.log('浏览完成');
    return true;
}
//点击 浏览15s  返回 
function see_14(widget){
    console.log('开始浏览');
    randomClick(widget);
    random3_5();
    slideGesture(9);
    console.log('浏览完成');
    return true;
}
//点击 浏览15s  返回 
function see_15(widget){
    console.log('开始浏览');
    randomClick(widget);
    random3_5();
    if(slideGesture(10)){
        back();
    }
    console.log('浏览完成');
    return true;
}
//页面随机滑动 +
function slideGesture(num){
    var h9=parseInt(height/9);
    var w5=parseInt(width/5);
    for(var i=0;i<num;i++){
        var x1=random(2*w5,3*w5);
        var y1=random(7*h9,8*h9);
        var x2=random(2*w5,3*w5);
        var y2=random(2*h9,4*h9);
        console.log('滑动第:'+(i+1)+'次');
        console.log('向上滑从:'+x1+','+y1+'到'+x2+','+y2);
        gesture(random(500,1000),[x1,y1],[x2,y2]);
        random3_5();
    }
    return true;
}
//页面随机滑动 -
function slideGesture_(num){
    var h9=parseInt(height/9);
    var w5=parseInt(width/5);
    for(var i=0;i<num;i++){
        var x1=random(2*w5,3*w5);
        var y1=random(7*h9,8*h9);
        var x2=random(2*w5,3*w5);
        var y2=random(2*h9,4*h9);
        console.log('滑动第:'+(i+1)+'次');
        console.log('向下滑从:'+x1+','+y1+'到'+x2+','+y2);
        gesture(random(500,1000),[x2,y2],[x1,y1]);
        random3_5();
    }
    return true;
}
//基于控件随机点击
function randomClick(widget){
    var x=random(widget.bounds().left,widget.bounds().right);
    var y=random(widget.bounds().top,widget.bounds().bottom);
    console.log("点击:"+x+","+y);
    click(x,y);
    sleep(500*random(2,5));
}
//随机休眠
function random3_5(){
    sleep(1000*random(2,5));
}
//准备工作 
function beginBefore(){
    auto.waitFor();
    setScreenMetrics(device.width, device.height);
    // console.show();
    console.log("准备完成");
}
function over(){
    console.show();
    console.log('停止 结束');
}

function paixu_id(arr){
    //比较的轮数
    for(var i = 0; i < arr.length - 1; i++){
    //每轮比较的次数
        for(var j = i + 1; j < arr.length; j++){
            if(arr[i].id < arr[j].id){
                var tmp = arr[i];
                arr[i] = arr[j];
                arr[j] = tmp;
            }
        }
    }
    return arr;
}