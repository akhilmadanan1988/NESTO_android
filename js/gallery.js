
$(document).ready(function () {
    onGalleryLoad();
});

document.addEventListener("backbutton", function (e) {
    showPromotions();
}, false);

function showPromotions()
{
	try{
		$.mobile.changePage('promotions.html', {
			changeHash: true,  
			transition: "slide" 
		});
	}
	catch(e){
		window.location="promotions.html";
	}
}

function onGalleryLoad() {

    var PromotionId = getUrlVars()["PromotionId"];
    var reqData = { "PromotionId": PromotionId }
    //  addGallery();
    ajaxcall("GetPromotionDetails", reqData, IsGetPromotionDetailsResponseSuccess, errorfunction);
}

function errorfunction() {
    alert("Some error occured, please try after sometime");
}

// Read a page's GET URL variables and return them as an associative array.
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}




// Read a page's GET URL variables and return them as an associative array.
function goPromotions() {
    var CountryId = localStorage.PromoCountryId;
    window.location = "promotions.html";//?CountryId=" + CountryId;
//	$.mobile.changePage('promotions.html', {
//            changeHash: true,  
//            transition: "slide" 
//        });
}

function IsGetPromotionDetailsResponseSuccess(result) {
    if (result.ApiResponse.StatusCode == 1) {
        try {
            var galleryCtr = 0,
         galleryDivs = [];
            var showCaption = (Math.random() < 0.5),
                maxCount = Math.round(3 + (Math.random() * 4)),
                galleryDiv = $("<div id='fullscreen_slider' class='slider' data-elem='slider' style='top: 42px'><div class='sliderBg darkGray'></div>  <div class='slides' data-elem='slides' data-options='adjustHeight:-30; preloaderUrl:assets/preloader.gif; loadIndexOnly:false;loop:false;' id='divImages'></div><div class='thumbsHolder' data-elem='thumbsHolder'><div class='thumbs blackBgAlpha60' data-elem='thumbs' data-options='space:2; setParentVisibility:true; initShow:false; preloaderUrl:assets/preloader.gif' data-show='bottom:0px; position:absolute; display:block' data-hide='bottom:-100%; display:block' ></div></div><div class='captionHolder' data-elem='captionHolder'><div class='caption blackBgAlpha60' data-elem='caption' data-options='initShow:true; setHolderHeight:true;' data-show='top:0%; display:block; autoAlpha:1;' data-hide='top:-60px; display:none; autoAlpha:0; ease:Power4.easeIn'> </div></div><div class='controlHolder'><div class='autoPlayIcon controlPos1' data-elem='autoPlay' data-on='background-position:-25px 0px;' data-off='background-position:0px 0px;'> </div><div class='prevIcon controlPos2' data-elem='prev' data-on='autoAlpha:1; cursor: pointer;' data-off='autoAlpha:0.5; cursor:default'> </div><div class='nextIcon controlPos3' data-elem='next' data-on='autoAlpha:1; cursor: pointer;' data-off='autoAlpha:0.5; cursor:default'> </div><div class='zoomOutIcon controlPos4' data-elem='zoomOut' data-on='autoAlpha:1; cursor: pointer;' data-off='autoAlpha:0.5; cursor:default'> </div><div class='zoomInIcon controlPos5' data-elem='zoomIn' data-on='autoAlpha:1; cursor: pointer;' data-off='autoAlpha:0.5; cursor:default'> </div><div class='thumbsOnIcon controlPos6' data-elem='thumbsToggle' data-on='background-position:-200px 0px;' data-off='background-position:-225px 0px;'></div></div><ul id='ul" + galleryCtr + "' data-elem='items'></ul></div>");

            $("#gallery").append(galleryDiv);

            $.each(result.PromotionFileDetails, function (index, value) {
                //add images to ul
                $("#ul" + galleryCtr).append("<li><a href='" + value.PromotionFileUrl + "'><img src='" + value.PromotionFileUrl + "' alt='PromotionImage " + (index + 1) + "'/></a><div data-elem='imgCaption'><div class='superCaption'>This is <span class='nColor'>image " + (index + 1) + "</span></div></div></li>");
            });

            // add created div
            galleryDivs.push(galleryDiv);
          
            //process the created div and convert it to an image gallery
            TouchNSwipe.init();

            galleryCtr++;
         
        } catch (ex) {
            alert("Some error occured, please try after sometime");
        }
    }
    else {

        alert(result.ApiResponse.Details, 0);

    }
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
