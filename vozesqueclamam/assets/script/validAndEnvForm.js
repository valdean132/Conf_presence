var iconLoad = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin:auto;background:transparent;display:block;" width="40px" height="40px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><path d="M14.1,7.5l8.1,0v14.7c0,0.6,0,1.2,0.1,1.7c-0.1-0.6-0.1-1.2-0.1-1.7V7.5c0,0,63.6,0,63.6,0h-8.1 c0,0,0,14.7,0,14.7c0,7-4.6,13.3-11.7,17.1c-4.2,2.3-6.8,5.9-6.8,9.8v1.9c0,3.9,2.5,7.6,6.8,9.8c7.1,3.8,11.7,10,11.7,17.1 c0,0,0,14.7,0,14.7h8.1h-8.1H50h18V82.3c0-3.8-2.6-7.4-7-9.8c-0.1,0-0.1-0.1-0.2-0.1c-6.6-3.6-14.9-3.6-21.5,0 c-0.1,0-0.1,0.1-0.2,0.1c-4.5,2.4-7,6-7,9.8l0,10.2h18c0,0-18,0-18,0H14.1l8.1,0V77.8c0-7,4.6-13.3,11.7-17.1 c4.2-2.3,6.8-5.9,6.8-9.8v-1.9c0-3.9-2.5-7.6-6.8-9.8c-6.5-3.5-10.9-9-11.6-15.3l9.9,0c0.7,3.1,3,5.9,6.8,8c5.7,3,9.5,7.7,10.9,12.9 c1.4-5.2,5.3-9.9,10.9-12.9c3.8-2,6.2-4.8,6.8-8H32.2" fill="none" stroke="#737174" stroke-width="3px" stroke-linecap="round" stroke-linejoin="round"><animate attributeName="stroke-dasharray" keyTimes="0;1" values="480 100;480 110" dur="3.2258064516129035s" repeatCount="indefinite" stroke="#737174" fill="none" stroke-width="3px"></animate><animate attributeName="stroke-dashoffset" keyTimes="0;1" values="0;-1180" dur="3.2258064516129035s" repeatCount="indefinite" stroke="#737174" fill="none" stroke-width="3px"></animate></path></svg>`;
var verificInputNull = [];

/* Funções constantes */
// Função Ajax para enviar os dados do formulároformulário
const ajaxEnvForm = (page, type, infoTag, msg, inputAcao = null) => {
    $.ajax({
        xhr: function() { // Custom XMLHttpRequest
            var myXhr = $.ajaxSettings.xhr();
            if (myXhr.upload) { // Avalia se tem suporte a propriedade upload
                boxAvisos('attention', msg, '', false);

                infoTag.inputs.each(function(){
                    $(this).attr('disabled', true);
                    $(this).parents('form .box-form-uniq').addClass('disabled');
                });

                inputAcao.attr('disabled', true);
                inputAcao.find('span').html(iconLoad);
            }
            return myXhr;
        },
        url: `${include_path}assets/backend/index.php`,
        type: type,
        data: infoTag.inputs,
        dataType:'json',
        async: true,
        error: function(data){
            boxAvisos('error', 'Ocorreu um Erro inesperado!!! ', 'Clique e contate o suporte', true, suport);
            console.log(data.responseText);
        },
        success: function(data){

            // Mostrando mensagem de sucesso e voltando ao nomral
            boxAvisos(data.type, data.msg, data.span, true, data.suport ? suport : '');

            if(data.type == 'error'){ // Tratando mensagens de erros
                if(data.inputError != undefined){ // Verificando se existe esse campo no retorno
                    let campoError = data.inputError;

                    infoTag.inputs.each(function(){
                        if($(this).attr('name') == campoError.name){
                            avisoInputs(true, $(this).parents('form .box-form-uniq'), 'error', campoError.msgInput);
                        }

                        $(this).attr('disabled', false);
                        $(this).parents('form .box-form-uniq').removeClass('disabled');
                    });

                    inputAcao.attr('disabled', false);
                    inputAcao.find('span').html('Confirmar presença');
                }else{

                    infoTag.inputs.each(function(index){
                        
                        $(this).parents('form .box-form-uniq').removeClass('success');
                        
                        $(this).attr('disabled', false);
                        $(this).parents('form .box-form-uniq').removeClass('disabled');

                        avisoInputs(true, $(this).parents('form .box-form-uniq'), 'attention', 'Verifique esse campo');
    
                    });

                    inputAcao.attr('disabled', false);
                    inputAcao.find('span').html('Confirmar presença');
                }
            }else if(data.type == 'success'){
                infoTag.inputs.each(function(index){
                    $(this).val('');
                    $(this).parents('form .box-form-uniq').removeClass('success');

                    $(this).attr('disabled', false);
                    $(this).parents('form .box-form-uniq').removeClass('disabled');

                });

                inputAcao.attr('disabled', false);
                inputAcao.find('span').html('Confirmar presença');
            }

            formOrAviso(data.qtd);
        }
    });
}

/* Declarando Funções*/
// Função para Validar Campos de imputs do site e para fazer envio do furmulário
function validForm(){
    // Variaveis Locais
    let boxInputs = $('form .box-form-uniq');
    let btnSubmitEnv = $('form button[type="submit"]');
    let inputs = $('form [permission_alter="1"]');
    // let verificInputNull = [];

    for(var i = 0; i < $('form [not-null]').length; i++){
        verificInputNull[i] = true;
    }

    inputs.focus(function(){
        $(this).parents('form .box-form-uniq').addClass("focus")
    });
    inputs.each(function(e){
        $(this).on({
            blur: function(){
                // Input dentro dessa função de evento
                $(this).parents('form .box-form-uniq').removeClass("focus")
            }
        });
    });
    
    /* Verificação de campo vazio e invalidos */
    $('form [not-null]').each(function(index){
        let boxInputThis = $(this).parents('form .box-form-uniq');

        maskNumber($(this))

        
        // Evento para adcionar ou tirar aviso aviso quando estiver vazio...
        $(this).on({
            blur: function(){
                // Input dentro dessa função de evento
                let valueInput = $(this).val();

                verificInputNull[index] = validateInput($(this), boxInputThis, valueInput);
            }
        });

        $(this).keyup(function(){
            // Input dentro dessa função de evento
            let valueInput = $(this).val();
            verificInputNull[index] = validateInput($(this), boxInputThis, valueInput);
        });
    });
    
    btnSubmitEnv.click(function(e){
        if(verificInputNull.indexOf(true) == -1){  
            let inputsEnv = {
                'inputs': inputs,
                'boxInputs': boxInputs
            }
            ajaxEnvForm('env-contato', 'POST', inputsEnv, 'Confirmando sua presença...', $(this));
        }else{
            $('form [not-null]').each(function(index){
                if($(this).val() == ''){
                    let boxInputThis = $(this).parents('form .box-form-uniq');
                    let valueInput = $(this).val();

                    validateInput($(this), boxInputThis, valueInput);
                }
            });

            boxAvisos('attention', 'Preencha todos os campos obrigatorios...', '', false);
        }

        return false;
    });
}