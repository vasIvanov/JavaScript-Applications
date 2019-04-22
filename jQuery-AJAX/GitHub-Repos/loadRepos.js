function loadRepos() {
    $('#repos').empty();
    let url = "https://api.github.com/users/" + 
    $("#username").val() + "/repos";

    $.ajax({
        url,
        method: "GET",
        success: displayRepos,
    });

    function displayRepos(repos) {
        for (let repo of repos) {
            let link = $('<a>').text(repo.full_name);
            link.attr('href', repo.html_url);
            $('#repos').append($('<li>').append(link));
            
        }
    }
}