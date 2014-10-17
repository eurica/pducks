console.log("Starting PDucks");
console.log(document.currentScript.src);

var PDucks = PDucks || {};
PDucks.config = {
  show_toolbar: false,
  show_chat: true,
}

PDucks.current_user = JSON.parse($("#json-current_user").attr("data-current_user"));
PDucks.current_account = JSON.parse($("#json-current_account").attr("data-current_account"));

(function() {
  //This is code that's loaded on every PD page
  //Show open incidents in the nav bar
  //TODO: Make this less ugly
  if (PDucks.config.show_toolbar) {
    $.get("/api/v1/incidents/count?date_range=all&status=all&assigned_to_user=" + PDucks.current_user.id, function(data) {
      popup_style = (data.triggered > 0) ? "color:red;font-size:150%" : "color:#ccc;"
      acked = (data.acknowledged > 0) ? "<span style='color:orange;'> and " + data.acknowledged + " acknowledged incidents</span>" : ""
      your_incidents = "<div style='position: fixed; top: 0; z-index: 10000; background-color: #000; width:100%;'><a href='/incidents' style='" + popup_style + "'>You have " + data.triggered + " triggered incidents " + acked + "</a></div>"
      console.log(your_incidents);
      $(".pd-navbar-container").first().css("text-align", "center")
      $("body").before(your_incidents)
    })
  }
})()

if (window.location.pathname == "/dashboard" || window.location.pathname == "/") {
  (function() {
    //This is code that's loaded ONLY on the dashboard
    console.log("PDucks: Dashboard page");
    PDucks.incidents_table_data = JSON.parse($("#json-incidents_table_data").attr("data-incidents_table_data"));

  })()
}

if (window.location.href.indexOf("pagerduty.com/incidents/") > -1) {
  (function() {
    //This is code that's loaded ONLY on the incident detail page
    console.log("PDucks: Incident detail page");
    PDucks.i = JSON.parse($("#json-incident").attr("data-incident"))

    //Useful page header:
    $(".page-header h1").html(PDucks.i.trigger_summary_data.description || PDucks.i.trigger_summary_data.subject)

    //SHOW the trigger
    $(".incident-details").first().after('<div class="pd-page-content-header"><h3>Incident Details</h3><div id ="incident-context"></div><div id ="incident-details"></div>');
    ile = PDucks.i.trigger_details_html_url.replace(/.*pagerduty.com\//, "/api/v1/") + "?include%5B%5D=channel"
    $.get(ile, function(data) {
      PDucks.ile = data.log_entry;
      content = "";
      if (data.log_entry.channel.details) {
        content = "<pre>" + JSON.stringify(data.log_entry.channel.details, pretty_print, 4) + "</pre>"
      } else if (data.log_entry.channel.body) {
        content = data.log_entry.channel.body
      }
      $("#incident-details").html(content)
      if (data.log_entry.channel.details) if (context = data.log_entry.channel.details.context) { //https://pagerduty.atlassian.net/wiki/pages/viewpage.action?pageId=14942338
        if (context.conference) conference_detail(context.conference)
        if (context.embed) $.each(context.embed, context_detail)
      }
    });

    service_url = "/api/v1/services/" + PDucks.i.service.id
    $.get(service_url, function(data) {
      PDucks.service = data.service;
    });


    //Parse the details.conference
    conference_detail = function(elem) {
      console.log(elem);
      if (elem.url) {
        url = elem.url;
        icon = "https://eurica.github.io/pducks/img/hangout.png"
      } else if (elem.number) {
        url = "tel:" + elem.tel;
        icon = "https://eurica.github.io/pducks/img/phone.png"
      } else {
        return;
      }
      conf_row = "<tr><th>Conference:</th><td><a href='" + url + "' style='display:block'><img style='height:32px;width:32px;' src='" + icon + "'> " + (elem.name || url) + "</a></td></tr>"
      $(".incident-details tbody").first().append(conf_row)
    }

    //Parse the details.context
    context_detail = function(i, elem) {
      console.log(elem);
      name = elem.name || elem.src || elem.type || ""
      content = ""
      if (elem.type == "image") {
        content = "<img src='" + elem.src + "'>"
      } else if (elem.type == "iframe") {
        content = "<iframe src='" + elem.src + "' style='width:100%; border:1px solid #333;'></iframe>"
      }
      $("#incident-context").append("<a href='" + elem.src + "'>" + name + "</a><br>" + content)
    }
    pretty_print = function(key, value) {
      if ($.isNumeric(value)) return "<b>" + value + "</b>";
      if (key == "context") return "(hidden)"; //We're already displaying the context
      return value;
    }

  })()
  
  console.log(PDucks)
  if (PDucks.config.show_chat) {
    $(".sidebar").first().prepend('<div id="tlkio" data-channel="'+PDucks.i.service.id+'" data_nickname="'+PDucks.current_user.name+'" style="width:100%;height:600px;"></div>')

    var tlkioOnload = function(e) {
        var target_element = document.getElementById('tlkio'),
            channel_name = target_element.getAttribute('data-channel'),
            custom_css_path = target_element.getAttribute('data-theme'),
            nickname = target_element.getAttribute('data-nickname'),
            iframe = document.createElement('iframe');

        // var iframe_src = 'http://embed.lvh.me:3000/' + channel_name,
        var iframe_src = '//embed.tlk.io/' + channel_name,
            iframe_query = [];


        if (custom_css_path && custom_css_path.length > 0) {
          iframe_query.push('custom_css_path=' + custom_css_path);
        }

        if (nickname && nickname.length > 0) {
          iframe_query.push('nickname=' + nickname);
        }

        if (iframe_query.length > 0) {
          iframe_src += '?' + iframe_query.join('&')
        }

        iframe.setAttribute('src', iframe_src);
        iframe.setAttribute('width', '100%');
        iframe.setAttribute('height', '100%');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('style', 'margin-bottom: -8px;');

        var current_style = target_element.getAttribute('style');
        target_element.setAttribute('style', 'overflow: auto; -webkit-overflow-scrolling: touch;' + current_style);

        target_element.appendChild(iframe);
    };
    window.setTimeout(tlkioOnload, 1000);
  }


}

if (window.location.pathname.indexOf("service")>0 || window.location.pathname.indexOf("user")>0 || window.location.pathname.indexOf("escalation_policies")>0 ) {
  (function() {
    //This is code that's loaded ONLY on the serices/users/escalation_policies page
    console.log("PDucks: Stupid Clippy demo");
    $('head').append('<link rel="stylesheet" type="text/css" href="https://eurica.github.io/pducks/clippy/build/clippy.css">');

    s=document.createElement('script');
    s.setAttribute('src', 'https://eurica.github.io/pducks/clippy/build/clippy.min.js');
    document.getElementsByTagName('head')[0].appendChild(s);

    if (window.location.pathname.indexOf("service")>0) { 
      window.setTimeout(function(){PDucky.speak("You look like you're trying to upgrade to enterprise.")},3000)
    }
    if (window.location.pathname.indexOf("user")>0) {
      window.setTimeout(function(){PDucky.speak('You look like you should add some more users.')},3000)
    }

  })()
}

