var email_pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
var legalCharacters_pattern = /[a-zA-Z0-9!”$&’@#%=?&quot;().*\+\-,\/;\[\\\]\^_`{|}~ ]+$/;

$(document).ready(function () {
    showProfile();
    onSettingsLoad();
});

document.addEventListener("backbutton", function (e) {
    showHomePage('settings');
}, false);

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
function onSettingsLoad() {
    var isDropDownFill = false;
    $("#version").text(localStorage.version);
    var ServiceAvailableCountries;
    //&& localStorage.IsDefaultCountry.trim() != ''
    try {
        ServiceAvailableCountries = window.localStorage.getItem("ServiceAvailableCountries");
    }
    catch (ex) {
        ServiceAvailableCountries = window.localStorage.getArray("ServiceAvailableCountries");
    }
    //alert("ServiceAvailableCountries - " + ServiceAvailableCountries);
    //alert("localStorage.AboutURl - " + localStorage.AboutURl);
    //alert("localStorage.TermsURl - " + localStorage.TermsURl);
    //alert("localStorage.IsStatusEnabled - " + localStorage.IsStatusEnabled);


    if (ServiceAvailableCountries != null && ServiceAvailableCountries != "" && localStorage.AboutURl.trim() != '' && localStorage.TermsURl.trim() != '' && localStorage.FAQURl.trim() != '' && localStorage.StoreDetailsURl.trim() != '' && localStorage.SpecialRewardsURl.trim() != '' && localStorage.IsStatusEnabled.trim() != '') {
        $('#select-choice-1').empty();
        var CountryName = "";
        var CountryIsExists = false;
        try {
            var response = JSON.parse(ServiceAvailableCountries);
            $.each(response, function (index, value) {

                if (index == 0) {
                    CountryName = value.CountryName;
                }
                if (value.IsDefault == 1) {
                    CountryName = value.CountryName;
                }

                if (localStorage.CountryID != undefined && localStorage.CountryID != null && localStorage.CountryID != "") {
                    if (CountryIsExists == false) {
                        if (localStorage.CountryID == value.CountryId) {
                            CountryIsExists = true;
                        }
                    }
                }
                else {
                    localStorage.CountryName = ""
                }

                isDropDownFill = true;
                //alert(value.CountryName + " || " + localStorage.CountryName);
                //$('select#select-choice-1').append(new Option(value.CountryName, value.CountryId));
                if (value.CountryName == localStorage.CountryName) {
                    $('select#select-choice-1').append(new Option(value.CountryName, value.CountryId, true));
                    CountryName = value.CountryName;
                }
                else {
                    $('select#select-choice-1').append(new Option(value.CountryName, value.CountryId));
                    if (value.IsDefault == 1) {
                        CountryName = value.CountryName;
                    }
                }
                $("#select-choice-1-button span").text(CountryName);

            });
        }
        catch (ex) {

            isDropDownFill = false;

        }
        if (CountryIsExists == true) {
            if (localStorage.SettingsCountry != null && localStorage.SettingsCountry != "") {
                CountryName = localStorage.SettingsCountry;
            }
        }

        $("select#select-choice-1 option").each(function () {
            if ($(this).text() == localStorage.CountryName) {
                $(this).attr('selected', 'selected');
            }
        });

        //$("#select-choice-1-button span").text(CountryName);
        //if (localStorage.CountryName != undefined && localStorage.CountryName != null && localStorage.CountryName != "") {
        //    $("#select-choice-1-button span").text(localStorage.CountryName);
        //}
        //else {
        //    $("#select-choice-1-button span").text(CountryName);
        //}
        // $('#select-choice-1').text(CountryName);



        //$("#loyalityProgram").attr('href', localStorage.AboutURl.trim());
        //$("#termsnConditions").attr('href', localStorage.TermsURl.trim());
        //$("#faq").attr('href', localStorage.FAQURl.trim());
        //$("#specialRewards").attr('href', localStorage.SpecialRewardsURl.trim());
        //$("#storeLocations").attr('href', localStorage.StoreDetailsURl.trim());




        try {
            if (localStorage.IsStatusEnabled == "true") {

                $('#checkbox-mini-0').prop("checked", true)
            }
            else
                $('#checkbox-mini-0').prop("checked", false)

        }
        catch (ex) {
        }
    }
    else {

        isDropDownFill == false
    }

    if (isDropDownFill == false) {
        var UserId, DeviceId;
        DeviceId = localStorage.DeviceId;

        if (localStorage.UserId == undefined || localStorage.UserId.trim() == "")
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

            if (value.CountryName == localStorage.CountryName) {
                $('select#select-choice-1').append(new Option(value.CountryName, value.CountryId, true));
                CountryName = value.CountryName;
            }
            else {
                $('select#select-choice-1').append(new Option(value.CountryName, value.CountryId));
                if (value.IsDefault == 1) {
                    CountryName = value.CountryName;
                }
            }
            $("#select-choice-1-button span").text(CountryName);
        });
        //TODO: Get the default country from database
        //if (localStorage.CountryName != "")
        //    CountryName = localStorage.DefaultCountryName;

        //if (localStorage.CountryName != undefined && localStorage.CountryName != null && localStorage.CountryName != "") {
        //    $("#select-choice-1-button span").text(localStorage.CountryName);
        //}
        //else {
        //    $("#select-choice-1-button span").text(CountryName);
        //}


        $.each(result.PageDetails, function (index, value) {
            if (value.UniqueName.trim() == "about") {
                //  $("#loyalityProgram").attr('href', value.SeoUrl);
                localStorage.AboutURl = value.SeoUrl
            }
            else if (value.UniqueName == "terms") {
                //  $("#termsnConditions").attr('href', value.SeoUrl);
                localStorage.TermsURl = value.SeoUrl
            }
            else if (value.UniqueName == "faq") {
                // $("#faq").attr('href', value.SeoUrl);
                localStorage.FAQURl = value.SeoUrl
            }
            else if (value.UniqueName == "special") {
                //  $("#specialRewards").attr('href', value.SeoUrl);
                localStorage.SpecialRewardsURl = value.SeoUrl
            }
            else if (value.UniqueName == "Stores") {
                // $("#storeLocations").attr('href', value.SeoUrl);
                localStorage.StoreDetailsURl = value.SeoUrl
            }
        });


        if (result.PushNotificationStatus != null) {
            // alert(result.PushNotificationStatus.IsStatusEnabled);
            try {
                if (localStorage.IsStatusEnabled == "true") {
                    $('#checkbox-mini-0').prop("checked", true)
                }
                else
                    $('#checkbox-mini-0').prop("checked", false)

            }
            catch (ex) {
            }
        }
        else
            $('#checkbox-mini-0').prop("checked", true)

    }
    else {
        showMessage(result.ApiResponse.Details, 0);
    }
}

