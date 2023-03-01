var apN = (string) =>  {
    return string.replace(/[^0-9]/g, '');
}

var fDH = dataHora => {
    return dataHora.replace(/(\d*)-(\d*)-(\d*) (\d*):(\d*):(\d*).*/, '$3/$2/$1 $4:$5:$6');
}
const pvAjax = (o) => {
    'use strict';

    var t = {
        container: '',
        containTable: '',
        idTable: '',
        search: '',
        theme: 1,
        url: '',
        type: 'POST',
        table: '',
        order: '`id` ASC', /* `id` ASC <- Ex. */
        where: '',
        pagination: 1,
        qtdPages: 5,
        events: function(){},
        styles: ''
    }

    t = $.extend(t, o);

    var gi = `pagination_${new Date().getTime()*3}`;

    var boxP = `
        <div class="box-pagination" id="${gi}" pa-qtdPages style="display: none;">
            <div class="single-pagination">
            </div>
        </div>
    `;

    if(t.url !== '' && t.table !== '' && t.containTable !== ''){
        if(t.container !== ''){
            $(t.container).append(boxP);
        }else{
            $(t.containTable).parent().append(boxP);
        }

        aPagination({
            container: t.container,
            url: t.url,
            type: t.type,
            theme: t.theme,
            gi: gi,
            t: t,
            data: {
                table: t.table,
                order: t.order,
                pg: 1,
                qtgPg: t.qtdPages,
                where: t.where
            }
        });

        if(t.search != ''){
            searchItem(t, gi);
        }

        
    }else{
        console.warn('Infome a url para buscar os dados e a tabela onde se encontra');
        console.log(gi);
    }

}

function searchItem(t, gi){
    $(t.search).keyup(function(){
        let sV = $(this).val();
        let sC = $(this).attr('data-column');

        if(sV != ''){
            t.whereS = " AND `"+sC+"` = '"+ sV +"'";
        }else{
            t.whereS = '';
        }

        console.log({
            table: t.table,
            order: t.order,
            pg: t.pagination,
            qtgPg: t.qtdPages,
            where: t.where
        })

        aPagination({
            container: t.container,
            url: t.url,
            type: t.type,
            theme: t.theme,
            gi: gi,
            t: t,
            data: {
                table: t.table,
                order: t.order,
                pg: t.pagination,
                qtgPg: t.qtdPages,
                where: t.where+t.whereS
            }
        });
    })
}

function aPagination(aj) {
    $.ajax({
        beforeSend: function(){
            $(aj.t.containTable).find('.box-loading').css('display', 'block');
            setTimeout(()=>{
                $(aj.t.containTable).find('.box-loading').css('opacity', '1');
            }, 100);
        },
        url: aj.url,
        type: aj.type,
        data: aj.data,
        dataType:'json',
        async: true,
        success: function(data){
            console.log(aj.data)
            if(!aj.theme){
                theme({
                    theme: aj.theme,
                    gi: aj.gi,
                    t: aj.t,
                    r: {
                        r: false,
                        d: data
                    }
                });
            }else{
                theme({
                    theme: aj.theme,
                    gi: aj.gi,
                    t: aj.t,
                    r: {
                        r: true,
                        d: data
                    }
                });
            }
            $(aj.t.containTable).find('.box-loading').css('opacity', '0');
            setTimeout(()=>{
                $(aj.t.containTable).find('.box-loading').css('display', 'none');
            }, 100);
        },
        error: function(xhr) {
            result = xhr
            console.log(xhr.responseText)
        }
    });
}

