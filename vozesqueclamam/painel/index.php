<?php
    include('./config.php');

    if(Diretorios::logado() === false){
        include('login.php');
    }else{
        include('main.php');
    }
?>