$(function(){

    /* * ShowPassword * */

    const showPassword = $('.icon-showPassword');
    const password = $('#password');

    setInterval(()=>{
        if(password.val() !== ''){
            showPassword.css('display', 'flex');
        }else{
            showPassword.css('display', 'none');
        }
    });

    showPassword.click(()=>{
        const passwordType = password.attr('type');

        if(passwordType === 'password'){
            password.attr('type', 'text');
            
            showPassword.addClass('activePassword');
        }else{
            password.attr('type', 'password');
            showPassword.removeClass('activePassword');

        }
    });

    /* ** */

    /* RememberUser */

    // Consts
    let rememberUser = {};
    
    const boxLembrar = $('.wrapper-lembrar-label');
    const inputAcao = $('input[name="acao"]');
    const inputLembrarLogin = $('#lembrar-login');
    const inputName = $('input[name="user"]');
    const inputPassword = $('input[name="password"]');
    

    let rememberUserStorege = localStorage.getItem('dashboardSystemLogin');
    let rememberUserJson = JSON.parse(rememberUserStorege);

    // console.log(JSON.parse(rememberUserStorege))

    if(rememberUserJson !== null){
        if(rememberUserJson.checkedRemember === true){
            inputLembrarLogin.prop('checked', rememberUserJson.checkedRemember);
            inputName.val(rememberUserJson.user);
            inputPassword.val(Descripta(rememberUserJson.password));
        }
    }

    // Events
    boxLembrar.click(()=>{
        if(!inputLembrarLogin.prop('checked')){
            waitUser();
        }else{
            removeUser();
        }
    });
    inputAcao.click(()=>{
        if(!inputLembrarLogin.prop('checked')){
            removeUser();
        }else{
            waitUser();
        }
    });


    // Functions
    function waitUser(){
        if(inputName.val() !== '' || inputPassword.val() !== ''){
            rememberUser = {
                user: inputName.val(),
                password: Encripta(inputPassword.val()),
                checkedRemember: true
            };
        }else{
            rememberUser = {
                user: '',
                password: '',
                checkedRemember: false
            };
        }

        updateLocalStorage('dashboardSystemLogin', rememberUser);
            
    }
    function removeUser(){
        rememberUser = {
            user: '',
            password: '',
            checkedRemember: false
        };

        updateLocalStorage('dashboardSystemLogin', rememberUser);
    }

    /* ** */
});