function theme(th){
    var r = th.r;
    var c = $('#'+th.gi);
    var elements;

    $(th.t.containTable).find('div:nth-child(2)').remove();
    $(th.t.containTable).append('<div></div>');
    var container = $(th.t.containTable).find('div:nth-child(2)');

    for(var i = 0; i < r.d.registros.length; i++){
        container.append(elementsTable({
            c: th.t.idTable,
            lD: r.d.registros.length,
            d: r.d.registros[i]
        } ))
    }
    
    if(r.d.qtdPages < th.t.pagination)
        th.t.pagination = r.d.qtdPages;

    if(r.r){
        if(r.d.qtdPages <= 1){
            c.css('display', 'none');
            $(th.t.containTable).css('max-height', '80%');
        }else{
            if(th.theme === 1){
                c.css('display', 'flex').css('opacity', '0');
                c.attr('pa-qtdPages', r.d.qtdPages);
                elements = theme01(r.d.qtdPages, th.t.pagination, c);
                
            }
            $(th.t.containTable).css('max-height', '73%');
            
    
            c.find('.single-pagination').append(elements);
            c.css('opacity', '1');
            
            actionsBtns(r.d.qtdPages, th.t.pagination, c);
    
            pEvents(c, th.t, r.d.qtdPages);
        }
    }

    th.t.events();
    c.css(th.t.styles);


    result = th.r.table;
}

function theme01(q, p, c){
    let sPagination = c.find('.single-pagination');
    let sNumber = '';
    let btnSNumber = sPagination.find('box-wrapper-pagination');

    btnSNumber.remove();
    
    sNumber += `
        <div class="box-wrapper-pagination">
            <div ap-direction="left" ap-btnDisabled="true" class="btn-pagination btn-pagination-left">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                </svg>
            </div>
            <div class="btn-pagination-numbers">`;
                if(q <= 7){
                    for(let i = 1; i <= q; i++){
                        sNumber += `
                            <span class="btn-pagination-number ${i == p ? 'active': ''}"
                                ap-number="${i}"
                            >
                                <p>${i}</p>
                                <div class="before"></div>
                            </span>
                        `;
                    }
                }else{
                    for(let i = 1; i <= q; i++){
                        let nC = i >= 4 && i <= (q - 3) ? '...' : i;
                        sNumber += `
                            <span class="btn-pagination-number ${nC == p ? 'active': ''}"
                                ap-number="${nC}"
                            >
                                <p>${nC}</p>
                                <div class="before"></div>
                            </span>
                        `;

                        if(nC === '...')
                            i = q - 3;
                    }
                }
    sNumber += `
            </div>
            <div ap-direction="right" ap-btnDisabled="false" class="btn-pagination btn-pagination-right">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </div>
        </div>
    `;
    
    return sNumber;
    
}

function elementsTable(r){
    var copyElement;
    if(r.c == 'all-presence'){
        if(r.lD > 0){
            copyElement = `
                <div class="tr w100 display-flex space-between">
                    <div class="td padd-1p col-1 display-flex align-items-center">
                        <div class="inicial-nome display-center">
                            ${r.d.nome.split('')[0]}
                        </div>
                        <div class="nome">
                            <p>${r.d.nome}</p>
                            <p><a target="_blank" href='mailto://${r.d.email}' title="Envie um E-mail">${r.d.email}</a></p>
                        </div>
                    </div>
                    <div class="td padd-1p col-4 display-flex align-items-center"><a target="_blank" href="https://wa.me/${apN(r.d.telefone)}" title="Entre em contato pelo WhatsApp">${r.d.telefone}</a></div>
                    <div class="td padd-1p col-3 display-flex align-items-center">${fDH((r.d.data_hora))}</div>
                    <div class="td padd-1p col-5 display-flex align-items-center">${r.d.identificacao}</div>
                    <div class="td padd-1p col-5 display-flex align-items-center">
                        <a href="" 
                            type-title="Informações de ${r.d.nome.split(' ')[0]} ${r.d.nome.split(' ')[1]}" 
                            type-view='${Encripta(JSON.stringify(r.d))}'
                            type-obj="view-presence-all"
                            type-table="${Encripta('tb_sys_admin.contato')}"
                            type-btn="modal"
                            class="btn-action-table view shadow-01 border-r-10 display-center transition" 
                            title="Ver mais sobre ${r.d.nome.split(' ')[0]}"><i class="bi bi-eye"></i></a>
                        <a href="#" data-remove='${r.d.id}' class="btn-action-table confirme shadow-01 border-r-10 display-center transition" title="Confirmar Presença"><i class="bi bi-check2-all"></i></a>
                    </div>
                </div>
            `;
        }else{
            copyElement = `
                <div class="no_result">
                    <p>Não há novos contatos...</p>
                </div>
            `;
        }
    }

    return copyElement;
}

