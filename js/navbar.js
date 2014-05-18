$(document).ready(function(){

    var nav_height;
    var nav_width;
    var title_width;

    var canvas;
    var context;

    var mx,my;

    var max_bar_height; // max bar height
    var bar_values = [];

    var tween_rate = 2;


    $(window).resize(function(){
        init();
    });
    $(window).mousemove(function(e){
        mx = e.pageX;
        my = e.pageY;
    });

    setInterval(render,1000/30);

    function init(){
        nav_height = $("#navbar").height() + $("#navbar").offset().top * 2;
        nav_width = $("#navbar").width();
        title_width = $("#title").width() + 20;

        for (var i = 0; i < $(".navbar-button").length;i ++){
            bar_values.push(0);
        }

        // Size canvas appropriately
        canvas = $("#navbar-canvas")[0];
        context = canvas.getContext("2d");
        canvas.height =  nav_height;
        canvas.width = nav_width;
        $(canvas).css({
            "display" : "block",
            "position": "absolute"
        });
        $(canvas).offset({
            top : 0,
            left : $("#navbar").offset().left
        });

        max_bar_height = nav_height;

        render();
    }

    function render(){
        // Clear everything
        context.clearRect(0,0,canvas.width,canvas.height);

        // Title Box
        context.fillStyle = "#000";
        context.fillRect(0,0,title_width,nav_height);

        // Side bars
        var initial_bar_height = 4;

        var link_elements = $(".navbar-button");
        for (var i = 0;i < link_elements.length;i++){

            var xloc = $(link_elements[i]).offset().left;
            var bar_width = $(link_elements[i]).width();

            var mdif = 0;
            if (Math.abs(mx - (xloc + bar_width/2)) < bar_width/2){
                mdif = nav_height - initial_bar_height;
            }

            var height = initial_bar_height + (my > nav_height ? 0 : mdif);

            bar_values[i] -= (bar_values[i] - height) / tween_rate;

            var actual_height = bar_values[i];

            if (actual_height > nav_height / 2){
                $(link_elements[i]).css({"color":"#fff"});
            }else{
                $(link_elements[i]).css({"color":"#000"});
            }

            context.fillRect(xloc - $("#article-container").offset().left, nav_height - actual_height,bar_width,actual_height);
        }
    }


    init();

});
