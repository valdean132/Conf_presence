/* Função para mostrar barra de  */

// Função para mostrar e esconder campo de arrastamento de imagem
const dropFile = (campoCentral, inputFile, msgCampo, tipoArquivo) => {

    // Preservando informações
    let infoMsgAtual = msgCampo.text();

    // Texto conforme Tipo de Arquivo
    let msgText = tipoArquivo == 'imagem' ? 'Solte a Imagem Aqui!' : 'Solte o Arquivo Aqui!'

    // Eventos de Animações de Arrastamento de Arquivos
    // Adcionando
    inputFile.on('dragenter', function(){
        // Mudando Texto do Campo
        msgCampo.text(msgText);

        // Adcionando Classe que mostre a barra de selcionado
        campoCentral.addClass('dropFile');
    });

    // Removendo
    inputFile.on('dragleave', function(){
        // Adcionando Classe que mostre a barra de selcionado
        campoCentral.removeClass('dropFile');

        // Mudando Texto do Campo
        setTimeout(()=>{
            msgCampo.text(infoMsgAtual);
        }, 500);
    });
    inputFile.on('drop', function(){
        // Adcionando Classe que mostre a barra de selcionado
        campoCentral.removeClass('dropFile');

        // Mudando Texto do Campo
        setTimeout(()=>{
            msgCampo.text(infoMsgAtual);
        }, 500);
    });
}

// Função para validar arquivos
const validFile = (file, mime_types) => {

    // Validando os tipos de Arquivos
    if(mime_types.indexOf(file.type) == -1){
        return {
            'type': 'error',
            'msg': `O arquivo "${file.name}" não é permitido aqui! `,
            'span': 'Selecione um arquivo em formato JPG, JPEG ou PNG.'
        }
    }

    if(file.size > 2*1024*1024){
        return {
            'type': 'error',
            'msg': `O arquivo "${file.name}" possui um tamanho maior que 2M! `,
            'span': 'Selecione um arquivo com tamanho menor.'
        }
    }
    return {'type': 'success'}
}