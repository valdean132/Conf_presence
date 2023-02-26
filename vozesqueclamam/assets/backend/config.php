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

    // Conexão com o banco de dados
    // define('HOST', '50.116.87.180');
    // define('USER', 'valdea89_vQC');
    // define('USERNAME','TH)*w75-%TEc');
    // define('DATABASE', 'valdea89_vozesqueclamam_painel');
    define('HOST', 'localhost');
    define('USER', 'root');
    define('USERNAME','');
    define('DATABASE', 'vozesqueclamam_painel');
?>