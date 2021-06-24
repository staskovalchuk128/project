<?php
class Ajax{

  public function __construct($post_data){
    $dir = isset($post_data['dir']) ? $post_data['dir'] : '';
    $action = isset($post_data['action']) ? $post_data['action'] : '';

    if($dir == '') return Msg::json_response(false,'unknown request');
    if($action == '') return Msg::json_response(false,'unknown request');

    $controller_name = 'Controller_'.$dir;

    $controller_file = strtolower($controller_name).'.php';
    $controller_path = $_SERVER['DOCUMENT_ROOT']."/application/controllers/".$controller_file;

    if(file_exists($controller_path)){
      include $_SERVER['DOCUMENT_ROOT']."/application/controllers/".$controller_file;

      $controller = new $controller_name;

      if(method_exists($controller, $action)){

        $response = $controller->$action($post_data);
        if(!isset($response['error'])){
          return Msg::json_response(true,$response);
        } else {
          return Msg::json_response(false,isset($response['desc']) ? $response['desc'] : 'unknown error');
        }


      } else return Msg::json_response(false,'Method '.$action.' not found');


    } return Msg::json_response(false,'unknown request');

  }


}


?>
