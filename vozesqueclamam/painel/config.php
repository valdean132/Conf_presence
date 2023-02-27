<?php

    session_start();
    date_default_timezone_set('America/Manaus');

    $autoload = function($class){
        if($class == 'Email'){
            require_once('assets/class/PHPMailer/PHPMailerAutoload.php');
        }
        include('assets/class/'.$class.'.php'); 
    };

    spl_autoload_register($autoload);

    // Definindo Diretorios
    define('INCLUDE_PATH', 'http://vozesqueclamam.localhost/painel/'); // Diretorio Principal
    define('INCLUDE_PATH_D', INCLUDE_PATH.'assets/'); // Diretorio de arquivos
    define('INCLUDE_PATH_ATUAL', 'http://'.$_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI']); // Diretorio atual
    define('BASE_DIR', __DIR__); // Base para as acesso das pastas

    // Conexão com o banco de dados
    define('HOST', 'localhost');
    define('USER', 'root');
    define('USERNAME','');
    define('DATABASE', 'vozesqueclamam_painel');
?>