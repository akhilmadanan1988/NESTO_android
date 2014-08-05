var email_pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
var legalCharacters_pattern = /[a-zA-Z0-9!�$&�@#%=?&quot;().*\+\-,\/;\[\\\]\^_`{|}~ ]+$/;

$(document).ready(function () {
    onSettingsLoad();
});
function onStoreLocationsLoad() {


    localStorage.StoreDetailsURl = "http://www.nestogroup.com/storesanddetails";
    window.open(localStorage.StoreDetailsURl);

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


function onSettingsLoad() {

    var UserId = localStorage.UserId;
    var DeviceId = localStorage.DeviceId;
    var reqData = { "DeviceId": "" + DeviceId + "", "UserId": UserId }

    //TODO: Check for the local DB if contents re available.If no details are foung then call tha API
    ajaxcall("GetSettingsContent", reqData, IsGetSettingsContentResponseSuccess, errorfunction);

}

function IsGetSettingsContentResponseSuccess(result) {

    if (result.ApiResponse.StatusCode == 1) {

        $("#version").text(localStorage.version);

        $('#select-choice-1').empty();
        var CountryName = "";
      
        $.each(result.ServiceAvailableCountries, function (index, value) {
            if (index == 0) {
                CountryName = value.CountryName;
            }

            $('#select-choice-1').append(new Option(value.CountryName, value.CountryId));

        });

        $("#select-choice-1-button span").text(CountryName);
        $.each(result.PageDetails, function (index, value) {
            if (value.PageId == 5) {
                $("#loyalityProgram").attr('href', value.SeoUrl);
            }
            else if (value.PageId == 1) {
                $("#termsnConditions").attr('href', value.SeoUrl);
            }
            else if (value.PageId == 9) {
                $("#faq").attr('href', value.SeoUrl);
            }
            else if (value.PageId == 8) {
                $("#specialRewards").attr('href', value.SeoUrl);
            }
        });
        $("#storeLocations").attr('href', localStorage.StoreDetailsURl);
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

    var DeviceId = localStorage.DeviceId;
    var reqData = { "DeviceId": "" + DeviceId + "", "Status": Status }

    //TODO: Check for the local DB if contents are available.If no details are foung then call tha API
    ajaxcall("UpdateNotificationStatus", reqData, IsChangeNotificationResponseSuccess, errorfunction);

}

function IsChangeNotificationResponseSuccess(result) {
    //alert(result.ApiResponse.StatusCode);
    if (result.ApiResponse.StatusCode == 1) {

    }
    else {
        showMessage(result.ApiResponse.Details, 0);

    }
}