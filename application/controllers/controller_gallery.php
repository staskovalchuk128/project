<?php
if(!class_exists('Gallery_Model')) require_once './models/gallery_model.php';


class Controller_Gallery extends Controller{

	function action_index(){
		// $this->view->generate('auth_view.php', 'template_view.php');
	}

	public function get_gallery(){
    $gallery = new Gallery_Model();
    return $gallery->get_gallery();
	}




}

?>
