$(document).ready(function () {
    onLoad();
});
function onLoad() {

    var countryId = localStorage.CountryID; 

    //    var reqData = { "CardNumber": "4476929980567801", "Email": "bijin.vs@nlindia.com" }
    var reqData = { "PageName": "mobile_about", "CountryId": countryId }

    ajaxcall("GetPageContent", reqData, IsGetPageContentResponseSuccess, errorfunction);

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
    }
    else {
        showMessage(result.ApiResponse.Details, 0);

    }
}

