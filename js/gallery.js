$(document).ready(function () {
    onGalleryLoad();
});
function onGalleryLoad() {

    var PromotionId = getUrlVars()["PromotionId"];
    var reqData = { "PromotionId": PromotionId }
    ajaxcall("GetPromotionDetails", reqData, IsGetPromotionDetailsResponseSuccess, errorfunction);
}

function showMessage(message, isSuccess) {

    $("#message").html(message);
    $('#message').css('display', 'block');
    if (isSuccess == 1) {
        $('#message').css('background-color', 'green');
    }
    else {
        $('#message').css('background-color', 'rgb(226, 110, 110)');
        $("#forgetPwd_cardNumber").focus();
    }
}

function errorfunction() {
    alert("Some error occured, please try after sometime");
}

function IsGetPromotionDetailsResponseSuccess(result) {
    if (result.ApiResponse.StatusCode == 1) {
        $.each(result.PromotionFileDetails, function (index, value) {
            $("ul#ulImages").append("<li><a href=" + value.PromotionFileUrl + "> <img src=" + value.PromotionFileUrl + " alt=PromotionImage" + index + "/></a></li>");
        });
		//process the created div and convert it to an image gallery
		TouchNSwipe.init();
    }
    else {

        alert(result.ApiResponse.Details, 0);

    }
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
