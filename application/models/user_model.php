<?php
if(!class_exists('Sessions')) require_once './core/sessions.php';


class User_Model{
  public $id;
  public $user_data = array();
  public $session;
  public $max_character_level = 130;


  public function __construct($id = 0, $secure = true){
    $this->id = (int)$id;
    $this->session = new Sessions();

    if($this->id == 0) $this->id = $this->session->get_logged_user_id();

    if($secure === true && $this->id == 0) return array('error' => true,'desc' => 'You are not authorized');

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
    $salt = $db->safe_string($salt);

    $db->query("INSERT INTO `users` (`first_name`,`last_name`,`email`,`password`,`salt`) VALUES ('".$first_name."','".$last_name."','".$email."','".$new_password."','".$salt."')");
    $user_id = $db->lastInsertID();
    $db->close();

    return array(
      'id' => $user_id
    );

  }


  public function get_characters(){
    $db = new db();
    $characters = $db->query("SELECT
      `user_characters`.`id` AS id,
      `user_characters`.`name` AS name,
      `user_characters`.`level` AS level,
      `character_classes`.`id` AS class_id,
      `character_classes`.`icon` AS class_icon,
      `character_classes`.`name` AS class_name
       FROM `user_characters`
      INNER JOIN `character_classes` ON `character_classes`.`id` = `user_characters`.`class_id`
       ORDER BY `user_characters`.`id` ASC")->fetchAll();
    $db->close();
    return $characters;
  }


  public function add_character($data){
    $char_id = isset($data['id']) ? (int)$data['id'] : 0;
    $name = $data['name'];
    $class_id = (int)$data['class_id'];
    $level = (int)$data['level'];

    if(empty($name)) return array('error' => true,'desc' => 'Enter name');
    if($class_id <= 0) return array('error' => true,'desc' => 'Select a class');

    $db = new db();
    
    $exists = $db->query("SELECT `id` FROM `character_classes` WHERE `id` ='".$class_id."'")->fetchArray();
    if(count($exists) == 0) return array('error' => true,'desc' => 'Unknown class');


    $name = $db->safe_string($name);

    $level = $level < 0 ? 1 : $level;
    $level = $level > $this->max_character_level ? $this->max_character_level : $level;

    if($char_id > 0){

      $exists = $db->query("SELECT `id` FROM `user_characters` WHERE `name` ='".$name."' AND `id` != '".$char_id."'")->fetchArray();
      if(count($exists) > 0) return array('error' => true,'desc' => 'A character with this name already exists');

      $db->query("UPDATE `user_characters` SET
        `name` = '".$name."', `class_id` = '".$class_id."', `level` = '".$level."' WHERE `id` ='".$char_id."'");
        $character_id = $char_id;

    } else {

      $exists = $db->query("SELECT `id` FROM `user_characters` WHERE `name` ='".$name."'")->fetchArray();
      if(count($exists) > 0) return array('error' => true,'desc' => 'A character with this name already exists');

      $db->query("INSERT INTO `user_characters` (`user_id`,`class_id`,`name`,`level`)
      VALUES ('".$this->id."','".$class_id."','".$name."','".$level."')");
      $character_id = $db->lastInsertID();
      $db->close();

    }

    return array(
      'character_id' => $character_id
    );
  }


  public function delete_character($id){
    $char_id = (int)$id;

    if($char_id == 0) return array('error' => true,'desc' => 'Character not found');

    $db = new db();

    $owner = $db->query("SELECT `id` FROM `user_characters` WHERE `user_id` ='".$this->id."' AND `id` = '".$char_id."'")->fetchArray();
    if(count($owner) == 0) return array('error' => true,'desc' => 'Character not found');


    $db->query("DELETE FROM `user_characters` WHERE `id` = '".$char_id."'");
    $db->close();

    return true;

  }


  public function change_password($current_password, $new_password, $repeat_new_password){
    $current_password = trim($current_password);
    $new_password = trim($new_password);
    $repeat_new_password = trim($repeat_new_password);

    if(empty($current_password)) return array('error' => true,'desc' => 'Enter your current password');
    if(empty($new_password)) return array('error' => true,'desc' => 'Enter new password');
    if(empty($repeat_new_password)) return array('error' => true,'desc' => 'Repeat new passwor');
    if($new_password != $repeat_new_password) return array('error' => true,'desc' => 'Passwords don\'t match');

    $new_salt = $this->getSalt();

    $password = md5($new_salt.$new_password.$new_salt);

    $db = new db();
    $user_info = $db->query("SELECT `salt`,`password` FROM `users` WHERE `id` ='".$this->id."'")->fetchArray();
    if(count($user_info) > 0){
      if($user_info['password'] != md5($user_info['salt'].$current_password.$user_info['salt'])) return array('error' => true,'desc' => 'Current password is Incorrect');

      $new_salt = $db->safe_string($new_salt);

      $db->query("UPDATE `users` SET
        `password` = '".$password."', `salt` = '".$new_salt."' WHERE `id` ='".$this->id."'");

        $db->close();
    } else {
      $db->close();
      return array('error' => true,'desc' => 'user_not_found');
    }

    return true;

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


    $db->query("UPDATE `users` SET
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
