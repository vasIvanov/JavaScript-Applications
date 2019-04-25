const eventService = (() => {
    function createEvent(event, date, description, image) {
        return kinvey.post('appdata', 'events', 'kinvey', {
            event,
            date, 
            description, 
            image
        });
    }
    return {
        createEvent
    }
})()