const newDict = {};
const users = {};
const newLoc = {};

// Amenities
$(function () {
  $('.amenities :checkbox').click(function () {
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

// States
$(function () {
  $('.locations :checkbox').click(function () {
    $(this).each(function () {
      if ($(this).prop('checked') === true) {
        newLoc[($(this).attr('data-name'))] = ($(this).attr('data-id'));
      } else {
        delete newLoc[($(this).attr('data-name'))];
      }
    });
    if ($.isEmptyObject(newLoc)) {
      $('.locations h4').html('&nbsp');
    } else {
      $('.locations h4').html(Object.keys(newLoc).join(', '));
    }
  });
});

// Cities
// $(function () {
//   $('.locations li :checkbox').click(function () {
//     $(this).each(function () {
//       if ($(this).prop('checked') === true) {
//         newLoc[($(this).attr('data-name'))] = ($(this).attr('data-id'));
//       } else {
//         delete newLoc[($(this).attr('data-name'))];
//       }
//     });
//     if ($.isEmptyObject(newLoc)) {
//       $('.locations h4').html('&nbsp');
//     } else {
//       $('.locations h4').html(Object.keys(newLoc).join(', '));
//     }
//   });
// });

// API status circle
$.get('http://0.0.0.0:5001/api/v1/status/', (data) => {
  if (data.status === 'OK') {
    $('DIV#api_status').addClass('available');
  } else {
    $('DIV#api_status').removeClass('available');
  }
});

// Get users
$.getJSON('http://0.0.0.0:5001/api/v1/users', (data) => {
  for (const el of data) {
    users[el.id] = el.first_name + ' ' + el.last_name;
  }
});

// Filtering logic
$(function () {
  $('button').click(function () {
    const places = {
      amenities: Object.values(newDict),
      states: Object.values(newLoc),
      cities: Object.values(newLoc)
    };
    $.ajax({
      method: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(places),
      success: function (data) {
        let st = '';
        for (const place of Object.values(data)) {
          st += `<article>

                      <div class="title">

                          <h2>${place.name}</h2>

                          <div class="price_by_night">

                              $${place.price_by_night}

                          </div>
                      </div>
                      <div class="information">
                          <div class="max_guest">
                              <i class="fa fa-users fa-3x" aria-hidden="true"></i>

                              <br />

                              ${place.max_guest} Guests

                          </div>
                          <div class="number_rooms">
                              <i class="fa fa-bed fa-3x" aria-hidden="true"></i>

                              <br />

                              ${place.number_rooms} Bedrooms
                          </div>
                          <div class="number_bathrooms">
                              <i class="fa fa-bath fa-3x" aria-hidden="true"></i>

                              <br />

                              ${place.number_bathrooms} Bathroom

                          </div>
                      </div>

                      <!-- **********************
                           USER
                           **********************  -->

                      <div class="user">

                          <strong>Owner: ${users[place.user_id]}</strong>

                      </div>
                      <div class="description">

                          ${place.description}

                      </div>

                  </article> <!-- End 1 PLACE Article -->`;
        }
        $('section.places').html(st);
      }
    });
  });
  $('button').click();
});
