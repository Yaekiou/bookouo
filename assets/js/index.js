const bookList = [
    {
        status: "完結",
        bookName: "納米崛起",
        author: "嶺南仨人",
        coverImg: "https://bookcover.yuewen.com/qdbimg/349573/1025502417/180",
        intro: "一個超憶患者的奮鬥，這是屬於納米的時代。<br>緣起於一份未來記憶。<br>取巧於零八次貸危機。<br>奠基於納米材料科技。<br>崛起於資源回收產業。",
    },
    {
        status: "完結",
        bookName: "納米崛起（ttkan）",
        author: "嶺南仨人",
        coverImg: "https://bookcover.yuewen.com/qdbimg/349573/1025502417/180",
        intro: "一個超憶患者的奮鬥，這是屬於納米的時代。<br>緣起於一份未來記憶。<br>取巧於零八次貸危機。<br>奠基於納米材料科技。<br>崛起於資源回收產業。",
    },
    // {
    //     status: "完結",
    //     bookName: "超神機械師",
    //     author: "齊佩甲",
    //     coverImg: "https://bookcover.yuewen.com/qdbimg/349573/1009480992/180",
    //     intro: "韓蕭，《星海》骨灰級代練，被來自東(zuo)方(zhe)的神秘力量扔進穿越大軍，攜帶玩家面板變成NPC，回到《星海》公測之前，毅然選擇難度最高的機械系。<br>戰艦列隊縱橫星海，星辰機甲夭矯如龍，幽能炮毀天滅地，還有無邊無際的機械大軍，靜靜待在隨身倉庫裡<br>一人，即是軍團！<br>如果不是玩家出現，本書就是正經嚴肅的穿越異界題材……<br>作為NPC，正常NPC對玩家功能一應俱全……發佈任務？好感度調節？傳授技能？<br>哎等等，這群玩家我怎麼都認識<br>得，現實世界也回到了十年前。",
    // },
    // {
    //     status: "連載",
    //     bookName: "這遊戲也太真實了",
    //     author: "晨星LL",
    //     coverImg: "https://bookcover.yuewen.com/qdbimg/349573/1029391348/180",
    //     intro: "這遊戲也太真實了叭！<br>搬磚、跑腿、撿垃圾、送快遞……公司最多能讓你體會到996的艱辛，在這裡你能體會到超級加倍的007。<br>好了，不廢話了，偉大的管理者大人喊我去搬磚了。<br>那位大人說了，只要我們努力獻上自己的肝，下個月他又能換一套全新的動力甲，到時候帶我們開全新的地圖，去廣闊的廢土撿更多的垃圾！<br>……<br>穿越到廢土世界的楚光發現，自己解鎖了避難所系統，能夠從平行世界召喚名為「玩家」的生物。<br>從那天開始，整個廢土都不正經了。",
    // },
    // {
    //     status: "連載",
    //     bookName: "從霍格沃茨開始重新做人",
    //     author: "濃墨澆書",
    //     coverImg: "https://bookcover.yuewen.com/qdbimg/349573/1031158587/180",
    //     intro: "1989年．<br>霍格沃茨的新生人才濟濟。<br>一個叫維森·萊特的新生進入了霍格沃茨，曾經他是一所麻瓜小學的校霸，偶爾兼職做點兒正經生意。<br>兩年後．<br>傳說中的哈利·波特進入了霍格沃茨讀書。<br>正當大難不死的男孩兒以為自己進入了新的世界，忽然發現曾經的校霸好像也在這座魔法學校……",
    // },
    // {
    //     status: "連載",
    //     bookName: "保護我方族長",
    //     author: "傲無常",
    //     coverImg: "https://bookcover.yuewen.com/qdbimg/349573/1024121691/180",
    //     intro: "穿成【玄幻世界】的【族長】，從家族角度描繪盡量真實的玄幻世界，種靈田、養靈魚、全面發展各種家族產業，扶植鹹魚長輩成老祖擔當保護傘，激勵小輩勇闖聖地學宮出人頭地。<br>本文家庭成員和睦團結，齊心協力，一起共創未來。<br>非熱血戰斗式玄幻，以提升各項家族產業，資金、設施、家僕、家將、族人、客卿、姻親等元素為主。<br>力圖從新鮮的視角去看「老套」的玄幻世界。",
    // },
    // {
    //     status: "連載",
    //     bookName: "人類之光安布雷拉",
    //     author: "小柒天",
    //     coverImg: "https://bookcover.yuewen.com/qdbimg/349573/1030564131/180",
    //     intro: "「人類最古老而強烈的情緒，便是恐懼；<br>而最古老最強烈的恐懼，便是對未知的恐懼。 」<br>——霍華德·菲利普·洛夫克拉夫特<br>安布雷拉/保護傘。<br>作為一家典型的反派公司，卻成為暗中保護人類的巨型企業。<br>當人類認為現今社會愈加繁榮時，安布雷拉的私人部隊正在與各類異常現象（喪屍、吸血鬼、外星種族，甚至是上古邪神等）進行著抗爭。<br>——————<br>關鍵詞；<br>《生化危機（遊戲）》、超級士兵、斯巴達、阿斯塔特、《星際爭霸》、《光暈》、《異形大戰鐵血戰士》、《使命召喚：現代戰爭》。",
    // },
    // {
    //     status: "連載",
    //     bookName: "成神從種田開始",
    //     author: "湯圓狗",
    //     coverImg: "https://bookcover.yuewen.com/qdbimg/349573/1022399960/180",
    //     intro: "在這個世界，信仰之力，是萬能的權柄。<br>意外得到偽神器的奧丁，能夠收集轉化信仰之力，於是身為一個小領主的奧丁男爵，開始了兢兢業業的種田之路<br>西幻領主種田流，偏日常",
    // },
    // {
    //     bookName: "科技之全球壟斷",
    //     author: "昭靈駟玉",
    //     coverImg: "https://bookcover.yuewen.com/qdbimg/349573/1016476783/180",
    //     intro: "從互聯網到消費電子，豐富娛樂生活；從雲計算到人工智能，顛覆生活方式；從新材料到納米科技，重塑固有認知；從新能源到軍武裝備，再擴力量邊界；從生物學到臨床應用，挽救生命無數……<br>一個來自三十年後的超級天才魂穿2003年，用他超越這個時代的視野和科技改變世界，在一個又一個前沿領域發起變革與顛覆的狂潮……<br>羅晟(shèng)沉迷科技改變世界，一不小心用科技壟斷全球；埋頭走自己的路，一不小心讓別人無路可走……<br>引領變革與顛覆的大浪潮，從一家IT科技公司的誕生開始……",
    // },
]

const bookContainer = document.querySelector(".books");
const introDetail = document.querySelector(".intro-box");

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
                    <div class="name">
                        <a href="book/${book.bookName}/index.html">${book.bookName}</a>
                    </div>
                    <div class="status">${book.status}</div>
                </header>
                <div class="author">${book.author}</div>
                <div class="intro">${book.intro}</div>
            </div>
        `
        newElement.addEventListener("click", e => {
            if (e.target.className == "intro") {
                introDetail.classList.add("show");
                document.body.style = "overflow: hidden";
                introDetail.querySelector(".detail").innerHTML = book.intro;
            }
        })

        bookContainer.append(newElement);
    })
}

renderBooks(bookList);

introDetail.addEventListener("click", e => {
    if (e.target == introDetail) {
        introDetail.querySelector(".detail").innerHTML = "";
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