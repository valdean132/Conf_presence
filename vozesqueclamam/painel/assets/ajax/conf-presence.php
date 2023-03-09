<?php

    include('../../config.php');  
    if(isset($_POST['id-not'])){
        $_POST['nome_tabela-not'] = 'tb_sys_site.inscricao';
        $_POST['presence'] = '1';

        $cont = count(Painel::selectAll($_POST['nome_tabela-not'], 'nome ASC', "WHERE id = ".$_POST['id-not']." AND presence = 1"));

        if($cont == 1){
            $result = [
                'type' => 'attention',
                'msg' => 'Participante já está presente',
                'span' => ''
            ];
        }else{
            if(!Painel::update($_POST, 'id')){
                $result = [
                    'type' => 'success',
                    'msg' => 'Presença confirmado com sucesso!',
                    'span' => ''
                ];
            }else{
                $result = [
                    'type' => 'error',
                    'msg' => 'Erro ao confirmar Presença ',
                    'span' => 'Tente novamente mais tarde... Se continuar contate o suport.'
                ];
            }
        }
    }

    echo json_encode($result);

?>