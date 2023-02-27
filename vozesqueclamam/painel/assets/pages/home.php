<section class="contact w100 h100">
    <div class="main-section display-flex overflow-hidden w100 h100 bg-02 shadow-02 border-01 border-r-20">
        <div class="container-main-section padd-2p w100 h100 bg-03">
            <div class="title-box padd-10">
                <h3>Lista de Presença <span>- Total de cadastro: <?php echo count(Painel::selectAll('tb_sys_site.inscricao', '`data_hora` ASC')) ?></span> </h3>
            </div><!-- Titulo da box -->
            <div class="contain-table overflow-x-auto w100 marg-b-10">
                <div class="table-single m-table-01 w100 user-select-none">
                    <div class="thead w100 bg-01 border-01 marg-b-10 padd-1p border-r-10">
                        <div class="tr w100 display-flex space-between">
                            <div class="th col-1">Nome</div>
                            <div class="th col-4">Telefone</div>
                            <div class="th col-3">Dia/Hora</div>
                            <div class="th col-5">Nº</div>
                            <div class="th col-5">Opções</div>
                        </div>
                    </div><!-- Cabeça -->
                    <div data-table="all-presence" style="max-height: 70%;" class="tbody position-relative w100 bg-03 padd-15 border-r-10 border-01 transition overflow-y-auto">
                        <div class="box-loading loading-02 transition position-absolute">
                            <div class="load-man"></div>
                        </div>
                        
                    </div><!-- Corpo -->
                    <div class="pagination"></div>
                </div><!-- Tabela -->
            </div>
        </div><!-- Campo de formulários do usuário -->
    </div><!-- Campo Principal do Settings -->
</section><!-- Sessão página de configuração -->