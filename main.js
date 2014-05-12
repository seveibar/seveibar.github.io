
var graph_size = 650;
var bar_height = 150;
var num_bars = 5;
var bar_padding = 50;
var tween_rate = 6; // Lower is faster
var bar_sensitivity = 4;

var center_page_x;
var bar_width = ((graph_size- bar_padding * (num_bars - 1)) / num_bars);
var bar_percentages = [];
var bar_desired_percentages = [];

var canvas,context;

var init = function(){
    canvas = document.getElementById("canvas");
    canvas.width = graph_size;
    canvas.height = bar_height;
    context = canvas.getContext("2d");
    center_page_x = window.innerWidth/2;

    for (var i = 0;i < num_bars;i++){
        bar_percentages.push(.1);
        bar_desired_percentages.push(.1);
    }
    initDom();
    initEvents();
    render();
};

function initDom(){
    $(canvas).css({"display":"block"});
    $(canvas).offset({
        top:$("#container").offset().top + $("#container").height() - canvas.height - 20,
        left:$("#links").offset().left
    });
}

function initEvents(){
    window.addEventListener("mousemove", function(e){
        var mx = e.pageX - $(canvas).offset().left;
        var my = e.pageY - $(canvas).offset().top;
        var perx = (mx / graph_size);
        var pery = (my > -100 && my < bar_height + 30) ? 1 : 0;
        for (var i = 0; i < num_bars;i++){
            var my_per = (i * bar_width + bar_width/2 + bar_padding * i) / graph_size;
            var dist = Math.abs(perx - my_per);
            if (dist < 1/num_bars/2){
                bar_desired_percentages[i] = .1 + .9 * pery;
            }else{
                bar_desired_percentages[i] = .1 + (Math.pow((1 - dist),bar_sensitivity))*pery;
            }
        }
    });

    $(window).resize(initDom);

    setInterval(function(){
        updateBars();
        render();
    },1000/60);
}

function updateBars(){
    for (var i = 0;i < num_bars;i++){
        bar_percentages[i] -= (bar_percentages[i] - bar_desired_percentages[i])/tween_rate;
    }
}

function render(){
    context.clearRect(0,0,graph_size,graph_size);
    render_bars(context);
}

function render_bars(context){
    for (var i = 0;i < num_bars; i++){
        context.fillStyle = "#000";
        context.fillRect(i * bar_width + i * bar_padding, bar_height * (1 - bar_percentages[i]), bar_width, bar_height * bar_percentages[i]);
    }
}
window.onload = init;
