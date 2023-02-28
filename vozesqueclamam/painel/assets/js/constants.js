/* Impedindo Reenvio de Formúlario */
window.onload = function() {
    history.replaceState("", "", window.location.href);
}

/* LocalStorage */
const updateLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

/* Gerador de Id Unico */
const geradorUniqId = () => {
    return new Date().getTime()+(new Date().getTime()*3);
}
const getRandom = max => {
    return Math.floor(Math.random() * max + 1)
}
const uniqid = () => {
    let sec = Date.now() * 1000 + Math.random() * 1000;
    let id = sec.toString(13).replace(/\./g, "").padEnd(14, "0");
    return id.substring(13,0);
};

/* Número para suporte */
const suport = 'https://wa.me/559286203822';

/* Criptografia */
function Encripta(dados){
    var mensx="";
    var l;
    var i;
    var j=0;
    var ch;
    ch = "assbdFbdpdPdpfPdAAdpeoseslsQQEcDDldiVVkadiedkdkLLnm";	
    for (i=0;i<dados.length; i++){
        j++;
        l=(Asc(dados.substr(i,1))+(Asc(ch.substr(j,1))));
        if (j==50){
            j=1;
        }
        if (l>255){
            l-=256;
        }
        mensx+=(Chr(l));
    }
    return mensx;
}
function Descripta(dados){
    var mensx="";
    var l;
    var i;
    var j=0;
    var ch;
    ch = "assbdFbdpdPdpfPdAAdpeoseslsQQEcDDldiVVkadiedkdkLLnm";	
    for (i=0; i<dados.length;i++){
        j++;
        l=(Asc(dados.substr(i,1))-(Asc(ch.substr(j,1))));
        if (j==50){
            j=1;
        }
        if (l<0){
            l+=256;
        }
        mensx+=(Chr(l));
    }	
    return mensx;
}
function Asc(String){
    return String.charCodeAt(0);
}
 
function Chr(AsciiNum){
    return String.fromCharCode(AsciiNum)
}

//Evitando Varias chamadas no scroll e outras funções
const debounce = function(func, wait, immediate){
    let timeOut;

    return function(){
        let context = this, args = arguments;
        let later = function(){
            timeOut = null;
            if(!immediate) func.apply(context, args);
        };

        let callNow = immediate && !timeOut;
        clearTimeout(timeOut);
        timeOut = setTimeout(later, wait);
        if(callNow) func.apply(context, args);
    };
}

//diretorio principal
const include_path = $('base').attr('base');
const htmlBody = $('html, body');

/* Função para pegar nome da página dentro da URL */
const pegaPagina = pagina => {

    // Separando Link
    pagina = pagina.split('/');
    
    // Retornando nome da Página Atual
    return pagina[pagina.length - 1];
}

/* Fixador de Zero */
const fixZero = value => {
    return value < 10 ? `0${value}` : value;
}

/* Data e Hora Atual */
const dateHours = () => {
    // Chamando Função de data
    let date = new Date();

    // Pegando Data e Hora
    let hour = date.getHours(); // Hora
    let minute = date.getMinutes(); // Minuto
    let day = date.getDate(); // Segundo
    let month = date.getMonth() + 1; // Mês
    let year = date.getFullYear(); // Ano

    // Retornando Resultados
    return {
        'hours': hour,
        'minutes': minute,
        'day': day,
        'month': month,
        'year': year
    };
}

/* Pegando dia da semana */
const diaSemana = (dataHora = null /* Sintax: 'mês dia, ano hora:minuto' */) =>{
    // Chamando Função de data
    let day = dataHora == null ? new Date() : new Date(dataHora);

    // Pegando dia da semana e retornando
    return day.getDay() + 1;
}

/* Pegar Quantidade de dias no mês */
const qtdDay = (month, year) => {
    // Chamando Função de data
    let data = new Date(year, month, 0);

    // Retornando Resultado
    return data.getDate();

}

