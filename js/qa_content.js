const qa_api = 'https://fierce-forest-92782.herokuapp.com/articles';
const qa_title = document.querySelector('.qa_title');
const nameInfo = document.getElementById('nameInfo');
const timeInfo = document.querySelector('.timeInfo');
const qaMarkDown = document.getElementById('qaMarkDown');
const replyFrame = document.querySelector('.replyFrame');
//---
const articleView = document.querySelector('.articleView');
const msgURL = 'https://fierce-forest-92782.herokuapp.com/message';
//---

// let get_qa_id = localStorage.getItem('questionID'); // 發出文章的articleId
let get_qa_articles = localStorage.getItem('articleID'); //點擊文章articleId
// let miu = localStorage.getItem('貓');
let data = {};
get_qa_contgent();
function get_qa_contgent() {
    axios.get(qa_api)
        .then(function (res) {
            data = res.data;
            postrender()
            // if('喵' == miu){
            //     console.log('OK')
            //     localStorage.removeItem('貓') // 不清除的話會永遠無法判斷QAQ卡卡卡
            //     listrender()
            // }else{
            //     postrender()
            //     console.log('555')
            // }
        })
}
let render_array = '';
function postrender() {
    render_array = data.filter(function (i) {
        return i.articleID === get_qa_articles
    });
    console.log(render_array);
    qa_title.textContent = render_array[0].title;
    nameInfo.textContent = render_array[0].author;
    qaMarkDown.innerHTML = render_array[0].content;
    timeInfo.textContent = render_array[0].date;
    peoples_views();
}
// function listrender(){
//     let C ='';
//     data.forEach(function(i,index){
//         if( get_qa_articles == i.articleID){
//             C = index;
//         }else{
//             console.log('listno')
//         }
//     })
//     qa_title.textContent = data[C].title;
//     nameInfo.textContent = data[C].author;
//     qaMarkDown.innerHTML = data[C].content;
//     timeInfo.textContent = data[C].date;
// }
// -----------test------- //
const e = `https://fierce-forest-92782.herokuapp.com/articles`;
let a = 1;
function peoples_views() {
    let c = Number(render_array[0].views) + 1;
    console.log(c); //1
    for (a = 0; a < c; a++) //0<1 a=1,1<2 a=2
        articleView.textContent = `累積偷看你低人數已經:${a}人`; //0
    console.log(a) //1
    console.log(render_array[0].id) //58
    peoples_views_patch();
}
function peoples_views_patch() {
    axios.patch(e + `/${render_array[0].id}`, {
        views: `${a}`
    })
        .then(function (res) {
            // console.log('pp')
            console.log(render_array[0].views) //0
            peoples_views_get()
        })
}
function peoples_views_get() {
    axios.get(e)
        .then(function (res) {
            console.log(res)
        })
}







// // 以localStorage.getItem('key')取得使用者登入資料(這裡取得的資料為一組字串，沒辦法直接使用)
// let getStatus = localStorage.getItem('loginStatus');
// // 以JSON.parse解析資料，將字串轉成JSON陣列，只有將字串轉成陣列，才能提取loginStatus裡面的值(loginName)
// let parseStatus = JSON.parse(getStatus);
// 看一下parseStatus長怎麼樣?
// console.log(parseStatus);
// 將message資料渲染到動態留言板：把loginStatus取得的值(loginName)，塞到留言板的名稱欄位


let getStatusInfo = localStorage.getItem('loginStatus');
let parseStatusInfo = JSON.parse(getStatusInfo);
let replyFramePerson = document.getElementById('replyFrame-person');
replyFramePerson.innerHTML = parseStatusInfo.loginName;

// 新增文字至留言板的功能
let leaveMessage = document.getElementById('leaveMessage');
leaveMessage.addEventListener('click', function () {
    let _date = new Date();
    let date = _date.getFullYear() + '-' + (_date.getMonth() + 1) + '-' + _date.getDate();
    let time = _date.getHours() + ':' + _date.getMinutes() + ':' + _date.getSeconds();
    let getContent = CKEDITOR.instances.editor1.getData();
    axios.post(msgURL, {
        id: '',
        mName: `${parseStatus.loginName}`, // 必須打撈localStorage的資料，才能取得
        date: `${date} ${time}`,
        mcontent: `${getContent}`,
        msgOwenerID: `${parseStatus.loginID}`,　// 必須打撈localStorage的資料，才能取得
        like: '',
    })
    alert('留言成功')
}, false)

