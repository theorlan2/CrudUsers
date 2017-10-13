<?php

class UserController extends Controller {

	public function todoslosUsuarios()
    {
        $result = $this->db->exec('select * from users where id not in(1)');
        header('Content-Type: application/json');
        echo json_encode(['susses'=>true,'data'=>$result]);        
    }

	public function Usuario()
    {
        $id = $this->f3->get('PARAMS.id');
        $result = $this->db->exec('select * from users where id = :id_user ',
    Array(':id_user'=>$id));
        header('Content-Type: application/json'); 
         echo json_encode(['susses'=>true,'data'=>$result]);        
    }

    public function Crear($f3)
    {
  $audit = \Audit::instance(); // Validador| para validar el Correo

// a pesar de que la validacion la hago en el Frond End / hago la Validacion por Requisito del documento            
$error = false;
if ($f3->get('POST.nombre') == '') {
    $error = true;
    echo json_encode([
    'susses'=>false,
    'msg'=>'Debe Digitar el Nombre'
    ]); 
    exit;
}
if ($audit->email($f3->get('POST.correo')) != 1 || $f3->get('POST.correo') == '' || self::ExistUser($f3->get('POST.correo'))) {
    $error = true;
    print_r($audit->email($f3->get('POST.correo')));
    
    echo json_encode([
    'susses'=>false,
    'msg'=>'El correo es invalido o ya Existe una cuenta con este correo'
    ]); 
    exit;
}
if ($f3->get('POST.pass') == '') {
    $error = true;
    echo json_encode([
    'susses'=>false,
    'msg'=>'Debe Digitar la clave'
    ]); 
    exit;
}
if ($f3->get('POST.cumple') == '') {
    $error = true;
    echo json_encode([
    'susses'=>false,
    'msg'=>'Debe Digitar la fecha de nacimiento'
    ]); 
    exit;
}
if ($f3->get('POST.sexo') == '' ) {
    $error = true;
    echo json_encode([
    'susses'=>false,
    'msg'=>'Debe Selecionar un sexo valido'
    ]); 
    exit;
}

if ($f3->get('POST.sexo') != 'F' and $f3->get('POST.sexo') != 'M' and $f3->get('POST.sexo') != 'f' and $f3->get('POST.sexo') != 'm' ) {
    $error = true;
    echo json_encode([
    'susses'=>false,
    'msg'=>'Debe Selecionar un sexo valido'
    ]); 
    exit;
}



if(!$error) {
         
    $result = $this->db->exec('INSERT INTO users (name,email,password,birthday,gender)  values(:nombre,:correo,:pass,:cumple,:sexo) ',
    Array(
       ':nombre'=>$this->f3->get('POST.nombre'),
       ':correo'=>$this->f3->get('POST.correo'),
       ':pass'=>md5($this->f3->get('POST.pass')),
       ':cumple'=>$this->f3->get('POST.cumple'),
       ':sexo'=>$this->f3->get('POST.sexo')
       ));                                  

    if ($result == 1) {
        echo json_encode([
            'susses'=>true,
            'msg'=>'Usuario creado Correctamente'
                    ]);
    }else{
        echo json_encode([
            'susses'=>false,
            'msg'=>'Error guardando los cambios'
                    ]);       
    }
    
}


        }
        
        
        
        public function Actualizar($f3)
        {
            $audit = \Audit::instance(); // Validador| para validar el Correo
            // a pesar de que la validacion la hago en el Frond End / hago la Validacion por Requisito del documento            
$error = false;
if ($f3->get('POST.nombre') == '') {
    $error = true;
    echo json_encode([
    'susses'=>false,
    'msg'=>'Debe Digitar el Nombre'
    ]); 
    exit;
}
if ($audit->email($f3->get('POST.correo')) != 1 || $f3->get('POST.correo') == '' || self::ExistUser($f3->get('POST.correo'))) {
    $error = true;
    echo json_encode([
    'susses'=>false,
    'msg'=>'El correo es invalido o ya Existe una cuenta con este correo'
    ]); 
    exit;
}

if ($f3->get('POST.cumple') == '') {
    $error = true;
    echo json_encode([
    'susses'=>false,
    'msg'=>'Debe Digitar la fecha de nacimiento'
    ]); 
    exit;
}
if ($f3->get('POST.sexo') == '' ) {
    $error = true;
    echo json_encode([
    'susses'=>false,
    'msg'=>'Debe Selecionar un sexo valido'
    ]); 
    exit;
}
if ($f3->get('POST.sexo') != 'F' and $f3->get('POST.sexo') != 'M' and $f3->get('POST.sexo') != 'f' and $f3->get('POST.sexo') != 'm' ) {
    $error = true;
    echo json_encode([
    'susses'=>false,
    'msg'=>'Debe Selecionar un sexo valido'
    ]); 
    exit;
}

if(!$error) {
    $result = $this->db->exec('UPDATE users SET name = :nombre ,email = :correo ,birthday = :cumple ,gender = :sexo WHERE id = :id ',
    Array(
       ':id'=>$this->f3->get('POST.id'),
       ':nombre'=>$this->f3->get('POST.nombre'),
       ':correo'=>$this->f3->get('POST.correo'),
       ':cumple'=>$this->f3->get('POST.cumple'),
       ':sexo'=>$this->f3->get('POST.sexo')
       ));
if ($result == 1) {
    echo json_encode([
        'susses'=>true,
        'msg'=>'Usuario actualizado Correctamente'
                ]);             
            }else{
        echo json_encode([
            'susses'=>false,
            'msg'=>'Ha ocurrido un error insertando los datos'
                    ]);             
    }
}

           
 
    }
    public function Eliminar($f3)
    {
if ($f3->get('SESSION.token') == $f3->get('POST.token')) {
 
    $result = $this->db->exec('DELETE FROM users WHERE id = :id',
    Array(
        ':id'=>$this->f3->get('POST.id'),
    ));
    
    echo json_encode([
        'susses'=>true,
        'msg'=>'Usuario Eliminado Correctamente'
        ]);
    }else{
        echo json_encode([
            'susses'=>false,
            'msg'=>'Token incorrecto',
            'token'=>false
            ]);
            
    }
  
        
    }
    public function ExistUsuario($f3)
    {

        $result = $this->db->exec('SELECT email FROM users WHERE email = :correo',
        Array(
           ':correo'=>$this->f3->get('GET.email'),
           ));
  if ($f3 == '') {
return count($result); 
  }else{
      if(count($result) > 0){ $bol = true; }else{ $bol = false; };
      if(count($result) > 0){ $msg = 'Existe una Cuenta con este correo'; }else{ $msg = 'No existe cuenta con este correo'; }
      echo json_encode([
      'susses'=>$bol,
      'msg'=>$msg
      ]);
  }
   }
    public function ExistUser($f3)
    {

        $result = $this->db->exec('SELECT email FROM users WHERE email = :correo',
        Array(
           ':correo'=>$this->f3->get('GET.email'),
           ));
  if ($f3 == '') {
return count($result); 
  } 
   }

   public function CerrarSession($f3)
   {
    $f3->clear('SESSION.token');
    }


}// Fin UserController


?>