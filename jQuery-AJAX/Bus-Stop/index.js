function getInfo() {
    const baseUrl = 'https://judgetests.firebaseio.com/businfo/';
    let stopId = $('#stopId').val();
    $('#stopId').val('');
    $.ajax({
        method: 'GET',
        url: baseUrl + stopId + '.json',
        success: showBuses,
        error: handleError
    });

    function showBuses(data) {
        $('#buses').empty();
        let stopName = data.name;
        let $ul = $('#buses');
        $('#stopName').text(stopName);
        for (let [key, value] of Object.entries(data.buses)) {
            let $li = $(`<li>Bus ${key} arrives in ${value} minutes</li>`);
            $ul.append($li);
        }
    }

    function handleError(err) {
        $('#stopName').text('Error');
    }
    
}