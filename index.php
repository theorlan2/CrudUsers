<?php

$f3=require('lib/base.php');
$f3->set('DEBUG',1);
// Load configuration
$f3->config('config.ini');
// cargando los controladores 
$f3->set('AUTOLOAD','App/Controllers/');

$f3->route('GET /',
	function($f3) {	 
		echo View::instance()->render('layout.htm');
	}
);

// Obtiene todos los Usuarios
$f3->route('POST /api/v1/auth','Controller->login');

// Obtiene todos los Usuarios
$f3->route('GET /api/v1/users','UserController->todoslosUsuarios');

// Obtiene un Usuario en Especifico
$f3->route('GET /api/v1/user/@id','UserController->Usuario');

//Crear Usuario
$f3->route('POST /api/v1/user','UserController->Crear');

//Crear Editar
$f3->route('PUT /api/v1/user','UserController->Actualizar');

//Elimina un Usuario
$f3->route('DELETE /api/v1/user','UserController->Eliminar');

//Validar correo
$f3->route('GET /api/v1/email','UserController->ExistUsuario');

//Cerrar Sesion
$f3->route('POST /api/v1/logout','UserController->CerrarSession');


$f3->run();
