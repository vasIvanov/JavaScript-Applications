const handlers = {};
$(function() {
    const app = Sammy('#root', function() {
        this.use('Handlebars', 'hbs');


        this.get('#/home', handlers.getHome);

        this.get('#/register', handlers.getRegister);
        this.post(`#/register`, handlers.postRegister);

        this.get(`#/logout`, handlers.logout);
        this.get(`#/login`, handlers.getLogin);
        this.post(`#/login`, handlers.postLogin);

        this.get(`#/songs`, handlers.getAllSongs);
        this.get(`#/add`, handlers.getAddSong);
        this.post(`#/add`, handlers.postAddSong);
        this.get(`#/listen/:id`, handlers.getListen);

        this.get(`/like/:id`, handlers.getLikeSong);
        this.get(`#/mySongs`, handlers.getMySongs);
        this.get(`#/listen/mySongs/:id`, handlers.getListenInMySongs);

        this.get(`#/remove/:id`, handlers.getRemoveSong);
    })
    app.run('#/home');
});