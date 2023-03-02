/* Funções constantes */
// Função Ajax para puxar dados dinamicamentes do banco de dados
const ajaxDinamic = (page, type, infoTag, boxMostrar, boxLoading, adcionais = null) => {
    $.ajax({
        url: `${include_path}assets/ajax/${page}.php`,
        type: type,
        data: infoTag,
        dataType:'json',
        async: true,
        beforeSend: function(){
            // Mostrando Box de Loading
            if(page == 'imgUser')
                loadingBox(boxLoading, 'flex');
            else if(page == 'nameUser'){
                if(adcionais == 'inputs'){
                    boxMostrar.map(function(){
                        $(this).val('Carregando...');
                    });
                }else{
                    boxMostrar.nameMain.text(`Carregando...`)
                }
            }
            else if(boxLoading == '')
                '';
            else
                loadingBox(boxLoading, '1', 'block');
        },
        error: function(xhr) {
            boxAvisos('error', 'Ocorreu um Erro inesperado!!! ', 'Clique e contate o suporte', true, suport);
            console.log(xhr.responseText);
        },
        success: function(data){            
            if(page == 'imgUser')
                imgPhotoUser(data, boxMostrar, boxLoading);
            
            if(page == 'nameUser')
                nameUserBox(data, boxMostrar, adcionais);
            
            if(page == 'summary')
                summaryAndTables(data, boxMostrar, boxLoading, adcionais);
            
            // if(page == 'registered' || page == 'registerSearch')
            //     registeredViews(data, boxMostrar, boxLoading)
            
        }
    });
}

// Função para mostrar a foto do Usuario
const imgPhotoUser = (data, boxMostrar, boxLoading) => {
    // Convertendo para array
    let result = data;
    let copyElemenImg = '';

    let removeImg = boxMostrar.find('.remove-img-user');

    removeImg.remove();

    // Criando Div
    if(result.imgUser == null || result.imgUser == ''){
        copyElemenImg += `
            <div class="avatar-usuario pointer-events-none display-center w100 h100 position-absolute remove-img-user" title="${result.nomeUser}"></div>
        `;
    }else{
        copyElemenImg += `
            <div class="imagem-usuario pointer-events-none display-center w100 h100 position-absolute transition remove-img-user" 
                style="background-image: url('${include_path}assets/uploads/image/${result.imgUser}');" 
                title="${result.nomeUser}" alt="${result.nomeUser}">
            </div>
        `;
    }
    boxMostrar.append(copyElemenImg);

    // Escondendo Box de loading
    loadingBox(boxLoading, 'none');
}

// Função para os dados do usuário conforme seu login
const nameUserBox = (data, boxMostrar, adcionais) => {
    let result = data;

    if(adcionais == 'inputs'){ // Caso seja inputs colocar os devidos dados
        boxMostrar.each(function(){
            let inputAttrName = $(this).attr('name').substr(-4) == '-not' ? $(this).attr('name').replace('-not', '') : $(this).attr('name');

            if(inputAttrName == 'pass_atual' ||
                inputAttrName == 'pass_new'  ||
                inputAttrName == 'pass_conf'
            ){
                $(this).val('');
            }

            for(let k in result){
                if(inputAttrName == k){
                    $(this).val(result[k]);

                    if(inputAttrName == 'contato')
                        $(this).mask('(00) 00000-0000', {reverse: false});
                    if(inputAttrName == 'data_nasc')
                        maskNumber($(this));
                }
            }
        });
    }else{ // Caso não seja
        // Separando nome
        let namePri = result.nome.split(' ')[0];
        let nameUlt = result.nome.split(' ')[result.nome.split(' ').length -1];
    
        // mostrando na tela
        boxMostrar.nameMain.text(`${namePri} ${nameUlt}`);
    }
}


/* Executando Função apenas em suas respesquitivas páginas */
$(function(){
    let urlAtual = pegaPagina($(location).attr('href'));

    if(urlAtual == 'profile'){
        viewsInputUser(); // Chamando função para mostrar os dados do usuário logado
    }

    // Funções Gerais
    viewsPhotoUser(); // Função para mosrar a imagem ou o avatar do usuário.
    viewsAllTables(); // Função para mostrar os dados da tabela em geral
});


/* Declarando Funções */
// Função para mostrar a imagem ou o Icone do usuario
function viewsPhotoUser(){
    // Variaveis de Apoio
    let boxUserImg = $('.views-user-photo');
    
    let boxLoad = boxUserImg.find('.box-loading');

    ajaxDinamic('imgUser', 'POST', 'photo=userImg', boxUserImg, boxLoad);
}

// Função para mostrar o nome do usuário e seu cargo
function viewsInputUser(){
    // Variaveis de Apoio
    let boxInputUser = $('input[input_type="user"]');

    ajaxDinamic('nameUser', 'POST', 'name=nameUser', boxInputUser, '', 'inputs');
}

// Função para mostrar o nome do usuário e seu cargo
function viewsNameUser(){
    // Variaveis de Apoio
    let boxUserName = {
        nameMain: $('.name-user')
    };

    ajaxDinamic('nameUser', 'POST', 'name=nameUser', boxUserName, '', 'box');
}

// Função para mostrar os dados das tabelas completas com páginação
function viewsAllTables(){
    pvAjax({
        url: `${include_path}assets/ajax/pagination.php`,
        table: 'tb_sys_site.inscricao',
        container: '.pagination',
        containTable: '[data-table="all-presence"]',
        idTable: 'all-presence',
        order: '`data_hora` ASC',
        where: '`presence` = 0',
        qtdPages: 8,
        // search: '[data-search="all-presence"]',
        events: () => {
            modalAdd();
        },
        styles: {
            'justify-content': 'center'
        }
    });
}