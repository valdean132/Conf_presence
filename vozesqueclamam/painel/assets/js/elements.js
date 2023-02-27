/* Função constante */
const modalElement = (element = {}) => {
    let copyElement = `<div class="main-modal">`;

    if(element.type == 'view-presence-all'){
        copyElement += `
            <form action="" form="dados-user" method="post" class="w100 display-center flex-column">
                <div class="form-box-single-inputs w100 marg-t-10 display-flex space-between align-items-center flex-wrap">
                    <div class="box-form-uniq box-form-uniq-02 disabled position-relative display-flex flex-column fw-100">
                        <label class="text-capitalize user-select-none">Nome:</label>
                        <input
                            class="bg-02 border-01 transition w100 padd-15"
                            disabled
                            value="${element.view.nome}"
                        >
                    </div><!-- Campo de input -->
                    <div class="box-form-uniq box-form-uniq-02 disabled position-relative display-flex flex-column fw-50">
                        <label class="text-capitalize user-select-none">E-mail:</label>
                        <input
                            class="bg-02 border-01 transition w100 padd-15 cursor-pointer"
                            disabled
                            value="${element.view.email}"
                        >
                    </div><!-- Campo de input -->
                    <div class="box-form-uniq box-form-uniq-02 disabled position-relative display-flex flex-column fw-50">
                        <label class="text-capitalize user-select-none">Telefone:</label>
                        <input
                            class="bg-02 border-01 transition w100 padd-15"
                            disabled
                            value="${element.view.telefone}"
                        >
                    </div><!-- Campo de input -->
                    <div class="box-form-uniq box-form-uniq-02 disabled position-relative display-flex flex-column fw-50">
                        <label class="text-capitalize user-select-none">Nº de Identificação:</label>
                        <input
                            class="bg-02 border-01 transition w100 padd-15"
                            disabled
                            value="${element.view.identificacao}"
                        >
                    </div><!-- Campo de input -->
                    <div class="box-form-uniq box-form-uniq-02 disabled position-relative display-flex flex-column fw-50">
                        <label class="text-capitalize user-select-none">Data e Hora:</label>
                        <input
                            class="bg-02 border-01 transition w100 padd-15"
                            disabled
                            value="${formatDataHora(element.view.data_hora)}"
                        >
                    </div><!-- Campo de input -->
                    <div class="box-form-uniq box-form-uniq-02 disabled position-relative display-flex flex-column fw-100">
                        <label class="text-capitalize user-select-none">IP do Participante:</label>
                        <input
                            class="bg-02 border-01 transition w100 padd-15"
                            disabled
                            value="${element.view.ip}"
                        >
                    </div><!-- Campo de input -->
                </div><!-- Campo de inputs -->

                <div class="btn-submit w100 display-flex space-between marg-t-10 marg-b-10">
                    <a target="_blank" style="background-color: #00CC83;" href="https://api.whatsapp.com/send?phone=55${apNumber(element.view.telefone)}" class="btn-02 cursor-pointer transition" title="Envie uma mensagem para ${element.view.nome.split(' ')[0]} ${element.view.nome.split(' ')[1]}">
                        <i class="bi bi-whatsapp"></i> <span>Mande uma Mensagem</span>
                    </a>
                    <a type-btn="copy" data-copy='${Encripta(`*_Participante - ${element.view.identificacao}_*\n\n*Nome:*  ${element.view.nome}\n*E-mail:*  ${element.view.email} \n*Contato:*  ${element.view.telefone}\n*Nº de Identificação:* ${element.view.identificacao}`)}' style="background-color: #faba39;" class="btn-02 cursor-pointer transition" title="Copie as informações...">
                        <i class="bi bi-clipboard-data"></i> <span>Copie as Informações</span>
                    </a>
                </div>
            </form><!-- Formulário -->
        `;
    }
    copyElement += `</div>`;

    return copyElement;
}