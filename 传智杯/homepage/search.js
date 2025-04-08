document.addEventListener("DOMContentLoaded", function () {
    // 获取 URL 参数
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("query") ? urlParams.get("query").trim().toLowerCase() : "";

    // 获取搜索结果列表
    let resultsList = document.getElementById("searchResults");

    // 清空旧的搜索结果
    resultsList.innerHTML = "";

    if (!query) {
        resultsList.innerHTML = "<li>请输入搜索关键词</li>";
        return;
    }

    let contentData = [
        { type: "news", title: "生态环境部党组书记孙金龙赴广东调研并出席粤港澳大湾区生态环境保护工作座谈会",link:"http://127.0.0.1:5500/new/new%20alone/hjxw/xw1.html" },
        { type: "news", title: "抓好“一泓清水入黄河”生态保护工程实施",link:"http://127.0.0.1:5500/new/new%20alone/hjxw/xw2.html" },
        { type: "news", title: "日本启动“排污入海”满一年 超6万吨核污染水入海引担忧",link:"http://127.0.0.1:5500/new/new%20alone/hjxw/xw3.html" },
        { type: "news", title: "“绿色”守护让西部更美",link:"http://127.0.0.1:5500/new/new%20alone/hjxw/xw4.html" },
        { type: "news", title: "“十三五”以来 我国累计治理历史遗留废弃矿山480万亩",link:"http://127.0.0.1:5500/new/new%20alone/hjxw/xw6.html"},
        { type: "news", title: "上海为集成电路行业“定制”环保政策",link:"http://127.0.0.1:5500/new/new%20alone/hbzcyxd/zc2.html" },
        { type: "news", title: "绍兴发布“1+11”系列环保服务政策",link:"http://127.0.0.1:5500/new/new%20alone/hbzcyxd/zc3.html" },
        { type: "news", title: "发改委：正在酝酿和修改相关政策 大力支持环保产业",link:"http://127.0.0.1:5500/new/new%20alone/hbzcyxd/zc4.html" },
        { type: "news", title: "环保部：将出台22项政策措施落实“大气十条”",link:"http://127.0.0.1:5500/new/new%20alone/hbzcyxd/zc5.html" },
        { type: "news", title: "国家进一步完善可再生能源和环保电价政策",link:"http://127.0.0.1:5500/new/new%20alone/hbzcyxd/zc6.html" },
        { type: "news", title: "国家海洋局：渤海将实行最严厉环保政策",link:"http://127.0.0.1:5500/new/new%20alone/hbzcyxd/zc7.html" },
        { type: "news", title: "节能降耗“神器” 落地四座水厂，碧水源振动MBR行业应用加速！",link:"htmlhttp://127.0.0.1:5500/new/new%20alone/kcxcpyfw/cp1.html" },
        { type: "news", title: "深圳可飞灵嗅P1-X机器狗面世 集创新与实用于一身",link:"http://127.0.0.1:5500/new/new%20alone/kcxcpyfw/cp2.html" },
        { type: "news", title: "智能温控、再生纤维……今年秋冬服饰科技、环保与个性化并重" ,link:"http://127.0.0.1:5500/new/new%20alone/kcxcpyfw/cp3.html"},
        { type: "news", title: "长春将“无废城市”建设融入汽车生产",link:"http://127.0.0.1:5500/new/new%20alone/kcxcpyfw/cp4.html" },
        { type: "news", title: "以色列研发新科技！可将磷酸工业废水量减少90%",link:"http://127.0.0.1:5500/new/new%20alone/kcxcpyfw/cp5.html" },
        { type: "news", title: "中华人民共和国海洋环境保护法",link:"https://www.mee.gov.cn/ywgz/fgbz/fl/202310/t20231025_1043942.shtml" },
        { type: "news", title: "中华人民共和国大气污染防治法",link:"https://www.mee.gov.cn/ywgz/fgbz/fl/201811/t20181113_673567.shtml" },
        { type: "news", title: "中华人民共和国森林法" ,link:"https://www.mee.gov.cn/ywgz/fgbz/fl/202106/t20210608_836755.shtml"},
        { type: "news", title: "水生态监测技术指南　湖泊和水库水生生物监测与评价（试行）" ,link:"https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/shjbh/xgbzh/202305/W020230511587792014997.pdf"},
        { type: "news", title: "生活垃圾填埋场污染控制标准",link:"https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/gthw/gtfwwrkzbz/202408/W020240812574830172315.pdf" },
        { type: "news", title: "环境空气 颗粒物来源解析 化学质量平衡模型计算技术指南",link:"https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/dqhjbh/xgbz/202402/W020240226592409979275.pdf" },
        { type: "news", title: "中国民间环保组织关注长江源生态10余年：垃圾减少动物增长",link:"http://127.0.0.1:5500/new/new%20alone/guonei/nr2.html" },
        { type: "news", title: "环保社会组织如何“碳”索未来多国专家及民间环保组织呼吁日本撤回福岛核污水排放入海决定",link:"http://127.0.0.1:5500/new/new%20alone/guonei/nr6.html"},
        { type: "news", title: "2023中华环保社会组织可持续发展年会在上海召开",link:"http://127.0.0.1:5500/new/new%20alone/guonei/nr3.html" },
        { type: "news", title: "25家环保组织共同发起成立黄河流域生态保护行动网络" ,link:"http://127.0.0.1:5500/new/new%20alone/guonei/nr4.html"},
        { type: "news", title: "环保社会组织如何“碳”索未来",link:"http://127.0.0.1:5500/new/new%20alone/guonei/nr5.html" },
        { type: "news", title: "国内首个环保公益众筹平台“绿动未来”上线，征集公益项目",link:"http://127.0.0.1:5500/new/new%20alone/guonei/nr1.html" },
        { type: "news", title: "各国在联合国环境大会上团结应对“三重地球危机”",link:"http://127.0.0.1:5500/new/new%20alone/guoji/hd1.html" },
        { type: "news", title: "联合国：“奔向零碳”行动一周年 到2030年减排50%已成全球共识",link:"http://127.0.0.1:5500/new/new%20alone/guoji/hd2.html" },
        { type: "news", title: "国际海事组织与粮农组织合作 推动有效处理海洋垃圾" ,link:"http://127.0.0.1:5500/new/new%20alone/guoji/hd3.html"},
        { type: "news", title: "联合国森林论坛：森林保护“成败在此一举”" ,link:"http://127.0.0.1:5500/new/new%20alone/guoji/hd4.html"},
        { type: "news", title: "向海洋垃圾宣战：联合国环境署启动全球“清洁海洋运动”",link:"http://127.0.0.1:5500/new/new%20alone/guoji/hd5.html" },
        { type: "news", title: "海洋塑料污染之严重迫切需要全球紧急行动",link:"http://127.0.0.1:5500/new/new%20alone/guoji/hd6.html" },

        { type: "tips", title: "碳排放排行榜",link:"http://127.0.0.1:5500/tips/detail/greentravel/green.html#section1" },
        { type: "tips", title: "绿色出行方式",link:"http://127.0.0.1:5500/tips/detail/greentravel/green.html#section2" },
        { type: "tips", title: "可回收垃圾",link:"http://127.0.0.1:5500/tips/detail/rubbish/rubbish.html#section3" },
        { type: "tips", title: "有害垃圾",link:"http://127.0.0.1:5500/tips/detail/rubbish/rubbish.html#section4" },
        { type: "tips", title: "湿垃圾" ,link:"http://127.0.0.1:5500/tips/detail/rubbish/rubbish.html#section1"},
        { type: "tips", title: "干垃圾" ,link:"http://127.0.0.1:5500/tips/detail/rubbish/rubbish.html#section2"},
        { type: "tips", title: "植树小技巧",link:"http://127.0.0.1:5500/tips/detail/treeplant/plant.html" },
        { type: "tips", title: "人民网评：植树添新绿，共绘美丽中国",link:"http://opinion.people.com.cn/n1/2024/0312/c223228-40194019.html" },
        { type: "tips", title: "植树节，跟着总书记一起种下绿色的希望",link:"http://politics.people.com.cn/n1/2023/0313/c1001-32643629.html" },
        { type: "tips", title: "多种树 种好树 习近平厚“植”绿色期望",link:"http://cpc.people.com.cn/n1/2022/0312/c164113-32373296.html" },
        { type: "tips", title: "人民日报人民时评：在春天植下绿色希望",link:"http://opinion.people.com.cn/n1/2020/0316/c1003-31632762.html" },
        { type: "tips", title: "春来植树添新绿 增厚美丽中国“绿色家底”" ,link:"http://finance.people.com.cn/n1/2024/0408/c1004-40211458.html"},
        { type: "tips", title: "春来植树正当时",link:"https://www.gov.cn/xinwen/2021-04/04/content_5597712.htm" },
        { type: "tips", title: "植树，用绿色拥抱春天" ,link:"https://www.xinhuanet.com/politics/2021-03/12/c_1127201184.htm"},

        { type: "video", title: "巴西圣保罗消费电子展：智能 环保产品受青睐" ,link:"https://tv.cctv.com/2024/07/20/VIDE7vytpbsWmilNSrtxUmPQ240720.shtml"},
        { type: "video", title: "环保！以色列发明可重复利用口罩，充电半小时杀毒",link:"https://v.cctv.com/2020/06/19/VIDENaQhmaFJPBt6iScMZBnt200619.shtml?spm=C90324.Pfdd0SYeqktv.Eri5TUDwaTXO.31" },
        { type: "video", title: "第二届中国数字碳中和高峰论坛开幕式暨主论坛",link:"https://live.baidu.com/m/media/pclive/pchome/live.html?room_id=8084958298&source=h5pre" },
        { type: "video", title: "饮料瓶子、塑料罐子能织成环保又舒适的可再生面料？",link:"https://v.cctv.com/2023/12/29/VIDEksPkwVlsMYLofCP7dHev231229.shtml?spm=C90324.Pfdd0SYeqktv.Eri5TUDwaTXO.1" },
        { type: "video", title: "海南：首届设博会汇聚节能环保产品",link:"https://tv.cctv.com/2014/12/31/VIDE1419982255132628.shtml" },
        { type: "video", title: "解读《关于金融支持生态环境保护和生态环保产业发展的若干措施》",link:"https://live.baidu.com/m/media/pclive/pchome/live.html?room_id=5083348800&source=h5pre" },
        { type: "video", title: "环保新科技，快来感受低碳绿色风潮！" ,link:"https://live.baidu.com/m/media/pclive/pchome/live.html?room_id=7816753412&source=h5pre"},
        { type: "video", title: "口香糖变废为宝英国设计师打造粉色环保产品" ,link:"https://news.cctv.com/2018/04/26/VIDEvIqhkXiaGnP9F3k4xkMq180426.shtml"},
        { type: "video", title: "山东省“抓环保 促发展 走在前”情况发布会" ,link:"https://live.baidu.com/m/media/pclive/pchome/live.html?room_id=7152760432&source=h5pre"},
        { type: "video", title: "《新闻1+1》| 祁连山腹地非法开采 为何停不下来？" ,link:"https://live.baidu.com/m/media/pclive/pchome/live.html?type=live&action=liveshow&live_type=review&room_id=3857995785"},
        { type: "video", title: "四个湖难住四个省？最高检副检察长谈环境公益诉讼",link:"https://live.baidu.com/m/media/pclive/pchome/live.html?room_id=7103622421&source=h5pre" },
        { type: "video", title: "法国CARBIOS PET酶解聚技术助力资源再生！" ,link:"https://www.hbzhan.com/video/h3115.html"},
        { type: "video", title: "污水都去哪儿了？探索日常污水再处理" ,link:"https://live.baidu.com/m/media/pclive/pchome/live.html?type=live&action=liveshow&live_type=review&room_id=4427489492"},
        { type: "video", title: "2022BMW卓越城市讲堂—郝利琼、宋国君谈环保与城市韧性" ,link:"https://live.baidu.com/m/media/pclive/pchome/live.html?room_id=7784334825&source=h5pre"},
        { type: "video", title: "装配式污水厂开创者 | 鹏凯重磅亮相2024环博会深圳展",link:"https://www.hbzhan.com/video/h3110.html" },
        { type: "video", title: "今天是全国低碳日，你真的了解“低碳”吗?",link:"https://live.baidu.com/m/media/pclive/pchome/live.html?room_id=7429405392&source=h5pre" },
        { type: "video", title: "今天我们来制作一个纸板垃圾桶！" ,link:"https://www.bilibili.com/video/BV1Ls4y1d72k/?spm_id_from=333.1245.0.0"},
        { type: "video", title: "矿泉水瓶也没有被我放过，努力变成手工博主的第？天" ,link:"https://www.bilibili.com/video/BV1aT411M75g/?spm_id_from=333.1245.0.0"},
        { type: "video", title: "变废为宝｜家里的旧纸袋居然有这么多用处～三款旧纸袋改造教程",link:"https://www.bilibili.com/video/BV1eV4y1u73C/?spm_id_from=333.1245.0.0" },
        { type: "video", title: "塑料瓶改造水母灯" ,link:"https://www.bilibili.com/video/BV18T4y1f7Nd/?spm_id_from=333.1245.0.0"},
        { type: "video", title: "手工制作纸板小台历",link:"https://www.bilibili.com/video/BV1em4y1g7dL/?spm_id_from=333.337.search-card.all.click&vd_source=5c5246770e1dc15a5c0a5898721b24e1" },
        { type: "video", title: "如何用废纸做出一只...旅行青蛙！" ,link:"https://www.bilibili.com/video/BV1VW411H7n6/?spm_id_from=333.337.search-card.all.click&vd_source=5c5246770e1dc15a5c0a5898721b24e1"},
        { type: "video", title: "可爱纾压小物纸箱弹跳猫 按压玩具 DIY 小教学",link:"https://www.bilibili.com/video/BV1f84y1x7gu/?spm_id_from=333.1245.0.0" },
        { type: "video", title: "家里的废旧纸壳别扔了，这样DIY一下后价值瞬间飙升。 邻居小伙都看懵了。" ,link:"https://www.bilibili.com/video/BV1tT411G7Hb/?spm_id_from=333.337.search-card.all.click"},
        { type: "video", title: "喝完饮料的瓶子别扔，简单几步做个小茶壶" ,link:"https://www.bilibili.com/video/BV1614y1b7ag/?spm_id_from=333.1245.0.0"},
        { type: "video", title: "空瓶DIY｜垃圾塑料瓶的有效利用，简单三步蜕变超有质感的收纳罐！废物变宝贝！这个果冻蛋糕我我爱了" ,link:"https://www.bilibili.com/video/BV1E8411e7oC/?spm_id_from=333.337.search-card.all.click&vd_source=5c5246770e1dc15a5c0a5898721b24e1"},
        { type: "video", title: "玻璃瓶改造｜废物利用" ,link:"https://www.bilibili.com/video/BV1NR4y1p778/?spm_id_from=333.337.search-card.all.click&vd_source=5c5246770e1dc15a5c0a5898721b24e1"},
        { type: "video", title: "吃过的罐头瓶扔了太可惜，简单2步就能改造成好看的夜光玩具，快学起来吧" ,link:"https://www.bilibili.com/video/BV1fx411E7u9/?spm_id_from=333.1245.0.0"}
    ];

     // 过滤搜索结果
     let filteredData = contentData.filter(item => item.title.toLowerCase().includes(query));

     if (filteredData.length === 0) {
         resultsList.innerHTML = "<li>未找到相关内容</li>";
         return;
     }
 
     // 显示搜索结果
     filteredData.forEach(item => {
         let li = document.createElement("li");
         let a = document.createElement("a");
 
         // 处理可能缺失的链接
         a.href = item.link ? item.link : "javascript:void(0);";
         a.innerText = `【${item.type}】 ${item.title}`;
         a.target = item.link ? "_blank" : "_self";
 
         li.appendChild(a);
         resultsList.appendChild(li);
     });
});
