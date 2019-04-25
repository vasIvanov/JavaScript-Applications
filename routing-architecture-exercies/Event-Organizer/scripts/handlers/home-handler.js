handlers.getHome = function (ctx) {
  ctx.isAuth = userService.isAuth();
  ctx.username = sessionStorage.getItem('username');
  console.log(ctx);
  if(ctx.isAuth){
    eventService.getAllEvents()
      .then(res => {
        ctx.events = res;
        ctx.loadPartials({
          header: '../templates/common/header.hbs',
          footer: '../templates/common/footer.hbs',
          event: '../templates/event/event-holder.hbs',
          notFound:'../templates/event/not-found.hbs'
        }).then(function () {
          this.partial('templates/home.hbs');
        })
      })
    } else {
      ctx.loadPartials({
        header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs',
      }).then(function () {
        this.partial('templates/home.hbs');
      })
    }
}