function attachEvents() {
    $('#btnLoadTowns').on('click', () => {
        let towns = $('#towns').val();
        towns = towns.split(',');
        const context = {
            towns
        }
        const townsTemplate = $('#towns-template').html()
        
        const template = Handlebars.compile(townsTemplate)
        const renderedHTML = template(context);
        $('#root').append(renderedHTML);
    });
    
}