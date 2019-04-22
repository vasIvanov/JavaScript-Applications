function attachEvents() {
    const baseUrl = 'https://baas.kinvey.com/';
    const endPoint = 'students';
    const appKey = 'kid_BJXTsSi-e';
    const username = 'guest';
    const password = 'guest';
    const headers = {
        'Authorization':'Basic ' + btoa(username + ':' + password),
        'Content-type':'application/json'
    }

    $.ajax({
        url: baseUrl + 'appdata/' + appKey + '/' + endPoint,
        method: 'GET',
        headers
    }).then(data => {
        let sorted = data.sort((a, b) => {
            return a.ID - b.ID;
        });
        return sorted;
    }).then(sorted => {
        for (let i = 0; i < 3; i++) {
            let $tr = $(`
            <tr>
                <td>${sorted[i].ID}</td>
                <td>${sorted[i].FirstName}</td>
                <td>${sorted[i].LastName}</td>
                <td>${sorted[i].FacultyNumber}</td>
                <td>${sorted[i].Grade}</td>
            </tr>`)
            $('#results').append($tr);
            
        }
    })




    let student = new Student('vasil', 'ivanov', 123123, 5);
    let student2 = new Student('vasil2', 'ivanov2', 123123, 5);
    
}