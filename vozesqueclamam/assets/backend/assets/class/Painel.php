<?php

    class Painel{
        // Inserindo depoimento no banco de dados
        public static function insert($arr){
            $certo = true;
            $first = false;
            $nome_tabela = $arr['nome_tabela-not'];
            $query = "INSERT INTO `$nome_tabela` (";
            
            foreach($arr as $key => $value){
                $nome = $key;

                if(substr($nome, -4, 4) == '-not' || substr($nome, -3, 3) == '-no')
                    continue;

                if($first == false){
                    $first = true;
                    $query.="`$nome`";
                }else{
                    $query.=",`$nome`";
                }
                
            }
            $first = false;
            $query.= ") VALUES (";

            foreach($arr as $key => $value){
                $nome = $key;

                if(substr($nome, -4, 4) == '-not' || substr($nome, -3, 3) == '-no')
                    continue;

                if($first == false){
                    $first = true;
                    $query.="?";
                }else{
                    $query.=",?";
                }
                $parametros[] = $value;
                
            }
            $query.=")";

            if($certo == true){
                $sql = MySql::conectar()->prepare($query);
                $sql->execute($parametros);

            }

            return $certo;
        }

        // Puxando do banco de dados
        public static function selectAll($tabela){
            $sql = MySql::conectar()->prepare("SELECT * FROM `$tabela`");
            $sql->execute();

            return $sql->fetchAll();
        }

        // Verificar se usuário já existe
        public static function userExists($user, $table, $column, $idUser = NULL){
            if($idUser == NULL){
                $sql = MySql::conectar()->prepare("SELECT `id` FROM `$table` WHERE `$column` = ?");
                $sql->execute(array($user));
            }else{
                $sql = MySql::conectar()->prepare("SELECT `id` FROM `$table` WHERE `$column` = ? AND id_user != ?");
                $sql->execute(array($user, $idUser));
            }
            if($sql->rowCount() == 1)
                return true;
            else
                return false;
        }

        // Deletar cadastros
        public static function deletar($tabela, $column = false, $value = false){
            if($value == false){
                $sql = MySql::conectar()->prepare("DELETE FROM `$tabela`");
            }else{
                $sql = MySql::conectar()->prepare("DELETE FROM `$tabela` WHERE `$column` = '$value'");
            }
            $sql->execute();
        }

        
        public static function insertPost($mail, $post){
            if(Painel::insert($post)){
                $values = [ // Criando Array para enviar para o Corpo de da mensagem
                    'nome' => explode(' ', $post['nome'])[0],
                    'identificacao' => $post['identificacao']
                ];

                $info = array( // Array com Assunto e corpo do e-mail retornado
                    'assunto' => 'Confirmação de contato...',
                    'corpo' => BaseHtml::confEmail($values)
                );

                $mail->addAdress($post['email'], explode(' ', $post['nome'])[0]); // Pegando nome do usuário e e-mail para fazer envio
                $mail->formatarEmail($info); // Formatando corpo para envio de formulário
        
                if($mail->enviarEmail()){ // Fazendo envio de e-mail e verificando se e-mail existe
                    $resultConf = [
                        'type' => 'success',
                        'msg' => 'Recebemos sua solicitação.',
                        'span' => 'Você receberá um e-mail confirmando sua presença em preve...',
                        'suport' => false,
                        'qtd' => count(Painel::selectAll($post['nome_tabela-not'])) === 2
                    ];
                    return json_encode($resultConf);
                }else{ // Se o E-mail não existir joga essa mensagem.
                    $result = [
                        'type' => 'error',
                        'msg' => 'E-mail informado é inválido! ',
                        'span' => 'Informe um e-mail valido e tente novamente...',
                        'suport' => false,
                        'inputError' => [
                            'name' => 'email',
                            'msgInput' => 'Informe um E-mail valido.'
                        ],
                        'qtd' => count(Painel::selectAll($post['nome_tabela-not'])) === 2
                    ];
                    Painel::deletar($post['nome_tabela-not'], 'identificacao', $post['identificacao']);
                    return json_encode($result);
                }
                

            }else{
                $result = [
                    'type' => 'error',
                    'msg' => 'Parece que ocorreu um erro inesperado. ',
                    'span' => 'Tente novamente, se persistir clique nessa mensagem...',
                    'suport' => true,
                    'qtd' => count(Painel::selectAll($post['nome_tabela-not'])) === 2
                ];
                return json_encode($result);
            }
        }

    }

?>