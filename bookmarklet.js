embedScript = function(src) {
  s=document.createElement('script');
  s.setAttribute('src',src);
  document.getElementsByTagName('head')[0].appendChild(s); 
}

window.onload = function() {
  console.log("Starting PDucks");

  embedScript('https://eurica.github.io/pducks/all.js')
  
  if(window.location.href.indexOf("pagerduty.com/incidents/") > -1 ) {  
    console.log("PDucks: Incident detail page");
    (function() {var s=document.createElement('script');s.setAttribute('src','https://eurica.github.io/pducks/incident.js');document.getElementsByTagName('head')[0].appendChild(s);})();
  }
  console.log("Loaded PDucks");
}