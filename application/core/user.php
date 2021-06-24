<?php
require_once $root_dir.'/application/models/user_model.php';

class User extends User_Model{
  public $user_data;

  function __construct($id = 0){
    parent::__construct($id);
  }
}



?>
