$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');
        // TODO: Define all the routes
        this.get('#/home', function() {
            this.loggedIn = !!sessionStorage.getItem(`authtoken`);
            this.username = sessionStorage.getItem(`username`);
            this.hasTeam  = sessionStorage.getItem('teamId') !== 'undefined';
            this.teamId = sessionStorage.getItem('teamId');
            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function() {
                this.partial(`./templates/home/home.hbs`)
            })
        })

        this.get('#/about', function() {
            this.loggedIn = !!sessionStorage.getItem(`authtoken`);
            this.username = sessionStorage.getItem(`username`);
            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function() {
                this.partial(`./templates/about/about.hbs`)
            });
        });

        this.get('#/login', function() {
            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                loginForm: `./templates/login/loginForm.hbs`
            }).then(function() {
                this.partial(`./templates/login/loginPage.hbs`)
            });
        });

        this.post('#/login', function(context) {
            let {username, password} = context.params;
            auth.login(username, password)
                .then((res) =>{
                    auth.saveSession(res);
                    auth.showInfo(`Login succesful`);
                    this.redirect(`#/home`);
                    
                }).catch((err) => {
                    console.log(err);
                    
                })
        })

        this.get('#/register', function() {
            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                registerForm: `./templates/register/registerForm.hbs`
            }).then(function() {
                this.partial(`./templates/register/registerPage.hbs`)
            });
        });

        this.post(`#/register`, function(context) {
            let that = this;
            let {username, password, repeatPassword} = context.params;
            auth.register(username, password, repeatPassword)
                .then(function(res) {

                    auth.saveSession(res)
                    auth.showInfo(`Registration successful!`);
                    that.redirect('#/home');
                })
        })

        this.get(`#/logout`, async function() {
            await auth.logout();
            sessionStorage.clear();
            this.redirect(`#/home`)
        })

        this.get(`#/catalog`, function() {
            this.hasNoTeam = sessionStorage.getItem('teamId') === 'undefined';
            
            this.loggedIn = !!sessionStorage.getItem(`authtoken`);
            this.username = sessionStorage.getItem(`username`);
            teamsService.loadTeams()
                .then((teams) => {
                    this.teams = teams;

                    this.loadPartials({
                        header: `./templates/common/header.hbs`,
                        footer: `./templates/common/footer.hbs`,
                        team:`./templates/catalog/team.hbs`
                    }).then(function() {
                        
                        this.partial(`./templates/catalog/teamCatalog.hbs`, teams);
                    })
                })
        });

        this.get(`#/catalog/:_id`, function(teamInfo) {
            let username = sessionStorage.getItem(`username`);
            let teamMembers = [];
            let id = teamInfo.params._id.slice(1);
            let isInTeam = sessionStorage.getItem('teamId') !== 'undefined';
            this.isOnTeam = isInTeam;
            this.loggedIn = !!sessionStorage.getItem(`authtoken`);
            this.username = sessionStorage.getItem(`username`);
            sessionStorage.currentTeamId = id;
            requester.get('user', '', 'kinvey')
                .then(users => {
                    teamMembers = users.filter((e) => {
                        return e.teamId == id;
                    });
                    this.members = teamMembers;
                })
            teamsService.loadTeamDetails(id)
                .then((res) => {
                    this.isAuthor = res.author === username;
                    this.name = res.name;
                    this.comment = res.comment;
                    this.teamId = id
                    this.loadPartials({
                        header: `./templates/common/header.hbs`,
                        footer: `./templates/common/footer.hbs`,
                        teamMember: `./templates/catalog/teamMember.hbs`,
                        teamControls: `./templates/catalog/teamControls.hbs`
                    }).then(function () {
                        this.partial(`./templates/catalog/details.hbs`);
                    })
                    
                })
            
        });

        this.get(`#/join/:${sessionStorage.currentteamId}`, function() {
            let currentteamId = sessionStorage.currentTeamId
            sessionStorage.teamId = currentteamId;
            teamsService.joinTeam(currentteamId)
                .then((e) => {
                    this.redirect(`#/catalog/:${currentteamId}`);
                })
        })

        this.get(`#/leave`, function() {
            teamsService.leaveTeam()
                .then((e) => {
                    sessionStorage.teamId = e.teamId;
                    this.redirect(`#/catalog`)
                })
        })

        this.get(`#/create`, function(c) {
            this.loggedIn = !!sessionStorage.getItem(`authtoken`);
            this.username = sessionStorage.getItem(`username`);
            this.loadPartials({
                header: `./templates/common/header.hbs`,
                footer: `./templates/common/footer.hbs`,
                createForm: `./templates/create/createForm.hbs`
            }).then(function(e) {
                this.partial(`./templates/create/createPage.hbs`);
            })
        });

        this.post(`#/create`, function(context) {
            let {name, comment} = context.params;
            let author = sessionStorage.getItem(`username`);
            teamsService.createTeam(name, comment, author)
                .then((res) => {
                    let currentteamId = res._id;
                    auth.showInfo(`Team created successfully!`);
                    sessionStorage.teamId = currentteamId;
                    teamsService.joinTeam(currentteamId)
                        .then((e) => {
                            this.redirect(`#/catalog/:${currentteamId}`);
                            
                        })
                })
        })

        this.get(`#/edit/:id`, function(e) {
            this.loggedIn = !!sessionStorage.getItem(`authtoken`);
            this.username = sessionStorage.getItem(`username`);
            let teamId = e.params.id.slice(1);
            console.log(teamId);
            teamsService.loadTeamDetails(teamId)
                .then((res) => {
                    this.name = res.name;
                    this.comment = res.comment
                    this.loadPartials({
                        header: `./templates/common/header.hbs`,
                        footer: `./templates/common/footer.hbs`,
                        editForm: `./templates/edit/editForm.hbs`
                    }).then(function(e) {
                        this.partial(`./templates/edit/editPage.hbs`)
                        
                    })
                })
        })

        this.post(`#/edit/:id`, function(e) {
            let teamId = sessionStorage.getItem('teamId');
            let name = e.params.name;
            let comment = e.params.comment;
            teamsService.edit(teamId, name, comment)
                .then(() => {
                    this.redirect(`#/catalog/:${teamId}`);
                })
        })
    });
    app.run('#/home');
});