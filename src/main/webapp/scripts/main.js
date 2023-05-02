/**
 * 
 */

function serialize_form(form){
	return JSON.stringify(
	    Array.from(new FormData(form).entries())
	        .reduce((m, [ key, value ]) => Object.assign(m, { [key]: value }), {})
	        );	
} 

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
            htmlStr+="<td><span class='poista' onclick=varmistaPoisto("+item.asiakas_id+",'"+encodeURI(item.etunimi)+"')>Poista</span></td>";
            htmlStr+="</tr>";
            //htmlStr+="<td><a href='muutaAsiakas.jsp?asiakas_id="+item.asiakas_id+"'>Muuta</a>&nbsp;";
            //htmlStr+="<span class='poista' onclick=varmistaPoisto('"+item.asiakas_id+"')";
        }
    }
    document.getElementById("tbody").innerHTML = htmlStr;
}

function tutkiJaLisaa(){
	if(tutkiTiedot()){
		lisaaTiedot();
	}
}

function tutkiTiedot(){
	let ilmo="";	
	let d = new Date();
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

function siivoa(teksti){
	teksti=teksti.replace(/</g, "");//&lt;
	teksti=teksti.replace(/>/g, "");//&gt;	
	teksti=teksti.replace(/'/g, "''");//&apos;	
	return teksti;
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

function varmistaPoisto(asiakas_id, etunimi){
	if(confirm("Poista asiakas " + decodeURI(etunimi) +"?")){ //decodeURI() muutetaan enkoodatut merkit takaisin normaaliksi kirjoitukseksi
		poistaAsiakas(asiakas_id, encodeURI(etunimi));
	}
}

//Poistetaan auto kutsumalla backin DELETE-metodia ja välittämällä sille poistettavan auton id
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
			haeAutot();        	
		}
   	})
   	.catch(errorText => console.error("Fetch failed: " + errorText));
}	


