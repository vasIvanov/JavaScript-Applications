function showDetails(id) {
    $(`#${id}`).toggle();
}


$( async () => {
    const contactListHTML = await $.get('./contact-list.hbs');
    const contactInfoHTML = await $.get('./contact-info.hbs');
    Handlebars.registerPartial('contactInfo', contactInfoHTML);
    const template = Handlebars.compile(contactListHTML);
    
    const context = {
        contacts
    }
    
    const renderedHTML = template(context);
    $('body').append(renderedHTML)
})