<?php
if(!class_exists('Events_Model')) require_once './models/events_model.php';


class Controller_Events extends Controller{
	public $user_id;
	public $events;

	public function __construct(){
		$session = new Sessions();
		$this->user_id = $session->is_logged_user() ? $session->user_data['id'] : 0;
		$this->events = new Events_Model(array(
			'user_id' => $this->user_id
		));
	}

	function action_index(){
		// $this->view->generate('auth_view.php', 'template_view.php');
	}

	public function get_events(){
		return $this->events->get_events();
	}

	public function get_user_events(){
    return $this->events->get_user_events();
	}

	public function join_event($data){
		$event_id = isset($data['event_id']) ? (int)$data['event_id'] : 0;
		$char_id = isset($data['character_id']) ? (int)$data['character_id'] : 0;

		if($this->user_id == 0) return array('error' => true,'desc' => 'You are not authorized');
		if($event_id == 0) return array('error' => true,'desc' => 'Event not found');
		if($char_id == 0) return array('error' => true,'desc' => 'Character not found');


		return $this->events->join_event($event_id,$char_id);

	}

	public function leave_event($data){
		$event_id = isset($data['event_id']) ? (int)$data['event_id'] : 0;
		$char_id = isset($data['character_id']) ? (int)$data['character_id'] : 0;

		if($this->user_id == 0) return array('error' => true,'desc' => 'You are not authorized');
		if($event_id == 0) return array('error' => true,'desc' => 'Event not found');
		if($char_id == 0) return array('error' => true,'desc' => 'Character not found');


		return $this->events->leave_event($event_id,$char_id);

	}


	public function get_event_players($data){
		$event_id = isset($data['event_id']) ? (int)$data['event_id'] : 0;

		if($event_id == 0) return array('error' => true,'desc' => 'Event not found');


		return $this->events->get_event_players($event_id);
	}



}

?>
