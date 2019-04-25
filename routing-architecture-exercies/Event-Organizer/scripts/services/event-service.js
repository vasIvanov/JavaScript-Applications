const eventService = (() => {
    function createEvent(event, date, description, image, author) {
        return kinvey.post('appdata', 'events', 'kinvey', {
            event,
            date, 
            description, 
            image,
            joined: 0,
            author
        });
    }

    function getAllEvents() {
        return kinvey.get('appdata', 'events', 'kinvey');
    }

    function getAllMyEvents(id) {
       return kinvey.get('appdata', `events?query={"_acl.creator":"${id}"}`);
    }

    function getEventDetails(id) {
        return kinvey.get('appdata', `events?query={"_id":"${id}"}`);
    }

    function editEvent(id, newEvent) {
        
        return kinvey.update('appdata', `events/${id}`, 'kinvey', newEvent)
    }
    return {
        createEvent,
        getAllEvents,
        getAllMyEvents,
        getEventDetails,
        editEvent
    }
})()