/* Convertendo meses numericos para escrito */
const monthEscrito = month => {
    switch (month) {
        case 01:
            return 'Jan'; // Janeiro
        case 02:
            return 'Fev'; // Fevereiro
        case 03:
            return 'Mar'; // Março
        case 04:
            return 'Abr'; // Abril
        case 05:
            return 'Mai'; // Maio
        case 06:
            return 'Jun'; // Junho
        case 07:
            return 'Jul'; // Julho
        case 08:
            return 'Ago'; // Agosto
        case 09:
            return 'Set'; // Setembro
        case 10:
            return 'Out'; // Outubro
        case 11:
            return 'Nov'; // Novembro
        case 12:
            return 'Dez'; // Dezembro
        default:
            console.log('Mês Inválido');
    }
}

/* Convertendo meses numericos para escrito */
const diaSemanaEscrita = semana => {
    switch (semana) {
        case 01:
            return 'Dom'; // Domingo
        case 02:
            return 'Seg'; // Segunda
        case 03:
            return 'Ter'; // Terça
        case 04:
            return 'Qua'; // Quarta
        case 05:
            return 'Qui'; // Quinta
        case 06:
            return 'Sex'; // Sexta
        case 07:
            return 'Sab'; // Sábado
        default:
            console.log('Semana Inválido');
    }
}

const formatDataHora = dataHora => {
    return dataHora.replace(/(\d*)-(\d*)-(\d*) (\d*):(\d*):(\d*).*/, '$3/$2/$1 $4:$5:$6');
}

/* Função para Separar Data */
const separaData = data => {
    return data.split('/');
}

/* Box para avisos e alertas */
const boxAvisos = (typeAviso, msg, span, close, action = '') => { /* Type pode ser: success, attention ou error */
    // Variaveis locais
    let background = '';
    let contTime = (msg.split(' ').length)*1000;

    if(typeAviso == 'error'){
        background = '#EE4444';
    }else if(typeAviso == 'success'){
        background = '#00CC83';
    }else if(typeAviso == 'attention'){
        background = '#faba39';
    }

    Toastify({
        text: `${msg} ${span}`,
        duration: contTime,
        destination: action,
        // newWindow: true,
        close: close,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: background,
        }
    }).showToast();
}

/* Avido de input */
const avisoInputs = (boo, boxInput, type, msg) => {
    // boxInput.removeClass(type);
    boxInput.removeClass('disabled');
    boxInput.removeClass('error');
    boxInput.removeClass('success');
    boxInput.find('.icon-input-atention .aviso-input').text('');

    if(type != 'success'){
        if(boo){
            boxInput.addClass(type);
            boxInput.find('.icon-input-atention .aviso-input').text(msg);
        }else if(!boo){
            boxInput.removeClass(type);
            boxInput.find('.icon-input-atention .aviso-input').text(msg);
        }
    }else if(type == 'success'){
        boxInput.addClass(type);
    }
}

/* Função para esconder a Box de loading */
const loadingBox = (boxLoading, display) => {
    // Escondendo Box de loading
    if(display == 'none'){
        boxLoading.css('opacity', '0');
        setTimeout(()=>{
            boxLoading.css('display', 'none');
        }, 100);
    }else{
        boxLoading.css('display', display);
        setTimeout(()=>{
            boxLoading.css('opacity', '1');
        }, 100);
    }
}

/* Show Password */
const showPassword = (thisInput, boxInputThis) => {
    let showPasswordThis = boxInputThis.find('.show-password');

    // implementando botão para mostrar senha e evento
    setInterval(()=>{ // Evento para mostrar ou ocultra o botão de visualização da senha
        if(thisInput.val() !== ''){
            showPasswordThis.css('display', 'flex');
        }else{
            showPasswordThis.css('display', 'none');
        }
    });

    showPasswordThis.click(()=>{ // Evento para mostrar e ocultar a senha
        const passwordType = thisInput.attr('type');

        if(passwordType === 'password'){
            thisInput.attr('type', 'text');
            showPasswordThis.addClass('active');
        }else{
            thisInput.attr('type', 'password');
            showPasswordThis.removeClass('active');

        }
    });
}

/* Pegando apenas o número de uma string */
const apNumber = (string) =>  {
    return string.replace(/[^0-9]/g, '');
}

