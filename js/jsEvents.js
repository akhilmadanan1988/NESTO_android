$(function () {
    var all_pages = '#home,#forgotPassword,#activateAccount,#PointDetails,#ProfilePage, #tabArea,#promotions,#gallery,#settings,#about';

    $(document).off('pageshow', all_pages).on('pageshow', all_pages, function myCallback() {
		document.addEventListener("backbutton", onBackKeyDown, false);
		var _thisid = this.id;
        //alert(_thisid);
		//$.getScript('js/jquery.mobile-1.4.2.min.js');
        $.getScript('js/ajaxCall.js');
        $.getScript('js/tripledes.js');
        $.getScript('js/mode-ecb.js');
        $.getScript('js/md5.js');
        $.getScript('js/pad-zeropadding.js');

        if (_thisid === 'gallery') {           
            $.getScript('js/jquery-1.10.0.min.js', function () {             
//                 $.getScript('js/jquery.mobile-1.4.2.min.js', function () {             
                	$.getScript('js/modernizr.min.js', function () {                  
                    	$.getScript('js/jquery.mousewheel.min.js', function () {                      
                        	$.getScript('js/jquery.hammer.min.js', function () {
                            	$.getScript('js/TweenMax.min.js', function () {
                                	$.getScript('js/TouchNSwipe.min.js', function () {                                  
                                    	$.getScript('js/gallery.js');
                                	});
                            	});
                        	});
                    	});
                	});
//            	});
            });
        }
        if (_thisid === 'home') {
            $.getScript('js/login.js');
            //localStorage.CardNumber = "";
        }
        else if (_thisid === 'forgotPassword') {
            $.getScript('js/forgotPassword.js');
        }
        else if (_thisid === 'activateAccount') {
            $.getScript('js/activateAccount.js');
        }
        else if (_thisid == 'PointDetails') {
            $.getScript('js/PointDetails.js');
        }
        else if (_thisid === 'ProfilePage') {
            $.getScript('js/profile.js');
        }
        else if (_thisid === 'tabArea') {
            $.getScript('js/editProfile.js');
        }
        else if (_thisid === 'about') {
            var docHeight = $('#about').height();
			$(".ui-loader").height(docHeight);
            $.mobile.loading('show', { theme: 'a',text: "",textonly: false, textVisible: false });
            $.getScript('js/aboutUs.js');
        }
        else if (_thisid === 'settings') {
            $.getScript('js/settings.js');
        }
        else if (_thisid === 'promotions') {
            $.getScript('js/promotions.js');
        }
        //else if (_thisid === 'gallery') {
        //    $.getScript('js/gallery.js');
        //}

        //$.getScript('js/profile.js');
        //$.getScript('http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/tripledes.js');

        //$.getScript('js/updateUser.js');

    });

    $('body').off('click', '#checkbox').on('click', '#checkbox', function () {
        if ($('#checkbox').attr("value") == "block") {
            $(".hiddenFields").toggle();
        }
    }).off('click', '#subBut').on('click', '#subBut', function () {
        $('.visibleRow').css("display", "block");
    });
});

document.addEventListener("deviceready", onDeviceReady_Events, false);

// PhoneGap is loaded and it is now safe to make calls PhoneGap methods
function onDeviceReady_Events() {
        // Register the event listener
		checkConnection();
        document.addEventListener("backbutton", onBackKeyDown, false);
 }

function checkConnection() {
            var networkState = navigator.network.connection.type;
            var states = {};
            states[Connection.UNKNOWN] = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI] = 'WiFi connection';
            states[Connection.CELL_2G] = 'Cell 2G connection';
            states[Connection.CELL_3G] = 'Cell 3G connection';
            states[Connection.CELL_4G] = 'Cell 4G connection';
            states[Connection.CELL] = 'Cell generic connection';
            states[Connection.NONE] = 'No network connection';
            if (states[networkState] == 'No network connection'||states[networkState] =='Unknown connection') {
				window.location = "blank.html";
            }
}
		
function onStoreLocationsLoad() {
    window.open(localStorage.StoreDetailsURl, '_system');
}

function EncryptPasswordUsingDES(plaintext) {
    window.text = plaintext;
    window.key = "3ARZARPA55K3Y";
    var useHashing = true;
    if (useHashing) {
        key = CryptoJS.MD5(key).toString();
        var k1 = key.substring(0, 16);
        key = key + k1;
    }
    window.options = {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    };
    window.textWordArray = CryptoJS.enc.Utf8.parse(text);
    window.keyHex = CryptoJS.enc.Hex.parse(key);
    window.encrypted = CryptoJS.TripleDES.encrypt(textWordArray, keyHex, options);
    var encryptedPassword = encrypted.toString();
    return encryptedPassword;
}

function EncryptPassword(pass) {
    var saltReturn = '';
    var salt1 = 'DVDHTHTLNT';

    if (salt1.length >= pass.length) {
        for (i = 0 ; i < salt1.length; i++) {
            if (i > pass.length - 1)
                saltReturn = saltReturn + salt1.charAt(i);
            else
                saltReturn = saltReturn + pass.charAt(i) + salt1.charAt(i);
        }
    }
    else {
        for (i = 0 ; i < pass.length; i++) {
            if (i > salt1.length - 1)
                saltReturn = saltReturn + pass.charAt(i);
            else
                saltReturn = saltReturn + pass.charAt(i) + salt1.charAt(i);
        }
    }
    return SHA256(saltReturn);
}

