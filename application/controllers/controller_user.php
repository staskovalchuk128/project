<?php
class Controller_User extends Controller{

	function action_index(){
		// $this->view->generate('auth_view.php', 'template_view.php');
	}

	public function get_user_session(){
		$session = new Sessions();
		return $session->is_logged_user() ? $session->user_data['id'] : 0;
	}


	public function get_user_data($user_id){
    $id = is_array($user_id) ? (isset($user_id['id']) ? $user_id['id'] : 0) : (int)$user_id;

    if($id == 0) return array('error' => true,'desc' => 'User not found');

    $user = new User($id);
    $user_data = $user->get_user_data();

    return $user_data;

	}

	public function save_user_data($user_data){
		$user_data = json_decode($user_data['userData']);
		$user_id = $user_data->id;

		$user = new User($user_id);
		$result = $user->update_user($user_data);

		return $result;

	}


}

?>
