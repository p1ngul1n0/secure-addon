chrome.storage.local.get(["current_url","current_title"], function(result) {
  var current_url = result.current_url;
  var current_title = result.current_title;
  document.getElementById("title").innerHTML = current_title;
  document.getElementById("url").innerHTML = current_url;
});

function reset(){
  document.getElementById("headers").style.backgroundColor = "White";
  document.getElementById("storage").style.backgroundColor = "White"
  var p = document.getElementsByTagName('p')
  while (p[0]) p[0].parentNode.removeChild(p[0])
}

function check_headers(){
  document.getElementById("headers").style.backgroundColor = "#4CC417";
  document.getElementById("storage").style.backgroundColor = "White";
  var p = 1;
  var secure_headers = ["x-frame-options",
                        "x-xss-protection",
                        "content-security-policy",
                        "strict-transport-security",
                        "x-content-type-pptions",
                        "x-permitted-cross-domain-policies",
                        "referrer-policy",
                        "expect-ct",
                        "feature-policy"]
  var request = new XMLHttpRequest();
  request.open("GET", document.getElementById("url").innerHTML, false);
  request.send();
  for (var i = 0; i < secure_headers.length; i++) {
    var p = document.createElement("p");
    if (request.getResponseHeader(secure_headers[i]) != null){
      p.innerHTML = "[OK] "+secure_headers[i]+" : "+request.getResponseHeader(secure_headers[i]);
      p.style.color = "green";
    }          
    else {
      p.innerHTML = "[NOK] "+secure_headers[i];
      p.style.color = "red";
    }
    document.body.appendChild(p);
    p++
  }
}

document.getElementById("headers").addEventListener("click", check_headers);
//document.getElementById("storage").addEventListener("click", check_storage);
document.getElementById("reset").addEventListener("click", reset);
