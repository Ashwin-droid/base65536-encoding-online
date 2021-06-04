var encode_button = document.querySelector("#encode");
var paste_in_hex = document.querySelector("#paste_in_hex");
var paste_in_text = document.querySelector("#paste_in_text");
var paste_in_text_encoded = document.querySelector("#paste_in_text_encoded");
var paste_in_text_encoded_textbox = document.querySelector("#text_encoded");
var paste_in_hex_textbox = document.querySelector("#text_hex");
var paste_in_text_textbox = document.querySelector("#text_encode");
var text_output_selector = document.querySelector("#text_output_selector");
var checkbox = document.querySelector("#text_output");
var is_text_mode_on = true;
var is_encode_mode_on = true;

paste_in_hex.addEventListener("click", () =>{
  is_encode_mode_on = true;
  is_text_mode_on = false;
  text_output_selector.hidden = true;
  paste_in_hex_textbox.readOnly = false;
  paste_in_text_textbox.readOnly = true;
  paste_in_text_encoded_textbox.readOnly = true;
  encode_button.innerHTML = "Encode";
});


paste_in_text.addEventListener("click", () =>{
  is_encode_mode_on = true;
  is_text_mode_on = true;
  text_output_selector.hidden = true;
  paste_in_hex_textbox.readOnly = true;
  paste_in_text_textbox.readOnly = false;
  paste_in_text_encoded_textbox.readOnly = true;
  encode_button.innerHTML = "Encode";
});

paste_in_text_encoded.addEventListener("click", () =>{
  is_encode_mode_on = false;
  is_text_mode_on = false;
  text_output_selector.hidden = false;
  paste_in_hex_textbox.readOnly = true;
  paste_in_text_textbox.readOnly = true;
  paste_in_text_encoded_textbox.readOnly = false;
  encode_button.innerHTML = "Decode";
});

encode_button.addEventListener("click", () => {
  if (is_encode_mode_on){
    if (is_text_mode_on){
      hex_to_base65536(/*"01" +*/ ascii_to_hexa(paste_in_text_textbox.value));
    } else {
      hex_to_base65536(/*"02" +*/ paste_in_hex_textbox.value);
    }
  } else {
    if (checkbox.checked == true){
      paste_in_hex_textbox.value = base65536_to_hex(paste_in_text_encoded_textbox.value);
      paste_in_text_textbox.value = hexa_to_ascii(paste_in_hex_textbox.value);
    } else {
      paste_in_hex_textbox.value = base65536_to_hex(paste_in_text_encoded_textbox.value);
    }
  }
});


function hexa_to_ascii(str1)
 {
	var hex  = str1.toString();
	var str = '';
	for (var n = 0; n < hex.length; n += 2) {
		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	}
	return str;
 }


function ascii_to_hexa(str)
  {
	var arr1 = [];
	for (var n = 0, l = str.length; n < l; n ++)
     {
		var hex = Number(str.charCodeAt(n)).toString(16);
		arr1.push(hex);
	 }
	return arr1.join('');
   }


function fromHexString(hexString) {
  return new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
}

function toHexString(bytes){
  return bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
}

function hex_to_base65536(letters){
   if(letters.length === 0 || letters.length % 2 !== 0){
     confirm("This is not a valid Hex")
   } else {
     paste_in_text_encoded_textbox.readOnly = false;
     paste_in_text_encoded_textbox.value = base65536.encode(fromHexString(letters));
     paste_in_text_encoded_textbox.readOnly = true;
   }
}

function base65536_to_hex(encoded){
   return toHexString(base65536.decode(encoded));
}
