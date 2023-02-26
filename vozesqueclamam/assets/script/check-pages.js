// functions consts
const currentPage = (page = '', title = '', popstate = false) => {
    page = page == '' ? 'home' : page;

    url = $.inArray(page, TARGET_PAGES) == -1 ? '404' : page
    // console.log(page)
    $.ajax({
        url: `${include_path_d}pages/${url}.html`,
        type: 'GET',
        dataType: 'text',
        async: true,
        beforeSend: function(){
            $('[data-load="load-pages"]').removeClass('active');
        },
        success: function(response){
            CONTAINER_NEXT.html(response);

            // Incluindo estilo conforme a página mostrada.
            let stylePages = $("#styles_pages");
            stylePages.attr('href', `${stylePages.attr('href').split('-')[0]}-${url}.css`);

            $('.menu-header a').removeClass('active'); // Removendo e colocando active nos links atuais da página
            $('.menu-header a[realtime="'+page+'"]').addClass('active'); // Removendo e colocando active nos links atuais da página

            titleMain(`Vozes que Clamam ${title == '' ? '' : '||'} ${title}`); // Titulo da página

            if(!popstate){
                // Chamando funções dessa página
                if(page == 'home' || page == '')
                    window.history.pushState('', '', include_path+''); // Atualizando URL
                else
                    window.history.pushState('', '', include_path+page); // Atualizando URL
            }

            setTimeout(() => { // Escondendo container de load
                $(document).ready(function(){
                    $('[data-load="load-pages"]').addClass('active');

                    if(page == "home" || page == ''){
                        formOrAviso(true);
                    }
                });
            }, 500);

            addIncludPath('src');
            addIncludPath('href');

            
        },
        error: function(response){
            console.log(response)
        }
    });
}

// Chamada de funções
currentPage(pegaPagina($(location).attr('href')));

// Eventos da página
$('[realtime]').click(function(){ // Evento de clik dos menus e links das para as páginas internas
    let pageLink = $(this).attr('realtime');
    let pageAtual = pegaPagina($(location).attr('href')) == '' ? 'home' : pegaPagina($(location).attr('href'));

    if(pageLink !== pageAtual){ // Verificando se página não é a mesma

        $('[data-load="load-pages"]').removeClass('active'); // Mostrando container de load das páginas
    
        setTimeout(() => { // Esperando 3 milisegunodos para chamar a página.
            currentPage(pageLink);
        }, 300);
    }

    return false;
});

$(window).on("popstate", function(event){ // Capiturando Evento de voltar e avançar do navegador
    if( !event.originalEvent.state ){
        let pageLink = event.originalEvent.target.location.pathname.split('/')[1];

        $('[data-load="load-pages"]').removeClass('active'); // Mostrando container de load das páginas
            
        setTimeout(() => { // Esperando 3 milisegunodos para chamar a página.
            currentPage(pageLink, '', true);
        }, 300);

    }
});

// Funções de apoio
function addIncludPath(atributo){ // Função para atribuir caminho geral aos links
    $('['+atributo+']').each(function(){ // Verificando se caminho já não está atribuido.
        if($(this).attr('not-interno') == undefined){
            if($(this).attr(atributo).split(include_path).length == 1){
                $(this).attr(atributo, `${include_path}${$(this).attr(atributo)}`);
            }
        }
    });
}


