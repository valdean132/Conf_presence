/* Chamada de funções */

$(function(){ // Depois de carregamento de página
    toggleMenuUser(); // Chamada de função para mostrar menu de usuário
    menuSectionsShow(); // Chamada de função para mostrar containers conforme navegação de sessão
});


/* Funções */

function toggleMenuUser(){ // Função para mostrar menu de usuário
    // variaveis locais
    let btnUser = $('.box-user-btn');
    let menuUser = $('.menu-user');
    let active = 'active';

    // Click and Hover Event
    btnUser.click(conditionEventMenu);

    // funcção de apoio local
    function conditionEventMenu(){
        if(!menuUser.hasClass(active)){
            menuUser.addClass(active);
            btnUser.addClass(active);
        }else{
            menuUser.removeClass(active);
            btnUser.removeClass(active);
        }
    }
}

function menuSectionsShow(){ // Função para navegação das sessões
    // Variaveis Locais
    let btnLink = $('.nav-sections [realtime]');
    let containersShow = $('.show-containers');
    let active = 'active';

    // Função de Click
    btnLink.click(function(){
        // Mais Variaveis
        let thisContainer = $(`#${$(this).attr('realtime')}`);

        if(!$(this).parent().hasClass(active)){
            btnLink.parent().removeClass(active);
            containersShow.removeClass(active);
            
            $(this).parent().addClass(active)
    
            setTimeout(()=>{
                containersShow.css('display', 'none');
    
                thisContainer.css('display', 'block')
    
                setTimeout(()=>{
                    thisContainer.addClass(active);
                }, 100);
    
            }, 50);
        }

        return false;
    });
}

// Função de Evento para mostrar a tela de modal
function modalAdd(){
    // Variaveis de apoio
    let divModal = $('.modal-main');

    $('[type-btn="modal"]').click(function(e){
        //Variaveis Locais
        let btnClick = $(this);

        $("[modal='title']").text(btnClick.attr('type-title'))

        setTimeout(() => {
            divModal.addClass('active');
        }, 100);

        infoModal = {
            type: btnClick.attr('type-obj'),
            table: Descripta(btnClick.attr('type-table')),
            view: JSON.parse(Descripta(btnClick.attr('type-view')))
        }

        divModal.find('.contain-modal').append(modalElement(infoModal));

        if(infoModal.type == 'view-presence-all'){
            $('[type-btn="copy"]').click(function(){
                let ElementCopy = Descripta($(this).attr('data-copy'));
        
                copyTranf(ElementCopy); // Copiando para Área de transferencia...
        
                return false;
            });
        }

        
        if(btnClick.attr('type-obj') == 'add-user'){ // Alterar Id quando for um Para adcionar usuário;
            setTimeout(function(){btnClick.attr('type-id', getRandom(9999999999))});
            
            registerUser();
        }
        
        if(btnClick.attr('type-obj') == 'info-password'){
            validacaoPassword();
        }

        return false;
    });


    // Escluindo Modal clicando no Botão
    $('.close-modal').click(function(){
        removeModal();
    });

    // Excluindo Modal com tecla ESC
    $('body').keydown(function(e) {
        if($('.modal-main').hasClass('active')){
            if(e.keyCode === 27){
                removeModal();
            }
        }
    });

    // Funções de Apoio
    function removeModal(){ // Função para remover o modal e apagar os elementos dentro
        divModal.removeClass('active');

        setTimeout(()=>{
            $('.main-modal').remove();
        }, 100);
    }

}