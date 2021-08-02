<?php
if(!class_exists('Sessions')) require_once './core/sessions.php';


class Character_Model{

  public function __construct(){


  }

  public function get_classes(){
    $db = new db();
    $classes = $db->query("SELECT * FROM `character_classes` ORDER BY `id` ASC")->fetchAll();
    $db->close();
    return $classes;
  }


}



?>
