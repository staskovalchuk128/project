<?php
class Controller_Account extends Controller
{
	function action_index(){
		$this->view->generate('/account/main_view.php', 'template_view.php');
	}

	public function action_profile(){
		$this->view->generate('/account/main_view.php', 'template_view.php');
	}
}

?>
