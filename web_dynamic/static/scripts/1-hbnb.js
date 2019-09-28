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
