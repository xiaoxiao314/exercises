window.onload=function () {
    leftSwipe();
    rightSwipe();
}
function leftSwipe() {
    var parentBox=document.querySelector(".jd_category_left");
    var childBox=parentBox.querySelector("ul");
    var parentHeight=parentBox.offsetHeight;
    var childHeight=childBox.offsetHeight;
    var lis=childBox.querySelectorAll("li");
    var distance = 150;
    var maxPosition = 0;
    var minPosition = parentHeight - childHeight;
    var maxSwipe = maxPosition + distance;
    var minSwipe = minPosition - distance;
    var currentY = 0;
    var addTransition = function(){
        childBox.style.transition = "all 0.3s";
        childBox.style.webkitTransition = "all 0.3s";
    };
    var removeTransition = function(){
        childBox.style.transition = "none";
        childBox.style.webkitTransition = "none";
    }
    var setTranslateY = function(translateY){
        childBox.style.transform = "translateY("+translateY+"px)";
        childBox.style.webkitTransform = "translateY("+translateY+"px)";
    }
    var startY = 0;
    var moveY = 0;
    var distanceY = 0;
    var isMove = false;
    childBox.addEventListener('touchstart',function(e){
        startY = e.touches[0].clientY;
    });
    childBox.addEventListener('touchmove',function(e){
        moveY=e.touches[0].clientY;
        distanceY=moveY-startY;
        removeTransition();
        if((currentY+distanceY)<maxSwipe&&(currentY+distanceY)>minSwipe){
            setTranslateY(currentY+distanceY);
        }
        isMove=true;
    });
    window.addEventListener('touchend',function(e){

        if((currentY+distanceY)>maxPosition){
            currentY=maxPosition;
            addTransition();
            setTranslateY(currentY);
        }else if((currentY+distanceY)<minPosition){
            currentY=minPosition;
            addTransition();
            setTranslateY(currentY);
        }else{
            currentY+=distanceY;
        }
        startY = 0;
        moveY= 0;
        distanceY = 0;
        isMove = false;
    });
    jd_common.tap(childBox,function (e) {
        var tapLi = e.target.parentNode;
        for(var i=0;i<lis.length;i++){
            lis[i].className="";
            lis[i].index=i;
        }
        tapLi.className="now";
        var translateY = - tapLi.index * 50;
        if(translateY > minPosition){
            currentY=translateY;
            addTransition();
            setTranslateY(currentY);
        }else {
            currentY=minPosition;
            addTransition();
            setTranslateY(currentY);
        }
    })
}
function rightSwipe() {
    itcast.iScroll({
        swipeDom:document.querySelector('.jd_category_right'),
        swipeType:'y',
        swipeDistance:100
    });
}