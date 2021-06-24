<?php
if(!class_exists('Sessions')) require_once './core/sessions.php';


class User_Model{
  public $id;
  public $user_data = array();
  public $session;


  public function __construct($id = 0){
    $this->id = (int)$id;
    $this->session = new Sessions();
  }


  public function create_user($data){
    $db = new db();

    $first_name = $db->safe_string($data->firstName);
		$last_name = $db->safe_string($data->lastName);
    $email = trim($db->safe_string($data->email));
    $password = $db->safe_string($data->password);
		$repeat_password = $db->safe_string($data->repeatPassword);

    if(empty($first_name)) return array('error' => true,'desc' => 'Enter your first name');
    if(empty($last_name)) return array('error' => true,'desc' => 'Enter your last name');
    if(empty($email)) return array('error' => true,'desc' => 'Enter email');
    if(!$this->not_exists_email($email)) return array('error' => true,'desc' => 'User with this email already exists');
    if(!$this->valid_email($email)) return array('error' => true,'desc' => 'Incorrect email');
    if(empty($password)) return array('error' => true,'desc' => 'Enter password');
    if(empty($repeat_password)) return array('error' => true,'desc' => 'Repeat password');
    if(strlen($password) < 6 || strlen($repeat_password) < 6) return array('error' => true,'desc' => 'Password must be at least 6 characters');
    if($password != $repeat_password) return array('error' => true,'desc' => 'Passwords don\'t match');

    $salt = $this->getSalt();

    $new_password = md5($salt.$password.$salt);


    $db->query("INSERT INTO `users` (`first_name`,`last_name`,`email`,`password`,`salt`) VALUES ('".$first_name."','".$last_name."','".$email."','".$new_password."','".$salt."')");
    $user_id = $db->lastInsertID();
    $db->close();

    return array(
      'id' => $user_id
    );

  }

  public function getSalt() {
    $charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\][{}\'";:?.>,<!@#$%^&*()-_=+|';
      $randStringLen = 32;

      $randString = "";
      for ($i = 0; $i < $randStringLen; $i++) {
        $randString .= $charset[mt_rand(0, strlen($charset) - 1)];
      }

      return $randString;
  }

  public function valid_email($email){
    return (bool)preg_match("`^[a-z0-9!#$%&'*+\/=?^_\`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_\`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$`i", trim($email));
  }


  public function not_exists_email($email){
    $db = new db();
    $user = $db->query("SELECT `id` FROM `users` WHERE `email` ='".$email."'")->fetchArray();
    $db->close();
    return count($user) == 0;
  }


  public function get_user_data($user_id = 0,$secure = true){
    $id = $user_id > 0 ? $user_id : $this->id;
    if($id == 0) return false;


    $db = new db();
    $user = $db->query("SELECT
      `id`,`first_name`, `last_name`, `middle_name`, `maiden_name`, `email`, `password`,
      `salt`, `birthday`,`phone`,`job`,`gender`,`create_date`
      FROM `users` WHERE `id` ='".$id."'")->fetchArray();
    $db->close();
    if(count($user) == 0) return false;

    if($secure === true){
      unset($user['salt']);
      unset($user['password']);
    }

    $this->user_data = $user;

    return $this->user_data;

  }

  public function update_user($data,$secure = true){
    $db = new db();
		$first_name = $db->safe_string($data->firstName);
		$last_name = $db->safe_string($data->lastName);
		$middle_name = $db->safe_string($data->middleName);
		$maiden_name = $db->safe_string($data->maidenName);
		$birthday = $db->safe_string($data->birthday);
		$phone = $db->safe_string($data->phone);
		$job = $db->safe_string($data->job);
		$gender = $db->safe_string($data->gender);

    if($secure === true && $this->session->user_data['id'] != $this->id) return array('error' => true,'desc' => 'You are not authorized');

    if(empty($first_name)) return array('error' => true,'desc' => 'Enter your first name');
    if(empty($last_name)) return array('error' => true,'desc' => 'Enter your last name');


    $user = $db->query("UPDATE `users` SET
      `first_name` = '".$first_name."', `last_name` = '".$last_name."',
      `middle_name` = '".$middle_name."', `maiden_name` = '".$maiden_name."', `birthday` = '".$birthday."',
      `phone` = '".$phone."',`job` = '".$job."',`gender` = '".$gender."'
      WHERE `id` ='".$this->id."'");
    $db->close();

    return true;
  }

  public function get_salt_by_email($email){
    $db = new db();
		$user = $db->query("SELECT * FROM `users` WHERE `email` ='".$email."'")->fetchArray();
    $db->close();
    if(count($user) >= 1) return !empty($user['salt']) ? $user['salt'] : false;
    return false;
  }




}



?>
