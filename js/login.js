$(document).ready(function () {
	$('#imgPromotionImage1').attr('src', localStorage.PromotionImage1)
    $('#imgPromotionImage2').attr('src', localStorage.PromotionImage2)
    
});
function login()
{
	if ($('#txtCardNumber').val() != "") {
        if (IsValidInteger($('#txtCardNumber').val())) {
            if ($('#txtPassword').val() != "") {
                if (($('#txtPassword').val().length > 5) && ($('#txtPassword').val().length < 13)) {
					$.mobile.loading('show',{theme: 'a',textVisible: 'true' });
					var encryptPassword =EncryptPassword($('#txtPassword').val());
					//alert(encryptPassword);
					var reqData = {"CardNumber":""+ $('#txtCardNumber').val() +"","DeviceId":"Android","Password":""+ encryptPassword + ""}
					ajaxcall("AuthenticateUserAndFetchPointDetails",reqData,IsLoginResponseSuccess,errorfunction);
                }
                else {
                    $('#LoginMessage').html("Password must have 6 to 12 characters long.").show();
                }
            }
            else {
                $('#LoginMessage').html("Please enter the password.").show();
            }
        }
        else {
            $('#LoginMessage').html("Please enter a valid card number.").show();
        }
    }
    else {
        $('#LoginMessage').html("Please enter your card number.").show();
    }
}

function errorfunction()
{
$.mobile.loading('hide');
$('#LoginMessage').html("Some error occurred.").show();
}

function IsLoginResponseSuccess(result)
{   
	$.mobile.loading('hide');
	if (result.ApiResponse.StatusCode == 1){
		
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
		
		

		//Save Gift Details in local storage
		localStorage.GiftStatus = result.EligibleGift.Status;


	    //TODO: Need to remove if the data is loaded propely
		localStorage.UserId = 3;
		localStorage.DeviceId = "DeviceId6";
		localStorage.version = "V1.0.0";
		
		if(localStorage.GiftStatus == "Success")
		{
			localStorage.GiftImageURL = result.EligibleGift.GiftImageUrl;
			localStorage.GiftName = result.EligibleGift.GiftName;
		}
		
		
		//Clear All fields
		$('#txtPassword').val("");
		$('#txtCardNumber').val("");
		$('#LoginMessage').css('display', 'none');
		
		//var db = window.openDatabase("nesto", "1.0", "Nesto DB", 1000000);
		//db.transaction(populateDB, errorCB, successCB);

		//TODO: Update UserId to DB
		//
		
		//Navigation by Back key should be avoided		
		window.location="pointDetails.html";
	}
	else
	{
		$('#LoginMessage').html(result.ApiResponse.Details).show();
	}
}

//
function populateDB(tx) {
    tx.executeSql('DROP TABLE IF EXISTS LoginDetails');
    tx.executeSql('CREATE TABLE IF NOT EXISTS LoginDetails (id unique, key,value)');
    tx.executeSql('INSERT INTO LoginDetails (id, data,key,value) VALUES (1, "CardNumber","'+localStorage.CardNumber +'")');
    tx.executeSql('INSERT INTO LoginDetails (id, data,key,value) VALUES (2, "CustomerName","' + localStorage.CustomerName + '")');
    tx.executeSql('INSERT INTO LoginDetails (id, data,key,value) VALUES (3, "Email","' + localStorage.Email + '")');
    tx.executeSql('INSERT INTO LoginDetails (id, data,key,value) VALUES (4, "CountryID","' + localStorage.CountryID + '")');
}
