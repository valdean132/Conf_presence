<?php
    if(isset($_COOKIE['lembrarConexao'])){
        $user = $_COOKIE['user'];
        $password = $_COOKIE['password'];

        $sql = MySql::conectar()->prepare("SELECT * FROM `tb_sys_admin.user` WHERE user = ? AND password = ?");
        $sql->execute(array($user, $password));

        if($sql->rowCount() == 1){
            $info = $sql->fetch();

            if($info['status'] == 'Ativo'){
                $_SESSION['login'] = true;
                $_SESSION['user'] = $user;
                $_SESSION['password'] = $password;
                $_SESSION['id_user'] = $info['id_user'];
                $_SESSION['nome'] = $info['nome'];
                $_SESSION['img'] = $info['photo_user'];
                $_SESSION['nome_tabela'] = 'tb_sys_admin.user';
                if(isset($_POST['lembrarConexao'])){
                    setcookie('lembrarConexao', true, time()+(12), '/');
                    setcookie('user', $user, time()+(12), '/');
                    setcookie('password', $password, time()+(12), '/');
                }
                header('Location: '.INCLUDE_PATH_ATUAL);
                die();
            }else{
                $height = 'auto';
                $boxAlert = Painel::boxMsg('error', 'Sua Conta Está Desativada!!!', '</br>Contate o Administrador para mais informações');
                $userValue = $user;
                $passwordValue = '';
            }

        }
    }
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="sortcut icon" href="<?php echo INCLUDE_PATH_D; ?>images/logo.png">

    <title>Login</title>
    <!--===== Main CSS =====-->
    <link rel="stylesheet" href="<?php echo INCLUDE_PATH_D; ?>styles/login.css">
    <!--===== Material Icons =====-->
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
</head>
<body>
    <?php
        $height = '';
        $boxAlert = '';
        $userValue = '';
        $passwordValue = '';
        if(isset($_POST['acao'])){
            $user = $_POST['user'];
            $password = md5($_POST['password']);
            if($user === '' && $password === ''){
                $height = 'auto';
                $boxAlert = Painel::boxMsg('error', 'Todos os campos devem ser preenchidos!!!');
                $userValue = $user;
                $passwordValue = $password;
            }else{
                $sql = MySql::conectar()->prepare("SELECT * FROM `tb_sys_admin.user` WHERE login = ? AND password = ?");
                $sql->execute(array($user, $password));
                if($sql->rowCount() == 1){
                    $info = $sql->fetch();

                    if($info['status'] == 'Ativo'){
                        $_SESSION['login'] = true;
                        $_SESSION['user'] = $user;
                        $_SESSION['password'] = $password;
                        $_SESSION['id_user'] = $info['id_user'];
                        $_SESSION['nome'] = $info['nome'];
                        $_SESSION['img'] = $info['photo_user'];
                        $_SESSION['nome_tabela'] = 'tb_sys_admin.user';
                        if(isset($_POST['lembrarConexao'])){
                            setcookie('lembrarConexao', true, time()+(12), '/');
                            setcookie('user', $user, time()+(12), '/');
                            setcookie('password', $password, time()+(12), '/');
                        }
                        header('Location: '.INCLUDE_PATH_ATUAL);
                        die();
                    }else{
                        $height = 'auto';
                        $boxAlert = Painel::boxMsg('error', 'Sua Conta Está Desativada!!!', '</br>Contate o Administrador para mais informações');
                        $userValue = $user;
                        $passwordValue = '';
                    }
                    
                }else{
                    $height = 'auto';
                    $boxAlert = Painel::boxMsg('error', 'Usuário ou Senha Incorretos!!!', '</br>Tente novamente');
                    $userValue = $user;
                    $passwordValue = '';
                }
            }
        }
    ?>
    <!--===== Home Start ======-->
    <section>
        <div class="container">
            <div class="row full-screen align-items-center">
                <div class="box-main">
                    <div class="form">
                        <div class="text-center">
                            <div class="div-form-valid box-alert-container" style="height: <?php echo $height; ?>">
                                <?php echo $boxAlert; ?>
                            </div><!-- Verificar Alerta-->
                            <div class="card-3d-wrap">
                                <div class="card-3d-wrapper">
                                    <form class="card-front" method="POST">
                                        <div class="center-wrap">
                                            <h4 class="heading">Acessar Painel</h4>
                                            <div class="form-group">
                                                <input type="text" value="<?php echo $userValue?>" class="form-style" id="user" name="user" placeholder="Seu E-mail" autocomplete="off">
                                                <label for="user" class="input-icon material-icons">alternate_email</label>
                                            </div>
                                            <div class="form-group">
                                                <input type="password" value="<?php echo $passwordValue?>" class="form-style" id="password" name="password" placeholder="Sua Senha" autocomplete="off">
                                                <label for="password" class="input-icon material-icons">lock</label>
                                                <div class="icon-showPassword material-icons"></div>
                                            </div>

                                            <div class="box-lembre">
                                                <div class="wrapper-lembre lembrar-user">
                                                    <input type="checkbox" name="lembrarConexao" id="lembrar-user">

                                                    <label for="lembrar-user" class="caixinha-box-input">
                                                        <div class="after-lembrete"></div>
                                                    </label>
                                                    <label for="lembrar-user">Manter conectado</label>
                                                </div><!-- Lembrar Usuário -->
                                                <div class="wrapper-lembre lembrar-login">
                                                    <input type="checkbox" id="lembrar-login">
                                                    <label for="lembrar-login" class="caixinha-box-input wrapper-lembrar-label">
                                                        <div class="after-lembrete"></div>
                                                    </label>
                                                    <label for="lembrar-login" class="wrapper-lembrar-label">Lembrar Login</label>
                                                </div><!-- Lembrar Login -->
                                            </div><!-- Box User -->
                                            <input type="submit" class="btn" name="acao" value="Entrar">
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!--===== Home End ======-->

    <!--===== Scripts ======-->
    <script src="<?php echo INCLUDE_PATH_D; ?>js/jquery.min.js"></script><!-- Jquery -->
    <script src="<?php echo INCLUDE_PATH_D; ?>js/constants.js"></script><!-- Variaveis Constantes do Script -->
    <script src="<?php echo INCLUDE_PATH_D; ?>js/login.js"></script><!-- Animações de Login e configurações -->
</body>
</html>