window.onload = function () {
    search();
    banner();
    downTime();
};
function search() {
    var banner = document.querySelector(".jd_banner");
    var search = document.querySelector(".jd_header_box");
    var height = banner.offsetHeight;
    window.onscroll = function () {
        var top = document.body.scrollTop;
        var opacity = 0;
        if (height > top) {
            opacity = 0.85 * (top / height);
        }
        else {
            opacity = .85;
        }
        search.style.background = ' rgba(201,21,35,' + opacity + ')';
    }
}
function banner() {
    var banner = document.querySelector(".jd_banner");
    var width = banner.offsetWidth;
    var imgBox = banner.querySelector("ul:first-child");
    var pointBox = banner.querySelector("ul:last-child");
    var points = pointBox.querySelectorAll("li");
    var addTransition = function () {
        imgBox.style.transition = "all 0.3s";
        imgBox.style.webkitTransition = "all 0.3s";

    }
    var addTransform = function (translateX) {
        imgBox.style.transform = "translateX(" + translateX + "px)";
        imgBox.style.webkitTransform = "translateX(" + translateX + "px)";
    }
    var removeTransition = function () {
        imgBox.style.transition = "none";
        imgBox.style.webkitTransition = "none";
    }
    var index = 1;
    var timer = setInterval(function () {
        index++;
        addTransition();
        addTransform(-index * width);
    }, 1000);
    jd_common.transitionEnd(imgBox, function () {
        if (index >= 9) {
            index = 1;
            removeTransition()
            addTransform(-index * width);
        }
        else if (index <= 0) {
            index = 8;
            removeTransition()
            addTransform(-index * width);
        }
        setPoint();
    });
    function setPoint() {
        for (var i = 0; i < points.length; i++) {
            points[i].className = "";
        }
        points[index - 1].className = "now";
    }

    var startX = 0;
    var moveX = 0;
    var endX = 0;
    var isMove = false;
    imgBox.addEventListener("touchstart", function (e) {
        clearInterval(timer);
        startX = e.touches[0].clientX;
    });

    imgBox.addEventListener("touchmove", function (e) {
        moveX = e.touches[0].clientX;
        endX = moveX - startX;
        removeTransition();
        addTransform(-index * width + endX);
        isMove = true;
    });
    window.addEventListener("touchend", function (e) {
        if (isMove && Math.abs(endX) > width / 3) {
            if (endX > 0) {
                index--;
            }
            else {
                index++;
            }
            addTransition();
            addTransform(-index * width);
        } else {
            addTransition();
            addTransform(-index * width);
        }
        startX = 0;
        moveX = 0;
        endX = 0;
        isMove = false;
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            addTransition();
            addTransform(-index * width);
        }, 1000);
    });
}
function downTime() {
    var time = 4 * 60 * 60;
    var timer = null;
    var skTime = document.querySelector(".sk_time");
    var spans = skTime.querySelectorAll("span");
    timer = setInterval(function () {
        time--;
        if (time < 0) {
            clearInterval(timer);
            return false;
        }
        var h = Math.floor(time / 3600);
        var m = Math.floor(time % 3600 / 60);
        var s = time % 60;

        spans[0].innerHTML = Math.floor(h / 10);
        spans[1].innerHTML = h % 10;

        spans[3].innerHTML = Math.floor(m / 10);
        spans[4].innerHTML = m % 10;

        spans[6].innerHTML = Math.floor(s / 10);
        spans[7].innerHTML = s % 10;
    }, 1000);

}