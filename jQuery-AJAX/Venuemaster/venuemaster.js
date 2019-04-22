function attachEvents() {
    const baseUrl = `https://baas.kinvey.com/`;
    const appKey = 'kid_BJ_Ke8hZg';
    const username = 'guest';
    const password = 'pass';
    const headers = {
        'Authorization':'Basic ' + btoa(username + ':' + password),
        'Content-type': 'application/json'
    };
    $('#getVenues').on('click', getVenues);

    async function getVenues() {
        let date = $('#venueDate').val();
        let venues  = await $.ajax({
            url: baseUrl + 'rpc/' + appKey + `/custom/calendar?query=${date}`,
            method:'POST',
            headers
        });

        venues.forEach(foreaching);
        async function foreaching(id){
            let venue = await $.ajax({
                url: baseUrl + 'appdata/' + appKey + '/venues/' + id,
                method: 'GET',
                headers
            });
            let $div = $(`
                <div class="venue" id="${venue._id}"></div>`);

            let $moreInfoBtn = $(`<input class="info" type="button" value="More info">`);
            let $span = $(`<span class="venue-name"></span>`);

            $moreInfoBtn.on('click', moreInfo);
            $span.append($moreInfoBtn);
            $span.append(`${venue.name}`);
            $div.append($span);
            let $hiddenDiv = $(`<div class="venue-details" style="display: none;"></div>`);

            let $tableRows = $(`<tr>
            <td class="venue-price">${venue.price} lv</td>
            <td><select class="quantity">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
             </select></td>
             </tr>`);

            let $table = $(`<table>
            <tr><th>Ticket Price</th><th>Quantity</th><th></th></tr>
            </table>`);

            let $spanAndPara = $(`<span class="head">Venue description:</span>
            <p class="description">${venue.description}</p>
            <p class="description">Starting time: ${venue.startingHour}</p>`)

            let $purchaeBtn = $(`<input class="purchase" type="button" value="Purchase">`);
            $purchaeBtn.on('click', purchase);
            $tableRows.append($purchaeBtn);
            $table.append($tableRows)
            $hiddenDiv.append($table);
            $hiddenDiv.append($spanAndPara);
            $div.append($hiddenDiv);
            $('#venue-info').append($div);
        }
    }

    function moreInfo(e) {
        if($($(this).parent().parent().children().eq(1)[0]).css('display') === 'block'){
            $($(this).parent().parent().children().eq(1)[0]).css('display', 'none')
        } else {
            $($(this).parent().parent().children().eq(1)[0]).css('display', 'block');
        }
        
    }

    function purchase() {
        let quantity = $($(this).parent().children().eq(1)[0]).children().eq(0).val();
        let price = +$($(this).parent().children().eq(0)[0]).text().split(' ')[0];
        let name = $($(this).parent().parent().parent().parent().parent().children().eq(0)[0]).text();
        let id  = $(this).parent().parent().parent().parent().parent()[0].id;
        
        let content = $(`<span class="head">Confirm purchase</span>
        <div class="purchase-info">
          <span>${name}</span>
          <span>${quantity} x ${price}</span>
          <span>Total: ${quantity * price} lv</span>
          <input type="button" value="Confirm">
        </div>`)
        $('#venue-info').html(content)
        $('input').on('click', dispalyTicket);
        async function dispalyTicket() {
            let ticket = await $.ajax({
                url: baseUrl + 'rpc/' + appKey + `/custom/purchase?venue=${id}&qty=${quantity}`,
                method: 'POST',
                headers
            });
            $('#venue-info').html('You may print this page as your ticket');
            $('#venue-info').append(ticket.html);
        }
    }
}