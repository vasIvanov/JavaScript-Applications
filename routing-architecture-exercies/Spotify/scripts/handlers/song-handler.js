handlers.getAllSongs = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');
    songService.getAllSongs()
        .then(res => {
            let userId = sessionStorage.getItem('id');
            res.forEach((song) => song.isAuthor = song._acl.creator === userId);
            
            ctx.songs = res;
            ctx.loadPartials({
                header: '/views/common/header.hbs',
                footer: '/views/common/footer.hbs',
                song: `/views/songs/song.hbs`
            }).then(function() {
                this.partial(`/views/songs/allSongs.hbs`);
            })
        })
}

handlers.getAddSong = function(ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');
    ctx.loadPartials({
        header: '/views/common/header.hbs',
        footer: '/views/common/footer.hbs',
    }).then(function() {
        this.partial(`/views/songs/createSong.hbs`)
    })
}

handlers.postAddSong = function(ctx) {
    let song = {...ctx.params, likes: 0, listens: 0};
    songService.addSong(song)
        .then(() => {
            notify.showInfo(`Song created!`);
            ctx.redirect(`#/songs`)
        })
    
}

handlers.getListen = function (ctx) {
    let id = ctx.params.id;
    let song = {}
    songService.getSong(id)
        .then(function(res) {
            song = res;
            let newListens = Number(song.listens) + 1;
            song.listens = newListens;
            songService.listenSong(id, song)
                .then(function() {
                    notify.showInfo(`Listened!`);
                    ctx.redirect(`#/songs`);
                })
        })
}

handlers.getLikeSong = function (ctx) {
    let id = ctx.params.id;
    let song = {}
    songService.getSong(id)
        .then(function(res) {
            song = res;
            let newLikes = Number(song.likes) + 1;
            song.likes = newLikes;
            songService.listenSong(id, song)
                .then(function() {
                    notify.showInfo(`Listened!`);
                    ctx.redirect(`#/songs`);
                })
        })
}

handlers.getMySongs = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');
    let userId = sessionStorage.getItem(`id`);
    songService.getMySongs(userId)
        .then(res => {
            ctx.mySongs = res;
            ctx.loadPartials({
                header: '/views/common/header.hbs',
                footer: '/views/common/footer.hbs',
                mySong: `/views/songs/mySong.hbs`
            }).then(function() {
                this.partial(`/views/songs/mySongs.hbs`);
            })
        })
    
}

handlers.getListenInMySongs = function (ctx) {
    let id = ctx.params.id;
    let song = {}
    songService.getSong(id)
        .then(function(res) {
            song = res;
            let newListens = Number(song.listens) + 1;
            song.listens = newListens;
            songService.listenSong(id, song)
                .then(function() {
                    notify.showInfo(`Listened!`);
                    ctx.redirect(`#/mySongs`);
                })
        })
}

handlers.getRemoveSong = function (ctx) {
    let id = ctx.params.id;
    songService.removeSong(id)
        .then(() => {
            notify.showInfo(`Deleted!`);
            ctx.redirect(`#/songs`);
        })
}