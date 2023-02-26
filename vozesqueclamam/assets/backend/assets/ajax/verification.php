<?php

    $qtd_vg = count(Painel::selectAll('tb_sys_site.inscricao'));

    if($qtd_vg === 130){
        $result = [
            'type' => false,
            'qtd' => (130 - $qtd_vg)
        ];
        echo json_encode($result);
        die();
    }else{
        $result = [
            'type' => true,
            'qtd' => (130 - $qtd_vg)
        ];
        echo json_encode($result);
        die();
    }
?>