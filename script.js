chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    document.getElementById("url").innerHTML =  tabs[0].url;     //url
    document.getElementById("title").innerHTML = tabs[0].title;   //title
});

function reset(){ //Reset HTML elements CSS to default values
  document.getElementById("headers").style.backgroundColor = "White";
  document.getElementById("cookies").style.backgroundColor = "White"
  var p = document.getElementsByTagName('p'); //Get all paragraphs
  while (p[0]) p[0].parentNode.removeChild(p[0]); //Remove all paragraphs
}

function check_headers(){ //Verify security response headers in current URL
  reset()
  document.getElementById("headers").style.backgroundColor = "#4CC417";
  document.getElementById("cookies").style.backgroundColor = "White";
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
  request.open("GET", document.getElementById("url").innerHTML, false); //Perform GET HTTP request to URL
  request.send();
  for (var i = 0; i < secure_headers.length; i++) { //Check for each header in response
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
  }
}

function check_cookies(){ //Obtain all cookies from current URL
  reset();
  document.getElementById("cookies").style.backgroundColor = "#4CC417";
  chrome.cookies.getAll({url: document.getElementById("url").innerHTML}, function(cookie) {
    var p = document.createElement("p");
    p.innerHTML = "These cookies are not protected against javascript access (HttpOnly):";
    p.style.color = "red";
    p.style.fontSize = "15px";
    document.body.appendChild(p);
    for (var i = 0; i < cookie.length; i++) { //Check for each header in response
      var p = document.createElement("p");
      p.innerHTML = cookie[i].name+" : "+cookie[i].value;
      p.style.fontSize = "12px";
      document.body.appendChild(p);
    } 
  });
}

function check_storage(){
  chrome.storage.sync.get(null, function(items) {
    var keys = Object.keys(items);
    console.log(keys.length)
    for (var i = 0; i < keys.length; i++) { //Check for each header in response
      var p = document.createElement("p");
      p.innerHTML = keys[i]+" : "+items[keys[i]];
      p.style.fontSize = "12px";
      document.body.appendChild(p);
    } 
  });

}
document.getElementById("headers").addEventListener("click", check_headers);
document.getElementById("cookies").addEventListener("click", check_cookies);
document.getElementById("storage").addEventListener("click", check_storage);
document.getElementById("reset").addEventListener("click", reset);