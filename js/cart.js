window.onload = function () {
    deleteFuc();
};
function deleteFuc() {
    var deleteBtns = document.querySelectorAll(".delete_box");
    var jdWin = document.querySelector(".jd_win");
    var jdWinBox = jdWin.querySelector(".jd_win_box");
    var cancelBtn = jdWinBox.querySelector(".cancel");
    var up = null;
    for (var i = 0; i < deleteBtns.length; i++) {
        deleteBtns[i].onclick = function () {
            jdWin.style.display = 'block';
            jdWinBox.className = 'jd_win_box myBounceInDown';
            up = this.querySelector(".delete_box_up");
            up.style.webkitTransformOrigin = "left bottom";
            up.style.transformOrigin = "left bottom";

            up.style.webkitTransform = "rotate(-30deg)";
            up.style.transform = "rotate(-30deg)";
        };

    }
    cancelBtn.onclick = function () {
        jdWin.style.display = 'none';
        if (up) {
            up.style.webkitTransform = "none";
            up.style.transform = "none";
        }
    }
}