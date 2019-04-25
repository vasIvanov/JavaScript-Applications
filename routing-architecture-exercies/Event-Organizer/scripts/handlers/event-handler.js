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
    let author = sessionStorage.getItem('username');
    if(!name || !dateTime || !description || !imageURL){
        notifications.showError('All fields must be filled in!');
        return;
    }
    eventService.createEvent(name, dateTime, description, imageURL, author)
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
    eventService.getEventDetails(ctx.params.id.slice(1))
        .then(function (res) {
            ctx.event = res[0].event;
            ctx.description = res[0].description;
            ctx.date = res[0].date;
            ctx.image = res[0].image;
            ctx.author = res[0].author;
            ctx.joined = res[0].joined;
            ctx.isAuthor = res[0].author === sessionStorage.getItem('username');
            ctx.loadPartials({
                header: '../templates/common/header.hbs',
                footer: '../templates/common/footer.hbs'
            }).then(function () {
                this.partial('../templates/event/details.hbs');
            });
        });
        
}