function actionsBtns(q, p, c){
    var bP = c.find('.btn-pagination[ap-direction]');
    var vS = false;

    bP.each(function(){
        if(p == q){
            if($(this).attr('ap-direction') == 'left'){
                $(this).attr('ap-btnDisabled', 'false');
            }
            if($(this).attr('ap-direction') == 'right'){
                $(this).attr('ap-btnDisabled', 'true');
            }
        }else if(p == 1){
            if($(this).attr('ap-direction') == 'left'){
                $(this).attr('ap-btnDisabled', 'true');
            }
            if($(this).attr('ap-direction') == 'right'){
                $(this).attr('ap-btnDisabled', 'false');
            }
        }else{
            $(this).attr('ap-btnDisabled', 'false');
        }
    });

    if(p >= 3 && p <= q-2){
        c.find('.btn-pagination-number').each(function(index){
            if(index == 1 || index == 5){
                aNV($(this), '...');
            }
            if(index == 2){
                aNV($(this), p-1);
            }
            if(index == 3){
                aNV($(this), p);
                c.find('.btn-pagination-number.active').removeClass('active');
                $(this).addClass('active')
            }
            if(index == 4){
                aNV($(this), p+1);
            }
        }); 

        vS = true;
    }

    bP.click(function(){
        var s = c.find('.btn-pagination-number');
        var sA = c.find('.btn-pagination-number.active');
        var sAA = sA.attr('ap-number');
        var sP = sA.prev();
        var sN = sA.next();

        if(q <= 7){
            CBP($(this).attr('ap-direction'));
        }else{
            var qI = 2;

            if($(this).attr('ap-direction') == 'right'){
                CBO({
                    d: 'right',
                    qI: qI,
                    p: sN.attr('ap-number') == `3`,
                    e: parseInt(sN.attr('ap-number')) != q - 1
                });
            }else if($(this).attr('ap-direction') == 'left'){
                CBO({
                    d: 'left',
                    qI: qI,
                    p: sP.attr('ap-number') == `${q-2}`,
                    e: parseInt(sP.attr('ap-number')) != 2
                });
            }
        }

        function CBO(op){
            if(vS){
                if(op.e){
                    s.each(function(index){
                        if(index == 2){
                            if(op.d == 'right')
                                aNV($(this), sAA);
                            else if(op.d == 'left')
                                aNV($(this), sP.attr('ap-number')-1);
                        }
                        if(index == 3){
                            if(op.d == 'right')
                                aNV($(this), parseInt(sN.attr('ap-number')));
                            else if(op.d == 'left')
                                aNV($(this), parseInt(sP.attr('ap-number'))+1);
                        }
                        if(index == 4){
                            if(op.d == 'right')
                                aNV($(this), parseInt(sAA)+2);
                            else if(op.d == 'left')
                                aNV($(this), parseInt(sAA));
                        }
                    });
                }else{
                    op.qI = 0;
                    s.each(function(index){
                        if(index == 3){
                            aNV($(this), '...');
                        }
                        if(index <= 2){
                            aNV($(this), index+1);
                        }
                        if(index >= 4){
                            aNV($(this), (q-2)+op.qI);

                            op.qI++;
                        }
                        if(op.d == 'right'){
                            if(index == 5){
                                sA.removeClass('active');
                                $(this).addClass('active');
                            }
                        }else if(op.d == 'left'){
                            if(index == 1){
                                sA.removeClass('active');
                                $(this).addClass('active');
                            }
                        }
                    });
                    vS = false;
                }
                return;
            }else if(op.p){
                s.each(function(index){
                    if(index == 1 || index == 5){
                        aNV($(this), '...');
                    }
                    if(index == op.qI && op.qI <= 4){
                        if(op.d == 'left'){
                            aNV($(this), (q-5)+op.qI);
                        }else if(op.d == 'right'){
                            aNV($(this), op.qI);
                        }

                        op.qI++;
                    }
                    if(index == 3){
                        sA.removeClass('active');
                        $(this).addClass('active')
                    }
                }); 

                vS = true;
                return;
            }else{
                CBP(op.d);

                return;
            }
        }

        function CBP(bD){
            if(bD == 'left'){
                if(parseInt(sP.attr('ap-number')) >= 1){
                    sA.removeClass('active');
                    sP.addClass('active');
                }
            }else if(bD == 'right'){
                if(parseInt(sN.attr('ap-number')) <= q){
                    sA.removeClass('active');
                    sN.addClass('active');
                }   
            }
        }
    });

    c.find('.btn-pagination-number').click(function(){
        var cLV = $(this).attr('ap-number');
        var s = c.find('.btn-pagination-number');
        var sA = c.find('.btn-pagination-number.active');
        var sAA = sA.attr('ap-number');
        var sP = $(this).prev();
        var sN = $(this).next();

        if(cLV != '...'){
            if(!$(this).hasClass('active')){
                if(q <= 7){
                    s.removeClass('active');
                    $(this).addClass('active');
                }else{
                    var qI = 2;
                    if(cLV == '1' || cLV == `${q}`){
                        qI = 0;
                        s.each(function(index){
                            if(index == 3){
                                aNV($(this), '...');
                            }
                            if(index <= 2){
                                aNV($(this), index+1);
                            }
                            if(index >= 4){
                                aNV($(this), (q-2)+qI);

                                qI++;
                            }
                        });
                        vS = false;
                        sA.removeClass('active');
                        $(this).addClass('active');
                    }else if(sN.attr('ap-number') == '...'){
                        CBO({
                            d: 'right',
                            qI: qI,
                            p: parseInt(cLV) == 3,
                            e: parseInt(cLV) != q-1
                        });
                    }else if(sP.attr('ap-number') == '...'){
                        
                        console.log(this)
                        CBO({
                            d: 'left',
                            qI: qI,
                            p: parseInt(cLV) == q-2,
                            e: parseInt(cLV) != 2
                        });
                    }else{
                        s.removeClass('active');
                        $(this).addClass('active');
                    }
                }
            }
            function CBO(op){
                if(vS){
                    if(op.e){
                        var vMe = parseInt(cLV) < parseInt(sAA);
                        var vMa = parseInt(cLV) > parseInt(sAA);
                        s.each(function(index){
                            if(index == 2){
                                if(vMa)
                                    aNV($(this), sAA);
                                else if(vMe)
                                    aNV($(this), parseInt(sAA)-2);
                            }
                            if(index == 3){
                                if(vMa)
                                    aNV($(this), parseInt(sP.attr('ap-number'))+1);
                                else if(vMe)
                                    aNV($(this), parseInt(sAA)-1);
                            }
                            if(index == 4){
                                if(parseInt(cLV) >= parseInt(sAA))
                                    aNV($(this), parseInt(sAA)+2);
                                else if(vMe)
                                    aNV($(this), parseInt(sAA));
                            }
                        });
                    }else{
                        op.qI = 0;
                        s.each(function(index){
                            if(index == 3){
                                aNV($(this), '...');
                            }
                            if(index <= 2){
                                aNV($(this), index+1);
                            }
                            if(index >= 4){
                                aNV($(this), (q-2)+op.qI);

                                op.qI++;
                            }
                            if(op.d == 'right'){
                                if(index == 5){
                                    sA.removeClass('active');
                                    $(this).addClass('active');
                                }
                            }else if(op.d == 'left'){
                                if(index == 1){
                                    sA.removeClass('active');
                                    $(this).addClass('active');
                                }
                            }
                        });
                        vS = false;
                    }
                    return;
                }else if(op.p){
                    s.each(function(index){
                        if(index == 1 || index == 5){
                            aNV($(this), '...');
                        }
                        if(index == op.qI && op.qI <= 4){
                            if(op.d == 'right'){
                                aNV($(this), op.qI);
                            }else if(op.d == 'left'){
                                aNV($(this), (q-5)+op.qI);
                            }

                            op.qI++;
                        }
                        if(index == 3){
                            sA.removeClass('active');
                            $(this).addClass('active')
                        }
                    }); 

                    vS = true;
                    return;
                }
            }
        }
    });

    function aNV(b, p){
        b.attr('ap-number', p);
        b.find('p').text(p);
    }

}

