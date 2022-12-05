let filter = document.querySelector('.filter')
let pop = document.querySelector('.open-pop')
let changeName = document.querySelector('.chang-name')
let results = document.querySelector('.results')
let searchQuery = document.querySelector('.search-input')
let bookWrapper = document.querySelector('.books-inner')
let loginBtn = document.querySelector('.login_btn')
let overlay = document.querySelector('.overlay')
let login_wrapper = document.querySelector('.login-wrapper')


loginBtn.addEventListener('click', ()=>{
    login_wrapper.classList.add('active')
})
overlay.addEventListener('click', ()=>{
    login_wrapper.classList.remove('active')
})


//get books from localstorage
let local = localStorage.getItem('book-store')
let storeBooks = JSON.parse(local)


const register = token =>{

}

// add books to localstorage
const addBookToStore = el =>{
    console.log(el);
    let book = storeBooks.items.filter(id => id == el)
    console.log(book);
}


 // show books in UI
 const bookData = (el)=>{

    // get search input value
    let query = ''
    if(el != undefined){
        query = el
    }else{
        query = ''
    }

    // fetch books from API
    let url = new URL(`https://www.googleapis.com/books/v1/volumes?q="${query}"`)
    fetch(url)
    .then(res => res.json())
    .then(res => getData(res))
    .catch(error => console.log(error))


    // render books' card
    function getData (response){
        window.localStorage.setItem('book-store', JSON.stringify(response))

        // show result length in UI
        if(response.items){
            results.textContent = `Showing ${response.items.length} Result(s)`
        }else{results.textContent = 'Showing 0 Result(s)'}
    
        if(response.totalItems != 0){
            return response.items.map(el => {
                let image = document.createElement('img')
                let name = document.createElement('h2')
                let author = document.createElement('h3')
                let year = document.createElement('span')
                let card = document.createElement('div')
                let cover = document.createElement('div')
                let readWrap = document.createElement('div')
                let read = document.createElement('a')
                let bookmark = document.createElement('button')
                let info = document.createElement('button')
        
                card.classList.add('book-card')
                cover.classList.add('book-cover')
                read.classList.add('read-book')
                bookmark.classList.add('add-mark')
                info.classList.add('info')
                readWrap.classList.add('mark-info')
        
                image.src = el.volumeInfo.imageLinks.smallThumbnail
                name.textContent = el.volumeInfo.title
                author.textContent = el.volumeInfo.authors[0]
                year.textContent = el.volumeInfo.publishedDate
                bookmark.textContent = 'Bookmark'
                info.textContent = 'Info'
                read.textContent = 'Read'

                read.setAttribute("href", `read.html?isbn=${el.volumeInfo.industryIdentifiers[0]?.identifier}`)
                read.setAttribute("target", "_blank")
                card.setAttribute('id', `${el.id}`)
        
                bookmark.addEventListener('click', addBookToStore(el.id))

                cover.appendChild(image)
                readWrap.append( bookmark, info)
                card.append(cover, name, author, year, readWrap, read)
                bookWrapper.appendChild(card)
            });
        }else{
            document.body.innerHTML = ''
        }
    }
}

function categories (){
    let categoriesCard = document.createElement('div')
    let blockOne = document.createElement('div')
    let blockTwo = document.createElement('div')
    let name = document.createElement('h3')
    let author = document.createElement('span')
    let iconDel = document.createElement('img')
    let iconRea = document.createElement('img')
    let btn1 = document.createElement('button')
    let btn2 = document.createElement('button')
}

categories()
