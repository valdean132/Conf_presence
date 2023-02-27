<?php

    include('../../config.php');  

    if(isset($_FILES['photo_user'])){

        // Pegando Informações para salvar imagem
        $idUser = $_SESSION['id_user'];
        $imgAtual = $_SESSION['img'];
        $nome_tabela = $_SESSION['nome_tabela'];
        $img = $_FILES['photo_user'];

        // Salvando a Imagem na pasta uploads
        $imgName = Painel::uploadFile($img);

        // encapisulando informações para enviar tudo de uma vez
        $conjuntoEnv = [
            'nome_tabela-not' => $nome_tabela,
            'id_user-not' => $idUser,
            'photo_user' => $imgName,
        ];


        if($imgName != false){ /* Caso não haja erro ao salvar imagem */
            if(!Painel::update($conjuntoEnv, 'id_user')){ /* Caso não haja erro ao salvar no banco de dados */
                $result = [
                    'type' => 'success',
                    'msg' => 'Imagem enviado com sucesso',
                    'span' => ''
                ];

                if($imgAtual != null || $imgAtual != '')
                    Painel::deleteFile($imgAtual, 'image/jpeg');
                
                $_SESSION['img'] = $imgName;
            }else{ /* Caso haja erro ao salver no banco de dados */
                $result = [
                    'type' => 'error',
                    'msg' => 'Erro ao enviar Imagem! ',
                    'span' => 'Tenten novamente mais tarde... Se continuar contate o suport.'
                ];

                Painel::deleteFile($imgName, 'image/jpeg');
            }
        }else{ /* Caso haja erro ao salvar imagem */
            $result = [
                'type' => 'error',
                'msg' => 'Erro ao salvar Imagem! ',
                'span' => 'Tenten novamente mais tarde... Se continuar contate o suport.'
            ];
        }
    }else{ /* Casso haja erro ao receber informações do ajax */
        $result = [
            'type' => 'error',
            'msg' => 'Chegamos aqui ',
            'span' => 'Tenten novamente mais tarde... Se continuar contate o suport.'
        ];
    }

    // Retornando mensagem.
    echo json_encode($result);

?>