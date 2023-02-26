<?php
    if(isset($_POST['conf_pres-not'])){
        $_POST['nome'] = ucwords(strtolower($_POST['nome']));
        $_POST['email'] = strtolower($_POST['email']);
        $_POST['data_hora'] = date('Y-m-d H:i:s');
        $_POST['ip'] = $_SERVER['REMOTE_ADDR'];
        $_POST['nome_tabela-not'] = 'tb_sys_site.inscricao';
        $_POST['identificacao'] = rand(0,9).''.rand(0,9).''.rand(0,9).''.rand(0,9);
        $_POST['presence'] = 0;

        $rest_vaga = count(Painel::selectAll($_POST['nome_tabela-not'])) === 130;

        if($rest_vaga){
            $result = [
                'type' => 'error',
                'msg' => 'Opa... Parece que você Atingimos o máximo de pessoas no evento... ',
                'span' => 'Você pode entrar em contato para saber mais.',
                'suport' => true,
                'qtd' => $rest_vaga
            ];
            echo json_encode($result);
            die();
        }else{
            // Verificando se há campos vázios
            if($_POST['nome'] == '' || $_POST['email'] == '' || $_POST['telefone'] == ''){
                $result = [
                    'type' => 'error',
                    'msg' => 'Preencha todos os campos obrigatorios...',
                    'span' => '',
                    'suport' => false,
                    'qtd' => count(Painel::selectAll($_POST['nome_tabela-not'])) === 5
                ];
                echo json_encode($result);
                die();
            }else{
                $mail = new Email( // Chamando função para envio de e-mail
                    'smtp.titan.email',
                    'vozesqueclamam@valdeansouza.com',
                    'vQC2023',
                    'Vozes que Clamam'
                );
    
                if(Painel::userExists($_POST['email'], $_POST['nome_tabela-not'], 'email') || Painel::userExists($_POST['telefone'], $_POST['nome_tabela-not'], 'telefone')){
                    if(Painel::userExists($_POST['nome'], $_POST['nome_tabela-not'], 'nome')){
                        $result = [
                            'type' => 'error',
                            'msg' => 'Opa... Parece que você já confirmou sua presença...! ',
                            'span' => 'Caso não tenha, entre em contato...',
                            'suport' => true,
                            'qtd' => count(Painel::selectAll($_POST['nome_tabela-not'])) === 5
                        ];
                        echo json_encode($result);
                        die();
                    }else{
                        echo Painel::insertPost($mail, $_POST);
                        die();
                    }
                }else{
                    echo Painel::insertPost($mail, $_POST);
                    die();
                }
    
            }
        }



        echo json_encode($_POST);
    }
?>