function SHA256(s) {
    var chrsz = 8;
    var hexcase = 0;

    function safe_add(x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }

    function S(X, n) { return (X >>> n) | (X << (32 - n)); }
    function R(X, n) { return (X >>> n); }
    function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }
    function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }
    function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }
    function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }
    function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }
    function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }

    function core_sha256(m, l) {
        var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4,
							0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7,
							0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC,
							0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967,
							0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85,
							0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
							0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3,
							0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);

        var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
        var W = new Array(64);
        var a, b, c, d, e, f, g, h, i, j;
        var T1, T2;

        m[l >> 5] |= 0x80 << (24 - l % 32);
        m[((l + 64 >> 9) << 4) + 15] = l;

        for (var i = 0; i < m.length; i += 16) {
            a = HASH[0];
            b = HASH[1];
            c = HASH[2];
            d = HASH[3];
            e = HASH[4];
            f = HASH[5];
            g = HASH[6];
            h = HASH[7];

            for (var j = 0; j < 64; j++) {
                if (j < 16) W[j] = m[j + i];
                else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);

                T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
                T2 = safe_add(Sigma0256(a), Maj(a, b, c));

                h = g;
                g = f;
                f = e;
                e = safe_add(d, T1);
                d = c;
                c = b;
                b = a;
                a = safe_add(T1, T2);
            }

            HASH[0] = safe_add(a, HASH[0]);
            HASH[1] = safe_add(b, HASH[1]);
            HASH[2] = safe_add(c, HASH[2]);
            HASH[3] = safe_add(d, HASH[3]);
            HASH[4] = safe_add(e, HASH[4]);
            HASH[5] = safe_add(f, HASH[5]);
            HASH[6] = safe_add(g, HASH[6]);
            HASH[7] = safe_add(h, HASH[7]);
        }
        return HASH;
    }

    function str2binb(str) {
        var bin = Array();
        var mask = (1 << chrsz) - 1;
        for (var i = 0; i < str.length * chrsz; i += chrsz) {
            bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i % 32);
        }
        return bin;
    }

    function Utf8Encode(string) {
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }

        return utftext;
    }

    function binb2hex(binarray) {
        var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var str = "";
        for (var i = 0; i < binarray.length * 4; i++) {
            str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) +
            hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
        }
        return str;
    }

    s = Utf8Encode(s);
    var encrypt = binb2hex(core_sha256(str2binb(s), s.length * chrsz));
    return encrypt;
}

function IsValidInteger(input) {
    if (input.trim() != '') {
        if (input.match(/(^[0-9]*$)/i) != null) {
            return true;
        }
        else
            return false;
    }
    else {
        return false;
    }
}

function IsValidMobileNumber(input) {
    if (input.trim() != '') {
        if (input.match(/(^[1-9][0-9]*$)/i) != null) {
            return true;
        }
        else
            return false;
    }
    else {
        return false;
    }
}

function IsValidString(input) {
    if (input.trim() != '') {
        var letters = /^[0-9a-zA-Z!@. &_-]+$/;
        if (input.match(letters) != null) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

function IsValidEmail(mail) {
    if (mail.trim() != '') {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true)
        }
        return (false)
    }
    else {
        return false;
    }
}

function CheckUserExistanceAndNavigate() {
	
    if (localStorage.CardNumber != undefined && localStorage.CardNumber != null && localStorage.CardNumber != "") {
        try{
			$.mobile.changePage('pointDetails.html', {
            	changeHash: true,  
            	transition: 'slide' 
        	});
		}
		catch(e){
			window.location = "pointDetails.html";
		}
    }
    else {
		try{
			$.mobile.changePage('index.html', {
            	changeHash: true,  
            	transition: 'slide' 
        	});
		}
		catch(e){
			window.location = "index.html";
		}
    }
}

function NavigateToPromotion() {
    //window.location = "promotions.html";
	$.mobile.changePage('promotions.html', {
            changeHash: true,  
            transition: 'slide' 
        });
}

function showHomePage(page) {
    if (page == "editprofile") {
        window.location = "profile.html";
    }
    else {
        if (localStorage != null) {
            if (localStorage.CardNumber != undefined && localStorage.CardNumber != '') {
                window.location = "pointDetails.html";
            }
            else {
                window.location = "index.html";
            }
        }
        else {
            window.location = "index.html";
        }
    }
}

function onBackKeyDown() {

            var current_url = $.mobile.activePage[0].baseURI;
            //
	(current_url);

            if (current_url == "file:///android_asset/www/index.html"||current_url == "file:///android_asset/www/pointDetails.html") {
                // alert(current_url);

                navigator.notification.confirm
                          ('Are you sure ?',
                            onConfirmQuit,
                            'Quit?',
                            'OK,Cancel'
                              );
            }
            else {

                navigator.app.backHistory();
            }
}

function onConfirmQuit(button) {
    if (button == "1") {
                navigator.app.exitApp();
            }
}

function connectionRetry() {
			var networkState = navigator.network.connection.type;
            var states = {};
            states[Connection.UNKNOWN] = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI] = 'WiFi connection';
            states[Connection.CELL_2G] = 'Cell 2G connection';
            states[Connection.CELL_3G] = 'Cell 3G connection';
            states[Connection.CELL_4G] = 'Cell 4G connection';
            states[Connection.CELL] = 'Cell generic connection';
            states[Connection.NONE] = 'No network connection';
			if (states[networkState] == 'No network connection'||states[networkState] =='Unknown connection') {
				window.location = "blank.html";
            }else{
				window.location = "index.html";
			}
}
//Event to handle device back button
/*document.addEventListener("backbutton", onBackKeyDown, false);
function onBackKeyDown() {
			var nav = window.navigator;
            if( this.phonegapNavigationEnabled &&
                nav &&
                nav.app &&
                nav.app.backHistory ){
                nav.app.backHistory();
            } else {
                window.history.back();
            }
}*/