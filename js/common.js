window.jd_common={};
jd_common.transitionEnd=function (dom,callback) {
    if(dom&&typeof dom =="object"){
        dom.addEventListener('transitionEnd',function(){
            callback && callback();
        });
        dom.addEventListener('webkitTransitionEnd',function(){
            callback && callback();
        });
    }
}
jd_common.tap=function (dom, callback) {
    if(!dom|| typeof dom != 'object'){
        return false;
    }
    var isMove=false;
    var time=0;
    dom.addEventListener('touchstart',function(){
        time = Date.now();
    });
    dom.addEventListener('touchmove',function(){
        isMove=true;
    });
    window.addEventListener('touchend',function(e){
        if(!isMove && (Date.now()-time)<150 ){
            callback && callback(e);
        }
        isMove = false;
        time = 0;
    });
}