function pEvents(c, t, qP){
    var bP = c.find('.btn-pagination-number');
    var bD = c.find('.btn-pagination');
    var nPA = '1';

    bP.click(function(){
        if($(this).attr('ap-number') != '...'){
            var pa = c.find('.btn-pagination-number.active').attr('ap-number');
            // var qP = t.qtdPages;
            // var or
            var data = {
                table: t.table,
                order: t.order,
                where: t.where,
                pg: t.pagination,
                qtgPg: t.qtdPages,
            }

            var data2;
            var sP = $(this).prev();
            var sN = $(this).next();

            if(parseInt(t.qtdPages) <= 7){
                data2 = nS(pa != nPA, pa);
            }else{
                if(sN.attr('ap-number') == '...'){
                    data2 = nS(pa != nPA, sP.attr('ap-number'));
                }else if(sP.attr('ap-number') == '...'){
                    data2 = nS(pa != nPA, sN.attr('ap-number'));
                }else{
                    data2 = nS(pa != nPA, pa);
                }
            }

            dD(pa, qP);

            $.extend(data, data2);

            if(data.pg != ''){
                if(t.where == ''){
                    delete data.where;
                    aPagination({
                        container: t.container,
                        url: t.url,
                        type: t.type,
                        theme: false,
                        data: data,
                        t: t
                    });

                }else{
                    aPagination({
                        container: t.container,
                        url: t.url,
                        type: t.type,
                        theme: false,
                        data: data,
                        t: t
                    });
                }
            }

            nPA = pa;

            function nS(v, n){
                return v ? {pg: n} : {pg: ''};
            }
        }
    });

    bD.click(function(){
        var pa = c.find('.btn-pagination-number.active').attr('ap-number');
        var data = {
            table: t.table,
            order: t.order,
            where: t.where,
            pg: t.pagination,
            qtgPg: t.qtdPages,
        }

        var data2;

        if($(this).attr('ap-btnDisabled') == 'false'){
            data2 = {pg: pa};
            dD(pa, qP);
    
            $.extend(data, data2);
    
            if(data.pg != ''){
                if(t.where == ''){
                    delete data.where;
                    aPagination({
                        container: t.container,
                        url: t.url,
                        type: t.type,
                        theme: false,
                        data: data,
                        t: t
                    });
                }else{
                    aPagination({
                        container: t.container,
                        url: t.url,
                        type: t.type,
                        theme: false,
                        data: data,
                        t: t
                    });
                }
            }
        }

        nPA = pa;

    });

    function dD(p, qP){
        parseInt(p) == 1 ? c.find('.btn-pagination-left').attr('ap-btnDisabled', true) : c.find('.btn-pagination-left').attr('ap-btnDisabled', false);
        parseInt(p) == parseInt(qP) ? c.find('.btn-pagination-right').attr('ap-btnDisabled', true) : c.find('.btn-pagination-right').attr('ap-btnDisabled', false);
    }
}