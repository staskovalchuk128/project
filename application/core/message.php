<?php

class Msg{

  public static function json_response($success,$data = ''){
    echo json_encode(array('success' => $success, 'data' => $data));
  }

}


?>
