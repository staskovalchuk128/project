<?php
class Controller_Auth extends Controller{

	function action_index(){
		$this->view->generate('auth_view.php', 'template_view.php');
	}

	public function register($data){
		$session = new Sessions();

		// if user logged in
		if($session->is_logged_user()) return array('error' => true,'desc' => 'You already logged in');

		$user = new User();
		$user_data = json_decode($data['data']);

		$result = $user->create_user($user_data);

		if(isset($result['error'])) return $result;

		$user_id = $result['id'];

		$user_session = $session->start_user_session($user_id);

		if($user_session['success'] === true){

			return $user_session['user_data'];

		}

		return array('error' => true,'desc' => 'Unexpected error');
	}

	public function login($data){
		$session = new Sessions();
		// if user logged in
		if($session->is_logged_user()) return array('error' => true,'desc' => 'You already logged in');
		
		$email = isset($data['email']) ? $data['email'] : '';
		$password = isset($data['password']) ? $data['password'] : '';

		$user = new User();
		if(empty($email)) return array('error' => true,'desc' => 'Enter Email');
		if(empty($password)) return array('error' => true,'desc' => 'Enter Password');

		$salt = $user->get_salt_by_email($email);

		if($salt === false) return array('error' => true,'desc' => 'User not found');

		$md5_password = md5($salt.$password.$salt);

		$db = new db();
		$check_user = $db->query('SELECT `id` FROM `users` WHERE `email` ="'.$email.'" AND `password` = "'.$md5_password.'"')->fetchArray();
		$db->close();
		if(count($check_user) == 0) return array('error' => true,'desc' => 'Incorrect Email or Password');
		$user_id = $check_user['id'];

		$user_session = $session->start_user_session($user_id);

		if($user_session['success'] === true){

			return $user_session['user_data'];

		}

		return array('error' => true,'desc' => 'Unexpected error');

	}
}

?>