/* Mascarando campos de numericos */
const maskNumber = (mask) => {
    mask.each(function(){
        let attrCamp = $(this).attr('mask_number');
        
        if(attrCamp == 'data'){
            $(this).mask('00/00/0000');
        }
        
        if(attrCamp == 'celular' || attrCamp == 'contato')
            $(this).mask('(00) 00000-0000');
            
        if(attrCamp == 'cep')
            $(this).mask('00000-000');

        if(attrCamp == 'cpf')
            $(this).mask('000.000.000-00', {reverse: true});

        if(attrCamp == 'cnpj')
            $(this).mask('00.000.000/0000-00', {reverse: true});

        if(attrCamp == 'cnpj')
            $(this).mask('00.000.000/0000-00', {reverse: true});

    });
}
maskNumber($('[mask_number]'));

/* Sem repetição */
const semRepeticao = (value) => {
    return [...new Set(value)];
}

/* Validação de Formulário */
const validateInput = (inputThis, boxInputThis, valueInput, adcional = null) => {
    if(valueInput == ''){ // Verificando se o campo está vazio
        avisoInputs(true, boxInputThis, 'error', 'Preencha este campo.');
        return true;
    }
    if(inputThis.attr('valid-name')){ // Verificando Nome
        if(inputThis.attr('valid-name') == 'nome'){
            let nome = inputThis.val();
    
            // removi o espaço da regex (agora ela só considera as letras)
            let regex = /\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/gi;
    
            if(!(regex.test(nome))){
                avisoInputs(true, boxInputThis, 'error', 'Nome está em um formato inválido');
                return true;
            }else{
                avisoInputs(false, boxInputThis, 'success', '');
                return false;
            }
        }
    }
    if(inputThis.attr('name') == 'data_nasc'){ // Verificando Data de Nascimento
        if(inputThis.val().length >= 10){
            dataSepara = separaData(inputThis.val());
            let ano = dateHours().year;
            if(dataSepara[2] >= ano){
                avisoInputs(true, boxInputThis, 'atencao', `O Ano não pode ser Maior ou Igual ao ${ano}`);
                inputThis.css('border-color', '');
                return true;
            }else if(dataSepara[2] <= ano){
                if(ano-dataSepara[2] <= 17){
                    avisoInputs(true, boxInputThis, 'atencao', 'Idade Não pode ser menor que 18 Anos');
                    inputThis.css('border-color', '');
                    return true;
                }else{
                    if(dataSepara[1] >= 13 || dataSepara[1] <= 0){
                        avisoInputs(true, boxInputThis, 'atencao', 'Mês Informado é inválido');
                        inputThis.css('border-color', '');
                        return true;
                    }else{
                        let diaNoMes = qtdDay(dataSepara[1], dataSepara[2]);
                        if(dataSepara[0] <= 0 || dataSepara[0] > diaNoMes){
                            avisoInputs(true, boxInputThis, 'atencao', 'Dia Informado é inválido');
                            inputThis.css('border-color', '');
                            return true;
                        }else{
                            avisoInputs(false, boxInputThis, 'cadeado', 'Campo Bloqueado');
                            inputThis.css('border-color', 'var(--color-fonts_19)');
                            return false;
                        }
                    }
                }
            }else{
                avisoInputs(false, boxInputThis, 'cadeado', 'Campo Bloqueado');
                inputThis.css('border-color', 'var(--color-fonts_19)');
                return false;
            }
        }else{
            avisoInputs(true, boxInputThis, 'atencao', 'Falta números nessa data de Nascimento');
            inputThis.css('border-color', '');
            return true;
        }
    }
    if(inputThis.attr('name') == 'data_prev'){ // Verificando Data de Nascimento
        if(inputThis.val().length >= 10){
            dataSepara = separaData(inputThis.val());
            let ano = dateHours().year;
            let mes = dateHours().month;
            let dia = dateHours().day;
            if(dataSepara[2] < ano){
                avisoInputs(true, boxInputThis, 'atencao', `O Ano não pode ser Menor ao ano de ${ano}`);
                inputThis.css('border-color', '');
                return true;
            }else if(dataSepara[2] >= ano){
                if(dataSepara[1] >= 13 || dataSepara[1] <= 0){
                    avisoInputs(true, boxInputThis, 'atencao', 'Mês Informado é inválido');
                    inputThis.css('border-color', '');
                    return true;
                }else{
                    if(dataSepara[1] < mes && dataSepara[2] <= ano){
                        avisoInputs(true, boxInputThis, 'atencao', `O Mês não pode ser Menor ao mês de ${monthEscrito(mes)}`);
                        inputThis.css('border-color', '');
                        return true;
                    }else{
                        let diaNoMes = qtdDay(dataSepara[1], dataSepara[2]);
                        if(dataSepara[0] <= 0 || dataSepara[0] > diaNoMes){
                            avisoInputs(true, boxInputThis, 'atencao', 'Dia Informado é inválido');
                            inputThis.css('border-color', '');
                            return true;
                        }else{
                            if((dataSepara[0] < dia && dataSepara[1] <= mes) && (dataSepara[0] < dia && dataSepara[2] <= ano)){
                                avisoInputs(true, boxInputThis, 'atencao', `O Dia não pode ser Menor ao dia de hoje`);
                                inputThis.css('border-color', '');
                                return true;
                            }else{
                                avisoInputs(false, boxInputThis, 'cadeado', 'Campo Bloqueado');
                                inputThis.css('border-color', 'var(--color-fonts_19)');
                                return false;
                            }
                        }
                    }
                }
            }else{
                avisoInputs(false, boxInputThis, 'cadeado', 'Campo Bloqueado');
                inputThis.css('border-color', 'var(--color-fonts_19)');
                return false;
            }
        }else{
            avisoInputs(true, boxInputThis, 'atencao', 'Falta números nessa data de Nascimento');
            inputThis.css('border-color', '');
            return true;
        }
    }
    if(inputThis.attr('name') == 'cpf'){ // Verificando CPF
        let cpfNumber = apNumber(inputThis.val()).toString();

        if(cpfNumber.length == 11 ){
            var v = [];

            //Calcula o primeiro dígito de verificação.
            v[0] = 1 * cpfNumber[0] + 2 * cpfNumber[1] + 3 * cpfNumber[2];
            v[0] += 4 * cpfNumber[3] + 5 * cpfNumber[4] + 6 * cpfNumber[5];
            v[0] += 7 * cpfNumber[6] + 8 * cpfNumber[7] + 9 * cpfNumber[8];
            v[0] = v[0] % 11;
            v[0] = v[0] % 10;

            //Calcula o segundo dígito de verificação.
            v[1] = 1 * cpfNumber[1] + 2 * cpfNumber[2] + 3 * cpfNumber[3];
            v[1] += 4 * cpfNumber[4] + 5 * cpfNumber[5] + 6 * cpfNumber[6];
            v[1] += 7 * cpfNumber[7] + 8 * cpfNumber[8] + 9 * v[0];
            v[1] = v[1] % 11;
            v[1] = v[1] % 10;

            //Retorna Verdadeiro se os dígitos de verificação são os esperados.
            if ( (v[0] != cpfNumber[9]) || (v[1] != cpfNumber[10]) ){
                avisoInputs(true, boxInputThis, 'atencao', 'CPF inválido');
                inputThis.css('border-color', '');
                return true;
            }else{
                avisoInputs(false, boxInputThis, 'cadeado', 'Campo Bloqueado');
                inputThis.css('border-color', 'var(--color-fonts_19)');
                return false;
            }
        }else{
            avisoInputs(true, boxInputThis, 'atencao', 'Falta números nesse CPF');
            inputThis.css('border-color', '');
            return true;
        }
    }
    if(inputThis.attr('name') == 'cnpj'){ // Verificando CPF
        let cnpjNumber = apNumber(inputThis.val()).toString();

        if(cnpjNumber.length == 14 ){
            if (cnpjNumber == "00000000000000" ||
                cnpjNumber == "11111111111111" ||
                cnpjNumber == "22222222222222" ||
                cnpjNumber == "33333333333333" ||
                cnpjNumber == "44444444444444" ||
                cnpjNumber == "55555555555555" ||
                cnpjNumber == "66666666666666" ||
                cnpjNumber == "77777777777777" ||
                cnpjNumber == "88888888888888" ||
                cnpjNumber == "99999999999999"
            ){
                avisoInputs(true, boxInputThis, 'atencao', 'CNPJ inválido');
                inputThis.css('border-color', '');
                return true;
            }else{
                let tamanho = cnpjNumber.length - 2
                let numeros = cnpjNumber.substring(0, tamanho);
                let digitos = cnpjNumber.substring(tamanho);
                let soma = 0;
                let pos = tamanho - 7;

                for (let i = tamanho; i >= 1; i--) {
                    soma += numeros.charAt(tamanho - i) * pos--;
                    if (pos < 2)
                        pos = 9;
                }        

                resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

                if (resultado != digitos.charAt(0)){
                    avisoInputs(true, boxInputThis, 'atencao', 'CNPJ inválido');
                    inputThis.css('border-color', '');
                    return true;
                } else{
                    tamanho = tamanho + 1;
                    numeros = cnpjNumber.substring(0, tamanho);
                    soma = 0;
                    pos = tamanho - 7;
                    for (i = tamanho; i >= 1; i--) {
                        soma += numeros.charAt(tamanho - i) * pos--;
                        if (pos < 2)
                            pos = 9;
                    }
                    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

                    if (resultado != digitos.charAt(1)){
                        avisoInputs(true, boxInputThis, 'atencao', 'CNPJ inválido');
                        inputThis.css('border-color', '');
                        return true;
                    }else{
                        avisoInputs(false, boxInputThis, 'cadeado', 'Campo Bloqueado');
                        inputThis.css('border-color', 'var(--color-fonts_19)');
                        return false;
                    }
                }
            }
            
        }else{
            avisoInputs(true, boxInputThis, 'atencao', 'Falta números nesse CNPJ');
            inputThis.css('border-color', '');
            return true;
        }
    }
    if(inputThis.attr('name') == 'cep'){ // Verificando CEP
        let cepNumber = apNumber(inputThis.val());
        var validacep = /^[0-9]{8}$/;

        if(cepNumber.length == 8 ){
            if(validacep.test(cepNumber)){
                $(`[auto-complet="${adcional}_estado"]`).val('Carregando...');
                $(`[auto-complet="${adcional}_cidade"]`).val('Carregando...');
                $(`[auto-complet="${adcional}_bairro"]`).val('Carregando...');
                $(`[auto-complet="${adcional}_rua"]`).val('Carregando...');

                //Consulta o webservice viacep.com.br/
                $.getJSON("https://viacep.com.br/ws/"+ cepNumber +"/json/?callback=?", function(dados) {
                    if (!("erro" in dados)) {
                        //Atualiza os campos com os valores da consulta.
                        $(`[auto-complet="${adcional}_estado"]`).val(`${dados.uf}`);
                        $(`[auto-complet="${adcional}_cidade"]`).val(`${dados.localidade}`);
                        $(`[auto-complet="${adcional}_bairro"]`).val(`${dados.bairro}`);
                        $(`[auto-complet="${adcional}_rua"]`).val(`${dados.logradouro}`);

                        $(`[auto-complet="${adcional}_estado"]`).css('border-color', 'var(--color-fonts_19)');
                        $(`[auto-complet="${adcional}_cidade"]`).css('border-color', 'var(--color-fonts_19)');
                        $(`[auto-complet="${adcional}_bairro"]`).css('border-color', 'var(--color-fonts_19)');
                        $(`[auto-complet="${adcional}_rua"]`).css('border-color', 'var(--color-fonts_19)');
                        inputThis.css('border-color', 'var(--color-fonts_19)');
                        
                    } //end if.
                    else {
                        //CEP pesquisado não foi encontrado.
                        avisoInputs(true, boxInputThis, 'atencao', 'CEP não encontrado');
                        inputThis.css('border-color', '');
                        return true;
                    }
                });
            }else{
                avisoInputs(true, boxInputThis, 'atencao', 'Formato de CEP inválido');
                inputThis.css('border-color', '');
                return true;
            }
        }else{
            avisoInputs(true, boxInputThis, 'atencao', 'Falta números nesse CEP');
            inputThis.css('border-color', '');
            return true;
        }
    }
    if(inputThis.attr('valid-contato')){ // Verificando Contato
        
        if(inputThis.attr('valid-contato') == 'celular'){
            let telNumber = apNumber(inputThis.val());

            var codigosDDD = [11, 12, 13, 14, 15, 16, 17, 18, 19,
                            21, 22, 24, 27, 28, 31, 32, 33, 34,
                            35, 37, 38, 41, 42, 43, 44, 45, 46,
                            47, 48, 49, 51, 53, 54, 55, 61, 62,
                            64, 63, 65, 66, 67, 68, 69, 71, 73,
                            74, 75, 77, 79, 81, 82, 83, 84, 85,
                            86, 87, 88, 89, 91, 92, 93, 94, 95,
                            96, 97, 98, 99];
            
            if(codigosDDD.indexOf(parseInt(telNumber.substring(0, 2))) != -1){
                if (parseInt(telNumber.substring(2, 3)) != 9){
                    avisoInputs(true, boxInputThis, 'error', 'Primeiro número depois do DDD deve ser "9"');
                    return true;
                }else if(telNumber.length < 11){
                    avisoInputs(true, boxInputThis, 'error', 'Falta números nesse Contato');
                    return true;
                }else{
                    avisoInputs(false, boxInputThis, 'success', '');
                    return false;
                }
                //boo, boxInput, type, msg
            }else if(codigosDDD.indexOf(parseInt(telNumber.substring(0, 2))) == -1){
                avisoInputs(true, boxInputThis, 'error', 'DDD informado é inválido');
                return true;
            }else if(telNumber.length <= 11){
                avisoInputs(true, boxInputThis, 'error', 'Falta números nesse Contato');
                return true;
            }
        }
        if(inputThis.attr('valid-contato') == 'email'){ // Verificando E-mail
    
            let sEmail = inputThis.val();
            // filtros
            let emailFilter =/^.+@.+\..{2,}$/;
            let illegalChars = /[\(\)\<\>\,\;\:\\\/\"\[\]]/;
            // condição
            if(!(emailFilter.test(sEmail)) || sEmail.match(illegalChars)){
                avisoInputs(true, boxInputThis, 'error', 'Preencha esse campo corretamente');
                return true;
            }else{
                avisoInputs(false, boxInputThis, 'success', '');
                return false;
            }
        }
    }
    if(valueInput != ''){ // Verificando se o Campo está Okay!
        avisoInputs(false, boxInputThis, 'success', '');
        return false;
    }
}

const tagsInputs = (tagsInputs, removeTag) => {
    tagsInputs.each(function(){ // pegando os selects
        var options = $(this).find('option'); // Pegando os options do selects especificos
        
        $(this).prepend('<option value=""></option>')

        // Criando divs de apoio
        var div = $('<div />').addClass('selectMultiple');
        var active = $('<div />');
        var list = $('<ul />');
        var placeholder = $(this).data('placeholder');
        var xTag = removeTag ? '<i></i>' : '';
        
        var span = $('<span />').text(placeholder).appendTo(active); // Adicionando placeholder para informação


        active.append($('<div><div/></div>').addClass('arrow')); // Criando botão de ativar e desativar lista de opção e seta
        div.append(active).append(list); // Adcionando listas de options
    
        if(options.length <= 0){
            list.append($('<div />').html(`<a href="${include_path}settings">Adicione os itens</a>`));
        }else{
            options.each(function () { // pegando options e adcionando nas listas
                var text = $(this).text();
                if(text.length >= 1){
                    // $(this).parent('select').find('option').prop('selected', false);

                    if ($(this).is(':selected')) { // verificando se há um select em option e deixando definido como tag

                        active.append($('<a />').html('<em>' + text + '</em>'+xTag));
                        span.addClass('hide');
                    } else {
                        list.append($('<li />').html(text));
                    }
                }
            });
        }
        
        
        $(this).wrap(div); // envolvendo select em um div central criada
    
        $(document).on('click','.selectMultiple ul li',function (e) { // função para remover item da lista e colocar no input tags
            var select = $(this).parent().parent();
            var li = $(this);
            if (!select.hasClass('clicked')) {
                select.addClass('clicked');
                li.prev().addClass('beforeRemove');
                li.next().addClass('afterRemove');
                li.addClass('remove');

                if(!select.find('select').is('[multiple]')){ // removendo tag selecionada e adcionando a cliocada cada caso não seja multiple
                    removeTags(select.find('div a'));
                }

                setTimeout(()=>{
                    var a = $('<a />').addClass('notShown').html('<em>' + li.text() + '</em>'+xTag).hide().appendTo(select.children('div')); // criando tag
    
                    a.slideDown(400, function () { // adcionando animação
                        setTimeout(function () {
                            a.addClass('shown');
                            select.children('div').children('span').addClass('hide');
                            select.find('option:contains(' + li.text() + ')').prop('selected', true); // Selecionando option que foi clicado.
                        }, 500);
                    });
                    setTimeout(function () { // adcionando animações
                        if (li.prev().is(':last-child')) {
                            li.prev().removeClass('beforeRemove');
                        }
                        if (li.next().is(':first-child')) {
                            li.next().removeClass('afterRemove');
                        }
                        setTimeout(function () {
                            li.prev().removeClass('beforeRemove');
                            li.next().removeClass('afterRemove');
                        }, 200);
        
                        li.slideUp(400, function () {
                            li.remove();
                            select.removeClass('clicked');
    
                            if(select.find('ul li').length <= 0){ // Verificando se não existe mais lista
                                notUl = $('<div />').html(`<a href="${include_path}settings">Adicione mais itens</a>`)
                                                    .addClass('notShown')
                                                    .appendTo(select.find('ul'));
                                
                                notUl.slideDown(400, function(){ // Adicionando aviso para adicinar mais itens
                                    notUl.addClass('show');
                                    setTimeout(function () {
                                        notUl.removeClass();
                                    }, 400);
                                });
                            }
                        });
                    }, 600);
                }, 700)
            }
        });
        
        $(document).on('click','.selectMultiple > div a',function(e) { // removendo tag clicada
            if(removeTag){
                removeTags($(this));
            }
        });

        function removeTags(tag){ // função para remover tag conforme click e conforme select:multiple
            var select = tag.parent().parent();
            var self = tag;
            notUl = select.find('ul div').addClass('remove')
            self.removeClass().addClass('remove');
            select.addClass('open');
            setTimeout(function () {
                self.addClass('disappear');
                setTimeout(function () { // adcionando animações
                    self.animate({
                        width: 0,
                        height: 0,
                        padding: 0,
                        margin: 0
                    }, 300, function () {
                        var li = $('<li />').text(self.children('em').text()).addClass('notShown').appendTo(select.find('ul'));
                        // console.log(select.find('ul li').length)
                        if(select.find('ul li').length > 1){ // Verificando há mais de uma li para remover a div de aviso
                            li.slideDown(400, function () { // Adcionando lista removido da tag
                                li.addClass('show');
                                setTimeout(function () {
                                    select.find('option:contains(' + self.children('em').text() + ')').prop('selected', false); // removendo tag
                                    if (!select.find('option:selected').length || select.find('option:selected').text().length <= 0) {
                                        select.children('div').children('span').removeClass('hide');
                                    }
                                    li.removeClass();
                                }, 400);
                            });
                        }else{
                            notUl.slideUp(400, function () {
                                notUl.remove(); // Removendo aviso de adicinar mais itens
    
                                li.slideDown(400, function () { // Adcionando lista removido da tag
                                    li.addClass('show');
                                    setTimeout(function () {
                                        select.find('option:contains(' + self.children('em').text() + ')').prop('selected', false); // removendo tag
                                        if (!select.find('option:selected').length || select.find('option:selected').text().length <= 0) {
                                            select.children('div').children('span').removeClass('hide');
                                        }
                                        li.removeClass();
                                    }, 400);
                                });
                            });
                        }
                        self.remove();
                    });
                }, 300);
            }, 400);
        }
        
        $(this).parent().parent().parent().find('div .arrow, div span').on('click', function (e) { // removendo e adcionando open
            console.log('aqui')
            if($(this).parent().parent().hasClass('open')){
                $(this).parent().parent().removeClass('open');
            }else{
                $('.selectMultiple').removeClass('open');
                $(this).parent().parent().addClass('open');
            }
        });
    });
}
tagsInputs($('.campo-pesquisa select'), false);

/* Função para encaminhar copia para área de transferencia */
const copyTranf = (copyText) => {
    let TextArea = $('.copy-transf');
    TextArea.val("");
    TextArea.val(copyText);

    TextArea.select();
    try {
        var ok = document.execCommand('copy');
        if(ok){ 
            boxAvisos('success', 'Texto copiado para a área de transferência...', '', false);
            TextArea.val("");
        }
    } catch (e) {
        boxAvisos('error', 'Erro ao copiar texto para a área de transferência...', 'Tente novamente, se persistir contate o suporte.', true, suport);
    }
}