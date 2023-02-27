<section class="profile w100 h100">
    <div class="main-profile display-flex overflow-hidden w100 h100 bg-02 shadow-02 border-01 border-r-20">
        <div class="menu-profile w30 h100">
            <div class="image-profile-user display-center w100">
                <div class="photo-box-whapper views-user-photo overflow-y-auto shadow-02 border-r-40 position-relative cursor-pointer">
                    <div class="box-loading position-absolute display-center w100 h100 transition">
                        <div class="spinner position-relative">
                            <div class="dot position-absolute display-flex align-items-end justify-center"></div>
                            <div class="dot position-absolute display-flex align-items-end justify-center"></div>
                            <div class="dot position-absolute display-flex align-items-end justify-center"></div>
                            <div class="dot position-absolute display-flex align-items-end justify-center"></div>
                            <div class="dot position-absolute display-flex align-items-end justify-center"></div>
                        </div>
                    </div>
                    <div class="alter-photo-perfil opacity-0 w100 h100 position-absolute transition">
                        <input 
                            type="file" 
                            accept="image/jpg, image/jpeg, image/png" 
                            name="photo_user"
                            title="Selecione um arquivo"
                            class="w100 h100 position-absolute cursor-pointer opacity-0"
                            id="photo_user"
                        >
                        <div class="alter-photo-info display-center flex-column w100 h100 position-absolute pointer-events-none">
                            <i class="bi bi-camera-fill"></i>
                            <p class="text-center padd-4p">Clique e selecione uma nova imagem</p>
                        </div><!-- Div de Informação -->
                    </div><!-- Campo para alterar a imagem -->
                </div><!-- Box -->
            </div><!-- Imagem de Perfil -->
            <nav class="nav-sections navegacao-profile overflow-y-auto w100">
                <ul class="w100 position-relative">
                    <li class="active">
                        <a href="" realtime="form-user" class="link-menu display-flex align-items-center position-relative padd-30 transition w100 h100">
                            <i class="bi bi-text-left transition"></i>
                            <span class="padd-4p pointer-events-none text-capitalize">Dados Pessoais</span>
                        </a>
                    </li>
                    <li class="">
                        <a href="" realtime="form-password" class="link-menu display-flex align-items-center position-relative padd-30 transition w100 h100">
                            <i class="bi bi-lock-fill transition"></i>
                            <span class="padd-4p pointer-events-none text-capitalize">Senha</span>
                        </a>
                    </li>
                </ul><!-- Links de Navegação Principal -->
            </nav><!-- Área de navegação -->
        </div><!-- Navegação da section -->
        <div class="form-profile w70 h100 bg-03">
            <div id="form-user" class="form-profile-user active show-containers w100 h100 display-block transition">
                <div class="form-profile-main overflow-y-auto w100 h100 padd-4p">
                    <div class="title-form text-capitalize w-auto marg-b-30">
                        <h3 class="">Sua Informações</h3>
                    </div><!-- Titulo -->
                    <form action="" form="dados-user" method="post" class="w100 display-center flex-column">
                        <div class="form-box-single-inputs w100 marg-t-10 display-flex space-between align-items-center flex-wrap">
                            <div class="box-form-uniq disabled position-relative display-flex flex-column fw-100 marg-b-10">
                                <label for="nome" class="text-capitalize user-select-none marg-b-10">Nome: <span>*</span></label>
                                <input 
                                    type="text" 
                                    id="nome" 
                                    placeholder="Nome Sobrenome" 
                                    class="bg-02 border-01 transition w100 padd-15"
                                    disabled
                                    name="nome"
                                    valid-name="nome"
                                    not-null
                                    value="Carregando..."
                                    autocomplete="off"
                                    required
                                    input_type="user"
                                    permission_alter="1"
                                >
                                <div class="icon-input-atention display-none w100 h100 position-absolute padd-15">
                                    <i class="bi position-absolute"></i>
                                    <div class="aviso-input user-select-none"></div>
                                </div>
                            </div><!-- Campo de input -->
                            <div class="box-form-uniq disabled position-relative display-flex flex-column fw-100 marg-b-10">
                                <label for="login" class="text-capitalize user-select-none marg-b-10">Login: <span>*</span></label>
                                <input 
                                    type="text" 
                                    placeholder="login" 
                                    class="bg-02 border-01 transition w100 padd-15"
                                    id="login"
                                    name="login"
                                    disabled
                                    not-null
                                    value="Carregando..."
                                    autocomplete="off"
                                    required
                                    input_type="user"
                                    permission_alter="1"
                                >
                                <div class="icon-input-atention display-none w100 h100 position-absolute padd-15">
                                    <i class="bi position-absolute"></i>
                                    <div class="aviso-input user-select-none"></div>
                                </div>
                            </div><!-- Campo de input -->
                        </div><!-- Campo de inputs -->

                        <div class="box-form-uniq display-none" >
                            <input type="hidden" input_type="user" permission_alter="1" name="nome_tabela-not" value="carregando...">
                            <input type="hidden" input_type="user" permission_alter="1" name="id_user-not" value="carregando...">
                        </div><!-- Campo Dos Inputs -->

                        <div class="btn-submit w100 display-flex justify-end marg-t-10">
                            <button type="submit" permission_alter="1" class="btn-01 cursor-pointer text-capitalize transition" name="alterar">
                                <i class="bi bi-arrow-repeat"></i> <span>Alterar dados</span>
                            </button>
                        </div>
                    </form><!-- Formulário -->
                </div><!-- Campo Principal do formulário -->
            </div><!-- Campo de formulário de dados do usuário -->
            <div id="form-password" class="form-profile-password show-containers w100 h100 display-none transition">
                <div class="form-profile-main overflow-y-auto w100 h100 padd-4p">
                    <div class="title-form text-capitalize w-auto marg-b-30">
                        <h3>Atualizar Senha</h3>
                    </div><!-- Titulo -->
                    <form action="" form="password" method="post" class="w100 display-flex space-between flex-wrap">
                        <div class="form-box-single-inputs fw-50 marg-t-10 display-flex flex-column">
                            <div class="box-form-uniq position-relative display-flex flex-column fw-100 marg-b-10">
                                <label for="pass_atual" class="text-capitalize user-select-none marg-b-10">Senha Atual: <span>*</span></label>
                                <input 
                                    type="password" 
                                    id="pass_atual" 
                                    placeholder="Senha Atual" 
                                    class="bg-02 border-01 transition w100 padd-15"
                                    name="pass_atual"
                                    not-null
                                    value="Carregando..."
                                    autocomplete="off"
                                    required
                                    input_type="user"
                                    permission_alter="1"
                                >
                                <div class="icon-input show-password display-none position-absolute display-center transition">
                                    <i class="bi cursor-pointer"></i>
                                </div><!-- Icone de mostrar e ocutar a senha -->
                                <div class="icon-input-atention display-none w100 h100 position-absolute padd-15">
                                    <i class="bi position-absolute"></i>
                                    <div class="aviso-input user-select-none"></div>
                                </div>
                            </div><!-- Campo de input -->
                            <div class="box-form-uniq position-relative display-flex flex-column fw-100 marg-b-10">
                                <label for="pass_new" class="text-capitalize user-select-none marg-b-10">Nova Senha: <span>*</span></label>
                                <input 
                                    type="password" 
                                    id="pass_new" 
                                    placeholder="Nova Senha" 
                                    class="bg-02 border-01 transition w100 padd-15"
                                    value="Carregando..."
                                    autocomplete="off"
                                    not-null
                                    name="pass_new"
                                    required
                                    input_type="user"
                                    permission_alter="1"
                                >
                                <div class="icon-input show-password display-none position-absolute display-center transition">
                                    <i class="bi cursor-pointer"></i>
                                </div><!-- Icone de mostrar e ocutar a senha -->
                                <div class="icon-input-atention display-none w100 h100 position-absolute padd-15">
                                    <i class="bi position-absolute"></i>
                                    <div class="aviso-input user-select-none"></div>
                                </div>
                            </div><!-- Campo de input -->
                            <div class="box-form-uniq position-relative display-flex flex-column fw-100 marg-b-10">
                                <label for="pass_conf" class="text-capitalize user-select-none marg-b-10">Confirme a senha: <span>*</span></label>
                                <input 
                                    type="password" 
                                    id="pass_conf" 
                                    placeholder="Confirme a nova senha" 
                                    class="bg-02 border-01 transition w100 padd-15"
                                    value="Carregando..."
                                    autocomplete="off"
                                    not-null
                                    name="pass_conf"
                                    required
                                    input_type="user"
                                    permission_alter="1"
                                >
                                <div class="icon-input show-password display-none position-absolute display-center transition">
                                    <i class="bi cursor-pointer"></i>
                                </div><!-- Icone de mostrar e ocutar a senha -->
                                <div class="icon-input-atention display-none w100 h100 position-absolute padd-15">
                                    <i class="bi position-absolute"></i>
                                    <div class="aviso-input user-select-none"></div>
                                </div>
                            </div><!-- Campo de input -->
                        </div><!-- Campo de inputs -->

                        <div class="box-form-uniq display-none" >
                            <input type="hidden" input_type="user" permission_alter="1" name="nome_tabela-not" value="carregando...">
                            <input type="hidden" input_type="user" permission_alter="1" name="id_user-not" value="carregando...">
                        </div><!-- Campo Dos Inputs -->

                        <div class="infoPassword padd-2p fw-50 user-select-none">
                            <div class="tetle-inform-password display-flex align-items-center">
                                <i class="bi bi-lock-fill"></i>
                                <h5 class="">Sua nova senha deve:</h5>
                            </div><!-- Titulo informativo -->
                            <div class="info-box-password padd-2p">
                                <div verificPass="1" class="info-password-whapper display-flex align-items-center transition">
                                    <i class="bi"></i>
                                    <p>Incluir caracteres maiúsculos e minúsculos</p>
                                </div><!-- Informação -->
                                <div verificPass="2" class="info-password-whapper display-flex align-items-center transition">
                                    <i class="bi"></i>
                                    <p>Incluir pelo menos 1 número</p>
                                </div><!-- Informação -->
                                <div verificPass="3" class="info-password-whapper display-flex align-items-center transition">
                                    <i class="bi"></i>
                                    <p>Incluir pelo menos 1 símbolo</p>
                                </div><!-- Informação -->
                                <div verificPass="4" class="info-password-whapper display-flex align-items-center transition">
                                    <i class="bi"></i>
                                    <p>Incluir pelo menos 8 caracteres</p>
                                </div><!-- Informação -->
                                <div verificPass="5" class="info-password-whapper display-flex align-items-center transition">
                                    <i class="bi"></i>
                                    <p>Ser a mesma em ambos os campos</p>
                                </div><!-- Informação -->
                            </div><!-- Informações -->
                        </div><!-- Box para informação de tipo de senha -->
                        <div class="btn-submit  w100 display-flex justify-end marg-t-10">
                            <button type="submit" permission_alter="1" disabled class="btn-01 cursor-pointer text-capitalize transition" name="acao-not">
                                <i class="bi bi-arrow-repeat"></i> <span>Atualizar</span>
                            </button>
                        </div>
                    </form><!-- Formulário -->
                </div><!-- Campo Principal do formulário -->
            </div><!-- Campo de formulário de senha do usuário -->
        </div><!-- Campo de formulários do usuário -->
    </div><!-- Campo Principal do profile -->
</section><!-- Sessão da Página de Perfil -->