<?php

    include('../../config.php');  
    
    if(isset($_POST['photo'])){
        $result = [
            'nomeUser' => $_SESSION['nome'], 
            'imgUser' => $_SESSION['img'] 
        ];
    }

    echo json_encode($result);

?>