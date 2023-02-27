<?php

    class Diretorios{
        
        /* Função para verificar se logado */
        public static function logado(){
            // Pós criação de banco de dados e base de usuário adicionar:
            return isset($_SESSION['login']) ? true : false;
        }
        
        // Sair da Sessão
        public static function loggout($urlatual){
            setcookie('lembrarConexao', 'true', time()-1, '/');
            session_destroy();

            $url = explode(INCLUDE_PATH, $urlatual);
            
            INCLUDE_PATH == $urlatual ? header('Location: '.INCLUDE_PATH) : header('Location: '.$url[1]);

        }

        // Função para Carregamento de páginas Dinâmicas.
        public static function loadPage(){
            if(isset($_GET['url'])){

                // Pegando valor da URL
                $url = explode('/', $_GET['url']);

                if(file_exists('assets/pages/'.$url[0].'.php')){
                    // Se A página existir
                    include('assets/pages/'.$url[0].'.php');
                }else{
                    // Se a Página não existir
                    include('assets/pages/404.php');
                }
            }else{
                // Caso não exista nada na URL
                include('assets/pages/home.php');
            }
        }

        // Função para titulo das Páginas conforme as Selecionadas
        public static function titlePage(){
            if(isset($_GET['url'])){
                // Pegando valor da URL
                $url = explode('/', $_GET['url']);

                if(file_exists('assets/pages/'.$url[0].'.php')){
                    // Se A página existir
                    if($url[0] == 'home')
                        return ['bi-ui-checks', 'painel de controle', $url[0]];

                    if($url[0] == 'profile')
                        return ['person-lines-fill', 'Meus Dados', $url[0]];

                }else{
                    // Se a Página não existir
                    return ['exclamation-triangle', 'Error 404', '404'];
                }
            }else{
                // Caso não exista nada na URL
                return ['bi-ui-checks', 'painel de controle', 'home'];
            }
        }

        // Seleção de Menu
        public static function selecionadoMenu($par){
            $url = explode('/',@$_GET['url'])[0];

            if($url == '' && $par == 'home'){ // Caso esteja na tela de resumos
                return 'active';
            }else if($url == $par){ // Caso esteja em outras telas
                return 'active';
            }
        }
    }
?>

