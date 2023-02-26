<?php
    include('./config.php');

    if(isset($_POST['conf_pres-not'])){
        include('./assets/ajax/inscricao.php');
    }
    if(isset($_POST['verifica_vaga'])){
        include('./assets/ajax/verification.php');
    }


    die();
?>