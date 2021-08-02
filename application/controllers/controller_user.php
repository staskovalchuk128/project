<?php
class Controller_User extends Controller{

	function action_index(){
		// $this->view->generate('auth_view.php', 'template_view.php');
	}

	public function get_user_session(){
		$session = new Sessions();
		return $session->is_logged_user() ? $session->user_data['id'] : 0;
	}

	public function get_characters(){
		$user = new User();
		return $user->get_characters();
	}

	public function add_character($data){
		$user = new User();
		return $user->add_character($data);
	}

	public function delete_character($data){
		$char_id = (int)$data['id'];
		$user = new User();
		return $user->delete_character($char_id);
	}

	public function change_user_password($data){
		$current_password = isset($data['currentPassword']) ? $data['currentPassword'] : '';
		$new_password = isset($data['newPassword']) ? $data['newPassword'] : '';
		$repeat_new_password = isset($data['repeatNewPassword']) ? $data['repeatNewPassword'] : '';

		$user = new User();

		return $user->change_password($current_password, $new_password, $repeat_new_password);

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
