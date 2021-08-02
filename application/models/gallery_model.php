<?php
if(!class_exists('Sessions')) require_once './core/sessions.php';


class Gallery_Model{

  public function __construct(){

  }

  public function get_gallery(){
    $db = new db();
    $events = $db->query("SELECT * FROM `gallery`")->fetchAll();
    $db->close();
    return $events;
  }


}



?>
