const bookList = [
    {
        status: "完結",
        bookName: "納米崛起",
        author: "嶺南仨人",
        coverImg: "https://bookcover.yuewen.com/qdbimg/349573/1025502417/180",
        intro: "一個超憶患者的奮鬥，這是屬於納米的時代。<br>緣起於一份未來記憶。<br>取巧於零八次貸危機。<br>奠基於納米材料科技。<br>崛起於資源回收產業。",
    }
]

const bookContainer = document.querySelector(".books");
const introDetail = document.querySelector(".intro-details");

function renderBooks(books) {
    bookContainer.innerHTML = "";
    books.forEach(book => {
        const newElement = document.createElement("div");
        newElement.className = "book-item";
        // newA.href = `./book/${book.bookName}/index.html`;

        newElement.innerHTML = `
            <div class="cover">
                <a href="book/${book.bookName}/index.html"><img src="${book.coverImg}" alt=""></a>
            </div>
            <div class="info">
                <header>
                    <div class="name ellipsis">
                        <a href="book/${book.bookName}/index.html">${book.bookName}</a>
                    </div>
                    <div class="status">${book.status}</div>
                </header>
                <div class="author">${book.author}</div>
                <div class="intro ellipsis">${book.intro}</div>
            </div>
        `
        newElement.addEventListener("click", e => {
            if (e.target.classList.contains("intro")) {
                introDetail.classList.add("show");
                document.body.style = "overflow: hidden";
                introDetail.querySelector(".content").innerHTML = book.intro;
            }
        })

        bookContainer.append(newElement);
    })
}

renderBooks(bookList);

introDetail.addEventListener("click", e => {
    if (e.target == introDetail) {
        introDetail.querySelector(".content").innerHTML = "";
        introDetail.classList.remove("show");
        document.body.removeAttribute("style");
    }
})


const searchInput = document.querySelector(".search-box input");

searchInput.addEventListener("input", e => {
    const keyword = e.target.value.trim();
    let filteredBooks = bookList.filter(book => {
        return (
            book.bookName.includes(keyword) || book.author.includes(keyword)
        )
    })

    if (keyword) {
        renderBooks(filteredBooks);
    } else {
        renderBooks(bookList);
    }
})

localStorage.removeItem("chapterInfo");