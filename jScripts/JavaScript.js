$(document).ready(documentReady);
function documentReady() {

    //run functions on easing.js and eavesdrop.js for desktop navigation
    $('.top-nav').eavesdrop();
    $('.nav-fixed').eavesdrop();


    $("#mobileNav").click(function () {
        //toggel navbar show
         $("#NavbarFloors").toggle();
    }); 

    $('#NavbarFloors a').click(function(){
        //hide navbar after selecting a floor
        $('#NavbarFloors').fadeOut('fast');
    })
     animationElements();
    
    
    $(window).scroll(function(){
        animationElements();
        getHash ();
    });

};

function gotoCity(){
    //goto the specific div if the user is on mobile or desktop by clicking on "continue scrooling"
    var isMobile = window.matchMedia("only screen and (max-width: 768px)");

    if (isMobile.matches) {
        document.getElementById('city-mobile').scrollIntoView();
    }else{
        document.getElementById('city').scrollIntoView();
    }

}

function animationElements() {
//listener to scroll event on the window
//it will run 2 functions animationElements and getHash
var isiPad = navigator.userAgent.match(/iPad/i) != null;

    if(!isiPad){
        //CSS3 Animation Cheat Sheet
        //function to insert animation class to elements
        $('.animatedLeftElement').each(function(){
            //function for elemts with slideLeft class
        var imagePos = $(this).offset().top;
        var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow+300) {
                $(this).addClass("slideLeft");
            }else {
                $(this).removeClass("slideLeft");
            }
        });

         $('.animatedRightElement').each(function(){
            //function for elemts with slideRight class
        var imagePos = $(this).offset().top;
        var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow+300) {
                $(this).addClass("slideRight");
            }else {
                $(this).removeClass("slideRight");
            }
        });
     }else{
        $('.animatedLeftElement').each(function(){
                //function for elemts with slideLeft class
            var imagePos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
                if (imagePos < topOfWindow+500) {
                    $(this).addClass("slideLeft");
                }else {
                    $(this).removeClass("slideLeft");
                }
        });

         $('.animatedRightElement').each(function(){
            //function for elemts with slideRight class
            var imagePos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow+500) {
                $(this).addClass("slideRight");
            }else {
                $(this).removeClass("slideRight");
            }
        });
     } 
}

function getHash () {
    //mobilefunction - check where the user is and alert the div hash
    var currentHash = "#skyScreen"

        $('.hash').each(function () {
            var top = window.pageYOffset;
            var distance = top - $(this).offset().top;
            var hash = $(this).attr('id');
            var distanceTop =  $(this).offset().top;

            if (distance < 40 && distance > -40 && currentHash != hash) {
                /*alert(hash);*/
                currentHash = hash;

                 $('#NavbarFloors a').each(function () {
                    //adding class "active" to the current hash in the navbar
                    var currLink = $(this);
                    var refElement = $(this).attr("href");
                    var currentHerf = "#"+currentHash
                    if(refElement != currentHerf){
                        currLink.removeClass("active");
                        $("#"+currLink.context.childNodes[1].id).removeClass("active");
                    }
                    else {
                        currLink.addClass("active");
                        $("#"+currLink.context.childNodes[1].id).addClass("active");
                    }
                });
            }
    });
};

var userAnswers = [];
function startQuestionnaire(showDivId, hideDivId) {
    //which qest to show
    if(showDivId == 'questionnaire'){
        $("#" + showDivId).removeClass("displayNone");
        $("#qestOne").removeClass("displayNone")
        $("#" + hideDivId).addClass("displayNone");
        $("#qestFive").addClass("displayNone");
        userAnswers = [];
    }else{
        $("#" + showDivId).removeClass("displayNone");
        $("#" + hideDivId).addClass("displayNone");
    }
}

function checkAnswer(radioGroup, showDivId, hideDivId) {
    //checks the user answer and insert "right" or "wrong" to userAnswers array
    if (($('input[name="' + radioGroup + '"]:checked').val()) !== undefined) {
        $("#errorMessage").addClass("displayNone");
        userAnswers.push(($('input[name="' + radioGroup + '"]:checked').val()));

        if (showDivId !== 'checkSuccess') {
            //checks if the user clicked continue from the last question
            $("#" + showDivId).removeClass("displayNone");
            $("#" + hideDivId).addClass("displayNone");
        } else {
            var allRightAns = true;
            $("#" + hideDivId).addClass("displayNone");

            for (var i = 0; i < userAnswers.length; i++) {
                if (userAnswers[i] !== 'right') {
                    allRightAns = false;
                }
            }

            var screenWidth = document.getElementById("container").clientWidth;

            if (allRightAns) {
                if (screenWidth < 992) {
                    $("#emptyFloor-mobile").removeClass("displayNone");
                    $("#successQuestionnaire-mobile").removeClass("displayNone");
                } else {
                    $("#emptyFloor-desktop").removeClass("displayNone");
                    $("#successQuestionnaire").removeClass("displayNone");
                }
            } else {
                if (screenWidth < 992) {
                    $("#faliledQuestionnaire-mobile").removeClass("displayNone");
                }else{
                    $("#faliledQuestionnaire").removeClass("displayNone");
                }
            }
        }
    } else {
        $("#errorMessage").removeClass("displayNone");
    }
}