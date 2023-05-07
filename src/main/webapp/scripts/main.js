/**
 * 
 */

function serialize_form(form){
	return JSON.stringify(
	    Array.from(new FormData(form).entries())
	        .reduce((m, [ key, value ]) => Object.assign(m, { [key]: value }), {})
	        );	
} 

function requestURLParam(sParam){
    let sPageURL = window.location.search.substring(1);
    let sURLVariables = sPageURL.split("&");
    for (let i = 0; i < sURLVariables.length; i++){
        let sParameterName = sURLVariables[i].split("=");
        if(sParameterName[0] == sParam){
            return sParameterName[1];
        }
    }
}

function tutkiJaLisaa(){
	if(tutkiTiedot()){
		lisaaTiedot();
	}
}

function tutkiJaPaivita(){
	if(tutkiTiedot()){
		paivitaTiedot();
	}
}



function siivoa(teksti){
	teksti=teksti.replace(/</g, "");//&lt;
	teksti=teksti.replace(/>/g, "");//&gt;	
	teksti=teksti.replace(/'/g, "''");//&apos;	
	return teksti;
}



function varmistaPoisto(asiakas_id, etunimi){
	if(confirm("Poista asiakas " + decodeURI(etunimi) +"?")){ //decodeURI() muutetaan enkoodatut merkit takaisin normaaliksi kirjoitukseksi
		poistaAsiakas(asiakas_id, encodeURI(etunimi));
	}
}

function asetaFocus(target){
	document.getElementById(target).focus();	
}

function tutkiKey(event, target){	
	if(event.keyCode==13){//13=Enter
		if(target=="listaa"){
			haeAsiakkaatTietty();
		}else if(target=="lisaa"){
			tutkiJaLisaa();
		}else if(target=="paivita"){
			tutkiJaPaivita();
		}
	}else if(event.keyCode==113){//F2
		document.location="ListaaAsiakkaat.jsp";
	}		
}


