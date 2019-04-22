function loadCommits() {
    $('#commits').empty();
    const $ul = $('#commits');
    let user = $('#username').val();
    let repo = $('#repo').val();
    const url = `https://api.github.com/repos/${user}/${repo}/commits`;

   /* $.get(url)
        .then(commits => {
            commits.forEach(commit => {
                let $li  = $(`<li>${commit.commit.author.name}: ${commit.commit.message}</li>`);
                $ul.append($li);
            });
        })
        .catch(error => {
            let $li  = $(`<li>Error: ${error.status}: (${error.statusText})</li>`);
            $ul.append($li);
        });*/



    const promise = new Promise((resolve, reject) => {
                /*$.ajax({
                    method:'GET',
                    url,
                    success: resolve,
                    error: reject
                })*/

                /*$.get(url)
                    .done((data) => resolve(data))
                    .fail((error) => reject(error))*/

                
                    fetch(url)
                    .then(status)
                    .then(res => res.json())
                    .then(data => resolve(data))
                    .catch(error => {
                        throw(error)
                    }) 
               
                function status(res) {
                    if(!res.ok) {
                        return reject(res)
                    }

                    return res;
                }
                    
              
                
           

            
        
    })


    promise
        .then((commits) => {
            commits.forEach(commit => {
                let $li  = $(`<li>${commit.commit.author.name}: ${commit.commit.message}</li>`);
                $ul.append($li);
            });
        })
        .catch((error) => {
            console.log(error);
            
            let $li  = $(`<li>Error: ${error.status}: (${error.statusText})</li>`);
            $ul.append($li);
        })
}