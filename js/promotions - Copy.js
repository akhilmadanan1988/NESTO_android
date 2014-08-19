$(document).ready(function () {
    showProfile();
    fillCountry();
    if (localStorage.CountryID.trim() != "" && localStorage.CountryID != null && localStorage.CountryID != undefined) {

        CountryId = localStorage.CountryID;
    }
    else {
        CountryId = 1;
    }
    onPromotionsLoad(CountryId);
});
document.addEventListener("backbutton", function (e) {
    showHomePage('promotions');
}, false);

function onPromotionsLoad(CountryId) {
    if (CountryId != "" && CountryId != null && CountryId != undefined) {
        CountryId = CountryId;
    }
    else {
        CountryId = 1;
    }

    $('#message').css('display', 'none');
    var reqData = { "CountryId": CountryId }
    ajaxcall("GetPromotionData", reqData, IsGetPromotionDataResponseSuccess, errorfunction);

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
Storage.prototype.getArray = function (key) {
    return JSON.parse(this.getItem(key))
}

function fillCountry() {
	var isDropDownFill = false;

    var ServiceAvailableCountry;
    try {
        ServiceAvailableCountry = window.localStorage.getItem("ServiceAvailableCountries");
    }
    catch (ex) {

        ServiceAvailableCountry = window.localStorage.getArray("ServiceAvailableCountries");
    }

    if (ServiceAvailableCountry != null && ServiceAvailableCountry != "") {

        $('#select-choice-1').empty();
        var CountryName = "";
        var isSelected = false;
        var CountryIsExists = false;
        try {
            var response = JSON.parse(ServiceAvailableCountry);

            $.each(response, function (index, value) {
                isSelected = false;
                if (index == 0) {
                    CountryName = value.CountryName;
                    isSelected = true;
                }
                if (value.IsDefault == 1) {
                    CountryName = value.CountryName;
                    isSelected = true;
                }
                if (localStorage.CountryID != undefined && localStorage.CountryID != null && localStorage.CountryID != "") {
                    if (CountryIsExists == false) {
                        if (localStorage.CountryID == value.CountryId) {
                            CountryIsExists = true;
                            isSelected = true;
                        }
                    }
                }

                isDropDownFill = true;
                if (localStorage.CountryID != "" || localStorage.CountryID != null || localStorage.CountryID != undefined) {
                    if (localStorage.CountryID == value.CountryId) {
                        $('#select-choice-1').append(new Option(value.CountryName, value.CountryId, true, isSelected));
                    } else {
                        $('#select-choice-1').append(new Option(value.CountryName, value.CountryId, false, isSelected));
                    }


                } else {

                    if (value.CountryId == 1) {
                        $('#select-choice-1').append(new Option(value.CountryName, value.CountryId, true, isSelected));
                    } else {
                        $('#select-choice-1').append(new Option(value.CountryName, value.CountryId, false, isSelected));

                    }
                }


            });

            if (CountryIsExists == true) {
                if (localStorage.CountryName != null && localStorage.CountryName != "") {
                    CountryName = localStorage.CountryName;
                }
            }

            $("#select-choice-1-button span").text(CountryName);

        }
        catch (ex) {

            isDropDownFill = false;
        }

    }
    else {

        isDropDownFill = false;
    }

    if (isDropDownFill == false) {

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
            $('select#select-choice-1').append(new Option(value.CountryName, value.CountryId));
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


$(document).on('click', "a.promotions", function () {
    localStorage.PromotionName = $(this).attr('title');

});



function IsGetPromotionDataResponseSuccess(result) {

    $('#divSeasonalPromotions').find('.ui-collapsible-content').empty();
    $('#divSpecialCampaigns').find('.ui-collapsible-content').empty();
    $('#divWeekEndGrabs').find('.ui-collapsible-content').empty();

    $('#divSeasonalPromotions').addClass("ui-collapsible-collapsed");
    $('#divSeasonalPromotions').find('.ui-collapsible-heading').addClass("ui-collapsible-heading-collapsed");
    $('#divSeasonalPromotions').find('.ui-collapsible-heading-toggle').removeClass("ui-icon-minus");
    ////$('#divSeasonalPromotions').find('.ui-collapsible-heading-toggle').removeClass("ui-btn-active");
    $('#divSeasonalPromotions').find('.ui-collapsible-heading-toggle').addClass("ui-icon-plus");
    $('#divSeasonalPromotions').find('.ui-collapsible-content').addClass("ui-collapsible-content-collapsed");

    $('#divWeekEndGrabs').addClass("ui-collapsible-collapsed");
    $('#divWeekEndGrabs').find('.ui-collapsible-heading').addClass("ui-collapsible-heading-collapsed");
    $('#divWeekEndGrabs').find('.ui-collapsible-heading-toggle').removeClass("ui-icon-minus");
    // $('#divWeekEndGrabs').find('.ui-collapsible-heading-toggle').removeClass("ui-btn-active");
    $('#divWeekEndGrabs').find('.ui-collapsible-heading-toggle').addClass("ui-icon-plus");
    $('#divWeekEndGrabs').find('.ui-collapsible-content').addClass("ui-collapsible-content-collapsed");

    $('#divSpecialCampaigns').addClass("ui-collapsible-collapsed");
    $('#divSpecialCampaigns').find('.ui-collapsible-heading').addClass("ui-collapsible-heading-collapsed");
    $('#divSpecialCampaigns').find('.ui-collapsible-heading-toggle').removeClass("ui-icon-minus");
    //$('#divSpecialCampaigns').find('.ui-collapsible-heading-toggle').removeClass("ui-btn-active");
    $('#divSpecialCampaigns').find('.ui-collapsible-heading-toggle').addClass("ui-icon-plus");
    $('#divSpecialCampaigns').find('.ui-collapsible-content').addClass("ui-collapsible-content-collapsed");



    if (result.ApiResponse.StatusCode == 1) {
        var data;
        var isSeasonalPromotion = 0, isSpecialCampaigns = 0, isWeekEndGrabs = 0;
        $.each(result.PromotionDetailsList, function (index, value) {

            if (value.PromotionCategory.toLowerCase() == "seasonal promotion") {
                isSeasonalPromotion = 1;
                var data = "<div class='col-md-12 promotionArea promotionProductDetail' ><table class='table tableListing tableContent' style='margin: 13px 0;'>"
                data = data.concat("<tbody><tr>");
                data = data.concat("<td width='30%'><a class='promotions'  href=gallery.html?PromotionId=" + value.PromotionId + " title='" + value.PromotionName + "' data-transition='slide'><img src=" + value.PromotionThumbnail + " width='240' class='acordionProduct' /></a></td>");
                data = data.concat("<td class='productProDetail'><a class='promotions'  href=gallery.html?PromotionId=" + value.PromotionId + " title='" + value.PromotionName + "' data-transition='slide'><h4>" + value.PromotionName + "</h4><h5>" + value.PromotionAvailableStores + "</h5><small>From " + value.PromotionTimePeriod + " </small></a></td>");
                data = data.concat("</tr> </tbody>");
                data = data.concat("</table></div>");

                //$('#divSeasonalPromotions').find('.ui-collapsible-content').append(data);
                //alert(data);
                data = data.replace(/~/g, '<br>');
                $('#divSeasonalPromotions').find('.ui-collapsible-content').html(data);
                // $('#hedSeasonalPromotions').addClass('ui-collapsible-heading');

            }
            else if (value.PromotionCategory.toLowerCase() == "week end grabs") {
                isWeekEndGrabs = 1;

                var data = "<div class='col-md-12 promotionArea promotionProductDetail' ><table class='table tableListing tableContent' style='margin: 13px 0;'>"
                data = data.concat("<tbody><tr>");
                data = data.concat("<td width='30%'><a class='promotions'  href=gallery.html?PromotionId=" + value.PromotionId + " title='" + value.PromotionName + "' data-transition='slide'><img src=" + value.PromotionThumbnail + " width='200' class='acordionProduct' /></a></td>");
                data = data.concat("<td class='productProDetail'><a class='promotions'  href=gallery.html?PromotionId=" + value.PromotionId + " title='" + value.PromotionName + "' data-transition='slide'><h4>" + value.PromotionName + "</h4><h5>" + value.PromotionAvailableStores + "</h5><small>From " + value.PromotionTimePeriod + " </small></a></td>");
                data = data.concat("</tr> </tbody>");
                data = data.concat("</table></div>");
                data = data.replace(/~/g, '<br>');
                $('#divWeekEndGrabs').find('.ui-collapsible-content').html(data);

            }
            else if (value.PromotionCategory.toLowerCase() == "special campaigns") {
                isSpecialCampaigns = 1;
                var data = "<div class='col-md-12 promotionArea promotionProductDetail' ><table class='table tableListing tableContent' style='margin: 13px 0;'>"
                data = data.concat("<tbody><tr>");
                data = data.concat("<td width='30%'><a class='promotions'  href=gallery.html?PromotionId=" + value.PromotionId + " title='" + value.PromotionName + "' data-transition='slide'><img src=" + value.PromotionThumbnail + " width='240' class='acordionProduct' /></a></td>");
                data = data.concat("<td class='productProDetail'><a class='promotions'  href=gallery.html?PromotionId=" + value.PromotionId + " title='" + value.PromotionName + "' data-transition='slide'><h4>" + value.PromotionName + "</h4><h5>" + value.PromotionAvailableStores + "</h5><small>From " + value.PromotionTimePeriod + " </small></a></td>");
                data = data.concat("</tr> </tbody>");
                data = data.concat("</table></div>");
                data = data.replace(/~/g, '<br>');
                $('#divSpecialCampaigns').find('.ui-collapsible-content').html(data);


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




        if (isSeasonalPromotion == 1) {
            $('#divSeasonalPromotions').removeClass("ui-collapsible-collapsed");
            $('#divSeasonalPromotions').find('.ui-collapsible-heading').removeClass("ui-collapsible-heading-collapsed");
            $('#divSeasonalPromotions').find('.ui-collapsible-heading-toggle').addClass("ui-icon-minus");
            // $('#divSeasonalPromotions').find('.ui-collapsible-heading-toggle').addClass("ui-btn-active");
            $('#divSeasonalPromotions').find('.ui-collapsible-heading-toggle').removeClass("ui-icon-plus");
            $('#divSeasonalPromotions').find('.ui-collapsible-content').removeClass("ui-collapsible-content-collapsed");
        } else if (isSeasonalPromotion == 0 && isWeekEndGrabs == 1) {
            $('#divWeekEndGrabs').removeClass("ui-collapsible-collapsed");
            $('#divWeekEndGrabs').find('.ui-collapsible-heading').removeClass("ui-collapsible-heading-collapsed");
            $('#divWeekEndGrabs').find('.ui-collapsible-heading-toggle').addClass("ui-icon-minus");
            //  $('#divWeekEndGrabs').find('.ui-collapsible-heading-toggle').addClass("ui-btn-active");
            $('#divWeekEndGrabs').find('.ui-collapsible-heading-toggle').removeClass("ui-icon-plus");
            $('#divWeekEndGrabs').find('.ui-collapsible-content').removeClass("ui-collapsible-content-collapsed");
        }
        else if (isSeasonalPromotion == 0 && isWeekEndGrabs == 0 && isSpecialCampaigns == 1) {
            $('#divSpecialCampaigns').removeClass("ui-collapsible-collapsed");
            $('#divSpecialCampaigns').find('.ui-collapsible-heading').removeClass("ui-collapsible-heading-collapsed");
            $('#divSpecialCampaigns').find('.ui-collapsible-heading-toggle').addClass("ui-icon-minus");
            //$('#divSpecialCampaigns').find('.ui-collapsible-heading-toggle').addClass("ui-btn-active");
            $('#divSpecialCampaigns').find('.ui-collapsible-heading-toggle').removeClass("ui-icon-plus");
            $('#divSpecialCampaigns').find('.ui-collapsible-content').removeClass("ui-collapsible-content-collapsed");
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
