const bookList = [
    {
        status: "完結",
        bookName: "納米崛起",
        author: "嶺南仨人",
        coverImg: "https://bookcover.yuewen.com/qdbimg/349573/1025502417/180",
        intro: "一個超憶患者的奮鬥，這是屬於納米的時代。<br>緣起於一份未來記憶。<br>取巧於零八次貸危機。<br>奠基於納米材料科技。<br>崛起於資源回收產業。",
    },
    {
        status: "連載",
        bookName: "這遊戲也太真實了",
        author: "晨星LL",
        coverImg: "https://bookcover.yuewen.com/qdbimg/349573/1029391348/180",
        intro: "這遊戲也太真實了叭！<br>搬磚、跑腿、撿垃圾、送快遞……公司最多能讓你體會到996的艱辛，在這裡你能體會到超級加倍的007。<br>好了，不廢話了，偉大的管理者大人喊我去搬磚了。<br>那位大人說了，只要我們努力獻上自己的肝，下個月他又能換一套全新的動力甲，到時候帶我們開全新的地圖，去廣闊的廢土撿更多的垃圾！<br>……<br>穿越到廢土世界的楚光發現，自己解鎖了避難所系統，能夠從平行世界召喚名為「玩家」的生物。<br>從那天開始，整個廢土都不正經了。",
    },
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