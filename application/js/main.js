function sendRequest(){
  var email = $('#email').val(),password = $('#password').val();

  $.ajax({
    type: 'POST',
    data: {
      dir: 'auth',
      action: 'login',
      email: email,
      password: password
    },
    dataType: 'Json',
    url: '/application/ajax.php',
    success: function(result) {
      console.log(result);
    }
  });


}
