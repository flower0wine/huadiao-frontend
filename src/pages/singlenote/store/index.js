/**
 * 功能描述：
 * 创建日期：2023 年 03 月 20 日
 */

// 使用严格模式
'use strict';

import Vuex from "vuex";
import Vue from "vue";

const state = {
    isLogin: true,
    // 当前用户信息
    user: {
        isLogin: null,
        nickname: "花凋大总管",
        userAvatar: "https://img0.baidu.com/it/u=981218435,2998857702&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1677690000&t=d8a591b46edf38a8a1d31e5193e384a9",
        userId: "huadiao_01234567890",
        uid: 1,
        fans: 8,
        follows: 8,
        sex: "2",
        canvases: "今天是花凋一周年!",
        bornDate: "2003-03-15",
        school: "东华理工大学",
    },
    noteInfer: {
        authorInfer: {
            nickname: "花凋大总管",
            userAvatar: "https://img0.baidu.com/it/u=3342050756,1076278459&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1679763600&t=04523d323f70995c7cac591ead5ae7ca",
            userId: "huadiao_012345678910",
            uid: 1,
            follow: 8,
            fan: 8,
        },
        // 作者与我的关系
        authorAndMeRelation: {
            followed: false,
            following: true,
        },
        // 我与笔记的渊源
        noteAndMeRelation: {
            me: true,
            myLike: true,
            myStar: false,
            myUnlike: false,
        },
        buildDate: "2022-08-22 19:24:35.0",
        // 置顶？
        topping: true,
        // 精选？
        concentration: true,
        viewNumber: 100,
        likeNumber: 0,
        starNumber: 0,
        commentNumber: 0,
        // 原创？
        original: true,
        noteTitle: "Linux- 系统随你玩之--网络上的黑客帝国",
        noteContent: "1、前言\n" +
            "黑客帝国系列片 大家都看过了，知道网络黑客尼奥发现看似正常的现实世界实际上是由一个名为“矩阵”的计算机人工智能系统控制的，然后尼奥见到了黑客组织的首领墨菲斯，三人走上了抗争矩阵征途的故事 。\n" +
            "那么黑客都是些什么人了？\n" +
            "黑客如今在互联网上已经不再是鲜为人知的人物，他们已经发展成网络上的一个独特的群体。他们有着与常人不同的理想和追求，有着自己独特的行为模式，网络上出现了很多由一些志同道合的人组织起来的黑客组织。\n" +
            "在信息安全里，“黑客”指研究智取计算机安全系统的人员。利用公共通讯网路，如互联网和电话系统，在未经许可的情况下，载入对方系统的被称为黑帽黑客（英文：black hat，另称cracker）；调试和分析计算机安全系统的白帽黑客（英语：white hat）。“黑客”一词最早用来称呼研究盗用电话系统的人士。\n" +
            "他们有个共同点都是利用公共通讯网路，进行着不同的活动。\n" +
            "而今天我们的主角也是针对网络进行数据采集与分析的工具，它就是TCPDump。\n" +
            "老样子，我们本文主要介绍了LinuxTCPDump命令使用详解，文中会通过非常详细的示例代码介绍，对大家的学习或者工作具有一定的参考学习价值，需要的朋友们下面随我来一起学习！\n" +
            "\n" +
            "2、TCPDump介绍\n" +
            "Linux作为网络服务器，特别是作为路由器和网关时，数据的采集和分析是不可少的。\n" +
            "Tcpdump是一个用于截取网络分组，并输出分组内容的工具。\n" +
            "tcpdump凭借强大的功能和灵活的截取策略，使其成为类UNIX系统下用于网络分析和问题排查的首选工具。\n" +
            "\n" +
            "tcpdump可以将网络中传送的数据包的“头”完全截获下来提供分析。\n" +
            "它支持针对网络层、协议、主机、网络或端口的过滤，并提供and、or、not等逻辑语句来帮助你去掉无用的信息。\n" +
            "2. 同时tcpdump提供了源代码，公开了接口，因此具备很强的可扩展性。\n" +
            "\n" +
            "基本上tcpdump的总的输出格式为：系统时间 来源主机.端口 > 目标主机.端口 数据包参数\n" +
            "\n" +
            "2.1、问题来了： 所有用户都可以采用该命令吗？\n" +
            "虽然tcpdump提供源代码，公开了接口，具备很强的可扩展性，对于网络维护和入侵者都是非常有用的工具。\n" +
            "但tcpdump普通用户不能正常执行，需要具备root权限的用户才可以直接执行它来获取网络上的信息。\n" +
            "\n" +
            "2.2、抓包原理\n" +
            "linux抓包是通过注册一种虚拟的底层网络协议来完成对网络报文（准确的是网络设备）消息的处理权。\n" +
            "当网卡接收到一个网络报文之后，它会遍历系统中所有已经注册的网络协议，如以太网协议、x25协议处理模块来尝试进行报文的解析处理。\n" +
            "当抓包模块把自己伪装成一个网络协议的时候，系统在收到报文的时候就会给这个伪协议一次机会，让它对网卡收到的保温进行一次处理，此时该模块就会趁机对报文进行窥探，也就是啊这个报文完完整整的复制一份，假装是自己接收的报文，汇报给抓包模块。\n" +
            "\n" +
            "2.3、特点\n" +
            "2.3.1、参数化支持\n" +
            "1.参数\n" +
            "tcpdump支持相当多的不同参数。\n" +
            "如使用-i参数指定tcpdump监听的网络接口， 使用-c参数指定要监听的数据包数量，\n" +
            "使用-w参数指定将监听到的数据包写入文件中保存等。\n" +
            "2.安全\n" +
            "一般情况下网络硬件和TCP/IP堆栈不支持接收或发送与本计算机无关的数据包，为了接收这些数据包，就必须使用网卡的混杂模式，并绕过标准的TCP/IP 堆栈才行。\n" +
            "在FreeBSD下，这就需要内核支持伪设备bpfilter。因此，在内核中取消bpfilter支持，就能屏蔽tcpdump之类的网络分析工具。\n" +
            "并且当网卡被设置为混杂模式时，系统会在控制台和日志文件中留下记录，提醒管理员留意这台系统是否被用作攻击同网络的其他计算机的跳板。\n" +
            "3.解码\n" +
            "tcpdump对截获的数据并没有进行彻底解码，数据包内的大部分内容是使用十六进制的形式直接打印输出的。显然这不利于分析网络故障，通常的解决办法是先使用带-w参数的tcpdump 截获数据并保存到文件中，然后再使用其他程序进行解码分析。当然也应该定义过滤规则，以避免捕获的数据包填满整个硬盘。\n",
        commentList: [{
            userAvatar: "https://img0.baidu.com/it/u=3342050756,1076278459&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1679763600&t=04523d323f70995c7cac591ead5ae7ca",
            nickname: "花凋大总管",
            uid: 1,
            commentId: "GrN9&?1ij23rfeL_h96?RW2wA",
            commentDate: "2023-02-13 14:43:15.0",
            commentContent: "如果是<a href='#'>红红火火</a>的世界",
            likeNumber: 1,
            myLike: true,
            myUnlike: false,
            commentList: [{
                uid: 1,
                commentDate: "2023-03-24 11:14:22.0",
                userAvatar: "https://img1.baidu.com/it/u=782309483,3047525129&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1679763600&t=48b1fbd2d1e01039004c66a64089141d",
                nickname: "花凋大总管",
                commentId: "222FJiTr7ardgawerd!yxk5K9dxpr",
                commentContent: "hh1",
                likeNumber: 1,
                myLike: true,
                myUnlike: false,
            }],
        }, {
            userAvatar: "https://img0.baidu.com/it/u=3342050756,1076278459&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1679763600&t=04523d323f70995c7cac591ead5ae7ca",
            nickname: "花凋大总管",
            uid: 1,
            commentId: "GrN9&?1ijLawef_h96?RW2wA",
            commentDate: "2023-02-13 14:43:15.0",
            commentContent: "测试",
            likeNumber: 1,
            myLike: true,
            myUnlike: false,
            commentList: [{
                uid: 1,
                commentDate: "2023-03-24 11:14:22.0",
                userAvatar: "https://img1.baidu.com/it/u=782309483,3047525129&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1679763600&t=48b1fbd2d1e01039004c66a64089141d",
                nickname: "花凋大总管",
                commentId: "222FJiTrwsefd7!yxk5K9dxpr",
                commentContent: "hh1",
                likeNumber: 1,
                myLike: true,
                myUnlike: false,
            }],
        }, {
            userAvatar: "https://img0.baidu.com/it/u=3342050756,1076278459&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1679763600&t=04523d323f70995c7cac591ead5ae7ca",
            nickname: "花凋大总管",
            uid: 1,
            commentId: "GrN9&?1irgerfjL_h96?RW2wA",
            commentDate: "2023-02-13 14:43:15.0",
            commentContent: "测试",
            likeNumber: 1,
            myLike: true,
            myUnlike: false,
            commentList: [{
                uid: 1,
                commentDate: "2023-03-24 11:14:22.0",
                userAvatar: "https://img1.baidu.com/it/u=782309483,3047525129&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1679763600&t=48b1fbd2d1e01039004c66a64089141d",
                nickname: "花凋大总管",
                commentId: "222FJiTewfwer7!yxk5K9dxpr",
                commentContent: "hh1",
                likeNumber: 1,
                myLike: true,
                myUnlike: false,
            }, {
                uid: 1,
                commentDate: "2023-03-24 11:14:22.0",
                userAvatar: "https://img1.baidu.com/it/u=782309483,3047525129&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1679763600&t=48b1fbd2d1e01039004c66a64089141d",
                nickname: "花凋大总管",
                commentId: "222FerfJiTr7!yxk5K9dxpr",
                commentContent: "hh1",
                likeNumber: 1,
                myLike: true,
                myUnlike: false,
            }, {
                uid: 1,
                commentDate: "2023-03-24 11:14:22.0",
                userAvatar: "https://img1.baidu.com/it/u=782309483,3047525129&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1679763600&t=48b1fbd2d1e01039004c66a64089141d",
                nickname: "花凋大总管",
                commentId: "12",
                commentContent: "hh1",
                likeNumber: 1,
                myLike: true,
                myUnlike: false,
            }],
        }],
    }
};
const actions = {
    // 添加根评论
    addRootCommentByCurrentUser(context, {commentContent, succeedCallback, failCallback, uniqueString}) {
        if (commentContent) {
            let user = context.state.user;
            let now = new Date();
            let date = now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes();
            let rootComment = {
                userAvatar: user.userAvatar,
                nickname: user.nickname,
                uid: user.uid,
                commentId: uniqueString,
                commentDate: date,
                commentContent,
                likeNumber: 0,
                myLike: false,
                myUnlike: false,
                commentList: [],
            };
            context.commit("addRootCommentByCurrentUser", {rootComment});
            succeedCallback && succeedCallback();
        } else {
            failCallback && failCallback();
        }
    },
    // 给评论点赞
    clickToLikeComment(context, {
        rootIndex,
        subIndex,
        succeedCallback,
        failCallback,
        cancelSucceedCallback,
        cancelFailCallback
    }) {
        if (Number.isInteger(rootIndex)) {
            let myLike = context.state.noteInfer.commentList[rootIndex].myLike;
            if (Number.isInteger(subIndex)) {
                myLike = context.state.noteInfer.commentList[rootIndex].commentList[subIndex].myLike;
                // 发送请求...

                console.log(myLike ? -1 : 1)
                // 请求成功
                context.commit("clickToLikeComment", {rootIndex, subIndex, incr: myLike ? -1 : 1});
                !myLike ? succeedCallback() : cancelSucceedCallback();
                // 请求失败
                !myLike ? failCallback() : cancelFailCallback();
                return;
            }
            // 发送请求..
            // 请求成功
            context.commit("clickToLikeComment", {rootIndex, incr: myLike ? -1 : 1});
            !myLike ? succeedCallback() : cancelSucceedCallback();
            // 请求失败
            !myLike ? failCallback() : cancelFailCallback();
        }
    },
    // 给评论不喜欢
    clickToUnlikeComment(context, {
        rootIndex,
        subIndex,
        succeedCallback,
        failCallback,
        cancelSucceedCallback,
        cancelFailCallback
    }) {
        if (Number.isInteger(rootIndex)) {
            let myUnlike = context.state.noteInfer.commentList[rootIndex].myUnlike;
            if (Number.isInteger(subIndex)) {
                myUnlike = context.state.noteInfer.commentList[rootIndex].commentList[subIndex].myUnlike;
                // 发送请求...

                // 请求成功
                context.commit("clickToUnlikeComment", {rootIndex, subIndex});
                !myUnlike ? succeedCallback() : cancelSucceedCallback();
                // 请求失败
                !myUnlike ? failCallback() : cancelFailCallback();
                return;
            }
            // 发送请求..
            // 请求成功
            context.commit("clickToUnlikeComment", {rootIndex});
            !myUnlike ? succeedCallback() : cancelSucceedCallback();
            // 请求失败
            !myUnlike ? failCallback() : cancelFailCallback();
        }
    }
};
const mutations = {
    // 给评论喜欢
    clickToLikeComment(state, {rootIndex, subIndex, incr}) {
        console.log(incr)
        if (Number.isInteger(subIndex)) {
            let myLike = state.noteInfer.commentList[rootIndex].commentList[subIndex].myLike;
            state.noteInfer.commentList[rootIndex].commentList[subIndex].myLike = !myLike;
            state.noteInfer.commentList[rootIndex].commentList[subIndex].likeNumber += incr;
        } else {
            let myLike = state.noteInfer.commentList[rootIndex].myLike;
            state.noteInfer.commentList[rootIndex].myLike = !myLike;
            state.noteInfer.commentList[rootIndex].likeNumber += incr;
        }
    },
    // 给评论不喜欢
    clickToUnlikeComment(context, {rootIndex, subIndex}) {
        if (Number.isInteger(subIndex)) {
            state.noteInfer.commentList[rootIndex].commentList[subIndex].myUnlike = !state.noteInfer.commentList[rootIndex].commentList[subIndex].myUnlike;
        } else {
            state.noteInfer.commentList[rootIndex].myUnlike = !state.noteInfer.commentList[rootIndex].myUnlike;
        }
    },
    // 添加根评论
    addRootCommentByCurrentUser(state, {rootComment}) {
        state.noteInfer.commentList.unshift(rootComment);
    },
    // 笔记点赞
    clickNoteLikeIcon(state, {likeCallback, cancelLikeCallback}) {
        state.noteInfer.myLike = !state.noteInfer.myLike;
        if (!state.noteInfer.myLike) {
            state.noteInfer.likeNumber -= 1;
            likeCallback && likeCallback();
        } else {
            state.noteInfer.likeNumber += 1;
            cancelLikeCallback && cancelLikeCallback();
        }
    },
    // 笔记不喜欢
    clickNoteUnLikeIcon(state, {unlikeCallback, cancelUnlikeCallback}) {
        state.noteInfer.myUnlike = !state.noteInfer.myUnlike;
        if (!state.noteInfer.myUnlike) {
            unlikeCallback && unlikeCallback();
        } else {
            cancelUnlikeCallback && cancelUnlikeCallback();
        }
    },
    // 笔记收藏
    clickNoteStarIcon(state, {starCallback, cancelStarCallback}) {
        state.noteInfer.myStar = !state.noteInfer.myStar;
        if (!state.noteInfer.myStar) {
            state.noteInfer.starNumber -= 1;
            starCallback && starCallback();
        } else {
            state.noteInfer.starNumber += 1;
            cancelStarCallback && cancelStarCallback();
        }
    },
};
const getters = {};

Vue.use(Vuex);

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
});