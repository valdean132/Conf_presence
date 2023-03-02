<?php

    include('../../config.php');  
    if(isset($_POST['table'])){

        $porPagina = $_POST['qtgPg'];
        $tabela = $_POST['table'];
        $order = $_POST['order'];
        $where = isset($_POST['where']) ? 'WHERE '. $_POST['where'] : '';
        $paginaAtual = (int)$_POST['pg'];

        $qtdPages = ceil(count(Painel::selectAll($tabela, $order, $where)) / $porPagina);

        if(($qtdPages < (int)$_POST['pg'])){
            $paginaAtual = ceil(count(Painel::selectAll($tabela, $order, $where)) / $porPagina);
        }


        $result = [
            'registros' => Painel::selectAll($tabela, $order, $where, ($paginaAtual - 1) * $porPagina, $porPagina),
            'qtdPages' => $qtdPages,
            'idSession' => $_SESSION['id_user'],
            'table' => $tabela
        ];
    }

    echo json_encode($result);

?>