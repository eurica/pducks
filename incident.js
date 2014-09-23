$(".incident-details").first().after('<div class="pd-page-content-header"><h3 class="pull-left">Incident Details</h3><div id ="incident-context"></div><div id ="incident-details"></div>');
i=JSON.parse($("#json-incident").attr("data-incident"))
ile = i.trigger_details_html_url.replace(/.*pagerduty.com\//,"/api/v1/") + "?include%5B%5D=channel"

$.get( ile, function( data ) {
  console.log( data );
  $("#incident-details").html("<pre>"+JSON.stringify(data.log_entry.channel.details,pretty_print,4)+"</pre>")
  if (context = data.log_entry.channel.details.context) {
    if(context.embed) $.each(context.embed, context_detail)
    if(context.conference) $.each(context.embed, conference_detail)
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

conference_detail = function(i,elem){
  console.log(elem);
}
context_detail = function(i,elem){
  console.log(elem);
  name = elem.name || elem.src || elem.type || ""
  content = ""
  if(elem.type=="image") {
    content = "<img src='"+elem.src+"'>"
  } else if  (elem.type=="iframe") {
    content = "<iframe src='"+elem.src+"' style='width:100%'></iframe>"
  } 
  $("#incident-context").append("<a href='"+elem.src+"'>"+name+"</a><br>"+content)   
}

