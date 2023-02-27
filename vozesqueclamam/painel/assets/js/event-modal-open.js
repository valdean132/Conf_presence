/* Funções constantes */
// Função Ajax para enviar os dados do formulároformulário
const ajaxEnvFormModal = (page, type, infoTag, msg, inputAcao = null) => {
    $.ajax({
        beforeSend: function(){
            boxAvisos('attention', msg, '', false);

            if(inputAcao != null){
                inputAcao.attr('disabled', true);
                inputAcao.val("Enviando dados...");
            }
        },
        url: `${include_path}assets/ajax/${page}.php`,
        type: type,
        data: infoTag,
        dataType:'json',
        async: false,
        error: function(data){
            console.log(data.responseText);
        },
        success: function(data){
            let result = data;
            
            if(result.type == 'error' || result.type == 'attention'){
                // Mostrando mensagem de sucesso e voltando ao nomral
                boxAvisos(result.type, result.icon, result.msg, result.span, true);
                if(inputAcao != null){
                    inputAcao.attr('disabled', false);
                }

                if(page == 'register-user' || page == 'register-entregaKit'){
                    inputAcao.val("Cadastrar");
                }
                if(page == 'verific-password'){
                    inputAcao.val("Verificar");
                }
                if(page == 'update-userG'){
                    inputAcao.val("Atualizar");
                }
            }else{
                if(data == 'update-contato'){
                    updateContato();
                }
            }
        }
    });
}

const updateContato = () => {
    viewsTable(); // Chamando função para mostrar os assuntos das tabelas do banco de dados
    viewsWecome(); // Chamando função para mostrar os assuntos no campo wecome

    $('[type-btn="copy"]').click(function(){
        let ElementCopy = Descripta($(this).attr('data-copy'));

        copyTranf(ElementCopy); // Copiando para Área de transferencia...

        return false;
    });
}

/* Declarando Funções */
