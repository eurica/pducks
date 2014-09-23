$(".incident-details").first().after('<div class="pd-page-content-header"><h3>Incident Details</h3><div id ="incident-context"></div><div id ="incident-details"></div>');
i=JSON.parse($("#json-incident").attr("data-incident"))
ile = i.trigger_details_html_url.replace(/.*pagerduty.com\//,"/api/v1/") + "?include%5B%5D=channel"

$.get( ile, function( data ) {
  console.log( data );
  $("#incident-details").html("<pre>"+JSON.stringify(data.log_entry.channel.details,pretty_print,4)+"</pre>")
  if (context = data.log_entry.channel.details.context) {
    if(context.embed) $.each(context.embed, context_detail)
    if(context.conference) conference_detail(context.conference)
  }
});

//remove notification ILEs 
//TODO: Would also hide notes with "Notfied: " I think
$("td.activity:contains('Notified ')").parent().hide()

pretty_print = function (key, value) {
  if($.isNumeric(value)) return "<b>"+value+"</b>";
  if(key=="context") return "(hidden)";
  return value;
}

conference_detail = function(elem){
  console.log(elem);
  if(elem.url) {
    url = elem.url;
    icon="https://eurica.github.io/pducks/img/hangout.png"
  } else if (elem.number) {
    url = "tel:"+elem.tel;
    icon="https://eurica.github.io/pducks/img/phone.png"
  } else { 
    return;
  }

  conf_row = "<tr><th>Conference:</th><td><a href='"+url+"' style='display:block'><img style='height:32px;width:32px;' src='"+icon+"'> "+(elem.name || url)+"</a></td></tr>"
  $(".incident-details tbody").first().append(conf_row)  
}

context_detail = function(i,elem){
  console.log(elem);
  name = elem.name || elem.src || elem.type || ""
  content = ""
  if(elem.type=="image") {
    content = "<img src='"+elem.src+"'>"
  } else if  (elem.type=="iframe") {
    content = "<iframe src='"+elem.src+"' style='width:100%; border:1px solid #333;'></iframe>"
  } 
  $("#incident-context").append("<a href='"+elem.src+"'>"+name+"</a><br>"+content)   
}

