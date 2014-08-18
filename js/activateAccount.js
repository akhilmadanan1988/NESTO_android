var cardNumber, countryId;
document.addEventListener("backbutton", function (e) {
    showHomePage('activateaccount');
}, false);

function activateAccount() {
    var message = ""
    $("div#message").html("");
    $('div#message').css('display', 'none');
    $('div#message').css('background-color', '#e4f0d3');

   
    if ($('#activateAccount_cardNumber').val() != "") {
        if (IsValidInteger($('#activateAccount_cardNumber').val())) {
            if ($('#activateAccount_cardNumber').val().length <= 25) {
                if ($('#activateAccount_mobileno').val() != "") {
                    if (IsValidMobileNumber($('#activateAccount_mobileno').val())) {
                        if (($('#activateAccount_mobileno').val().length >= 9) && ($('#activateAccount_mobileno').val().length <= 15)) {
                            $.mobile.loading('show', { theme: 'a', textVisible: 'true' });
                            var reqData = { "CardNumber": "" + $('#activateAccount_cardNumber').val() + "", "MobileNumber": "" + $('#activateAccount_mobileno').val() + "" }
                            ajaxcall("ValidateActivateAccountForm", reqData, IsActivateAccountResponseSuccess, errorfunctionActivate);
                        }
                        else {
                            showActivateMessage("Please enter a valid mobile number.", 0, "activate");
                            $("#activateAccount_mobileno").focus();
                        }
                    }
                    else {
                        showActivateMessage("Please enter a valid mobile number.", 0, "activate");
                        $("#activateAccount_mobileno").focus();
                    }
                }
                else {
                    showActivateMessage("Please enter your mobile number.", 0, "activate");
                    $("#activateAccount_mobileno").focus();
                }
            }
            else {
              
                showActivateMessage("Please enter card number less than 25 digits", 0, "activate");               
                $("activateAccount_cardNumber").focus();
            }
        }
        else {
            showActivateMessage("Please enter a valid card number.", 0, "activate");
            $("#activateAccount_cardNumber").focus();
        }
    }
    else {
        showActivateMessage("Please enter your card number.", 0, "activate");
        $("#activateAccount_cardNumber").focus();
    }
}


function showActivateMessage(message, isSuccess, page) {
    if (page == "activate") {
        $("div#message").html(message);
        $('div#message').css('display', 'block');
        if (isSuccess == 1) {
            $('div#message').css('background-color', 'green');
        }
        else {
            $('div#message').css('background-color', 'rgb(226, 110, 110)');
            //    $("#forgetPwd_cardNumber").focus();
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
            //  $("#verify_name").focus();
        }
    }
}

function errorfunctionActivate() {
    $.mobile.loading('hide');
    showActivateMessage("Some error occured, please try after sometime", 0, "activate");
    $("#activateAccount_cardNumber").focus();
}


function errorfunctionVerify() {
    $.mobile.loading('hide');
    showActivateMessage("Some error occured, please try after sometime", 0, "verify");
    $("#verify_name").focus();
}
//var cardNumber ,countryId ;
function IsActivateAccountResponseSuccess(result) {
    $.mobile.loading('hide');
    $('#collapseTwo').css('display', 'none');

    if (result.ApiResponse.StatusCode == 1) {
        showActivateMessage(result.ApiResponse.Details, 1, "activate");
        $('#collapseTwo').css('display', 'block');
        $('#collapseOne').css('display', 'none');

        $("#verify_name").val(result.UserDetail.CustomerName);
        $("#verify_email").val(result.UserDetail.Email);
        $("#verify_password").focus();

        //localStorage.CardNumber = result.UserDetail.CardNumber;
        //localStorage.CustomerName = result.UserDetail.CustomerName;
        //localStorage.Email = result.UserDetail.Email;
        //localStorage.CountryID = result.UserDetail.CountryID;
        //localStorage.LastLoginDate = result.UserDetail.LastLoginDate;
        //localStorage.UserId = result.UserDetail.UserId;

        cardNumber = result.UserDetail.CardNumber;
        countryId = result.UserDetail.CountryID;
    }
    else {
        showActivateMessage(result.ApiResponse.Details, 0, "activate");
        //$("#activateAccount_cardNumber").val("");
        //$("#activateAccount_mobileno").val("");
        $("#activateAccount_cardNumber").focus();

    }
}

function verifyAccount() {
    //var cardNumber = localStorage.CardNumber;
    //var countryId = localStorage.CountryID;
   
    if ($('#verify_name').val() != "") {
        if (IsValidString($('#verify_name').val())) {
            if ($('#verify_email').val() != "") {
                if (IsValidEmail($('#verify_email').val())) {
                    if ($('#verify_email').val().length <= 75) {
                        if ($('#verify_password').val() != "") {
                            if (IsValidString($('#verify_password').val())) {
                                if ($('#verify_retypepassword').val() != "") {
                                    if (($('#verify_password').val().length > 5) && ($('#verify_password').val().length < 13)) {
                                        if ($('#verify_password').val() == $('#verify_retypepassword').val()) {
                                            $.mobile.loading('show', { theme: 'a', textVisible: 'true' });
                                            //var encrypted = CryptoJS.TripleDES.encrypt($('#verify_password').val() , "3ARZARPA55K3Y"); 
                                            //alert(encrypted);
                                            var encryptPassword = EncryptPasswordUsingDES($('#verify_password').val());
                                            var reqData = { "CardNumber": "" + cardNumber + "", "MobileNumber": "" + $("#activateAccount_mobileno").val() + "", "Email": "" + $("#verify_email").val() + "", "Name": "" + $("#verify_name").val() + "", "Password": "" + encryptPassword + "", "CountryId": +countryId }
                                            ajaxcall("UpdateUserDetailAndActivateAccount", reqData, IsVerifyResponseSuccess, errorfunctionVerify);

                                        }
                                        else {
                                            showActivateMessage("The entered passwords does not match.", 0, "verify");
                                            $("#verify_password").focus();
                                        }
                                    }
                                    else {
                                        showActivateMessage("Password must have 6 to 12 characters long.", 0, "verify");
                                        $("#verify_password").focus();
                                    }
                                }
                                else {
                                    showActivateMessage("Please retype your password.", 0, "verify");
                                    $("#verify_retypepassword").focus();
                                }
                            }
                            else {
                                showActivateMessage("Please enter a valid password.", 0, "verify");
                                $("#verify_password").focus();
                            }
                        }
                        else {
                            showActivateMessage("Please enter your password.", 0, "verify");
                            $("#verify_password").focus();
                        }
                    }
                    else {
                        showMessage("Please enter email address less than 75 characters", 0);
                        $("txtCardNumber").focus();
                    }
                }
                else {
                    showActivateMessage("Please enter a valid email address.", 0, "verify");
                    $("#verify_email").focus();
                }
            }
            else {
                showActivateMessage("Please enter your email address.", 0, "verify");
                $("#verify_email").focus();
            }
        }
        else {
            showActivateMessage("Please enter a valid name.", 0, "verify");
            $("#verify_name").focus();
        }
    }
    else {
        showActivateMessage("Please enter your name.", 0, "verify");
        $("#verify_name").focus();
    }
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
        if (localStorage.GiftStatus == "Success") {
            localStorage.GiftImageURL = result.EligibleGift.GiftImageUrl;
            localStorage.GiftName = result.EligibleGift.GiftName;
        }

        window.location = "pointDetails.html";
    }
    else {
        showActivateMessage(result.ApiResponse.Details, 0, "verify");
        $("#verify_name").focus();

    }
}

function hideLabel() {
    $('#LoginMessage').css('display', 'none');
}

