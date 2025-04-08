// 雪花特效 
var embedimSnow = document.getElementById("embedim--snow");
if (!embedimSnow) {
    function embRand(a, b) {
        return Math.floor(Math.random() * (b - a + 1)) + a
    }
    var embCSS = '.embedim-snow{position: absolute;width: 10px;height: 10px;background: white;border-radius: 50%;margin-top:-10px}';
    var embHTML = '';
    for (i = 1; i < 200; i++) {
        embHTML += '<i class="embedim-snow"></i>';
        var rndX = (embRand(0, 1000000) * 0.0001)
          , rndO = embRand(-100000, 100000) * 0.0001
          , rndT = (embRand(3, 8) * 10).toFixed(2)
          , rndS = (embRand(0, 10000) * 0.0001).toFixed(2);
        embCSS += '.embedim-snow:nth-child(' + i + '){' + 'opacity:' + (embRand(1, 10000) * 0.0001).toFixed(2) + ';' + 'transform:translate(' + rndX.toFixed(2) + 'vw,-10px) scale(' + rndS + ');' + 'animation:fall-' + i + ' ' + embRand(10, 30) + 's -' + embRand(0, 30) + 's linear infinite' + '}' + '@keyframes fall-' + i + '{' + rndT + '%{' + 'transform:translate(' + (rndX + rndO).toFixed(2) + 'vw,' + rndT + 'vh) scale(' + rndS + ')' + '}' + 'to{' + 'transform:translate(' + (rndX + (rndO / 2)).toFixed(2) + 'vw, 105vh) scale(' + rndS + ')' + '}' + '}'
    }
    embedimSnow = document.createElement('div');
    embedimSnow.id = 'embedim--snow';
    embedimSnow.innerHTML = '<style>#embedim--snow{position:fixed;left:0;top:0;bottom:0;width:100vw;height:100vh;overflow:hidden;z-index:9999999;pointer-events:none}' + embCSS + '</style>' + embHTML;
    document.body.appendChild(embedimSnow)
}

// 主页页面滚动
document.addEventListener('DOMContentLoaded', function() {
    const home1 = document.querySelector('.home1');
    const home2 = document.querySelector('.home2');
    const home3 = document.querySelector('.home3');
    let currentHome = home1;

    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const home1Top = home1.offsetTop;
        const home2Top = home2.offsetTop;
        const home3Top = home3.offsetTop;

        if (scrollPosition >= home1Top && scrollPosition < home2Top) {
            currentHome = home1;
        } else if (scrollPosition >= home2Top && scrollPosition < home3Top) {
            currentHome = home2;
        } else if (scrollPosition >= home3Top) {
            currentHome = home3;
        }

        if (currentHome !== home1) {
            home1.style.display = 'none';
        } else {
            home1.style.display = 'block';
        }

        if (currentHome !== home2) {
            home2.style.display = 'none';
        } else {
            home2.style.display = 'block';
        }

        if (currentHome !== home3) {
            home3.style.display = 'none';
        } else {
            home3.style.display = 'block';
        }
    });
});