<?php

    class Painel{

        // Mensagem de alerta
        public static function boxMsg($type, $msg, $span = null){
            return '<div class="box-alert '.$type.'"><p>'.$msg.' <span>'.$span.'</span></p></div>';
        }

        // Salvando Arquivos
        public static function uploadFile($file){
            $formatoArquivo = explode('.',$file['name']);
            $fileNome = uniqid().'.'.$formatoArquivo[count($formatoArquivo) - 1];

            if($file['type'] == 'image/jpeg' || 
                $file['type'] == 'image/jpg' || 
                $file['type'] == 'image/png'){ // Caso seja imagem
                
                if(move_uploaded_file($file['tmp_name'], BASE_DIR.'/assets/uploads/image/'.$fileNome)){
                    return $fileNome;
                }else{
                    return false;
                }
            }else{ // Caso seja documentos
                if(move_uploaded_file($file['tmp_name'], BASE_DIR.'/assets/uploads/document/'.$fileNome)){
                    return $fileNome;
                }else{
                    return false;
                }
            }
        }

        // Deletar Arquivos
        public static function deleteFile($file, $type){
            if($type == 'image/jpeg' || 
                $type == 'image/jpg' || 
                $type == 'image/png'){ // Caso seja uma imagem
                @unlink(BASE_DIR.'/assets/uploads/image/'.$file);
            }else{ // Caso seja documentos
                @unlink(BASE_DIR.'/assets/uploads/document/'.$file);
            }
        }


        // Atualizando dinamicamente no banco de dados
        public static function update($arr, $condition = false, $single = false){
            $certo = true;
            $first = false;
            $nome_tabela = $arr['nome_tabela-not'];
            $query = "UPDATE `$nome_tabela` SET ";

            foreach($arr as $key => $value){
                $nome = $key;

                if(substr($nome, -4, 4) == '-not' || $nome == $condition)
                    continue;

                if($first == false){
                    $first = true;
                    $query.="`$nome`=?";
                }else{
                    $query.=",`$nome`=?";
                }
                $parametros[] = $value;
                
            }

            if($certo == true){
                if($single == false){
                    $parametros[] = $arr[$condition.'-not'];
                    $sql = MySql::conectar()->prepare("$query WHERE `$condition`=?");
                    $sql->execute($parametros);
                }else{
                    $sql = MySql::conectar()->prepare($query);
                    $sql->execute($parametros);
                }
            }
        }

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
        public static function selectAll($tabela, $order, $where = '', $start = null, $end = null){
            if($start == null && $end == null){
                $sql = MySql::conectar()->prepare("SELECT * FROM `$tabela` $where ORDER BY $order ");
            }else{
                $sql = MySql::conectar()->prepare("SELECT * FROM `$tabela` $where ORDER BY $order LIMIT $start, $end");
            }
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

        // Listas de Usuários OnLine
        public static function listerUserOnline(){
            self::clearUserOnline();
            $sql = MySql::conectar()->prepare("SELECT * FROM `tb_sys_admin.online`");
            $sql->execute();
            return $sql->fetchAll();
        }

        // Contador de Usuários Online
        public static function clearUserOnline(){
            $date = date('Y-m-d H:i:s');
            $sql = MySql::conectar()->exec("DELETE FROM `tb_sys_admin.online` WHERE `ultima_acao` < '$date' - INTERVAL 1 MINUTE");
        }

        // Contador de Visitas na Semana/Mês
        public static function contarVisitas(){
            $sql = MySql::conectar()->prepare("SELECT * FROM `tb_sys_admin.visita`");
            $sql->execute();
        
            return $sql->rowCount();
        }

        // Contador de Visitas no dia
        public static function contarVisitasDia(){
            $sql = MySql::conectar()->prepare("SELECT * FROM `tb_sys_admin.visita` WHERE dia = ?");
            $sql->execute((array(date('Y-m-d'))));
        
            return $sql->rowCount();
        }

    }

?>