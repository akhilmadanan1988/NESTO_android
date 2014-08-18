var email_pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
var legalCharacters_pattern = /[a-zA-Z0-9!�$&�@#%=?&quot;().*\+\-,\/;\[\\\]\^_`{|}~ ]+$/;
/*$(document).ready(function () {
    onEditProfileLoad();
});*/

document.addEventListener("backbutton", function(e){
    showHomePage('editprofile');
}, false);

/*Edit Profile page functionalities Begins*/
/*function onEditProfileLoad() {

    $("label#cardnumber").text(localStorage.CardNumber);
    $("input#name").val(localStorage.CustomerName);
    $("input#email").val(localStorage.Email);

}*/


function onSave() {
    var isOk = false;
    var cardNumber = localStorage.CardNumber;

    var name = $("input#name").val();
    var email = $("input#email").val();
    var currentPassword = $("input#currentPassword").val();
    var newPassword = $("input#newPassword").val();
    var retypePassword = $("input#retypePassword").val();
    var chkbxChangePassword = $("input#checkbox").prop('checked');


  //  var checkboxNotifications = $('#checkbox-mini-0').prop('checked');


    if (name.trim() == "") {
        showMessage("Please enter your name", 0);
        $("input#name").focus();
    }
    else if (name.length > 100) {
        showMessage("Please enter name less than 100 characters", 0);
        $("input#name").focus();
    }
    else if (!legalCharacters_pattern.test(name)) {
        showMessage("Illegal characters are not allowed in name", 0);
        $("input#name").focus();
    }
    else if (email == "") {
        showMessage("Please enter your email address", 0);
        $("input#email").focus();
    }
    else if (!email_pattern.test(email)) {
        showMessage("Please enter a valid email address", 0);
        $("input#email").focus();
    }
    else if (!legalCharacters_pattern.test(email)) {
        showMessage("Illegal characters are not allowed in email", 0);
        $("input#email").focus();
    }
    else if (email.length > 75) {
        showMessage("Please enter email less than 75 characters", 0);
        $("input#email").focus();
    }
    else if (chkbxChangePassword == true) {
      
        if (currentPassword == "") {
            showMessage("Please enter your current password", 0);
            $("input#currentPassword").focus();
        }
        else if (currentPassword.length < 6) {
            showMessage("Password must have 6 to 12 characters long", 0);
            $("input#currentPassword").focus();
        }
        else if (currentPassword.length > 15) {
            showMessage("Please enter password less than 15 digits", 0);
            $("input#currentPassword").focus();
        }
        else if (!legalCharacters_pattern.test(currentPassword)) {
            showMessage("Illegal characters are not allowed in password", 0);
            $("input#currentPassword").focus();
        }
        else if (newPassword == "") {
            showMessage("Please enter your new password", 0);
            $("input#newPassword").focus();
        }
        else if (newPassword.length < 6) {
            showMessage("New Password must have 6 to 12 characters long", 0);
            $("input#newPassword").focus();
        }
        else if (newPassword.length > 15) {
            showMessage("Please enter new password less than 15 digits", 0);
            $("input#newPassword").focus();
        }
        else if (!legalCharacters_pattern.test(newPassword)) {
            showMessage("Illegal characters are not allowed in new password", 0);
            $("input#newPassword").focus();
        }
        else if (retypePassword == "") {
            showMessage("Please retype your password", 0);
            $("input#retypePassword").focus();
        }
        else if (newPassword != retypePassword) {
            showMessage("The entered password does not match", 0);
            $("input#newPassword").focus();
        }
        else if (newPassword == currentPassword) {
            showMessage("New password and old password are same", 0);
            $("input#newPassword").focus();
        }
        else if (!legalCharacters_pattern.test(retypePassword)) {
            showMessage("Illegal characters are not allowed in retype password", 0);
            $("input#retypePassword").focus();
        }
       
        else { isOk = true; }
    }
    else {
        isOk = true;
    }

    if (isOk) {
        var reqData;
        var encryptCurrentPassword = "", encryptNewPassword = "";


        if (chkbxChangePassword == true) {         
            if (currentPassword.trim() != "")
                encryptCurrentPassword = EncryptPassword(currentPassword);
            if (newPassword.trim() != "")
                encryptNewPassword = EncryptPasswordUsingDES(newPassword);

        }
       
        reqData = { "CardNumber": "" + cardNumber + "", "Email": "" + email + "", "Name": "" + name + "", "CurrentPassword": "" + encryptCurrentPassword.trim() + "", "NewPassword": "" + encryptNewPassword.trim() + "" }

        ajaxcall("UpdateUserProfile", reqData, IsUpdateUserProfileResponseSuccess, errorfunction);
    }

}

function showMessage(message, isSuccess) {

    $("div#message").html(message);
    $('div#message').css('display', 'block');
    if (isSuccess == 1) {
        $('div#message').css('background-color', 'green');
    }
    else {
        $('div#message').css('background-color', 'rgb(226, 110, 110)');

    }
}

function errorfunction() {
    showMessage("Some error occured, please try after sometime", 0);
    $("input#name").focus();
    //    alert("Some error occured, please try after sometime");
}


function IsUpdateUserProfileResponseSuccess(result) {
    if (result.ApiResponse.StatusCode == 1) {

        localStorage.CustomerName = result.UserDetails.CustomerName;
        localStorage.Email = result.UserDetails.Email;
        sessionStorage.StatusCode = 1;
        window.location = "profile.html";
        //showMessage(result.ApiResponse.Details, 1);
    }
    else {
        showMessage(result.ApiResponse.Details, 0);
        $("input#currentPassword").val("");
        $("input#newPassword").val("");
        $("input#retypePassword").val("");
        $("input#currentPassword").focus();
    }
}
/*Edit Profile page functionalities Ends*/

