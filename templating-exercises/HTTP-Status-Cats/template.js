function showInfo(id){
    $(`#${id}`).toggle();
    
}

$(() => {
    renderCatTemplate();

    async function renderCatTemplate() {
        let catTemplate = await $.get('./cat-template.hbs');
        const template = Handlebars.compile(catTemplate);
        const context = {
            cats
        };
        const rednderedHTML = template(context);
        $('#allCats').append(rednderedHTML);
        
    }

});