function solve() {
    const baseUrl = 'https://judgetests.firebaseio.com/schedule/'
    let initialId  = 'depot';
    let currentStop;
    function depart() {
        $.ajax({
            method: 'GET',
            url:baseUrl + initialId + '.json',
            success: (data) =>  {
                currentStop = data
                $('.info').text(`Next stop ${currentStop.name}`);
            },
            error:handleError
        })
        $('#depart').attr('disabled', true);
        $('#arrive').attr('disabled', false);
    }

    function arrive() {
        $('.info').text(`Arriving at ${currentStop.name}`);
        initialId = currentStop.next;
        $('#depart').attr('disabled', false);
        $('#arrive').attr('disabled', true);
    }

    function handleError(err) {
        $('.info').text(`Error`);
        $('#depart').attr('disabled', true);
        $('#arrive').attr('disabled', true);
    }

    return {
      depart,
      arrive
    };
}
let result = solve();