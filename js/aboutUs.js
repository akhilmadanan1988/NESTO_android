//$(document).on("pagebeforeshow", "#about", function (event) {

//    $.mobile.loading('show', { theme: 'a', textVisible: 'true' });

//});


$(document).ready(function () {
    //$.mobile.loading('show', { theme: 'a', textVisible: 'true' });
    showProfile();
    onLoad();
});

document.addEventListener("backbutton", function (e) {
    showHomePage('about');
}, false);

function onLoad() {
    var countryId = 1;
    //if (localStorage.SettingsCountryID != null && localStorage.SettingsCountryID != "") {
    //    countryId = localStorage.SettingsCountryID;
    //}
    //else {
    //countryId = localStorage.CountryID;
    // }
  
    if (localStorage.CountryID != undefined && localStorage.CountryID != null && localStorage.CountryID.trim() != "") {
        countryId = localStorage.CountryID;
    }
    else {
        countryId = 1;
    }
	
    if (countryId == "") {
        countryId = 1;
    }
    var reqData = { "PageName": "mobile_about", "CountryId": countryId }
    ajaxcall("GetPageContent", reqData, IsGetPageContentResponseSuccess, errorfunction);

}
function showProfile() {
    $("a#myButton1").show();
    if (localStorage.CardNumber == undefined || localStorage.CardNumber.trim() == "") {
        $("a#myButton1").text('Login');
    }
    else {
        $("a#myButton1").text('Profile');
    }
}

function showProfileLink() {

    if (localStorage.CardNumber == undefined || localStorage.CardNumber.trim() == "") {
        $("a#myButton1").attr('href', 'index.html');
        //  $("a#myButton1").text('Login');
    }
    else {
        $("a#myButton1").attr('href', 'profile.html');
        //  $("a#myButton1").text('Profile');
    }

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
    showMessage("Some error occured, please try after sometime", 0);
    //    alert("Some error occured, please try after sometime");
}

function IsGetPageContentResponseSuccess(result) {

    // aboutusContent
    if (result.ApiResponse.StatusCode == 1) {

        $("#aboutusContent").html(result.PageContent);
        $.mobile.loading('hide');
    }
    else {
        showMessage(result.ApiResponse.Details, 0);
        $.mobile.loading('hide');
    }
}

