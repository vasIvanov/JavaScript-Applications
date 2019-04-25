handlers.getCreateEvent = function (ctx) {
    ctx.isAuth = true;
    ctx.username = sessionStorage.getItem('username');
    ctx.loadPartials({
        header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs'
      }).then(function () {
        this.partial('templates/event/create-event.hbs');
      })
}

handlers.postCreateEvent = function (ctx) {
    let {name, dateTime, description, imageURL} = {...ctx.params};
    
    if(!name || !dateTime || !description || !imageURL){
        notifications.showError('All fields must be filled in!');
        return;
    }
    eventService.createEvent(name, dateTime, description, imageURL)
        .then(function (){
            notifications.showSuccess('Event Created!');
            ctx.redirect('#/');
        }).catch(function (err) {
            notifications.showError(err.responseJSON.description);
        });
}

handlers.getDetails = function (ctx) {
    ctx.isAuth = true;
    ctx.username = sessionStorage.getItem('username');
    ctx.loadPartials({
        header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs'
      }).then(function () {
        this.partial('templates/event/create-event.hbs');
      })
}