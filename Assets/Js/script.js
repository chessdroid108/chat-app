$(document).ready(function($) {
    var deviceAgent = navigator.userAgent.toLowerCase();
    var agentID = deviceAgent.match(/(iphone|ipod|ipad)/);
    if (agentID) {
        $("#profilebtn").click(function() {
            if ($('.profile-content').is(":visible")) {
                $('.profile-content').hide()
            } else {
                $('.profile-content').show()
            };
        });

        $(window).on('click touchstart', function(e) {
            if (e.target.id == 'wrapper' || e.target.id == 'users' || e.target.id == '') {
                if ($('.profile-content').is(':visible')) {
                    $('.profile-content').hide();
                }
            }
        });
    };

    $(".imgwrapper").each(function(){
        $(this).click(function(){
            $(this).css({
                "position":"fixed",
                "width":"75%",
                "height":"75%",
                "background-color":theme.color || "orange"
            }).children("img").css({
                "position":"relative",
                "width":"50%",
                "height":"50%",
                "top":"25%",
                "left":"25%"            
            }).parent().children("button").show().css("position","fixed")
        }).append("<button class='closeimg'><img src='Assets/Images/exiticon.png'></img></button>")
    })

    $(".closeimg").click(function(e){
        $(this).parent().css({
            "position":"static",
            "width":"0%",
            "height":"0%"
        }).children("img").css({
            "position":"static",
            "width":"30px",
            "height":"30px",
            "top":"0",
            "left":"0"
        }).parent().children("button").hide();
        e.stopPropagation();   
    }).hide().css({
        "position":"absolute",
        "margin-top":"10px",
        "margin-right":"10px"
        }).children("img").attr("alt","close").css({
            "width":"100%",
            "height":"100%"
        })

    //$(".userdata").each(function(){});

    $('#signout').on('click', function() {
        location.replace('logout.php');
    });

    $("#SendMessage").on("click", function(){
        console.log("Sending your message...");
        $.post("SendMessage.php", {
            message: $("#Message").val(),
            recp: $("#SelectUser").val()
        }).done(data => {
            console.log("Message Successfully Sent");
            console.log(data);
            location.reload();
            
        }).fail(function(){
            var online;
            if (window.navigator.onLine) {
                online = "This is not an internet problem. Try refreshing this page.";
            } else {
                online = "You are offline.";
            }
            alert("Error sending your message. " + online);
        })
    })
});