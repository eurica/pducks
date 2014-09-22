// ==UserScript==
// @name          PD Incident View
// @namespace     http://pdt-dave.pagerduty.com
// @description   PagerDuty UI tweaks
// @match         https://*.pagerduty.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.js
// ==/UserScript==

window.onload = function() {
  console.log("Starting PD Incident View");

  (function() {var s=document.createElement('script');s.setAttribute('src','https://eurica.github.io/pdjs/js/pdjs.js');document.getElementsByTagName('head')[0].appendChild(s);})();
  (function() {var s=document.createElement('script');s.setAttribute('src','https://euri.ca/files/sendgrid/incident.js');document.getElementsByTagName('head')[0].appendChild(s);})();

  console.log("Loaded PD Incident View");
}