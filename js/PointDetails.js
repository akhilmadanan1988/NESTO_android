function fillPointDetails() {
    //alert(localStorage.CardNumber);
    $('#lblTotalPoints').text(localStorage.TotalPoints);
    $('#lblRedeemedPoints').text(localStorage.RedeemedPoints);
    $('#lblCurrentBalance').text(localStorage.TotalPoints - localStorage.RedeemedPoints);
    $('#lblRedeemableBalance').text(localStorage.RedeemablePoints);

    if (localStorage.GiftStatus == "Success") {
        $('#lblEligibleGiftName').text(localStorage.GiftName);
        $("#giftImage").attr("src", localStorage.GiftImageURL);
    }
    else {
        $('#lblEligibleGiftName').text(localStorage.GiftStatus);
    }
}

