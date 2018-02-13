// from the django docs: https://docs.djangoproject.com/en/2.0/ref/csrf/
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrfToken = getCookie('csrftoken');

// takes a number and returns it in printable price format
function toPrice(number){
  return "£" + Number.parseFloat(number).toFixed(2);
}

// essentially a wrapper for the HTML template
function makeOrderHTML(orderID, tableLabel, contents, price, confirmed, time){
  return `
  <div class="col-md-12 mb-md-3">
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-md-9">
            <h2 class="card-title">Order #${ orderID } - ${ tableLabel }</h2>
            <p class="card-text">
              ${ contents }
            </p>
            <h3>Total price: ${ toPrice(price) }
			<h3>Time Ordered: ${ (time.substring(11,19)) }
          </div>
          <div class="col-md-3 text-center">
            <button type="button" class="btn btn-primary btn-lg"
            onclick="confirmOrder(this, ${ orderID })" ${ confirmed ? "disabled" : "" }>
            ${ confirmed ? "Confirmed" : "Confirm" }</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
}

// populates the page with a list of all orders
function updateOrders(){
  $.getJSON("getorders", function(data){
    var ordersJSON = JSON.parse(data)
    console.log(data);
    console.log(ordersJSON);

    // for each order in ordersJSON
    $.each(ordersJSON, function(key, value){
      var fields = value["fields"];
	var orderHTML = makeOrderHTML(value["pk"], fields["table"], fields["items"], fields["total_price"], fields["confirmed"], fields["time"]);
      $("#order-container").append(orderHTML)
    });

  });
}

function confirmOrder(button, orderID){
  $.ajax({
    url: "/waiter/confirmorder",
    type: 'POST',
    headers: {'X-CSRFToken': csrfToken},
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify({id: orderID}),
    dataType: 'text',
    success: function(result) {
      $(button).attr("disabled", true);
      $(button).text("Confirmed");
    }
  });
}

$(document).ready(function(){
  updateOrders();
});
