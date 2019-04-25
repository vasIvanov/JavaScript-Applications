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
            ctx.id = ctx.params.id.slice(1)
            ctx.isAuthor = res[0].author === sessionStorage.getItem('username');
            ctx.loadPartials({
                header: '../templates/common/header.hbs',
                footer: '../templates/common/footer.hbs'
            }).then(function () {
                this.partial('../templates/event/details.hbs');
            });
        });
}

handlers.joinEvent = function (ctx) {
    let id = ctx.params.id.slice(1);
    let event = {};
    eventService.getEventDetails(id)
        .then(function (res) {
            event = res[0];
            let joins = Number(event.joined) + 1;
            event.joined = joins;
            eventService.editEvent(id, event)
                .then(function () {
                    notifications.showSuccess('Joined!');
                    ctx.redirect(`#/`);
                });
        });
}

handlers.getEditEvent = function (ctx) {
    let id = ctx.params.id.slice(1);
    ctx.isAuth = true;
    eventService.getEventDetails(id)
        .then(res => {
            let info = res[0];
            ctx.id = id;
            ctx.event = info.event;
            ctx.description = info.description;
            ctx.date = info.date;
            ctx.image = info.image;
            ctx.author = info.author;
            ctx.joined = info.joined;
            ctx.username = sessionStorage.getItem('username');
            ctx.loadPartials({
                header: '../templates/common/header.hbs',
                footer: '../templates/common/footer.hbs'
            }).then(function () {
                this.partial('templates/event/edit-event.hbs');
            });
        });
}

handlers.postEditEvent = function (ctx) {
    let id = ctx.params.id.slice(1);
    
    let {name, dateTime, description, imageURL, organizer, peopleInterestedIn} = {...ctx.params};
    let editedEvent = {
        event: name,
        date: dateTime,
        description,
        image: imageURL,
        author: organizer,
        joined: peopleInterestedIn
    };
    eventService.editEvent(id, editedEvent)
        .then(function () {
            notifications.showSuccess(`Edited!`);
            ctx.redirect(`#/`);
        });
}

handlers.deleteEvent = function (ctx) {
    let id = ctx.params.id.slice(1);
    eventService.deleteEvent(id)
        .then(function () {
            notifications.showSuccess(`Event Closed!`);
            ctx.redirect(`#/`);
        });
}
