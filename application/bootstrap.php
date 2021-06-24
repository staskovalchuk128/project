<?php
require_once 'core/sessions.php';
require_once 'core/model.php';
require_once 'core/view.php';
require_once 'core/controller.php';
require_once 'core/route.php';
$session = new Sessions();
Route::start(); // запускаем маршрутизатор
?>
