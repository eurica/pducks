// ==UserScript==
// @name          PD Incident View
// @namespace     http://pdt-dave.pagerduty.com
// @description   PagerDuty UI tweaks
// @match         https://*.pagerduty.com/*
// @require       https://eurica.github.io/pducks/sorttable.js
// ==/UserScript==

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

// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.js
