function activateAccount() {
    var message = ""
    $("#message").html("");
    $('#message').css('display', 'none');
    $('#message').css('background-color', '#e4f0d3');


	if ($('#activateAccount_cardNumber').val() != "") {
        if (IsValidInteger($('#activateAccount_cardNumber').val())) {
            if ($('#activateAccount_mobileno').val() != "") {
                if (IsValidInteger($('#activateAccount_mobileno').val())) {
                    if (($('#activateAccount_mobileno').val().length > 7) && ($('#activateAccount_mobileno').val().length < 15)) {
						$.mobile.loading('show',{theme: 'a',textVisible: 'true' });
						var reqData = { "CardNumber": "" + $('#activateAccount_cardNumber').val() + "", "MobileNumber": "" + $('#activateAccount_mobileno').val() + "" }
						ajaxcall("ValidateActivateAccountForm", reqData, IsActivateAccountResponseSuccess, errorfunctionActivate);
                }
                else {
					showActivateMessage("Please enter a valid mobile number. eg 9711234567890", 0, "activate");
                }
                }
                else {
					showActivateMessage("Please enter a valid mobile number. eg 9711234567890", 0, "activate");
                }
            }
            else {
				showActivateMessage("Please enter your mobile number.", 0, "activate");
            }
        }
        else {
			showActivateMessage("Please enter a valid card number.", 0, "activate");
        }
    }
    else {
		showActivateMessage("Please enter your card number.", 0, "activate");
    }
}


function showActivateMessage(message, isSuccess, page) {
    if (page == "activate") {
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
    else if (page == "verify") {
		$("#verify_message").html(message);
        $('#verify_message').css('display', 'block');
        if (isSuccess == 1) {
            $('#verify_message').css('background-color', 'green');
        }
        else {
            $('#verify_message').css('background-color', 'rgb(226, 110, 110)');
            $("#verify_name").focus();
        }
    }
}

function errorfunctionActivate() {
	$.mobile.loading('hide');
    showActivateMessage("Some error occured, please try after sometime", 0, "activate");
}


function errorfunctionVerify() {
	$.mobile.loading('hide');
    showActivateMessage("Some error occured, please try after sometime", 0, "verify");
}
function IsActivateAccountResponseSuccess(result) {
	$.mobile.loading('hide');
    $('#collapseTwo').css('display', 'none');

    if (result.ApiResponse.StatusCode == 1) {
		showActivateMessage(result.ApiResponse.Details, 1, "activate");
        $('#collapseTwo').css('display', 'block');
        $('#collapseOne').css('display', 'none');

        $("#verify_name").val(result.UserDetail.CustomerName);
        $("#verify_email").val(result.UserDetail.Email);

        localStorage.CardNumber = result.UserDetail.CardNumber;
        localStorage.CustomerName = result.UserDetail.CustomerName;
        localStorage.Email = result.UserDetail.Email;
        localStorage.CountryID = result.UserDetail.CountryID;
        localStorage.LastLoginDate = result.UserDetail.LastLoginDate;
        localStorage.UserId = result.UserDetail.UserId;
    }
    else {
        showActivateMessage(result.ApiResponse.Details, 0, "activate");
        $("#activateAccount_cardNumber").val("");
        $("#activateAccount_mobileno").val("");
    }
}

function verifyAccount() {
    var cardNumber = localStorage.CardNumber;
	var countryId = localStorage.CountryID;
	if ($('#verify_name').val() != "") {
        if (IsValidString($('#verify_name').val())) {
            if ($('#verify_email').val() != "") {
                if (IsValidEmail($('#verify_email').val())) {
                    if ($('#verify_password').val() != "") {
                        if (IsValidString($('#verify_password').val())) {
                            if ($('#verify_retypepassword').val() != "") {
                                if (($('#verify_password').val().length > 5) && ($('#verify_password').val().length < 13)) {
                                    if ($('#verify_password').val() == $('#verify_retypepassword').val()) {
										$.mobile.loading('show',{theme: 'a',textVisible: 'true' });
										//var encrypted = CryptoJS.TripleDES.encrypt($('#verify_password').val() , "3ARZARPA55K3Y"); 
										//alert(encrypted);
										var encryptPassword = EncryptPasswordUsingDES($('#verify_password').val());
										var reqData = { "CardNumber": "" + cardNumber + "", "MobileNumber": "" + $("#activateAccount_mobileno").val() + "", "Email": "" + $("#verify_email").val() + "", "Name": "" + $("#verify_name").val() + "", "Password": "" + encryptPassword + "", "CountryId": +countryId }
										ajaxcall("UpdateUserDetailAndActivateAccount", reqData, IsVerifyResponseSuccess, errorfunctionVerify);
		
                                    }
                                    else
										showActivateMessage("The entered passwords does not match.", 0, "verify");
                                }
                                else
									showActivateMessage("Password must have 6 to 12 characters long.", 0, "verify");
                            }
                            else
								showActivateMessage("Please retype your password.", 0, "verify");
                        }
                        else
							showActivateMessage("Please enter a valid password.", 0, "verify");
                    }
                    else
						showActivateMessage("Please enter your password.", 0, "verify");
                }
                else
					showActivateMessage("Please enter a valid email address.", 0, "verify");
            }
            else
				showActivateMessage("Please enter your email address.", 0, "verify");
        }
        else
			showActivateMessage("Please enter a valid name.", 0, "verify");
    }
    else
		showActivateMessage("Please enter your name.", 0, "verify");
}

function IsVerifyResponseSuccess(result) { 
	$.mobile.loading('hide');
    if (result.ApiResponse.StatusCode == 1) {
        //alert(result.ApiResponse.Details);

        localStorage.CardNumber = result.UserDetail.CardNumber;
        localStorage.CustomerName = result.UserDetail.CustomerName;
        localStorage.Email = result.UserDetail.Email;
        localStorage.CountryID = result.UserDetail.CountryID;
        localStorage.LastLoginDate = result.UserDetail.LastLoginDate;
        localStorage.UserId = result.UserDetail.UserId;
    
        localStorage.RedeemablePoints = result.UserPointDetail.RedeemablePoints;
        localStorage.RedeemedPoints = result.UserPointDetail.RedeemedPoints;
        localStorage.TotalPoints = result.UserPointDetail.TotalPoints;

		//Save Gift Details in local storage
		localStorage.GiftStatus = result.EligibleGift.Status;
		if(localStorage.GiftStatus == "Success")
		{
			localStorage.GiftImageURL = result.EligibleGift.GiftImageUrl;
			localStorage.GiftName = result.EligibleGift.GiftName;
		}
		
        window.location = "pointDetails.html";
    }
    else {
        showActivateMessage(result.ApiResponse.Details, 0, "verify");
    }
}


