$(".incident-details").first().after('<div class="pd-page-content-header"><h3 class="pull-left">Incident Details</h3></div><div id ="incident-details"></div>');
i=JSON.parse($("#json-incident").attr("data-incident"))
ile = i.trigger_details_html_url.replace(/.*pagerduty.com\//,"/api/v1/") + "?include%5B%5D=channel"

add_detail = function(name, d){
  ext = d.replace(/.*\./,"")
  console.log(ext)
  d = d.replace("http:","").replace("https:","");
  if(d.indexOf("//")!=0) break;
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
  $("#incident-details").html("<pre>"+JSON.stringify(data.log_entry.channel,pretty_print,4)+"</pre>")
  //$.each(data.log_entry.channel.details, add_detail)
});

//remove notification ILEs 
//TODO: Would also hide notes with "Notfied: " I think
//$("td.activity:contains('Notified ')").parent().hide()

pretty_print = function (key, value) {
  if($.isNumeric(value)) return "<b>"+value+"</b>";
  return value;
}
