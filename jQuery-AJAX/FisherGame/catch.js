function attachEvents() {
    const baseUrl = 'https://baas.kinvey.com/'
    const appKey = 'kid_S104ISocN';
    const endPoint = 'biggestCatches';
    const username = 'guest';
    const password = 'guest';
    const headers = {
        'Authorization':'Basic ' + btoa(username + ':' + password),
        'Content-type': 'application/json'
    };

    $('#aside .load').on('click', getCatches);
    $('#addForm .add').on('click', addCatch);

    async function getCatches() {
        try{
            let catchesData = await $.ajax({
                method:'GET',
                headers,
                url: baseUrl + 'appdata/' +  appKey + '/' + endPoint
    
            });
            renderCatches(catchesData);

        } catch(err) {
            console.log(err);
            
        }
        
    }
    function renderCatches(data) {
        $('#catches').empty();
        
        data.forEach(catchInfo => {
            
            let $div = $(`
            <div class="catch" data-id="${catchInfo._id}">
                <label>Angler</label>
                <input type="text" class="angler" value="${catchInfo.angler}"/>
                <label>Weight</label>
                <input type="number" class="weight" value="${catchInfo.weight}"/>
                <label>Species</label>
                <input type="text" class="species" value="${catchInfo.species}"/>
                <label>Location</label>
                <input type="text" class="location" value="${catchInfo.location}"/>
                <label>Bait</label>
                <input type="text" class="bait" value="${catchInfo.bait}"/>
                <label>Capture Time</label>
                <input type="number" class="captureTime" value="${catchInfo.captureTime}"/>
            </div>`);
            let updateBtn = $(`<button class="update">Update</button>`);
            updateBtn.on('click', update);
            let deleteBtn = $(`<button class="delete">Delete</button>`);
            deleteBtn.on('click', deleteFunc);
            $div.append(updateBtn);
            $div.append(deleteBtn);
            $('#catches').append($div);
        })
        
    }


    async function update() {
        let idToUpdate = $(this).parent().data('id');
        let angler = $(this).parent().find(`input.angler`).val();
        let weight = +$(this).parent().find(`input.weight`).val();
        let species = $(this).parent().find(`input.species`).val();
        let location = $(this).parent().find(`input.location`).val();
        let bait = $(this).parent().find(`input.bait`).val();
        let captureTime = +$(this).parent().find(`input.captureTime`).val();

        let newCatch = {
            angler,
            weight,
            species,
            location,
            bait,
            captureTime
        };
        try {
             await $.ajax({
                url:baseUrl + 'appdata/' + appKey + '/' + endPoint + '/' + idToUpdate,
                method:'PUT',
                data:JSON.stringify(newCatch),
                headers
            })
            getCatches();
        } catch(err) {
            console.log(err);
            
        }

        
    }

    async function deleteFunc() {
        let idToDelete = $(this).parent().data('id');
        try {
            await $.ajax({
                method:'DELETE',
                headers,
                url:baseUrl + 'appdata/' + appKey + '/' + endPoint + '/' + idToDelete
            })
            getCatches();
        } catch(err) {
            console.log(err);
            
        }
        
    }

    async function addCatch() {
        let angler = $('#addForm .angler').val();
        let weight = +$('#addForm .weight').val();
        let species = $('#addForm .species').val();
        let location = $('#addForm .location').val();
        let bait = $('#addForm .bait').val();
        let captureTime = +$('#addForm .captureTime').val();

        let newCatch = {
            angler,
            weight,
            species,
            location,
            bait,
            captureTime
        };
        try{
            await $.ajax({
                url: baseUrl + 'appdata/' +  appKey + '/' + endPoint,
                method: 'POST',
                headers,
                data: JSON.stringify(newCatch)
            });
        } catch(err) {
            console.log(err);
            
        }
        

        $('#addForm .angler').val('');
        $('#addForm .weight').val('');
        $('#addForm .species').val('');
        $('#addForm .location').val('');
        $('#addForm .bait').val('');
        $('#addForm .captureTime').val('');
        getCatches();

    }
}