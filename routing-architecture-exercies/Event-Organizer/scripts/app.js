const handlers = {}

$(() => {
  const app = Sammy('#root', function () {
    this.use('Handlebars', 'hbs');

    this.get('#/', handlers.getHome);

    this.get('#/register', handlers.getRegister);
    this.get('#/login', handlers.getLogin);

    this.post('#/register', handlers.registerUser);
    this.post('#/login', handlers.loginUser);
    this.get('#/logout', handlers.logoutUser);
    this.get('#/profile', handlers.getProfile);

    this.get('#/createEvent', handlers.getCreateEvent);
    this.post('#/createEvent', handlers.postCreateEvent)
    this.get(`#/details/:id`, handlers.getDetails);
    this.get(`#/join/:id`, handlers.joinEvent);
    this.get(`#/edit/:id`, handlers.getEditEvent);
    this.post(`#/edit/:id`, handlers.postEditEvent);
    this.get(`#/delete/:id`, handlers.deleteEvent);
  });
  app.run('#/');
});