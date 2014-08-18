  document.addEventListener("deviceready", onDeviceReady, true);

alert("out device ready" + device.platform);

    var pushNotification = "";

     function onDeviceReady() {
	
         alert("on device ready");
         
         pushNotification = window.plugins.pushNotification;
         
         alert(device.platform);
         
         if ( device.platform == 'android' || device.platform == 'Android' )
                    {
                      
                        pushNotification.register(
                            successHandler,
                            errorHandler, {
                                "senderID":"409868959211",
                                "ecb":"onNotificationGCM"
                            });
                        
                    }
            else
                {
                    
                        
                        pushNotification.register(
                            tokenHandler,
                            errorHandler, {
                                "badge":"true",
                                "sound":"true",
                                "alert":"true",
                                "ecb":"onNotificationAPN"
                            });
                }
         
        
        } 


        function successHandler (result) 
            {
                
            alert('result = ' + result);
                
            }

        function errorHandler (error)
            {
            alert('error = ' + error);
             }


//Android push notification handler
  function onNotificationGCM(e) 
    {
        
//   alert(123);
        
        switch( e.event )
            {
              case 'registered':
                    
                    alert(e.regid);
                    
                 var reqData ={"AppType":"2","DeviceId":""+e.regid+"","IPAddress":"","UserId":"0"};
                ajaxcall("UpdateUserDetailsAndFetchDefaultCountry",reqData,IsDeviceRegResponseSuccess,errorfunction);
                    
             case 'message':
                    
                    alert(e.payload.message);
                            
            
                    if ( e.foreground )
                        {
                            
                        }
                    else
                        {
                            
                        }
                    
            }
    }


    function IsDeviceRegResponseSuccess(result)
        {

          alert(result);
            var resMessage = result.ApiResponse.Message;            
           alert(result.ApiResponse.Message);
            if(resMessage == "Success")
                {
                   
                       alert(result.ApiResponse.Message);
                

                }


        }

    function errorfunction()
        {

                alert("error");

        }


// iOS
        function successHandler(result)
        {
//            alert('result = ' + result);
        }
    function tokenHandler (result) 
        {
        // Your iOS push server needs to know the token before it can push to this device
        // here is where you might want to send it the token for later use.
//        alert('device token = ' + result);
            
            var reqData ={"AppType":"1","DeviceId":""+result+"","IPAddress":"","UserId":"0"};
            ajaxcall("UpdateUserDetailsAndFetchDefaultCountry",reqData,IsDeviceRegResponseSuccess,errorfunction);
//            
        }
    function onNotificationAPN (event)
        {
            if ( event.alert )
                {
               
                    //alert(event.alert);
                    
                    // Schedules a local notification to be triggered after 5 seconds
           
            
                }

            if ( event.sound )
			{
//                var snd = new Media(event.sound);
//                snd.play();
			}

            if ( event.badge )
			{
				PushNotification.setApplicationIconbadgenumber(0, function(){}); 
				pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, 1);
			}
        }