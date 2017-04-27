$(init);

function init() {
  $('.favourite').on('click', addFavourite);

  $('.followers').on('shown.bs.modal', function () {
    $('#myInput').focus();
  });

  $('.following').on('shown.bs.modal', function () {
    $('#myInput').focus();
  });
}

function addFavourite() {
  const postId = $(this).attr('data-post-id');

  $
  .post(`http://localhost:3000/posts/${postId}/favourites`)
  .done(() => {
    $(this).parent().empty().text('Favourited');
  });
}
