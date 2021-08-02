<?php
if(!class_exists('Sessions')) require_once './core/sessions.php';


class Events_Model{
  public $user_id;

  public function __construct($data = array()){
    $this->user_id = isset($data['user_id']) ? (int)$data['user_id'] : 0;

  }

  public function join_event($event_id,$char_id){

    if($this->user_id == 0) return array('error' => true,'desc' => 'You are not authorized');

    $db = new db();

    $exists = $db->query("SELECT `id` FROM `user_characters` WHERE `id` ='".$char_id."' AND `user_id` = '".$this->user_id."'")->fetchArray();
    if(count($exists) == 0) return array('error' => true,'desc' => 'Character not found');

    $exists = $db->query("SELECT `id` FROM `events` WHERE `id` ='".$event_id."'")->fetchArray();
    if(count($exists) == 0) return array('error' => true,'desc' => 'Event not found');


    $exists = $db->query("SELECT `id` FROM `event_players` WHERE `event_id` ='".$event_id."' AND `char_id` = '".$char_id."'")->fetchArray();
    if(count($exists) > 0) return array('error' => true,'desc' => 'You already joined this event');

    $db->query("INSERT INTO `event_players` (`event_id`,`char_id`)
    VALUES ('".$event_id."','".$char_id."')");

    $db->close();

    return true;
  }


  public function leave_event($event_id,$char_id){

    if($this->user_id == 0) return array('error' => true,'desc' => 'You are not authorized');

    $db = new db();

    $exists = $db->query("SELECT `id` FROM `user_characters` WHERE `id` ='".$char_id."' AND `user_id` = '".$this->user_id."'")->fetchArray();
    if(count($exists) == 0) return array('error' => true,'desc' => 'Character not found');

    $exists = $db->query("SELECT `id` FROM `events` WHERE `id` ='".$event_id."'")->fetchArray();
    if(count($exists) == 0) return array('error' => true,'desc' => 'Event not found');


    $db->query("DELETE FROM `event_players` WHERE `char_id` = '".$char_id."' AND `event_id` = '".$event_id."'");
    $db->close();

    return true;
  }

  public function get_events(){
    $db = new db();
    $events = $db->query("SELECT * FROM `events` ORDER BY `date` ASC")->fetchAll();
    $db->close();
    return $events;
  }

  public function get_user_events(){

    if($this->user_id == 0) return array('error' => true,'desc' => 'You are not authorized');

    $db = new db();
    $events = $db->query("SELECT
      `events`.`id` AS event_id,
      `events`.`name` AS event_name,
      `events`.`date` AS event_date,
      `user_characters`.`id` AS character_id,
      `user_characters`.`name` AS character_name
       FROM `event_players`
    INNER JOIN `events` ON `events`.`id` = `event_players`.`event_id`
    INNER JOIN `user_characters` ON `event_players`.`char_id` = `user_characters`.`id`
    WHERE `user_characters`.`user_id` = '".$this->user_id."'
    ORDER BY `events`.`date` ASC")->fetchAll();
    $db->close();
    return $events;
  }

  public function get_event_players($event_id){

    if($event_id == 0) return array('error' => true,'desc' => 'Event not found');

    $db = new db();
    $players = $db->query("SELECT
      `user_characters`.`id` AS id,
      `user_characters`.`name` AS name,
      `user_characters`.`level` AS level,
      `character_classes`.`id` AS class_id,
      `character_classes`.`name` AS class_name,
      `character_classes`.`icon` AS class_icon
       FROM `event_players`
      INNER JOIN `user_characters` ON `user_characters`.`id` = `event_players`.`char_id`
      INNER JOIN `character_classes` ON `character_classes`.`id` = `user_characters`.`class_id`
      WHERE `event_players`.`event_id` = '".$event_id."'
    ")->fetchAll();
    $db->close();
    return $players;

  }


}



?>
