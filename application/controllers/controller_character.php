<?php
if(!class_exists('Character_Model')) require_once './models/character_model.php';


class Controller_Character extends Controller{

	function action_index(){
		// $this->view->generate('auth_view.php', 'template_view.php');
	}

	public function get_classes(){
    $classes = new Character_Model();
    return $classes->get_classes();
	}



}

?>
