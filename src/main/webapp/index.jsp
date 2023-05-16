<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<style type="text/css">

body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

#loginDiv {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
}

form {
    display: flex;
    flex-direction: column;
}

form label {
    font-weight: bold;
    margin-top: 10px;
}

form input[type="text"], form input[type="password"] {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
}

form input[type="button"] {
    margin-top: 20px;
    padding: 10px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

form input[type="button"]:hover {
    background-color: #0056b3;
}</style>
<meta charset="ISO-8859-1">
<script src="scripts/main.js"></script>
<script src="scripts/io.js"></script>
<script src="scripts/login.js"></script>
<link rel="stylesheet" type="text/css" href="css/main.css">
<title>Kirjautuminen asiakaslistaukseen</title>
</head>
<body onload="loginForm.uid.focus();">
<div id="loginDiv">	
	<form name="loginForm">
	<label>&nbsp;</label><span id="ilmo"></span><br>	
	<label>Sähköposti:</label><input type="text" name="uid" id="uid"><br>
	<label>Salasana:</label><input type="password" name="pwd" id="pwd"><br>
	<label>&nbsp;</label><input type="button" value="Kirjaudu" onclick="hashPwd()" ><br>	
	<input type="hidden" name="hashedPwd" id="hashedPwd">	
	</form>
</div>
<script>
if(requestURLParam("unknown")!=null){
	document.getElementById("ilmo").innerHTML="Käyttäjää ei tunneta!";
	setTimeout(function(){ document.getElementById("ilmo").innerHTML=""; }, 3000);
}
</script>
</body>
</html>