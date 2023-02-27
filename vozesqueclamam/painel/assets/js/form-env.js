$(function(){

    /* Funções constantes */
    // Função Ajax para enviar os dados do formulároformulário
    const ajaxEnvForm = (page, type, typeEnv, infoTag, msg, inputAcao = null) => {
        if(typeEnv == 'file'){
            $.ajax({
                xhr: function() { // Custom XMLHttpRequest
                    var myXhr = $.ajaxSettings.xhr();
                    if (myXhr.upload) { // Avalia se tem suporte a propriedade upload
                        boxAvisos('attention', msg, '', false);
                    }
                    return myXhr;
                },
                url: `${include_path}assets/ajax/${page}.php`,
                type: type,
                data: infoTag,
                cache: false,
                contentType: false,
                processData: false,
                dataType:'json',
                async: true,
                error: function(data){
                    boxAvisos('error', 'Ocorreu um Erro inesperado!!! ', 'Clique e contate o suporte', true, suport);
                    console.log(data.responseText);
                },
                success: function(data){
                    let result = data;
    
                    // Mostrando mensagem de sucesso e voltando ao nomral
                    boxAvisos(result.type, result.msg, result.span, true);

                    viewsPhotoUser(); // Função para mosrar a imagem ou o avatar do usuário.
                }
            });
        }else{
            $.ajax({
                url: `${include_path}assets/ajax/${page}.php`,
                type: type,
                data: infoTag.inputs,
                dataType:'json',
                async: true,
                beforeSend: function(){
                    boxAvisos('attention', msg, '', false);
    
                    inputAcao.attr('disabled', true);
                    inputAcao.find('span').text("Enviando dados...");
                },
                error: function(data){
                    boxAvisos('error', 'Ocorreu um Erro inesperado!!! ', 'Clique e contate o suporte', true, suport);
                    console.error(data.responseText);
                },
                success: function(data){
                    let result = data;
    
                    if(page == 'update-user'){

                        // Mostrando mensagem de sucesso e voltando ao nomral
                        boxAvisos(result.type, result.msg, result.span, true);

                        if(result.type == 'success'){
                            // Bloqueando inputs
                            inputsActives(infoTag.boxInputs, true);
    
                            // Funções para mostrar os dados atualizados
                            viewsInputUser(); // Chamando função para mostrar os dados do usuário logado
                            viewsNameUser(); // Função para mostrar o nome do usuário.
    
                            // voltando o botão a sua função original
                            inputAcao.attr('disabled', false);
                            inputAcao.find('span').text("Alterar Dados");
                            inputAcao.attr('name', 'alterar');
                        }else{
                            inputAcao.attr('disabled', false);
                            inputAcao.find('span').text("Atualizar");
                        }

                    }

                    if(page == 'update-user-password'){
                        boxAvisos(result.type, result.msg, result.span, true);

                        if(result.type == 'success'){
                            // Funções para mostrar os dados atualizados
                            viewsInputUser(); // Chamando função para mostrar os dados do usuário logado
                            infoTag.boxInputs.each(function(){
                                if($(this).find('[not-null]').attr('not-null') == ''){
                                    avisoInputs(false, $(this), '', '');
                                    $('[verificPass]').each(function(){
                                        boxVerificPassThis(false, $(this));
                                    });
                                }
                            });
                        }
                        inputAcao.find('span').text("Atualizar");
                    }
                }
            });
        }
    }

    /* Execultando Funções */
    let urlAtual = pegaPagina($(location).attr('href'));

    if(urlAtual == 'profile'){
        updatePhoto(); // Função para atualizar Imagem do Usuário
        updateData(); // Função para atualizar os dados existentes.
        updatePassword(); // Função para atualizar a senha e verificar fortaleza
    }

    /* Declarando Funções */
    // Função para atualizar Imagem do Usuário
    function updatePhoto(){

        // Variaveis Locais
        let campoImag = $('.photo-box-whapper'); // Variavel referente ao campo de imagem
        let inputFileImag = $('#photo_user'); // Input de arquivo Imagem
        let msgCampoFile = $('.alter-photo-info p'); // Mensagem que aparece no campo de Imagem

        // função para Tratamento de Imagem.
        dropFile(campoImag, inputFileImag, msgCampoFile, 'imagem');


        // Evento de formulário do Usuario
        inputFileImag.on('change', function(){

            // Variaveis de Apoio
            let file = this.files;

            for(i = 0; i < file.length; i++){
                // Validação de Arquivo
                let infoFileValid = validFile(file[i], ['image/jpg', 'image/jpeg', 'image/png']);

                // Condição para erro e Sucesso
                if(infoFileValid.type != 'error'){

                    // Enviando Imagem
                    let nameInput = $(this).attr('name')
                    let formData = new FormData();

                    formData.append(nameInput, file[i]);

                    console.log(formData);
                    
                    ajaxEnvForm('update-user-img', 'POST', 'file', formData,'Enviando Imagem atualizados...');
                }else{
                    boxAvisos('error', infoFileValid.msg, infoFileValid.span, true);
                    inputFileImag.val('');
                    inputFileImag.attr('title', 'Selecione outra Imagem');
                }
            }
        });
    }

    // Função para envio de senha e verificação de criterios para senha
    function updatePassword(){
    
        // Variaveis Locais
        let boxInputs = $('form[form="password"] .box-form-uniq');
        let inputAlterBtn = $('form[form="password"] button[type="submit"]');
        let inputs = $('form[form="password"] [permission_alter="1"]');
        let verificPassInfo = $('[verificPass]');
        let validacaoSubmit = {
            'v1': false,
            'v2': false,
            'v3': false
        };

        inputs.each(function(){
            
            // Variaveis de apoio
            let attrNameInput = $(this).attr('name');
            let boxInputThis = $(this).parents('form[form="password"] .box-form-uniq');
            
            showPassword($(this), boxInputThis); // Show Password

            // Verificação de fortaleza de senha e ativando botão para envio a cada saida do input
            $(this).on({
                blur: function(){
                    // Input dentro dessa função de evento
                    let valueInput = $(this).val();
                    verificInputsPass(valueInput);
                }
            });
            // Verificação de fortaleza de senha e ativando botão para envio a cada clique
            $(this).keyup(function(){
                // Input dentro dessa função de evento
                let valueInput = $(this).val();
                verificInputsPass(valueInput);
            });

            // Função para verificar fortaleza de senha e ativar o botão de envio
            function verificInputsPass(valueInput){
                if(attrNameInput == 'pass_atual'){
                    if(valueInput == ''){
                        validacaoSubmit.v1 = false;
                        avisoInputs(true, boxInputThis, 'error', 'Campo não pode está vazio');
                    }else{
                        validacaoSubmit.v1 = true;
                        avisoInputs(false, boxInputThis, 'success', '');
                    }
                }

                // Verificação de senha
                if(attrNameInput == 'pass_new'){
                    if(valueInput != ''){
                        let verificCaracter = verificCaracteres(valueInput);
    
                        // Vericando se está tudo okay com a nova senha
                        if(verificCaracter[0].char &&
                            verificCaracter[1].char &&
                            verificCaracter[2].char &&
                            verificCaracter[3].char &&
                            verificCaracter[4].char
                        ){
                            avisoInputs(false, boxInputThis, 'success', '');
                            validacaoSubmit.v2 = true;
                        }else{
                            avisoInputs(true, boxInputThis, 'error', 'Sua nova senha não atende aos padrões desejados.');
                            validacaoSubmit.v2 = false;
                        }
    
                        verificCaracteresTrueInfo(verificPassInfo, verificCaracter);
                    }else{
                        validacaoSubmit.v2 = false;
                        avisoInputs(true, boxInputThis, 'error', 'Campo não pode está vazio');
                    }
                }

                // Verificando se as Senhas são iguais e ativando botão
                if(attrNameInput == 'pass_conf'){
                    if(valueInput != ''){
                        // setInterval(() => {
                            let valuePassword = $('[name="pass_new"]').val();
                            let valuePasswordConf = $('[name="pass_conf"]').val();
    
                            if(valuePassword === valuePasswordConf && valuePasswordConf != ''){
                                boxVerificPassThis(true, $('[verificPass="5"]'));
                                avisoInputs(false, boxInputThis, 'success', '');
                                validacaoSubmit.v3 = true;
                            }else if(valuePassword !== valuePasswordConf && valuePasswordConf != ''){
                                boxVerificPassThis(false, $('[verificPass="5"]'));
                                avisoInputs(true, boxInputThis, 'error', 'A confirmação de senha não confere.');
                                validacaoSubmit.v3 = false;
                            }
                        // }, 1000);
                    }else{
                        validacaoSubmit.v3 = false;
                        avisoInputs(true, boxInputThis, 'error', 'Campo não pode está vazio');
                    }
                }
                    
                
                // Liberando o botão de envio do input
                if(valueInput == ''){ // Caso os campos não esteja preenchidos
                    inputAlterBtn.attr('disabled', true);
                }else{ // Caso esteja tudo okay
                    if(validacaoSubmit.v1 && validacaoSubmit.v2 && validacaoSubmit.v3){
                        inputAlterBtn.attr('disabled', false);
                    }else{
                        inputAlterBtn.attr('disabled', true);
                    }
                }
            }

        });

        inputAlterBtn.click(function(e){
            let inputsEnv = {
                'inputs': inputs,
                'boxInputs': boxInputs
            }
            ajaxEnvForm('update-user-password', 'POST', 'form', inputsEnv, 'Enviando dados atualizados...', $(this));

            return false;
        });
    }

    // Função para alteração de dados
    function updateData(){

        // Variaveis Locais
        let boxInputs = $('form[form="dados-user"] .box-form-uniq');
        let inputAlterBtn = $('form[form="dados-user"] button[type="submit"]');
        let inputs = $('form[form="dados-user"] [permission_alter="1"]');

        let verificInputNull = [];

        for(var i = 0; i < $('form[form="dados-user"] [not-null]').length; i++){
            verificInputNull[i] = true;
        }

        inputAlterBtn.click(function(e){

            /* Verificação de campo vazio e invalidos */
            // Verificando a cada segundo
            $('form[form="dados-user"] [not-null]').each(function(index){
                let boxInputThis = $(this).parents('form .box-form-uniq');

                // Evento para adcionar ou tirar aviso aviso quando estiver vazio...
                setInterval(()=>{
                    // Input dentro dessa função de evento
                    let valueInput = $(this).val();

                    if(inputAlterBtn.attr('name') == 'acao-not')
                        verificInputNull[index] = validateInput($(this), boxInputThis, valueInput);
                    else
                        boxInputThis.removeClass('success');

                }, 1000);
            });

            // Attr do botão
            let inputAlterAttr = $(this).attr('name');

            setInterval(()=>{
                if(verificInputNull.indexOf(true) == -1)
                    inputAlterBtn.attr('disabled', false);
                else
                    inputAlterBtn.attr('disabled', true);
            }, 1000);


            // Condições
            if(inputAlterAttr == 'alterar'){
                boxInputs.each(function(){
    
                    let permissionInputs = $(this).find('input').attr('permission_alter');

                    if(permissionInputs == 1){
                        inputsActives($(this), false);
                    }
                });

                // Alterando dados do botão de ação
                inputAlterAttr = $(this).attr('name', 'acao-not');
                $(this).find('span').text('Atualizar');

            }else if(inputAlterAttr == 'acao-not'){
                let inputsEnv = {
                    'inputs': inputs,
                    'boxInputs': boxInputs
                }
                ajaxEnvForm('update-user', 'POST', 'form', inputsEnv, 'Enviando dados atualizados...', $(this));
            }
            return false;
        });
    }

    // Funções de apoio
    /* Ativando e Desativando inputs */
    const inputsActives = (base, most) => {
        if(most){
            base.addClass('disabled');
            base.find('input').attr('disabled', true);
        }else{
            base.removeClass('disabled');
            base.find('input').attr('disabled', false);
        }
    }

    /* Verificação de caracteres e tamanho de string */
    const verificCaracteres = (input) => {
        // Variaveis de apoio
        let lm, lM, n, e;

        lm = /[a-z]/gm.test(input) ? true : false; // Verificando Letras Minusculas
        lM = /[A-Z]/gm.test(input) ? true : false; // Verificando Letras Maiusculas
        n = /[0-9]/gm.test(input) ? true : false; // Verificando Números  
        e = (/[!@#$%*()_+^&{}}:;?.]/gm).test(input) ? true : false; // Verificação de caracteres
        t = input.length >= 8 ? true : false;

        return [
            {'char': lm, 'number': 1 },
            {'char': lM, 'number': 1 },
            {'char': n, 'number': 2 },
            {'char': e, 'number': 3 },
            {'char': t, 'number': 4 }
        ]
    }

    /* verificação de caracteres e comparação */
    const verificCaracteresTrueInfo = (verificPassInfo, verificCaracter) => {
        verificPassInfo.map(function(index){

            // Variavel de apoio
            let verificPassThis = $(this);
            let attrVerificPassInfo = verificPassThis.attr('verificPass');

            if(attrVerificPassInfo == 1){
                boxVerificPassThis(verificCaracter[index].char && verificCaracter[index+1].char, verificPassThis);
            }
            if(attrVerificPassInfo == 2){
                boxVerificPassThis(verificCaracter[2].char, verificPassThis)
            }
            if(attrVerificPassInfo == 3){
                boxVerificPassThis(verificCaracter[3].char, verificPassThis)
            }
            if(attrVerificPassInfo == 4){
                boxVerificPassThis(verificCaracter[4].char, verificPassThis)
            }
        });

    }
    /* Função para informar se está tudo okay com as senhas */
    function boxVerificPassThis(bool, box){
        if(bool){
            box.addClass('success');
        }else{
            box.removeClass('success');
        }
    }
});