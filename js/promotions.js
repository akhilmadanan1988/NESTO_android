$(document).ready(function () {
    showProfileLink();
    fillCountry();
    onPromotionsLoad(localStorage.CountryID);
});
function onPromotionsLoad(CountryId) {

    var reqData = { "CountryId": CountryId }
    ajaxcall("GetPromotionData", reqData, IsGetPromotionDataResponseSuccess, errorfunction);

}


function showProfileLink() {

    if (localStorage.CardNumber.trim() == "") {
        // myButton1
        $('#myButton1').hide();
    }
    else {
        $('#myButton1').show();
    }

}
Storage.prototype.getArray = function (key) {
    return JSON.parse(this.getItem(key))
}
function fillCountry() {

    var ServiceAvailableCountres = window.localStorage.getArray("ServiceAvailableCountres");

    if (ServiceAvailableCountres != "") {

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


        $("#select-choice-1-button span").text(CountryName);
    }
    else {
        showMessage(result.ApiResponse.Details, 0);
    }
}


//var defaultSelected = false;
//var nowSelected = true;
$("#select-choice-1").change(function () {
    onPromotionsLoad(this.value);
    //alert(this.value);
    //alert("Handler for .change() called.");
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
    //    alert("Some error occured, please try after sometime");
}

function IsGetPromotionDataResponseSuccess(result) {

    $('#divSeasonalPromotions').find('.ui-collapsible-content').empty();
    $('#divSpecialCampaigns').find('.ui-collapsible-content').empty();
    $('#divWeekEndGrabs').find('.ui-collapsible-content').empty();

    if (result.ApiResponse.StatusCode == 1) {
        var data;
        var isSeasonalPromotion = 0, isSpecialCampaigns = 0, isWeekEndGrabs = 0;
        $.each(result.PromotionDetailsList, function (index, value) {
            //  alert(value.PromotionCategory.toLowerCase());
            // alert(value.PromotionThumbnail);
            // alert(value.PromotionId);
            if (value.PromotionCategory.toLowerCase() == "seasonal promotion") {
                isSeasonalPromotion = 1;
                var data = "<div class='col-md-12 promotionArea promotionProductDetail' ><table class='table tableListing tableContent' style='margin: 13px 0;'>"
                data = data.concat("<tbody><tr>");
                data = data.concat("<td width='45%'><a href=gallery.html?PromotionId=" + value.PromotionId + " data-transition='slide'><img src=" + value.PromotionThumbnail + " width='240' class='acordionProduct' /></a></td>");
                data = data.concat("<td class='productProDetail'><h4>" + value.PromotionName + "</h4><h5>" + value.PromotionAvailableStores + "</h5><small>From " + value.PromotionTimePeriod + " </small></td>");
                data = data.concat("</tr> </tbody>");
                data = data.concat("</table></div>");

                $('#divSeasonalPromotions').find('.ui-collapsible-content').append(data);

                // $('#hedSeasonalPromotions').addClass('ui-collapsible-heading');

            }
            else if (value.PromotionCategory.toLowerCase() == "special campaigns") {
                isSpecialCampaigns = 1;
                var data = "<div class='col-md-12 promotionArea promotionProductDetail' ><table class='table tableListing tableContent' style='margin: 13px 0;'>"
                data = data.concat("<tbody><tr>");
                data = data.concat("<td width='45%'><a href=gallery.html?PromotionId=" + value.PromotionId + " data-transition='slide'><img src=" + value.PromotionThumbnail + " width='240' class='acordionProduct' /></a></td>");
                data = data.concat("<td class='productProDetail'><h4>" + value.PromotionName + "</h4><h5>" + value.PromotionAvailableStores + "</h5><small>From " + value.PromotionTimePeriod + " </small></td>");
                data = data.concat("</tr> </tbody>");
                data = data.concat("</table></div>");

                $('#divSpecialCampaigns').find('.ui-collapsible-content').append(data);
            }
            else if (value.PromotionCategory.toLowerCase() == "week end grabs") {
                isWeekEndGrabs = 1;

                var data = "<div class='col-md-12 promotionArea promotionProductDetail' ><table class='table tableListing tableContent' style='margin: 13px 0;'>"
                data = data.concat("<tbody><tr>");
                data = data.concat("<td width='45%'><a href=gallery.html?PromotionId=" + value.PromotionId + " data-transition='slide'><img src=" + value.PromotionThumbnail + " width='240' class='acordionProduct' /></a></td>");
                data = data.concat("<td class='productProDetail'><h4>" + value.PromotionName + "</h4><h5>" + value.PromotionAvailableStores + "</h5><small>From " + value.PromotionTimePeriod + " </small></td>");
                data = data.concat("</tr> </tbody>");
                data = data.concat("</table></div>");

                $('#divWeekEndGrabs').find('.ui-collapsible-content').append(data);
            }

        });

        if (isSeasonalPromotion == 0) {
            $('#divSeasonalPromotions').find('.ui-collapsible-content').append("No seasonal promotions available now.");
        }
        if (isSpecialCampaigns == 0) {
            $('#divSpecialCampaigns').find('.ui-collapsible-content').append("No special promotions available now.");
        }
        if (isWeekEndGrabs == 0) {
            $('#divWeekEndGrabs').find('.ui-collapsible-content').append("No weekend promotions available now.");
        }

    }
    else {
        if (result.ApiResponse.Details == "No data found.") {
            $('#divSeasonalPromotions').find('.ui-collapsible-content').append("No seasonal promotions available now.");
            $('#divSpecialCampaigns').find('.ui-collapsible-content').append("No special promotions available now.");
            $('#divWeekEndGrabs').find('.ui-collapsible-content').append("No weekend promotions available now.");
        }
        else {
            showMessage(result.ApiResponse.Details, 0);
        }
    }
}

/*Profile page functionalities Ends*/
