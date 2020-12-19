window.addEventListener('load', function () {
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    /* 鼠标经过显示隐藏左右按钮 */
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timers);
    })
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timers = setInterval(function () {
            //手动调用点击事件
            arrow_r.click();
        }, 2000)
    })
    /* 动态生成小圆圈 */
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for (i = 0; i < ul.children.length; i++) {
        //创建一个li
        var li = document.createElement('li');
        //记录当前小圆圈的索引号，通过自定义函数
        li.setAttribute('index', i);
        //把li插入到ol里
        ol.appendChild(li);
        //小圆圈点击事件 派他思想 直接在生成小圆圈的同时绑定事件
        li.addEventListener('click', function () {
            //清除所有li的current类名
            for (i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            //留下点击的li 设置类名
            this.className = 'current';
            /* 点击小圆圈 移动图片 */
            //移动ul 距离为小圆圈的索引号乘图片宽度 注意是负值
            index = this.getAttribute('index');
            animate(ul, -index * focus.offsetWidth);
            num = index;
            circle = index;
        })
    }
    //将ol中的第一个孩子设置class类名
    ol.children[0].className = 'current';
    /* 克隆第一张图片放到ul的最后 */
    var clone = ul.children[0].cloneNode(true);
    ul.appendChild(clone)
    /* 点击右侧按钮，图片滚动一张 */
    var num = 0;
    var circle = 0;
    var flag = true;
    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false;
            //如果走到最后一张图片，ul快速恢复到left = 0
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focus.offsetWidth, function () {
                flag = true;
            })
            /* 点击右侧按钮 小圆圈一起变化 */
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            //先清除小圆圈的current类名
            for (i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            ol.children[circle].className = 'current';
        }
    })
    /* 点击左侧按钮，图片滚动一张 */
    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false;
            //如果走到最后一张图片，ul快速恢复到left = 0
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focus.offsetWidth + 'px';    //left属性要加上px
            }
            num--;
            animate(ul, -num * focus.offsetWidth, function () {
                flag = true;
            })
            /* 点击左侧按钮 小圆圈一起变化 */
            circle--;
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            //先清除小圆圈的current类名
            for (i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            ol.children[circle].className = 'current';
        }
    })
    /* 自动播放轮播图 */
    var timers = setInterval(function () {
        //手动调用点击事件
        arrow_r.click();
    }, 2000)
})