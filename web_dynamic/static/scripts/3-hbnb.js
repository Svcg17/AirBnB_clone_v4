$(function () {
  const newDict = {};
  $(':checkbox').click(function () {
    $(this).each(function () {
      if ($(this).prop('checked') === true) {
        newDict[($(this).attr('data-name'))] = ($(this).attr('data-id'));
      } else {
        delete newDict[($(this).attr('data-name'))];
      }
    });
    if ($.isEmptyObject(newDict)) {
      $('.amenities h4').html('&nbsp');
    } else {
      $('.amenities h4').html(Object.keys(newDict).join(', '));
    }
  });
});

$.get('http://0.0.0.0:5001/api/v1/status/', (data) => {
  if (data.status === 'OK') {
    $('DIV#api_status').addClass('available');
  } else {
    $('DIV#api_status').removeClass('available');
  }
});


$.ajax({
  method: 'POST',
  url: 'http://0.0.0.0:5001/api/v1/places_search/',
  contentType: 'application/json',
  data: JSON.stringify({}),
  success: function (data) {
   console.log(data);
 }
});
/*
const param = {
  headers: {
    "content-type":"application/json; charset=UTF-8"
  },
    body:{},
    method:"POST"
};

window.fetch('http://0.0.0.0:5001/api/v1/places_search/', param)
.then(data=>{return data})
.then(res=>{console.log(res)})
*/
