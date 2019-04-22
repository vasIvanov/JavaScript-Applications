$(function () {
    $('#btnLoad').on('click', loadContact);
    $('#btnCreate').on('click', createContact);

    function loadContact() {
        $.ajax({
            url:'https://phonebook-785d3.firebaseio.com/.json',
            method: "GET",
            success: displayContacts
        });
    }
    function createContact() {
        let newContactJSON = JSON.stringify({
            name: $('#person').val(),
            phone: $('#phone').val()
        });

        $.ajax({
            method: 'POST',
            data: newContactJSON,
            url: 'https://phonebook-785d3.firebaseio.com/.json',
            success: loadContact
        })
        $('#phone').val('');
        $('#person').val('');
    }

    function displayContacts(contacts) {
        $('#phonebook').empty();
        for (const key in contacts) {
            if(contacts[key]) {
                let person = contacts[key]['name'];
                let phone = contacts[key]['phone'];
                let li = $("<li>");
                li.text(person + ': ' + phone + ' ');
                $("#phonebook").append(li);
                li.append($("<button>Delete</button>")
                .click(deleteContact.bind(this, key)));
            }
        }
    }

    function deleteContact(key) {
        let req = {
            method:'DELETE',
            url: `https://phonebook-785d3.firebaseio.com/${key}.json`
        };
        $.ajax(req).then(() => {
            $('#btnLoad').click()
        })
    }
});