<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<script src="scripts/main.js"></script>
<script src="scripts/io.js"></script>
<link rel="stylesheet" type="text/css" href="css/main.css">
<meta charset="ISO-8859-1">
<title>Lisää uusi asiakas</title>
</head>
<body onload="asetaFocus('etunimi')" onkeydown="tutkiKey(event, 'lisaa')">
<form name="lomake">
	<table>
		<thead>	
			<tr>
				<th colspan="5" class="oikealle"><a id="linkki" href="ListaaAsiakkaat.jsp">Takaisin listaukseen</a></th>
			</tr>		
			<tr>
				<th>Etunimi</th>
				<th>Sukunimi</th>
				<th>Puhelinnumero</th>
				<th>Sposti</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><input type="text" name="etunimi" id="etunimi" /></td>
				<td><input type="text" name="sukunimi" id="sukunimi" /></td>
				<td><input type="text" name="puhelin" id="puhelin" /></td>
				<td><input type="text" name="sposti" id="sposti" /></td> 
				<td><input type="button" value="Lisää" onclick="tutkiJaLisaa()" /></td>
			</tr>
		</tbody>
	</table>
</form>
<p id="ilmo"></p>
</body>
</html>