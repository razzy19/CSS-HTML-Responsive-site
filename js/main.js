//listen for form  submit
document.getElementById("myForm").addEventListener('submit',saveBookmark);

//delete bookmart

function deleteBookmark(url){
    var bookmarks =JSON.parse(localStorage.getItem('bookmarks'));

    for(var i =0;i<bookmarks.length;i++)
    {
        if(bookmarks[i].url==url)
        {
            bookmarks.splice(i,1);
        }
    }
    //reset the local storage
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks));

    //refetch bookmark
    fetchBookmarks();

}

function fetchBookmarks(){
    //get bookmarks from local storage
    var bookmarks =JSON.parse(localStorage.getItem('bookmarks'));

    //get output id
    var bookmarkResults=document.getElementById("bookmarksResults");

    //build output
    bookmarkResults.innerHTML='';

    for(var i=0;i< bookmarks.length;i++){
        var name=bookmarks[i].name;
        var url=bookmarks[i].url;

        bookmarkResults.innerHTML += '<div class="card bg-light text-dark card-body">'+
        '<h3>'+name+
        ' <a class="btn btn-primary" target="_blank" href="'+url+'">Visit</a> ' +
        ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +

        '</h3>'+
        '</div>';
    }


    console.log(bookmarks);

}


//validation

function validate(sitename,siteurl)
{
if(!sitename || !siteurl){
    alert("Please fill in the form");
    return false;
}
var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
var regex = new RegExp(expression);

if(!siteurl.match(regex)){
    alert('Please use a valid URL');
    return false;
  }

  return true;
}


function saveBookmark(e){
//def form values
var sitename=document.getElementById("siteName").value;
var siteurl=document.getElementById("siteUrl").value;

var bookmark ={
    name: sitename,
    url: siteurl
}

//call validation
if(!validate(sitename,siteurl)){
        return false;
}

//local storage test

if(localStorage.getItem("bookmarks") === null){
    //init array
    var bookmarks =[];
    //add to array
    bookmarks.push(bookmark);
    //set to localStorage
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks));

}
else{
    //get bookmarks from local storage
    var bookmarks =JSON.parse(localStorage.getItem('bookmarks'));
    //add bookmark to array
    bookmarks.push(bookmark);
    //reset back to local storage
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks));

}

//refetch bookmarks
fetchBookmarks();

//prevent form from submitting
e.preventDefault();

//reset form
document.getElementById('myForm').reset();

}