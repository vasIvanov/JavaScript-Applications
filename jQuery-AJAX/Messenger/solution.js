function attachEvents() {
    const baseUrl = 'https://messenger-ec0b2.firebaseio.com/messanger/.json';
    $('#refresh').on('click', () => {
        $.ajax({
            method: 'GET',
            url: baseUrl,
            success: showMessages
        })
    })

    $('#submit').on('click', () => {
        let authorName = $('#author').val();
        let msgContent = $('#content').val();

        let msgToPost = JSON.stringify({
            author: authorName,
            content: msgContent,
            timestamp: Date.now()
        });


        $.ajax({
            method: 'POST',
            url: baseUrl,
            data: msgToPost,
        })
    })

    function showMessages(data) {
        let text = '';
        
        for (const iterator in data) {
            
            text += `${data[iterator].author}: ${data[iterator].content}\n`;
        }
        $('#messages').text(text);
        
    }
}