var Status;
function changeNotification() {
    //  alert($('#checkbox-mini-0').prop('checked'));
    var checkboxNotifications = $('#checkbox-mini-0').prop('checked');
    // alert(checkboxNotifications);
    Status = "On";
    if (checkboxNotifications == true) {
        Status = "On";
    }
    else {
        Status = "Off";
    }

    // alert(checkboxNotifications);
    var DeviceId = localStorage.DeviceId;
    var reqData = { "DeviceId": "" + DeviceId + "", "Status": Status }


    ajaxcall("UpdateNotificationStatus", reqData, IsChangeNotificationResponseSuccess, errorfunction);

}

function IsChangeNotificationResponseSuccess(result) {

    if (result.ApiResponse.StatusCode == 1) {
        var checkboxNotifications = $('#checkbox-mini-0').prop('checked');
        if (checkboxNotifications == true) {
            localStorage.IsStatusEnabled = true;
        }
        else {
            localStorage.IsStatusEnabled = false;
        }
    }
}
$("select#select-choice-1").change(function () { 
    $("select option:selected").each(function () {       
        localStorage.CountryName = $(this).text();
        localStorage.CountryID = $(this).val();

        localStorage.PromoCountryId = $(this).val();
        localStorage.PromoCountryName = $(this).text();


    });  
});


function loyalityProgramOnClick() {
    window.open(localStorage.AboutURl, '_system');
}
function termsnConditionsOnClick() {
    window.open(localStorage.TermsURl, '_system');
}
function faqOnClick() {
    window.open(localStorage.FAQURl, '_system');
}
function specialRewardsOnClick() {
    window.open(localStorage.SpecialRewardsURl, '_system');
}