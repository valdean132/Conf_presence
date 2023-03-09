<?php
    if(isset($_GET['loggout'])){
        Diretorios::loggout($_GET['loggout']);
    }
?><html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#f6893b">

    <title>Painel - <?php echo ucfirst(Diretorios::titlePage()[2]); ?></title>

    <!--=== Link Interno - Css ===-->
    <link rel="stylesheet" href="<?php echo INCLUDE_PATH_D; ?>styles/reset.css"> <!-- CSS Reset -->
    <link rel="stylesheet" href="<?php echo INCLUDE_PATH_D; ?>styles/config.css"> <!-- CSS Config -->
    <link rel="stylesheet" href="<?php echo INCLUDE_PATH_D; ?>styles/bootstrap-icons.css"> <!-- CSS Bootstrap Icons -->
    <link rel="stylesheet" href="<?php echo INCLUDE_PATH_D; ?>styles/toastify.min.css"> <!-- CSS notification -->   
    <link rel="stylesheet" href="<?php echo INCLUDE_PATH_D; ?>styles/input-tag.css"> <!-- CSS notification -->   

    <link rel="stylesheet" href="<?php echo INCLUDE_PATH_D; ?>styles/table.css"> <!-- CSS Tabela -->
    <link rel="stylesheet" href="<?php echo INCLUDE_PATH_D; ?>styles/btn-paginations.css"> <!-- CSS Botões de paginação -->
    <link rel="stylesheet" href="<?php echo INCLUDE_PATH_D; ?>styles/form.css"> <!-- CSS Formulário -->
    <link rel="stylesheet" href="<?php echo INCLUDE_PATH_D; ?>styles/main.css"> <!-- CSS Main -->
    <link rel="stylesheet" href="<?php echo INCLUDE_PATH_D; ?>styles/page-<?php echo Diretorios::titlePage()[2]; ?>.css"> <!-- CSS Conforme página -->
    <link rel="stylesheet" href="<?php echo INCLUDE_PATH_D; ?>styles/media-query.css"> <!-- CSS Media Query -->

    <link rel="sortcut icon" href="<?php echo INCLUDE_PATH_D; ?>images/logo.png">