function printComment(data) {
    let str = '';
    for (i = 0; i < data.length; i++) {
        str += `<li>
        <div class="ansPanel-clearfix">
        <dic class="ansPanel-side">
            <button class="likeBtn"><i class="fa fa-caret-up"></i></button>
            <ul class="likeNum">0</ul>
        </dic>
        <div class="ansPanel-content">
            <div class="ansPanel-header">
                <a class="ansPanel-header-logo" href="#"><img
                        src="https://member.ithome.com.tw/avatars/151507?s=ithelp" alt=""></a>
                <div class="ansPanel-info">
                    <h3 class="ansPanel-header-name" id="ansPanelHeaderName">${data[i].mName}</h3>
                    <p><span class="ansPanelHeaderClass">iT邦好手1級．</span><span class="ansPanel-header-time" id="ansPanelHeaderTime">${data[i].date}</span></p>
                </div>
            </div>
            <ul class="ansPanelMainSection" id="ansPanelMainSection">${data[i].mcontent}</ul>
            <div class="ansPanel-action">
                <ul class="ansPanel-action-left">
                    <li class="ansPanel-action-comment"><i
                            class="fa fa-comment fa-fw qa-action__icon"></i><span>回應</span></li>
                    <li class="ansPanel-action-share"><i
                            class="fa fa-share-alt fa-fw qa-action__icon qa-action__link--share"></i><span>分享</span>
                    </li>
                </ul>
                <ul class="ansPanel-action-right">
                    <li><i class="fa fa-ban fa-fw qa-action__icon "></i><span>沒有幫助</span></li>
                    <li><i class="fa fa-flag fa-fw qa-action__icon"></i><span>檢舉</span></li>
                </ul>
            </div>
            <div class="ansPanel-comment">
                <div class="ansPanel-header">
                    <a class="ansPanel-header-logo" href="#"><img
                            src="https://member.ithome.com.tw/avatars/151507?s=ithelp" alt=""></a>
                    <div class="ansPanel-info">
                        <h3 class="ansPanel-header-name" id="ansPanelHeaderName">${data[i].mName}</h3>
                        <p><span class="ansPanelHeaderClass">iT邦好手1級．</span><span class="ansPanel-header-time" id="ansPanelHeaderTime">${data[i].date}</span></p>
                    </div>
                </div>
                <ul class="commentMsg"></ul>
                <div class="ansPanel-comment-markdown">
                    <img src="https://member.ithome.com.tw/avatars/151507?s=ithelp" class="img-circle comment__avatar">
                    <textarea class="msgerMsg" placeholder="回應"></textarea>
                    <button class="commentSubmitBtn" id="commentSubmitBtn">送出</button>
                </div>
            </div>
        </div>
        </div>
        </li>`
    }
    return str;
}

// 將message資料渲染到靜態留言板
function renderData() {
    axios.get(msgURL, {
    }).then((res) => {
        let ansPanel = document.getElementById('ansPanel');
        ansPanel.innerHTML = printComment(res.data);

        let msgNum = document.getElementById('msgNum');
        msgNum.innerHTML = res.data.length;

        // like功能
        let likeBtn = document.querySelectorAll('.likeBtn');
        let likeNum = document.querySelectorAll('.likeNum');
        let like = 0; // like變數必須建立在迴圈外，否則每次執行都會從0開始計算
        let loginID = parseStatus.loginID;
        for (let i = 0; i < likeBtn.length; i++) {
            likeBtn[i].addEventListener('click', function () {
                // 判斷式：當localStorage的loginID，等於msg資料庫裡的msgOwenerID，才可累加
                if (loginID == res.data[i].msgOwenerID) {
                    // 確認點擊項目的id
                    console.log('ID:' + res.data[i].id)

                    // 使用者端：當使用者點擊likeBtn時，likeNum會顯示1
                    likeNum[i].innerHTML = `${like + 1}`; // 變數like的預設值為0，若此處不設定+1，則必須按兩次才會顯示1

                    // 資料庫端：當使用者點擊likeBtn時，以patch方法修改msg資料庫的like欄位
                    axios.patch(`${msgURL}/${res.data[i].id}`, {
                        like: `${like + 1}`,
                    }).then((res) => {
                        like++;
                    })
                }
            }, false)
        }
        // 留言板的留言功能...
        let commentSubmitBtn = document.querySelectorAll('.commentSubmitBtn'); //留言的按鈕
        let msgerMsg = document.querySelectorAll('.msgerMsg'); //擷取msgerMsg裡的文字內容
        let commentMsg = document.querySelectorAll('.commentMsg'); //顯示文字的<div>
        for (let i = 0; i < commentSubmitBtn.length; i++) {
            commentSubmitBtn[i].addEventListener('click', function () {
                console.log(res.data[i].id)
                commentMsg[i].innerHTML = `${msgerMsg[i].value}`;
            }, false)
        }
    });
}
renderData(); // 執行renderData函式，顯示預設畫面(舊至新)

// 分類功能
let Old2New = document.getElementById('Old2New');
let New2Old = document.getElementById('New2Old');
let MostLike = document.getElementById('MostLike');
// 分類函式sortButton：HTMLBtn與isSort在一開始都是空值，所有函式都必須經過呼叫才能執行
function sortButton(HTMLBtn, isSort) {
    // HTMLBtn在事件監聽的此時還是空值
    HTMLBtn.addEventListener('click', function () {
        axios.get(msgURL, {
        }).then((res) => {
            // isSort在此也是空值
            if (isSort == '舊至新') {
                // 不能寫res.data[i].id.sort，因為這樣會對應到一個數字，沒辦法以sort方法做比較
                res.data.sort((a, b) => {
                    return a.id - b.id;
                });
            } else if (isSort == '新至舊') {
                res.data.sort((a, b) => {
                    return b.id - a.id;
                });
            } else {
                res.data.sort((a, b) => {
                    return parseInt(b.like) - parseInt(a.like);
                });
            }
            let ansPanel = document.getElementById('ansPanel');
            ansPanel.innerHTML = printComment(res.data);
        });
    }, false)
}
// 賦予sortButton函式三個參數值，Old2New與New2Old對應到監聽按鈕HTMLBtn，'舊至新'與'新至舊'對應到isSort判斷式
sortButton(Old2New, '舊至新');
sortButton(New2Old, '新至舊');
sortButton(MostLike)
