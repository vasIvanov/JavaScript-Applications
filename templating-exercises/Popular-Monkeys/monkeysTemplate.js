$( async () => {
    const monkeyTemplate = await $.get('./monkeyTemplate.hbs');
    const context = {
        monkeys
    };
    const template = Handlebars.compile(monkeyTemplate);
    const redneredHTML = template(context);
    $('.monkeys').append(redneredHTML);

    (function(){
        $('button').on('click', function (e) {
            
            $($($(e.target).parent())[0]).children().eq(3).toggle();
            
        })
    })()
});
