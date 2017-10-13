<?php 

class Controller {
	protected $f3;
	protected $db;

    function __construct() {
        $f3=Base::instance();
        $db=new DB\SQL(
            'mysql:host=127.0.0.1;port=8889;dbname=prueba',
            'root',
            'root'
        );	
		$this->f3=$f3;
		$this->db=$db;
    }

public function Login($f3)
{
    $user = new \DB\SQL\Mapper($this->db, 'users');
    $auth = new \Auth($user, array('id'=>'email', 'pw'=>'password'));
    if($auth->login( $f3->get('POST.correo'), md5( $f3->get('POST.pass') ) ) ) {
$token = uniqid('token_');
        // guarda variable Token en session
        $f3->set('SESSION.token',$token);
echo json_encode([
    'susses'=>true,
    'token'=>$token
]);
    }else{
        echo json_encode([
            'susses'=>false,
            'msg'=>'Revisa el usuario y la clave'
        ]);
                
    }

}    
    
}


?>