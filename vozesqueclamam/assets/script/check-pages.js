// functions consts
const currentPage = (page = '', title = '', popstate = false) => {
    page = page == '' ? 'home' : page;

    url = $.inArray(page, TARGET_PAGES) == -1 ? '404' : page
    console.log(page)
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
        if($(this).attr(atributo).split(include_path).length == 1){
            $(this).attr(atributo, `${include_path}${$(this).attr(atributo)}`);
        }
    });
}