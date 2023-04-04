var navigasi = function () {
    var rebound = 20;
    var slip, k;
    return {
        buildMenu: function () {
            var m = document.getElementById('header');
            if(!m) return;
            var ul = m.getElementsByTagName("ul")[0];
            m.style.width = ul.offsetWidth+1+"px";
            var items = m.getElementsByTagName("li");
            var a = m.getElementsByTagName("a");
  
            slip = document.createElement("li");
            slip.className = "highlight";
            ul.appendChild(slip);
  
            var url = document.location.href.toLowerCase();
            k = -1;
            var nLength = -1;
            for (var i = 0; i < a.length; i++) {
                if (url.indexOf(a[i].href.toLowerCase()) != -1 && a[i].href.length > nLength) {
                    k = i;
                    nLength = a[i].href.length;
                }
            }
  
            if (k == -1 && /:\/\/(?:www\.)?[^.\/]+?\.[^.\/]+\/?$/.test) {
                for (var i = 0; i < a.length; i++) {
                    if (a[i].getAttribute("maptopuredomain") == "true") {
                        k = i;
                        break;
                    }
                }
                if (k == -1 && a[0].getAttribute("maptopuredomain") != "false")
                    k = 0;
            }
  
            if (k > -1) {
                slip.style.width = items[k].offsetWidth + "px";
                
                navigasi.move(items[k]);  
            }
            else {
                slip.style.visibility = "hidden";
            }
  
            for (var i = 0; i < items.length - 1; i++) {
                items[i].onmouseover = function () {
                    if (k == -1) slip.style.visibility = "visible";
                    if (this.offsetLeft != slip.offsetLeft) {
                        navigasi.move(this);
                    }
                }
            }
  
            m.onmouseover = function () {
                if (slip.t2)
                    slip.t2 = clearTimeout(slip.t2);
            };
  
            m.onmouseout = function () {
                if (k > -1 && items[k].offsetLeft != slip.offsetLeft) {
                    slip.t2 = setTimeout(function () { navigasi.move(items[k]); }, 50);
                }
                if (k == -1) slip.t2 = setTimeout(function () { slip.style.visibility = "hidden"; }, 50);
            };
        },
        move: function (target) {
            clearInterval(slip.timer);
            var direction = (slip.offsetLeft < target.offsetLeft) ? 1 : -1;
            slip.timer = setInterval(function () { navigasi.mv(target, direction); }, 15);
        },
        mv: function (target, direction) {
            if (direction == 1) {
                if (slip.offsetLeft - rebound < target.offsetLeft)
                    this.changePosition(target, 1);
                else {
                    clearInterval(slip.timer);
                    slip.timer = setInterval(function () {
                        navigasi.recoil(target, 1);
                    }, 15);
                }
            }
            else {
                if (slip.offsetLeft + rebound > target.offsetLeft)
                    this.changePosition(target, -1);
                else {
                    clearInterval(slip.timer);
                    slip.timer = setInterval(function () {
                        navigasi.recoil(target, -1);
                    }, 15);
                }
            }
            this.changeWidth(target);
        },
        recoil: function (target, direction) {
            if (direction == -1) {
                if (slip.offsetLeft > target.offsetLeft) {
                    slip.style.left = target.offsetLeft + "px";
                    clearInterval(slip.timer);
                }
                else slip.style.left = slip.offsetLeft + 2 + "px";
            }
            else {
                if (slip.offsetLeft < target.offsetLeft) {
                    slip.style.left = target.offsetLeft + "px";
                    clearInterval(slip.timer);
                }
                else slip.style.left = slip.offsetLeft - 2 + "px";
            }
        },
        changePosition: function (target, direction) {
            if (direction == 1) {
   
                slip.style.left = slip.offsetLeft + Math.ceil(Math.abs(target.offsetLeft - slip.offsetLeft + rebound) / 10) + 1 + "px";
            }
            else {
                
                slip.style.left = slip.offsetLeft - Math.ceil(Math.abs(slip.offsetLeft - target.offsetLeft + rebound) / 10) - 1 + "px";
            }
        },
        changeWidth: function (target) {
            if (slip.offsetWidth != target.offsetWidth) {
                var diff = slip.offsetWidth - target.offsetWidth;
                if (Math.abs(diff) < 4) slip.style.width = target.offsetWidth + "px";
                else slip.style.width = slip.offsetWidth - Math.round(diff / 3) + "px";
            }
        }
    };
  } ();
  
  if (window.addEventListener) {
    window.addEventListener("load", navigasi.buildMenu, false);
  }
  else if (window.attachEvent) {
    window.attachEvent("onload", navigasi.buildMenu);
  }
  else {
    window["onload"] = navigasi.buildMenu;
    }

var text = ["Computer and Network Enginner", "Web Developer", "Photo Editor"];
var counter = 0;
var elem = $("#role");
setInterval(change, 4000);
function change() {
    elem.fadeOut(function(){
        elem.html(text[counter]);
        counter++;
        if(counter >= text.length) { counter = 0; }
        elem.fadeIn();
    });
}

var changeEl = $(".el");
var trimLine = anime.timeline({
  loop: true
});

trimLine
  .add({
    targets: ".el",
    width: [0, 160],
    duration: 800,
    easing: "easeOutQuart",
    delay: 50
  })
  .add({
    targets: ".el",
    width: [160, 160],
    easing: "linear",
    duration: 800
  })
  .add({
    targets: ".el",
    width: [160, 0],
    duration: 800,
    easing: "easeOutQuart",
    delay: 50
  })
  .add({
    targets: ".el",
    width: [0, 0],
    easing: "linear",
    duration: 800
  });

trimLine.update = function(anim) {
  if (anim.currentTime < 2500 && anim.currentTime > 850) {
    changeEl.css({ float: "right", left: "auto", right: "20px" });
  }

  if (anim.currentTime > 2500) {
    changeEl.css({ float: "left", left: "20px", right: "auto" });
  }
};