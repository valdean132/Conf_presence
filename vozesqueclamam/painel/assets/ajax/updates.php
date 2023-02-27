<?php

    include('../../config.php');  
    if(isset($_POST['acao-not'])){
        if($_POST['acao-not'] == 'update-contato'){
            Painel::update($_POST, 'id');
            die(json_encode($_POST['acao-not']));
        }
    }

?>