window.addEventListener("load", function () {
  var preview_img = document.querySelector(".preview_img");
  var mask = document.querySelector(".mask");
  var big = document.querySelector(".big");
  //1.鼠标经过显示和隐藏
  preview_img.addEventListener("mouseover", function () {
    mask.style.display = "block";
    big.style.display = "block";
  });
  preview_img.addEventListener("mouseout", function () {
    mask.style.display = "none";
    big.style.display = "none";
  });
  //2.鼠标移动时，让黄色盒子跟随
  preview_img.addEventListener("mouseover", function (e) {
    /* 计算鼠标在盒子内的坐标 */
    var x = e.pageX - this.offsetLeft;
    var y = e.pageY - this.offsetTop;
    /* 得到鼠标在盒子中的坐标 */
    var maskX = x - mask.offsetWidth / 2;
    var maskY = y - mask.offsetHeight / 2;
    /* 如果maskX小于0，则让他停在0 */
    var maskMax = preview_img.offsetWidth - mask.offsetWidth;
    if (maskX <= 0) {
      maskX = 0;
    } else if (maskX >= maskMax) {
      maskX = maskMax;
    }
    if (maskY <= 0) {
      maskY = 0;
    } else if (maskY >= maskMax) {
      maskY = maskMax;
    }
    mask.style.left = maskX + "px";
    mask.style.top = maskY - 1 + "px";
    //3.大图片的移动距离 = 遮挡层移动距离 * 大图片最大移动距离 / 遮挡层最大移动距离
    var bigImg = document.querySelector(".bigImg");
    var bigMax = bigImg.offsetWidth - big.offsetWidth;
    var bigX = (maskX * bigMax) / maskMax;
    var bigY = (maskY * bigMax) / maskMax;
    bigImg.style.left = -bigX + "px";
    bigImg.style.top = -bigY + "px";
  });
});


/* 页面刷新后还是显示当前位置 */
if (document.cookie.match(/scrollTop=([^;]+)(;|$)/) != null) {
  var arr = document.cookie.match(/scrollTop=([^;]+)(;|$)/); //cookies中不为空，则读取滚动条位置
  document.documentElement.scrollTop = parseInt(arr[1]);
  document.body.scrollTop = parseInt(arr[1]);
}

var scrollPos;
if (typeof window.pageYOffset != "undefined") {
  scrollPos = window.pageYOffset;
} else if (
  typeof document.compatMode != "undefined" &&
  document.compatMode != "BackCompat"
) {
  scrollPos = document.documentElement.scrollTop;
} else if (typeof document.body != "undefined") {
  scrollPos = document.body.scrollTop;
}
document.cookie = "scrollTop=" + scrollPos; //存储滚动条位置到cookies中
