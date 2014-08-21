$(document).ready(function () {
	//TODO: Check PointDetails section is needed after log out.
	//$('#PointDetails').remove();
    $('#imgPromotionImage1').attr('src', localStorage.PromotionImage1);
    $('#imgPromotionImage2').attr('src', localStorage.PromotionImage2);
	$('.imgPromotionImage1').attr('src', localStorage.PromotionImage1);
    $('.imgPromotionImage2').attr('src', localStorage.PromotionImage2);
	
	$('#txtPassword').val("");
    $('#txtCardNumber').val("");
    $('#LoginMessage').css('display', 'none');
	
});


function login() {
    if ($('#txtCardNumber').val() != "") {
        if (IsValidInteger($('#txtCardNumber').val())) {
            if ($('#txtCardNumber').val().length <= 25) {
                if ($('#txtPassword').val() != "") {
                    if (($('#txtPassword').val().length > 5) && ($('#txtPassword').val().length < 13)) {
						var docHeight = $('#home').height();
						$(".ui-loader").height(docHeight);
                        $.mobile.loading('show', { theme: 'a',text: "",textonly: false, textVisible: false });
                        var encryptPassword = EncryptPassword($('#txtPassword').val());
						localStorage.StorePassword = encryptPassword;
						localStorage.CardNumber = $('#txtCardNumber').val();
                        //alert(encryptPassword);
                        var reqData = { "CardNumber": "" + $('#txtCardNumber').val() + "", "DeviceId": "Android", "Password": "" + encryptPassword + "" }
                        ajaxcall("AuthenticateUserAndFetchPointDetails", reqData, IsLoginResponseSuccess, errorfunction);
                    }
                    else {
                        $('#LoginMessage').html("Password must have 6 to 12 characters long.").show();
                        $("#txtPassword").focus();
                    }
                }
                else {
                    $('#LoginMessage').html("Please enter the password.").show();
                    $("#txtPassword").focus();
                }
            }
            else {
                $('#LoginMessage').html("Please enter card number less than 25 digits.").show();             
                $("txtCardNumber").focus();
            }
        }
        else {
            $('#LoginMessage').html("Please enter a valid card number.").show();
            $("#txtCardNumber").focus();
        }
    }
    else {
        $('#LoginMessage').html("Please enter your card number.").show();
        $("#txtCardNumber").focus();
    }
}

function errorfunction() {
    $.mobile.loading('hide');
    $('#LoginMessage').html("Some error occurred. Please try after sometime.").show();
    $('#txtPassword').val("");
    $('#txtCardNumber').val(localStorage.CardNumber);
    $("#txtCardNumber").focus();
	localStorage.CardNumber = "";
	localStorage.StorePassword = "";
}
Storage.prototype.setArray = function (key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
function IsLoginResponseSuccess(result) {
	var docHeight = $('#home').height();
	$(".ui-loader").height(docHeight);
    $.mobile.loading('show', { theme: 'a',text: "",textonly: false, textVisible: false });
	
    //$.mobile.loading('hide');
	//navigator.splashscreen.hide();
    if (result.ApiResponse.StatusCode == 1) {

        //Save User Id in Local Storage
        localStorage.CardNumber = result.UserDetail.CardNumber;
        localStorage.RedeemablePoints = result.UserPointDetail.RedeemablePoints;
        localStorage.RedeemedPoints = result.UserPointDetail.RedeemedPoints;
        localStorage.TotalPoints = result.UserPointDetail.TotalPoints;
        localStorage.CustomerName = result.UserDetail.CustomerName;
        localStorage.Email = result.UserDetail.Email;
        localStorage.CountryID = result.UserDetail.CountryID;
        localStorage.CountryName = result.UserDetail.CountryName;
        localStorage.UserId = result.UserDetail.UserId;
		
		//Promotion and settings handling
		localStorage.SettingsCountryId = result.UserDetail.CountryID;
		localStorage.SettingsCountryName = result.UserDetail.CountryName;
		localStorage.PromoCountryId = result.UserDetail.CountryID;
		localStorage.PromoCountryName = result.UserDetail.CountryName;
		
		
        //Save Gift Details in local storage
        localStorage.GiftStatus = result.EligibleGift.Status;

		//TODO: Need to remove if the data is loaded propely
        localStorage.DeviceId = "DeviceId6";
        localStorage.version = "V 1.0.0";

        if (localStorage.GiftStatus == "Success") {
            localStorage.GiftImageURL = result.EligibleGift.GiftImageUrl;
            localStorage.GiftName = result.EligibleGift.GiftName;
        }

        //Clear All fields
        //$('#txtPassword').val("");
        //$('#txtCardNumber').val("");
        //$('#LoginMessage').css('display', 'none');

        //var db = window.openDatabase("nesto", "1.0", "Nesto DB", 1000000);
        //db.transaction(populateDB, errorCB, successCB);

        //TODO: Update UserId to DB
        //

        //Navigation by Back key should be avoided	
		navigator.splashscreen.hide();
        //$.mobile.loading('hide');
        window.location = "pointDetails.html";
		//slidePage("pointDetails.html");
    }
    else {
		$.mobile.loading('hide');
        $('#LoginMessage').html(result.ApiResponse.Details).show();
        $('#txtPassword').val("");
        $('#txtCardNumber').val(localStorage.CardNumber);		
        $("#txtCardNumber").focus();
		localStorage.CardNumber = "";
		localStorage.StorePassword = "";
    }
}

//
function populateDB(tx) {
    tx.executeSql('DROP TABLE IF EXISTS LoginDetails');
    tx.executeSql('CREATE TABLE IF NOT EXISTS LoginDetails (id unique, key,value)');
    tx.executeSql('INSERT INTO LoginDetails (id, data,key,value) VALUES (1, "CardNumber","' + localStorage.CardNumber + '")');
    tx.executeSql('INSERT INTO LoginDetails (id, data,key,value) VALUES (2, "CustomerName","' + localStorage.CustomerName + '")');
    tx.executeSql('INSERT INTO LoginDetails (id, data,key,value) VALUES (3, "Email","' + localStorage.Email + '")');
    tx.executeSql('INSERT INTO LoginDetails (id, data,key,value) VALUES (4, "CountryID","' + localStorage.CountryID + '")');
}

function slidePage(pageName)
{
	try{
		$.mobile.changePage(pageName, {
			changeHash: true,  
			transition: 'slide' 
		});
	}
	catch(e){
		window.location = pageName;
	}
}