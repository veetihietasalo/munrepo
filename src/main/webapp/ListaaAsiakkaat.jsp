<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Asiakaslista</title>

<style>
		table {
			border-collapse: collapse;
			width: 100%;
			max-width: 800px;
			margin: auto;
			font-family: Arial, sans-serif;
			font-size: 14px;
		}
		
		th {
			background-color: #eee;
			padding: 10px;
			font-weight: bold;
			text-align: left;
		}
		
		td {
			border: 1px solid #ccc;
			padding: 10px;
		}
		
		tr:nth-child(even) {
			background-color: #f2f2f2;
		}
		
		#ilmo {
			display: block;
			margin: 10px auto;
			width: 100%;
			max-width: 800px;
			text-align: center;
			font-size: 16px;
			font-weight: bold;
			color: green;
		}
		
		#search-form {
			margin-top: 20px;
			text-align: center;
		}
		
		#search-input {
			padding: 10px;
			font-size: 14px;
			width: 60%;
			border: 1px solid #ccc;
			border-radius: 5px;
		}
		
		#search-btn {
			padding: 10px 20px;
			font-size: 14px;
			background-color: #4CAF50;
			color: white;
			border: none;
			border-radius: 5px;
			cursor: pointer;
		}
	</style>
</head>
<body>
<table id = "listaus">
	<thead>
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

function haeAsiakkaatTietty() {
	let url = "asiakkaat?hakusana=" + document.getElementById("hakusana").value; 
	let requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/x-www-form-urlencoded" }       
    };    
    fetch(url, requestOptions)
    .then(response => response.json())//Muutetaan vastausteksti JSON-objektiksi 
   	.then(response => printItems(response)) 
   	.catch(errorText => console.error("Fetch failed: " + errorText));
}

function printItems(respObjList) {
    document.getElementById("tbody").innerHTML = "";
    let htmlStr="";
    if (respObjList.length === 0) {
        htmlStr = "<tr><td colspan='5'>Ei hakutuloksia</td></tr>";
    } else {
        for(let item of respObjList) {
            htmlStr+="<tr id='rivi_"+item.asiakas_id+"'>";
            htmlStr+="<td>" + item.etunimi+"</td>";
            htmlStr+="<td>" + item.sukunimi + "</td>";
            htmlStr+="<td>" + item.puhelin + "</td>";
            htmlStr+="<td>" + item.sposti + "</td>";
            htmlStr+="</tr>";
            //htmlStr+="<td><a href='muutaAsiakas.jsp?asiakas_id="+item.asiakas_id+"'>Muuta</a>&nbsp;";
            //htmlStr+="<span class='poista' onclick=varmistaPoisto('"+item.asiakas_id+"')";
        }
    }
    document.getElementById("tbody").innerHTML = htmlStr;
}

haeAsiakkaatTietty();
</script>
</body>
</html>