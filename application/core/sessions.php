<?php
class Sessions{
  public $auth_key;
  public $user_data;

  function __construct(){
    session_start();
    $this->auth_key = isset($_SESSION['auth_key']) ? $_SESSION['auth_key']: '';
    $this->user_data = isset($_SESSION['user_data']) ? $_SESSION['user_data']: '';
    session_write_close();
  }


  public function is_logged_user(){
    return !!$this->user_data;
  }


  public function get_logged_user_id(){
    return $this->is_logged_user() ? $this->user_data['id'] : 0;
  }


  public function logout(){
    session_start();
    unset($_SESSION['user_data']);
    session_write_close();
    return true;
  }


  public function start_user_session($user_id){
    $user_model = new User_Model($user_id);
    $this->user_data = $user_model->get_user_data();

    if($this->user_data === false) return false;

    session_start();
    $_SESSION['user_data'] = $this->user_data;
    session_write_close();

    return array(
      'success' => true,
      'user_data' => $this->user_data
    );
  }



}


?>
