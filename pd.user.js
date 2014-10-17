// ==UserScript==
// @name          PDucks (PDUX)
// @namespace     https://github.com/eurica/pducks/tree/gh-pages
// @description   PDucks PagerDuty UI tweaks
// @match         https://*.pagerduty.com/*
// @exclude       https://developer.pagerduty.com/*
// @version 1.1
// ==/UserScript==

//Politeness pro-tip, add "0.0.0.0 p.errorception.com" to /etc/hosts

var PDucks = PDucks || {};

embedScript = function(src) {
  s=document.createElement('script');
  s.setAttribute('src',src);
  document.getElementsByTagName('head')[0].appendChild(s); 
}

pducks = function() {
  console.log("Loading PDucks");
  embedScript('https://eurica.github.io/pducks/pducks.js')
}

if (window.addEventListener) // W3C standard
{
  window.addEventListener('load', pducks, false); 
} 
else if (window.attachEvent) // Microsoft
{
  window.attachEvent('onload', pducks);
}
