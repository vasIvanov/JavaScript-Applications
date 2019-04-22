handlers.getRegister = function (ctx) {
    ctx.loadPartials({
        header: '/views/common/header.hbs',
        footer: '/views/common/footer.hbs'
    }).then(function() {
        this.partial(`/views/user/register.hbs`);
    })
}

handlers.postRegister = function (ctx) {
    let {
        username,
        password
    } = ctx.params;

    if(!username || !password) {
        notify.showError(`Username and password must be valid`)
    } else {
        userService.register(username, password)
            .then(res => {
                userService.saveSession(res)
                notify.showInfo(`Registration successful!`);
                ctx.redirect(`#/home`);
            })
    }
}

handlers.logout = function (ctx) {
    userService.logout()
        .then(() => {
            sessionStorage.clear();
            notify.showInfo(`Logged out!`);
            ctx.redirect(`#/home`);
        })
}

handlers.getLogin = function (ctx) {
    ctx.loadPartials({
        header: '/views/common/header.hbs',
        footer: '/views/common/footer.hbs'
    }).then(function() {
        this.partial(`/views/user/login.hbs`);
    })
}

handlers.postLogin = function (ctx) {
    let {
        username,
        password
    } = ctx.params;

    
        userService.login(username, password)
            .then(res => {
                userService.saveSession(res)
                notify.showInfo(`Login successful!`);
                ctx.redirect(`#/home`);
            }).catch((err) => {
                notify.showError(err.responseJSON.description)
            })
    
}

