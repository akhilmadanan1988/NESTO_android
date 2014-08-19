$(document).ready(function () {
    $('#firstPromotionImage').attr('src', localStorage.PromotionImage1)
    $('#secondPromotionImage').attr('src', localStorage.PromotionImage2)

   
    $('#message').css('display', 'none');
    $("#message").html("");
    $('#message').css('background-color', '#e4f0d3');

});
function forgetPassword() {

    var message = ""

    if ($('#forgetPwd_cardNumber').val() != "") {
        if (IsValidInteger($('#forgetPwd_cardNumber').val())) {
            if ($('#forgetPwd_cardNumber').val().length <= 25) {
                if ($('#forgetPwd_emailId').val() != "") {
                    if (IsValidEmail($('#forgetPwd_emailId').val())) {
                        if ($('#forgetPwd_emailId').val().length <= 75) {
                            $.mobile.loading('show', { theme: 'a', textVisible: 'true' });
                            $('#message').css('display', 'none');
                            var reqData = { "CardNumber": "" + $('#forgetPwd_cardNumber').val() + "", "Email": "" + $('#forgetPwd_emailId').val() + "" }
                            ajaxcall("PasswordRecovery", reqData, IsForgotPasswordResponseSuccess, errorfunctionforPassword);
                        }

                        else {
                            showMessage("Please enter email address less than 75 characters", 0);
                            $("txtCardNumber").focus();
                        }
                    }
                    else {
                        showMessage("Please enter a valid email address.", 0);
                        $("#forgetPwd_emailId").focus();
                    }
                }
                else {
                    showMessage("Please enter your email address.", 0);
                    $("#forgetPwd_emailId").focus();
                }
            }
            else {
                showMessage("Please enter card number less than 25 digits", 0);
                $("txtCardNumber").focus();
            }
        }
        else {
            showMessage("Please enter a valid card number.", 0);
            $("#forgetPwd_cardNumber").focus();
        }
    }
    else {
        showMessage("Please enter your card number.", 0);
        $("#forgetPwd_cardNumber").focus();
    }
}

function showMessage(message, isSuccess) {
    $("#message").html(message);
    $('#message').css('display', 'block');
    if (isSuccess == 1) {
        $('#message').css('background-color', 'green');
    }
    else {
        $('#message').css('background-color', 'rgb(226, 110, 110)');

    }
}

function errorfunctionforPassword() {
    $.mobile.loading('hide');
    showMessage("Some error occurred, please try after sometime", 0);
    $("#forgetPwd_cardNumber").focus();
}

function IsForgotPasswordResponseSuccess(result) {
    $.mobile.loading('hide');
    if (result.ApiResponse.StatusCode == 1) {
        $("#forgetPwd_cardNumber").val("");
        $("#forgetPwd_emailId").val("");
        showMessage(result.ApiResponse.Details, 1);
    }
    else {
        showMessage(result.ApiResponse.Details, 0);
        $("#forgetPwd_cardNumber").focus();
    }
}

function hideLabel() { 
    $('#LoginMessage').css('display', 'none');
    $('#message').css('display', 'none');
}


