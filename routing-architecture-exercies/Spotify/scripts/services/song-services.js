const songService = (() => {
    function getAllSongs() {
        return kinvey.get('appdata', 'songs?query={}&sort={"likes": -1}', 'kinvey');
    }

    function addSong(data) {
        return kinvey.post('appdata', 'songs', 'kinvey', data);
    }
    
    function getSong(id) {
        return kinvey.get('appdata', `songs/${id}`, 'kinvey');
    }

    function listenSong(id, data) {
        return kinvey.update('appdata', `songs/${id}`, 'kinvey', data);
        
    }

    function getMySongs(id) {
        return kinvey.get('appdata', `songs?query={"_acl.creator":"${id}"}&sort={"listens": -1}`, 'kinvey');
    }

    function removeSong(id) {
        return kinvey.remove('appdata', `songs/${id}`, 'kinvey');
    }
    
    
    return {
        getAllSongs,
        addSong,
        listenSong,
        getSong,
        getMySongs,
        removeSong
    }
})()