<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<script src="scripts/main.js"></script>
<script src="scripts/io.js"></script>
<meta charset="ISO-8859-1">
<link rel="stylesheet" type="text/css" href="css/main.css">
<title>Asiakaslista</title>
</head>
<body onload="asetaFocus('hakusana')" onkeydown="tutkiKey(event, 'listaa')">
<table id = "listaus">
	<thead>
	<tr>
	<th colspan="5" class="oikealle"><a id="linkki" href="LisaaAsiakas.jsp">Lisää uusi asiakas</a></th>
	</tr>
		<tr>
			<th>Etunimi</th>
			<th>Sukunimi</th>
			<th>Puhelinnumero</th>
			<th>Sposti</th>
			<th></th>
		</tr>
	</thead>
	<tbody id = "tbody"></tbody>
</table>
<form id="search-form">
		<input type="text" id="hakusana" placeholder="Hae asiakasta">
		<button type="button" id="search-btn" onclick="haeAsiakkaatTietty()">Hae</button>
	</form>
<span id="ilmo"></span>
<script>
haeAsiakkaatTietty();
</script>
</body>
</html>