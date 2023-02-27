<?php

    include('../../config.php');  

    if(isset($_POST['acao-not'])){
        
        if(md5($_POST['pass_atual']) !== $_SESSION['password']){
            $result = [
                'type' => 'error',
                'msg' => 'Senha atual não confere com a do banco de dados',
                'span' => ''
            ];
        }else if(md5($_POST['pass_new'])  === $_SESSION['password']){
            $result = [
                'type' => 'attention',
                'msg' => 'Senha igual ao a do banco de dados... ',
                'span' => 'Nenhum dado foi alterado'
            ];
        }else{
            $env_form = [
                'password' => md5($_POST['pass_new']),
                'id_user-not' => $_POST['id_user-not'],
                'nome_tabela-not' => $_POST['nome_tabela-not']
            ];
            if(!Painel::update($env_form, 'id_user')){
                $result = [
                    'type' => 'success',
                    'msg' => 'Senha atualizada com sucesso.',
                    'span' => ''
                ];
                $_SESSION['password'] = md5($_POST['pass_new']);
            }else{
                $result = [
                    'type' => 'error',
                    'msg' => 'Erro ao atualizar os dados ',
                    'span' => 'Tenten novamente mais tarde... Se continuar contate o suport.'
                ];
            }
        }
    }

    echo json_encode($result);

?>