function formOrAviso(mude){
    $.ajax({
        url: `${include_path}assets/backend/index.php`,
        type: 'POST',
        data: 'verifica_vaga',
        dataType:'json',
        async: true,
        error: function(data){
            boxAvisos('error', 'Ocorreu um Erro inesperado!!! ', 'Clique e contate o suporte', true, suport);
            console.log(data.responseText);
        },
        success: function(data){
            let contain = $('.conf-presence');
            
            if(mude){
                contain.empty();
    
                if(!data.type){
                    contain.html(`
                        <div class="aviso-esgotado show transition">
                            <div class="icon-aviso">
                                <i class="bi bi-exclamation-triangle-fill"></i>
                            </div>
                            <div class="aviso-msg">
                                <h3>Ops, parece que atingimos o número máximo de público...</h3>
                                <h4>Não se preocupe, sempre teremos uma proxima.</h4>
                            </div>
                            <div class="aviso-contat">
                                <p>Você pode entrar em contato para saber mais.</p>
                                <a href="https://wa.me/5592994465702" not-interno target="_blank" class="transition" title="Entre em contato">
                                    <i class="bi bi-whatsapp"></i>
                                </a>
                            </div>
                        </div>
                    `);
    
                    setTimeout(() => {
                        $('.aviso-esgotado').removeClass('show');
                    }, 100);
                }else{
                    contain.html(`
                        <div class="contain-form show transition">
                            <h2>Confirme sua Presença</h2>
                            <form action="" method="POST">
                                <div class="form-box-single-inputs">
                                    <div class="box-form-uniq focus transition">
                                        <label for="nome" class="label-info transition user-select-none">Nome: <span>*</span></label>
                                        <label for="nome" class="label-icon transition user-select-none"><i class="bi bi-person"></i></label>
                                        <input 
                                            type="text" 
                                            id="nome" 
                                            placeholder="Nome Sobrenome" 
                                            class="transition"
                                            name="nome"
                                            valid-name="nome"
                                            not-null
                                            autocomplete="off"
                                            required
                                            autofocus
                                            permission_alter="1"
                                        >
                                        <div class="icon-input-attention transition">
                                            <i class="bi-exclamation-circle"></i>
                                            <div class="aviso-input user-select-none"></div>
                                        </div>
                                    </div>
                                    <div class="box-form-uniq transition">
                                        <label for="email" class="label-info transition user-select-none">E-mail: <span>*</span></label>
                                        <label for="email" class="label-icon transition user-select-none"><i class="bi bi-envelope"></i></label>
                                        <input 
                                            type="text" 
                                            id="email" 
                                            placeholder="seu@email.com" 
                                            class="transition"
                                            name="email"
                                            valid-contato="email"
                                            not-null
                                            autocomplete="off"
                                            required
                                            permission_alter="1"
                                        >
                                        <div class="icon-input-attention transition">
                                            <i class="bi-exclamation-circle"></i>
                                            <div class="aviso-input user-select-none"></div>
                                        </div>
                                    </div>
                                    <div class="box-form-uniq transition">
                                        <label for="telefone" class="label-info transition user-select-none">Telefone: <span>*</span></label>
                                        <label for="telefone" class="label-icon transition user-select-none"><i class="bi bi-whatsapp"></i></label>
                                        <input 
                                            type="text" 
                                            id="telefone" 
                                            placeholder="(99) 99999-9999" 
                                            mask_number="celular"
                                            class="transition"
                                            name="telefone"
                                            valid-contato="celular"
                                            not-null
                                            autocomplete="off"
                                            required
                                            permission_alter="1"
                                        >
                                        <div class="icon-input-attention transition">
                                            <i class="bi-exclamation-circle"></i>
                                            <div class="aviso-input user-select-none"></div>
                                        </div>
                                    </div>
                                </div>
                        
                                <div class="btn-submit">
                                    <button type="submit" permission_alter="1" class="cursor-pointer transition" name="conf_pres-not">
                                        <span>Confirmar presença</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    `);
    
                    setTimeout(() => {
                        $('.contain-form').removeClass('show');
                        validForm();
                    }, 100);
    
                }   
            }
            // Contagem de vagas
            if(data.qtd === 0){
                $('[data-vaga="vaga"]').html('As vagas esgotaram');
                $('[data-vaga="vaga"]').css('color', '#EE4444')
            }else{
                $('[data-vaga="vaga"]').find('span').text(data.qtd);
            }

            // Contando dias
            $('.dias_restantes').countdown('2023/03/04 19:00:00', function(event) {
                $(this).html(event.strftime('Faltam <span >%D Dias</span>, <span>%H Horas</span> e <span>%M minutos</span> para começar'));
            });
        }
    });
}