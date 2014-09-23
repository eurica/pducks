//This is code that's loaded on every PD page

//Show open incidents in the nav bar
//TODO: Make this less ugly
current_user = JSON.parse($("#json-current_user").attr("data-current_user"))
$.get( "/api/v1/incidents/count?date_range=all&status=all&assigned_to_user="+current_user.id, function(data) {
  popup_style = (data.triggered>0)?"color:red;font-size:150%":"color:#ccc;"
  acked = (data.acknowledged>0)?"<span style='color:orange;'> and "+data.acknowledged+" acknowledged incidents</span>":""
  your_incidents = "<a href='/incidents' style='"+popup_style+"'>You have "+data.triggered+" triggered incidents "+acked+"</span>"
  $(".pd-navbar-container").first().css("text-align","center")
  $(".pd-logo").first().after(your_incidents)
})

//Make the fancy tables sortable:
var s=document.createElement('script');
s.setAttribute('src','https://eurica.github.io/pducks/sorttable.js');
s.setAttribute('onload','make_sortable()');
document.getElementsByTagName('head')[0].appendChild(s);