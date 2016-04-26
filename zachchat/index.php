<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>

    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    
    <title>Chat</title>
    
    <link rel="stylesheet" href="style.css" type="text/css" />
    
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
    <script type="text/javascript" src="chat.js"></script>


</head>

<body onload="setInterval('chat.update()', 1000)">
    <div id="login" class="login">
        <form id="login-form">
            <div><span>Enter Room: </span><input type="text" name="roomName" id="room"></input></div>
            <div><span>Enter Name: </span><input type="text" name="userName" id="user"></input></div>
            <input type="submit" value="Submit">
        </form>
    </div>

    <div id="page-wrap">
    
        <h2>jQuery/PHP Chat</h2>
        
        <p id="name-area"></p>
        
        <div id="chat-wrap"><div id="chat-area"></div></div>
        
        <form id="send-message-area">
            <p>Your message: </p>
            <textarea id="sendie" maxlength = '100' ></textarea>
        </form>
    
    </div>

</body>

    <script type="text/javascript">
    
        // ask user for name with popup prompt    
        var room = "";
        var name = "";

        $( "#login-form" ).submit(function( event ) {
            room = $("#room").val();
            name = $("#user").val();
            
            // default name is 'Guest'
            if (!name || name === ' ') {
               name = "Guest";  
            }
            
            // strip tags
            name = name.replace(/(<([^>]+)>)/ig,"");
            room = room.replace(/(<([^>]+)>)/ig,"");
            
            // display name on page
            $("#name-area").html("You are: <span>" + name + "</span> in room: <span>" + room + "</span>");
        });
        
        // kick off chat
        var chat =  new Chat();
        $(function() {
        
             chat.getState(); 
             
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
                     
                        chat.send(text, name);  
                        $(this).val("");
                        
                    } else {
                    
                        $(this).val(text.substring(0, maxLength));
                        
                    }   
                    
                    
                  }
             });
            
        });
    </script>
</html>