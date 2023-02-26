// Constates principais
const include_path = 'http://vozesqueclamam.localhost/'; //diretorio principal
const include_path_d = include_path+'assets/'; //diretorio das pastas
const htmlBody = $('html, body'); // Body e Html
const CONTAINER_NEXT = $('#__next'); // Container das paginas
const TARGET_PAGES = [
    'home',
    'methodology',
    'about',
    'contact',
    'projects'
];

/* Adicionando o include_path a todos os atributos href e src. */
$('[href]').each(function(){ $(this).attr('href', `${include_path}${$(this).attr('href')}`); });
$('[src]').each(function(){ $(this).attr('src', `${include_path}${$(this).attr('src')}`); });

/* Removendo box de load após carregamento total da página */
$(document).ready(function(){
    $('[data-load="load-main"]').addClass('active');

    setTimeout(() => {
        $('[data-load="load-main"]').remove();
    }, 300);
});

const titleMain = title => {
    $('#title-page').text(title);
}

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
const generateUUID = () => {
	var d = new Date().getTime();
	
	if( window.performance && typeof window.performance.now === "function" )
	{
		d += performance.now();
	}
	
	var uuid = 'xxxxxxxx-xxxx-yxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c)
	{
		var r = (d + Math.random()*16)%16 | 0;
		d = Math.floor(d/16);
		return (c=='x' ? r : (r&0x3|0x8)).toString(16);
	});

    return uuid;
}

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

/* Função para pegar nome da página dentro da URL */
const pegaPagina = pagina => {
    // Separando Link
    pagina = pagina.split(include_path);
    
    // Retornando nome da Página Atual
    return pagina[pagina.length - 1];
}
const separaUrl = url => {
    let separaUrl = url.split('page=')[1]; // Separando url

    return separaUrl == undefined ? '' : separaUrl; // Pgenado pagina atual
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

/* Função para Separar Data */
const separaData = data => {
    return data.split('/');
}

/* Box para avisos e alertas */
const boxAvisos = (typeAviso, msg, span, close, action = '') => { /* Type pode ser: success, attention ou error */
    // Variaveis locais
    let background = '';
    let contTime = (msg.split(' ').length)*1000;

    span = span != undefined || span != null ? span : '';

    if(typeAviso == 'error'){
        background = '#EE4444';
        className = 'colorWhite';
        classIcon = 'exclamation-triangle-fill';
    }else if(typeAviso == 'success'){
        background = '#00CC83';
        className = 'colorWhite';
        classIcon = 'check2-all';
    }else if(typeAviso == 'attention'){
        background = '#faba39';
        className = 'nothingIcon';
        classIcon = '';
    }

    Toastify({
        text: `${msg} ${span}`,
        duration: contTime,
        className: className,
        destination: action,
        avatar: '<i class="bi bi-'+classIcon+'"></i>',
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
    boxInput.removeClass('attention');
    boxInput.removeClass('success');
    boxInput.find('.icon-input-attention .aviso-input').text('');

    if(type != 'success'){
        if(boo){
            boxInput.addClass(type);
            boxInput.find('.icon-input-attention .aviso-input').text(msg);
        }else if(!boo){
            boxInput.removeClass(type);
            boxInput.find('.icon-input-attention .aviso-input').text(msg);
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

            $(this).datepicker({
                language: 'pt-BR',
                format: 'dd/mm/yyyy',
                days: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
                daysShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'],
                daysMin: ['D','S','T','Q','Q','S','S'],
                months: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
                monthsShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
                startView: 2,
            });
        }
        
        if(attrCamp == 'celular' || attrCamp == 'contato')
            $(this).mask('(00) 00000-0000');

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
                avisoInputs(true, boxInputThis, 'attention', 'Nome está em um formato inválido');
                return true;
            }else{
                avisoInputs(false, boxInputThis, 'success', '');
                return false;
            }
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
                    avisoInputs(true, boxInputThis, 'attention', 'Primeiro número depois do DDD deve ser "9"');
                    return true;
                }else if(telNumber.length < 11){
                    avisoInputs(true, boxInputThis, 'attention', 'Falta números nesse Contato');
                    return true;
                }else{
                    avisoInputs(false, boxInputThis, 'success', '');
                    return false;
                }
                //boo, boxInput, type, msg
            }else if(codigosDDD.indexOf(parseInt(telNumber.substring(0, 2))) == -1){
                avisoInputs(true, boxInputThis, 'attention', 'DDD informado é inválido');
                return true;
            }else if(telNumber.length <= 11){
                avisoInputs(true, boxInputThis, 'attention', 'Falta números nesse Contato');
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
                avisoInputs(true, boxInputThis, 'attention', 'Preencha esse campo corretamente');
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