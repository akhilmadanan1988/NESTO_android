var email_pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
var legalCharacters_pattern = /[a-zA-Z0-9!”$&’@#%=?&quot;().*\+\-,\/;\[\\\]\^_`{|}~ ]+$/;

$(document).ready(function () {
    onSettingsLoad();
});


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

Storage.prototype.getArray = function (key) {
    return JSON.parse(this.getItem(key))
}
function onSettingsLoad() {


    $("#version").text(localStorage.version);
    //&& localStorage.IsDefaultCountry.trim() != ''
    var ServiceAvailableCountres = window.localStorage.getArray("ServiceAvailableCountres");
  
    if (ServiceAvailableCountres !="" && localStorage.AboutURl.trim() != '' && localStorage.TermsURl.trim() != '' && localStorage.FAQURl.trim() != '' && localStorage.StoreDetailsURl.trim() != '' && localStorage.SpecialRewardsURl.trim() != '' && localStorage.IsStatusEnabled.trim() != '') {
       
        $('#select-choice-1').empty();
        var CountryName = "";

        $.each(ServiceAvailableCountres, function (index, value) {
            if (index == 0) {
                CountryName = value.CountryName;
            }
            if (value.IsDefault == 1) {
                CountryName = value.CountryName;
            }
            $('#select-choice-1').append(new Option(value.CountryName, value.CountryId));

        });

        $("#select-choice-1-button span").text(CountryName);

        $("#loyalityProgram").attr('href', localStorage.AboutURl.trim());
        $("#termsnConditions").attr('href', localStorage.TermsURl.trim());
        $("#faq").attr('href', localStorage.FAQURl.trim());
        $("#specialRewards").attr('href', localStorage.SpecialRewardsURl.trim());
        $("#storeLocations").attr('href', localStorage.StoreDetailsURl.trim());
   
        $("#checkbox").attr("data-cacheval", localStorage.IsStatusEnabled)

    }
    else {
   
        var UserId, DeviceId;
        DeviceId = localStorage.DeviceId;

        if (localStorage.UserId.trim() == "")
            UserId = 0;
        else
            UserId = localStorage.UserId;
        var reqData = { "DeviceId": "" + DeviceId + "", "UserId": "" + UserId + "" }   
 
        ajaxcall("GetSettingsContent", reqData, IsGetSettingsContentResponseSuccess, errorfunction);
    }

}

function IsGetSettingsContentResponseSuccess(result) {
   
    if (result.ApiResponse.StatusCode == 1) {

        $('#select-choice-1').empty();
        var CountryName = "";

        $.each(result.ServiceAvailableCountries, function (index, value) {
            if (index == 0) {
                CountryName = value.CountryName;
            }
            if (value.IsDefault == 1) {
                CountryName = value.CountryName;
            }
            $('#select-choice-1').append(new Option(value.CountryName, value.CountryId));

        });
        //TODO: Get the default country from database
        //if (localStorage.CountryName != "")
        //    CountryName = localStorage.DefaultCountryName;

        $("#select-choice-1-button span").text(CountryName);


        $.each(result.PageDetails, function (index, value) {
            if (value.UniqueName.trim() == "about") {
                $("#loyalityProgram").attr('href', value.SeoUrl);
                localStorage.AboutURl = value.SeoUrl
            }
            else if (value.UniqueName == "terms") {
                $("#termsnConditions").attr('href', value.SeoUrl);
                localStorage.TermsURl = value.SeoUrl
            }
            else if (value.UniqueName == "faq") {
                $("#faq").attr('href', value.SeoUrl);
                localStorage.FAQURl = value.SeoUrl
            }
            else if (value.UniqueName == "special") {
                $("#specialRewards").attr('href', value.SeoUrl);
                localStorage.SpecialRewardsURl = value.SeoUrl
            }
            else if (value.UniqueName == "Stores") {
                $("#storeLocations").attr('href', value.SeoUrl);
                localStorage.StoreDetailsURl = value.SeoUrl
            }
        });
      
        if (result.PushNotificationStatus != null) {
            // alert(result.PushNotificationStatus.IsStatusEnabled);
            $("#checkbox").attr("data-cacheval", result.PushNotificationStatus.IsStatusEnabled)
        }
       
    }
    else {
        showMessage(result.ApiResponse.Details, 0);
    }
}


function changeNotification() {
 
    var checkboxNotifications = $("#checkbox").attr("data-cacheval");
    var Status = "On";
    if (checkboxNotifications == "false") {
        Status = "Off";
    }
    // alert(checkboxNotifications);
    var DeviceId = localStorage.DeviceId;
    var reqData = { "DeviceId": "" + DeviceId + "", "Status": Status }

   
    ajaxcall("UpdateNotificationStatus", reqData, IsChangeNotificationResponseSuccess, errorfunction);

}

function IsChangeNotificationResponseSuccess(result) {
   
    if (result.ApiResponse.StatusCode == 1) {
        // showMessage(result.ApiResponse.Details, 1);
    }
    else {
        showMessage(result.ApiResponse.Details, 0);
    }
}