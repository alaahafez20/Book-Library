
var data = [];
var myDiv = document.getElementById('myDiv');
var searchBtn = document.getElementById('searchBtn');
var addBtn = document.getElementById('addBtn');
var forForm = document.getElementById('forForm');
var formInput = document.getElementById('formGroupExampleInput');
var formInput2 = document.getElementById('formGroupExampleInput2');
var formInput3 = document.getElementById('formGroupExampleInput3');
var addDone = document.getElementById('addDone');


var http = new XMLHttpRequest();
http.open('GET', 'https://www.googleapis.com/books/v1/volumes?q=java&fbclid=IwAR0u-bVMYcHBjFNOgTmz_xwVL7RQiB_5RuoNifSKXQ1APYSKDxwxTmh-8J0');
http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {
        data = JSON.parse(http.response).items;
        if (localStorage.getItem('BooksAddedByme') == null) {
            data = JSON.parse(http.response).items;
        }
        else {
            data = JSON.parse(localStorage.getItem('BooksAddedByme'));
        }
        
        show();
    }
}
http.send();



function show() {
    myDiv.innerHTML = '';
    for (var i = 0; i < data.length; i++) {
        myDiv.innerHTML += `<div class='box'>
                               <div>
                                  <h3>`+ data[i].volumeInfo.title + `</h3>
                                  <h5>by: `+ data[i].volumeInfo.authors + `</h5>
                               </div>   
                               <img style='height:170px' src=`+ data[i].volumeInfo.imageLinks.smallThumbnail + `>                      
                            </div>`

    }
}


searchBtn.addEventListener('keyup', function () {
    myDiv.innerHTML = '';

    for (var i = 0; i < data.length; i++) {
        if (data[i].volumeInfo.title.includes(this.value) == true) {
            myDiv.innerHTML += `<div class='box'>
                                  <div>
                                    <h3>`+ data[i].volumeInfo.title + `</h3>
                                    <h5>by: `+ data[i].volumeInfo.authors + `</h5>
                                  </div>
                                  <img style='height:170px' src=`+ data[i].volumeInfo.imageLinks.smallThumbnail + `>                                  
                                </div>`

        }
    }
})


addBtn.addEventListener('click', function () {
    forForm.style.display = 'block';

})

addDone.addEventListener('click', function () {
    var newBook = {
        volumeInfo: {
            title: formInput.value,
            authors: [formInput2.value],
            imageLinks: {
                smallThumbnail: formInput3.value
            }
        }
    }
    if(formInput.value.length > 0 && formInput2.value.length > 0){
        data.unshift(newBook);
        localStorage.setItem('BooksAddedByme', JSON.stringify(data));
        show();
        forForm.style.display = 'none';
    }

})