</head>
<body>
    <base base="<?php echo INCLUDE_PATH; ?>">

    <textarea class="copy-transf position-fixed" style="opacity: 0; pointer-events: none;"></textarea><!-- Area de Copia -->

    <div class="modal-main position-fixed w100 h100 display-center transition">
        <div class="contain-modal padd-1p border-r-20 bg-01 border-01">
            <div class="title-box w100 display-flex space-between align-items-center">
                <h3 class="marg-10" modal="title">Titulo do Modal</h3>
                <button class="close-modal marg-10 cursor-pointer transition" title="Feche o Modal"><i class="bi bi-x-lg"></i></button>
            </div>
        </div>
    </div><!-- Modal do Site -->
    
    <nav class="nav-lateral position-fixed h100-vh display-flex flex-column">
        <div class="logo-empresa display-center w100">
            <a href="<?php echo INCLUDE_PATH; ?>" class="display-center w100">
                <img src="<?php echo INCLUDE_PATH_D; ?>images/logo.png" class="transition" alt="">
            </a>
        </div><!-- Logo da Empresa -->
        <div class="main-nav display-flex flex-column w100 bg-02 shadow-01">
            <ul class="nav-ul w100 position-relative">
                <li class="<?php echo Diretorios::selecionadoMenu('home'); ?>">
                    <a href="<?php echo INCLUDE_PATH; ?>" class="menu-nav display-center position-relative padd-15 transition w100 h100">
                        <i class="bi bi-ui-checks"></i>
                        <span class="position-absolute w-auto padd-4p pointer-events-none transition">Inicial</span>
                    </a>
                </li>
                <li class="<?php echo Diretorios::selecionadoMenu('presence-conf'); ?>">
                    <a href="presence-conf" class="menu-nav display-center position-relative padd-15 transition w100 h100">
                        <i class="bi bi-person-lines-fill"></i>
                        <span class="position-absolute w-auto padd-4p pointer-events-none transition">Confirmados</span>
                    </a>
                </li>
            </ul><!-- Links de Navegação Principal -->
            <div class="btn-exit w100 display-center">
                <a href="<?php echo INCLUDE_PATH; ?>?loggout=<?php echo INCLUDE_PATH_ATUAL; ?>" class="display-center position-relative padd-15 transition"><i class="bi bi-box-arrow-right"></i></a>
            </div><!-- Link para sair do sistema -->
        </div><!-- Navegação principal -->
    </nav><!-- Navegação Lateral -->
    <header class="header-main bg-01 position-fixed display-flex space-between">
        <div class="title-header h100 padd-15 display-flex align-items-center">
            <h1 class="text-capitalize cursor-pointer">
                <i class="bi bi-<?php echo Diretorios::titlePage()[0]; ?>"></i> <?php echo Diretorios::titlePage()[1]; ?>
            </h1>
        </div><!-- Titulo da Página -->
        <div class="btns-user-header h100 display-flex justify-end align-items-center padd-30">
            <div class="nav-user h100 display-center position-relative">
                <div class="box-user-btn display-flex align-items-center cursor-pointer">
                    <div class="img-user views-user-photo position-relative display-center overflow-hidden">
                        <div class="avatar-usuario pointer-events-none display-center w100 h100 position-absolute remove-img-user" title="<?php echo $_SESSION['nome']; ?>"></div>
                    </div><!-- Imagem do Usuário -->
                    <h3 class="name-user marg-10 text-capitalize"><?php echo explode(' ', $_SESSION['nome'])[0]; ?> <?php $nome = explode(' ', $_SESSION['nome']); echo $nome[count($nome) -1]; ?></h3>
                    <i class="bi bi-caret-down row-user transition"></i>
                </div><!-- Info user -->
                <nav class="menu-user position-absolute shadow-02 transition">
                    <ul class="w100 h100 border-01 bg-02 border-r-10">
                        <li class="<?php echo Diretorios::selecionadoMenu('profile'); ?>">
                            <a href="profile" class="display-flex align-items-center w100 position-relative transition">
                                <i class="bi bi-person-lines-fill marg-10"></i>
                                <span>Meus Dados</span>
                            </a>
                        </li>
                    </ul>
                </nav><!-- Navegação de Usuário -->
            </div><!-- Navegação do usuário -->
        </div><!-- Botões do Header -->
    </header><!-- Header -->
    <main class="principal position-fixed">
        <?php Diretorios::loadPage(); ?>
    </main><!-- Campo Principal -->

    <!--=== Link Interno - Scripts ===-->
    <script src="<?php echo INCLUDE_PATH_D ?>js/jquery.min.js"></script> <!-- Jquery -->
    <script src="<?php echo INCLUDE_PATH_D ?>js/toastify.min.js"></script> <!-- Notification -->

    <script src="<?php echo INCLUDE_PATH_D ?>js/pvAjax.js"></script> <!-- Empilhamento de divs -->
    
    <script src="<?php echo INCLUDE_PATH_D ?>js/constants.js"></script> <!-- Constantes -->
    <script src="<?php echo INCLUDE_PATH_D ?>js/elements.js"></script> <!-- Elementos -->
    <script src="<?php echo INCLUDE_PATH_D ?>js/events.js"></script> <!-- Eventos -->
    <script src="<?php echo INCLUDE_PATH_D ?>js/conectionAjax.js"></script> <!-- Conexão Ajax -->
    <script src="<?php echo INCLUDE_PATH_D ?>js/form-env.js"></script> <!-- Eventos -->
    <script src="<?php echo INCLUDE_PATH_D ?>js/tratamento-files.js"></script> <!-- Tratamento de Imagem -->
    <script src="<?php echo INCLUDE_PATH_D ?>js/event-modal-open.js"></script> <!-- Eventos que ocorrem dentro do modal -->
</body>
</html>