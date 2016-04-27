<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>

    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    
    <title>Zach Chat</title>
    
    <link rel="stylesheet" href="style.css" type="text/css" />
    
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>


</head>

<body onload="setInterval('chat.update()', 1000)">
    <div id="login-panel" class="login">
        <div class="login-content">
            <form id="login-form">
                <div><input type="text" name="roomName" id="room" placeholder="Room"></input></div>
                <div><input type="text" name="userName" id="user" placeholder="Alias"></input></div>
                <button id="sbtn">Join</button>
            </form>
        </div>
    </div>

    <div id="page-wrap">
        
        <div id="chat-wrap"><div id="chat-area"></div></div>
        
        <form id="send-message-area">
            <textarea id="sendie" maxlength = '114' placeholder="Type Here... Press Enter"></textarea>
        </form>
    
    </div>

</body>

    <script type="text/javascript" src="chat.js"></script>
    <script type="text/javascript">

    // start
    var chat =  new Chat();

    $(function() {

        if(sessionStorage.username && sessionStorage.roomname){
            $("#login-panel").hide(450);
        }

        chat.getState();
        chat.sendIntro(sessionStorage.username, sessionStorage.roomname);
         
         // watch textarea for key presses
        $("#sendie").keydown(function(event) {  
         
            var key = event.which;  
       
            //all keys including return.  
            if (key >= 33) {
               
                var maxLength = $(this).attr("maxlength");  
                var length = this.value.length;  
                 
                // don't allow new content if length is maxed out
                if (length >= maxLength) {  
                    event.preventDefault();  
                }  
            }
        });

        // watch textarea for release of key press
         $('#sendie').keyup(function(e) {   
                             
            if (e.keyCode == 13) { 
              
                var text = $(this).val();
                var maxLength = $(this).attr("maxlength");  
                var length = text.length; 
                 
                // send 
                if (length <= maxLength + 1) { 
                 
                    chat.send(text, sessionStorage.username, sessionStorage.roomname);
                    $(this).val("");
                    
                } else {
                
                    $(this).val(text.substring(0, maxLength));
                    
                }
            }
         });
        
    });

    $( "#sbtn" ).click(function() {
        var username = $("#user").val();
        var roomname = $("#room").val();
        
        // default name is 'Guest'
        if (!username || username === '') {
           username = "Guest";  
        }

        // default room is 'Default'
        if (!roomname || roomname === '') {
           roomname = "Default";
        }
        
        // strip tags
        sessionStorage.username = username.replace(/(<([^>]+)>)/ig,"");
        sessionStorage.roomname = roomname.replace(/(<([^>]+)>)/ig,"");
    });

    </script>
</html>