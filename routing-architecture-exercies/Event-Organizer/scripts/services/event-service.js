const eventService = (() => {
    function createEvent(event, date, description, image) {
        return kinvey.post('appdata', 'events', 'kinvey', {
            event,
            date, 
            description, 
            image
        });
    }

    function getAllEvents() {
        return kinvey.get('appdata', 'events', 'kinvey');
    }

    function getAllMyEvents(id) {
       return kinvey.get('appdata', `events?query={"_acl.creator":"${id}"}`);
    }
    return {
        createEvent,
        getAllEvents,
        getAllMyEvents
    }
})()