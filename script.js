var img = new Image();
var url = new URL(location.href);
var sizearg = url.searchParams.get("size");
var numsquares = 4;
if (sizearg){
	numsquares = sizearg*sizearg;
}
var squaresLine = Math.sqrt(numsquares);
img.src = "https://source.unsplash.com/random/" + squaresLine * 100 + "x" + squaresLine * 100;
var i = 0;
var div = Array(numsquares);
var randorder = Array(numsquares);
var x = 0;
var y = 0;
var xp = 0;
var yp = 0;
var z = 10;
var order = '';
var initialpos = $('#toppuzzle').position();
var originalposx = Array(numsquares);
var originalposy = Array(numsquares);
var arrayrandoms = Array(numsquares);
while (i < numsquares) {
    var random = -10;
    divoutside = document.createElement("div");
    divoutside.id = "divoutside" + i;
    divoutside.className = "classoutside";
    divoutside.style.backgroundImage = 'url(' + img.src + ')';
    backxy(i);
    divoutside.style.backgroundPosition = x + '% ' + y + '% ';
    while (arrayrandoms.includes(random) || random == -10) {
        random = randomf();
    }
    arrayrandoms.push(random);
    z = random;
    posxy(z);
    divoutside.style.left = xp + initialpos.left + 20 + 'px';
    divoutside.style.top = yp + initialpos.top + 20 + 'px';
    //save original position into a variable
    originalposx[i] = xp + initialpos.left + 20 + 'px';
    originalposy[i] = yp + initialpos.top + 20 + 'px';
    document.getElementById("toppuzzle").appendChild(divoutside);
    $("#divoutside" + i).draggable({
        stack: "div",
        distance: 0
    });
    //destination
    divdest = document.createElement("div");
    divdest.id = "divdest" + i;
    divdest.className = "classdest";
    i++;
    document.getElementById("divdestination").appendChild(divdest);
}
//origin
$("#toppuzzle").css({
    "width": 100 * squaresLine + (2 * squaresLine) + "px",
    "height": 100 * squaresLine + (2 * squaresLine) + "px"
});
//destination size
$("#divdestination").css({
    "width": 100 * squaresLine + (2 * squaresLine) + "px",
    "height": 100 * squaresLine + (2 * squaresLine) + "px"
});
//button size
$("#newone").css({
    "width": 100 * squaresLine + (2 * squaresLine) - 20 + "px",
});

function randomf() {
    var randomg = Math.floor(Math.random() * numsquares);
    return randomg;
}
//detect if dragged is inside
var pos = Array(numsquares);
for (var t = 0; t < numsquares; t++) {
    pos[t] = $('#divdest' + t).position();
}
$(".classoutside").mouseup(function() {
    var post = $(this).position();
    var square = $('#divdestination').position();
    if (post.left + 50 > square.left && post.left + 50 < square.left + 101*squaresLine 
    && post.top + 50 > square.top && post.top + 50 < square.top + 101*squaresLine ) {
        //detect closest square
        var dist = Array(numsquares);
        for (y = 0; y < numsquares; y++) {
            dist[y] = Math.sqrt(Math.abs(((post.left + 50) - (pos[y].left + 50)) 
            * ((post.left + 50) - (pos[y].left + 50)) 
            + ((post.top + 50) - (pos[y].top + 50)) * ((post.top + 50) - (pos[y].top + 50))));
        }
        //goto closest square
        var closer = 0;
        for (y = 0; y < numsquares; y++) {
            if (dist[y] < dist[closer]) {
                closer = y;
            }
        }
        var returnorigen = false;
        $(this).animate({
            'top': pos[closer].top + 'px',
            'left': pos[closer].left + 'px'
        }, 200, function() {});
        $(this).promise().done(function() {
            finish = false;
            for (y = 0; y < numsquares; y++) {
                var finish = true;
                if ($('#divoutside' + y).position().top != $('#divdest' + y).position().top 
                || $('#divoutside' + y).position().left != $('#divdest' + y).position().left) {
                    finish = false;
                }
                if (!finish) {
                    break;
                }
            }
            if (finish) {
                $("#newone").toggle();
                $("#size").toggle();
                
            }
        });
        for (y = 0; y < numsquares; y++) {
            if (pos[closer].top == $('#divoutside' + y).position().top && pos[closer].left 
            == $('#divoutside' + y).position().left) {
                //return origen
                returnorigen = true;
            }
        }
    } else {
        returnorigen = true;
    }
    if (returnorigen) {
        order = $(this).attr('id');
        //substracts the div string without the number
        order = order.substr(10);
        var post = $(this).position();
        $(this).animate({
            'top': originalposy[order],
            'left': originalposx[order]
        }, 200, function() {});
    }
});
$("#newone").click(function() {
	var newlocation=location.protocol+'//'+ window.location.hostname + window.location.pathname+"?size="+$("#quantity").val();    
    window.location.href = newlocation;
});
//position of background
function backxy(i) {
    var initialline = -1;
    var xpositb = -1;
    for (x = 0; x <= i; x++) {
        if (x % squaresLine == 0) {
            initialline++;
            xpositb = -1;
        }
        xpositb++;
    }
    x = 100 / (squaresLine - 1) * xpositb;
    y = 100 / (squaresLine - 1) * initialline;
}

function posxy(i) {
    var initialline = -1;
    var yposit = -1;
    for (x = 0; x <= i; x++) {
        if (x % squaresLine == 0) {
            initialline++;
            var xposit = 0;
            yposit++;
        }
        xp = 102 * xposit;
        yp = 102 * yposit;
        xposit++;
    }
}
	
	

