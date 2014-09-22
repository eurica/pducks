$(".incident-details").first().after('<div class="pd-page-content-header"><h3 class="pull-left">Incident Details</h3></div><div id ="incident-details"></div>');
i=JSON.parse($("#json-incident").attr("data-incident"))
ile = i.trigger_details_html_url.replace(/.*pagerduty.com\//,"/api/v1/") + "?include%5B%5D=channel"
add_detail = function(name, d){
  ext = d.replace(/.*\./,"")
  console.log(ext)
  d = d.replace("http:","");
  if($.inArray( ext, ['jpg', 'jpeg', 'png', 'gif', 'bmp' ] ) > -1) {
    content = "<img src='"+d+"'>"
    console.log("Is an image")
  } else {
    content = "<iframe src='"+d+"' style='width:100%'></iframe>"
  }
  $("#incident-details").append("<a href='"+d+"'>"+name.replace("/attachments","")+"</a><br>"+content)
  
}
$.get( ile, function( data ) {
  console.log( data );
  $.each(data.log_entry.channel.details, add_detail)
});

/*
javascript:(function() {var s=document.createElement('script');s.setAttribute('src','https://euri.ca/files/sendgrid/incident.js');document.getElementsByTagName('head')[0].appendChild(s);})();


//Make the big table sortable
//Better idea: require sorttable.js, or add the CSS and then include it
javascript:(function() {var s=document.createElement('script');s.setAttribute('src','https://euri.ca/files/sendgrid/sorttable.js');document.getElementsByTagName('head')[0].appendChild(s);})();
sorttable.makeSortable($(".pd-fancy-list-table")[0]);

remove notification ILEs //TODO: Would also hide notes with "Notfied: " I think
$("td.activity:contains('Notified ')").parent().hide()

*/