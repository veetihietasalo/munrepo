

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
            htmlStr+="<td><a href='MuutaAsiakas.jsp?asiakas_id="+item.asiakas_id+"'>Muuta</a>&nbsp;";   
            htmlStr+="<td><span class='poista' onclick=varmistaPoisto("+item.asiakas_id+",'"+encodeURI(item.etunimi)+"')>Poista</span></td>";
            htmlStr+="</tr>";
           
        }
    }
    document.getElementById("tbody").innerHTML = htmlStr;
}

function poistaAsiakas(asiakas_id, etunimi){
	let url = "asiakkaat?asiakas_id=" + asiakas_id;    
    let requestOptions = {
        method: "DELETE"             
    };    
    fetch(url, requestOptions)
    .then(response => response.json())//Muutetaan vastausteksti JSON-objektiksi
   	.then(responseObj => {	
   		//console.log(responseObj);
   		if(responseObj.response==0){
			alert("Asiakkaan poisto epäonnistui.");	        	
        }else if(responseObj.response==1){ 
			document.getElementById("rivi_"+asiakas_id).style.backgroundColor="red";
			alert("Asiakkaan " + decodeURI(etunimi) +" poisto onnistui."); //decodeURI() muutetaan enkoodatut merkit takaisin normaaliksi kirjoitukseksi
			haeAsiakkaatTietty();        	
		}
   	})
   	.catch(errorText => console.error("Fetch failed: " + errorText));
}	

function haeAsiakas() {		
    let url = "asiakkaat?asiakas_id=" + requestURLParam("asiakas_id"); 	
	console.log(url);
    let requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/x-www-form-urlencoded" }       
    };    
    fetch(url, requestOptions)
    .then(response => response.json())//Muutetaan vastausteksti JSON-objektiksi
   	.then(response => {
   		//console.log(response);
   		document.getElementById("asiakas_id").value=response.asiakas_id;
   		document.getElementById("etunimi").value=response.etunimi;
   		document.getElementById("sukunimi").value=response.sukunimi;
   		document.getElementById("puhelin").value=response.puhelin;
   		document.getElementById("sposti").value=response.sposti;
   	}) 
   	.catch(errorText => console.error("Fetch failed: " + errorText));
}	

function tutkiTiedot(){
	let ilmo="";	
	if(document.getElementById("etunimi").value.length<2){
		ilmo="Etunimi ei kelpaa";	
		document.getElementById("etunimi").focus();	
	}else if(document.getElementById("sukunimi").value.length<3){
		ilmo="Sukunimi ei kelpaa!";
		document.getElementById("sukunimi").focus();			
	}else if(document.getElementById("puhelin").value.length<7){
		ilmo="Puhelinnumero ei kelpaa";	
		document.getElementById("puhelin").focus();	
	}else if (document.getElementById("sposti").value.indexOf("@") == -1) {
  		ilmo = "Sähköposti ei kelpaa!";
  		document.getElementById("sposti").focus();	
		}
	
	if(ilmo!=""){
		document.getElementById("ilmo").innerHTML=ilmo;
		setTimeout(function(){ document.getElementById("ilmo").innerHTML=""; }, 3000);
		return false;
	}else{
		document.getElementById("etunimi").value=siivoa(document.getElementById("etunimi").value);
		document.getElementById("sukunimi").value=siivoa(document.getElementById("sukunimi").value);
		document.getElementById("puhelin").value=siivoa(document.getElementById("puhelin").value);
		document.getElementById("sposti").value=siivoa(document.getElementById("sposti").value);	
		return true;
	}
}

function paivitaTiedot(){	
	let formData = serialize_form(lomake); //Haetaan tiedot lomakkeelta ja muutetaan JSON-stringiksi
	//console.log(formData);	
	let url = "asiakkaat";    
    let requestOptions = {
        method: "PUT", //Muutetaan asiakas
        headers: { "Content-Type": "application/json; charset=UTF-8" },  
    	body: formData
    };    
    fetch(url, requestOptions)
    .then(response => response.json())//Muutetaan vastausteksti JSON-objektiksi
   	.then(responseObj => {	
   		//console.log(responseObj);
   		if(responseObj.response==0){
   			document.getElementById("ilmo").innerHTML = "Asiakkaan paivitys epaonnistui.";	
        }else if(responseObj.response==1){ 
        	document.getElementById("ilmo").innerHTML = "Asiakkaan paivitys onnistui.";
			document.lomake.reset(); 	        	
		}
   	})
   	.catch(errorText => console.error("Fetch failed: " + errorText));
}

function lisaaTiedot(){
	let formData = serialize_form(document.lomake); 
	
	let url = "asiakkaat";    
    let requestOptions = {
        method: "POST", //Lisätään asiakas
        headers: { "Content-Type": "application/json" },  
    	body: formData
    };    
    fetch(url, requestOptions)
    .then(response => response.json())//Muutetaan vastausteksti JSON-objektiksi
   	.then(responseObj => {	
   		//console.log(responseObj);
   		if(responseObj.response==0){
   			document.getElementById("ilmo").innerHTML = "Asiakkaan lisays epäonnistui.";	
        }else if(responseObj.response==1){ 
        	document.getElementById("ilmo").innerHTML = "Asiakkaan lisays onnistui.";
			document.lomake.reset(); 	        	
		}
		setTimeout(function(){ document.getElementById("ilmo").innerHTML=""; }, 3000);
   	})
   	.catch(errorText => console.error("Fetch failed: " + errorText));
}