var email_pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
var legalCharacters_pattern = /[a-zA-Z0-9!”$&’@#%=?&quot;().*\+\-,\/;\[\\\]\^_`{|}~ ]+$/;

$(document).ready(function () {
    onProfileLoad();
});function onProfileLoad() {


    if (localStorage.CardNumber == "") {
        window.location = "index.html";
    }

    var StatusCode = getUrlVars()["StatusCode"];

    if (StatusCode == 1) {
        showMessage("Profile updated successfully");
    }

     if (localStorage.CardNumber.trim() != '' && localStorage.CustomerName.trim() != '' && localStorage.Email.trim() != '' && localStorage.CustomerName.trim() != '') {

        $("label#cardnumber").text(localStorage.CardNumber);
        $("label#name").text(localStorage.CustomerName);
        $("label#email").text(localStorage.Email);
        $("label#country").text(localStorage.CountryName);
    }
    else {
        //TODO: If there is no content available, call API GetAuthenticatedUserDetails   


        var reqData = { "DeviceId": "" + localStorage.DeviceId + "", "UserId": "" + localStorage.UserId + "", "CountryId": localStorage.CountryId }
        ajaxcall("GetAuthenticatedUserDetails", reqData, IsAuthenticatedUserDetailsResponseSuccess, errorfunction);

    }
}


function logOut() {
    localStorage.CardNumber = "";
    localStorage.CustomerName = "";
    localStorage.Email = "";
    localStorage.CountryID = "";
    localStorage.LastLoginDate = "";
    localStorage.UserId = "";

    localStorage.RedeemablePoints = "";
    localStorage.RedeemedPoints = "";
    localStorage.TotalPoints = "";
    alert(localStorage.UserId);
    //window.location = "index.html";

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
}

function IsAuthenticatedUserDetailsResponseSuccess(result) {
    if (result.ApiResponse.StatusCode == 1) {

		//Save User Id in Local Database
        localStorage.CardNumber = result.UserDetail.CardNumber;
        localStorage.CountryID = result.UserDetail.CountryID;
        localStorage.CustomerName = result.UserDetail.CustomerName;
        localStorage.Email = result.UserDetail.Email;
        localStorage.LastLoginDate = result.UserDetail.LastLoginDate;
        localStorage.UserId = result.UserDetail.UserId;
        localStorage.CountryName = result.UserDetail.CountryName;
        localStorage.RedeemablePoints = result.UserPointDetail.RedeemablePoints;
        localStorage.RedeemedPoints = result.UserPointDetail.RedeemedPoints;
        localStorage.TotalPoints = result.UserPointDetail.TotalPoints;

        $("#cardnumber").text(localStorage.CardNumber);
        $("#name").text(localStorage.CustomerName);
        $("#email").text(localStorage.Email);
        $("#country").text(localStorage.CountryName);
        // showMessage(result.ApiResponse.Details, 1);
    }
    else {
        showMessage(result.ApiResponse.Details, 0);

    }
}

/*Profile page functionalities Ends*/


// Read a page's GET URL variables and return them as an associative array.
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