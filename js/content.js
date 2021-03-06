const editor1 = CKEDITOR.replace('editor1');
const api = `https://fierce-forest-92782.herokuapp.com/articles`;
const userapi = `https://fierce-forest-92782.herokuapp.com/account`;
const content_userName = document.querySelector('.nameInfo');
const timeInfo = document.querySelector('.timeInfo');
const content_title = document.getElementById('content_title');
const nameInfo = document.getElementById('nameInfo');
const qaMarkDown = document.getElementById('qaMarkDown');
const contentedit = document.getElementById('edit');
const Report = document.querySelector('.Report');
const edit = document.querySelector('.halo');
const articleView = document.querySelector('.articleView')
// const liker = document.getElementById('liker')
// const likeGroup = document.getElementById('likeGroup')

const msgURL = 'https://fierce-forest-92782.herokuapp.com/message';
/* -----------------------  文章渲染  -----------------------*/

let a = localStorage.getItem('articleID')
let l_likeNum = localStorage.getItem('liked')
get_articleID()
function get_articleID() {

    console.log(a)
    axios.get(api)
        .then(res => {
            let contentData = res.data;
            console.log(contentData)
            let new_Data = contentData.filter(function (i) {
                return i.articleID == a;
            });
            console.log(new_Data)

            content_title.textContent = new_Data[0].title;
            nameInfo.textContent = new_Data[0].author;
            qaMarkDown.innerHTML = new_Data[0].content;
            timeInfo.textContent = new_Data[0].date;
            articleView.innerHTML = `${new_Data[0].views} 瀏覽`;
            // 判斷文章作者是否同人才可編輯
            if (new_Data[0].artOnwerID === parseStatus.loginID) {
                Report.innerHTML = `<p class="editbtn" data-id='${new_Data[0].id}'>編輯</p>`
                const editbtn = document.querySelector('.editbtn');
                editor(editbtn);
            } else {
                console.log('安安你無法編輯')
            }

        })
}
function editor(editbtn) {
    let id = '';
    editbtn.addEventListener('click', function (e) {
        id = e.target.dataset.id;
        // console.log(id);
        localStorage.setItem('edidID', id);
        window.location.href = 'edit.html';
    })
}



/* Like 功能 */


// let exists ;
// axios.get(userapi)
// .then(res=>{
//     let checkData = res.data;
//     checkData.forEach(i=>{
//         if(i.id == parseStatus.loginID){
//             exists = true
//         }
//     })
//     // console.log(exists)
// })
// // window.onload = counter;

// function counter() {

//     axios.get(api)
//         .then(res => {
//             let articleData = res.data;
//             let new_articleData = articleData.filter(i => i.articleID == a)
//             // 目前文章物件
//             counter()
//             console.log(new_articleData[0].id)
//             axios.patch(`${api}/${new_articleData[0].id}`, {
//                 // views: `${views+1}`,
//             }).then((res) => {
//                 console.log(res)
//             })
//         })
// }







/* -----------------------  留言功能  -----------------------*/
// 以localStorage.getItem('key')取得使用者登入資料(這裡取得的資料為一組字串，沒辦法直接使用)
// let getStatus = localStorage.getItem('loginStatus');
// // 以JSON.parse解析資料，將字串轉成JSON陣列，只有將字串轉成陣列，才能提取loginStatus裡面的值(loginName)
// let parseStatus = JSON.parse(getStatus);
// console.log(parseStatus);

// // 將message資料渲染到menuRight：把loginStatus取得的值(loginName)，塞到menuRight的欄位
// let menuRight = document.getElementById('menuRight');
// menuRight.innerHTML =
//     `<a href=""><li><i class="fas fa-search"></i></li></a>
// <a href=""><li><button type="button" class="menu__ironman-btn" data-toggle="modal" data-target="#group">鐵人發文</button></li></a>
// <a href="questions.html"><li>發問</li></a>
// <a href="draft.html"><li>發文<i class="fas fa-sort-down"></i></li></a>
// <a href=""><li><i class="fas fa-comment-dots"></i></li></a>
// <a href=""><li><i class="fa fa-bell fa-fw"></i></li></a>
// <a href="/user.html"><li><img src="https://member.ithome.com.tw/avatars/151507?s=ithelp" class="accountPhoto">
// <span>${parseStatus.loginName}</span><i class="fas fa-sort-down"></i></li></a>
// <a href="./setting.html"><li>修改密碼</li></a>`;


// 將message資料渲染到動態留言板：把loginStatus取得的值(loginName)，塞到留言板的名稱欄位
const replyFramePerson = document.getElementById('replyFrame-person');
replyFramePerson.innerHTML = parseStatus.loginName;

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

        // 留言板的留言功能
        let commentSubmitBtn = document.querySelectorAll('.commentSubmitBtn'); //留言的按鈕
        let msgerMsg = document.querySelectorAll('.msgerMsg'); //擷取msgerMsg裡的文字內容
        let commentMsg = document.querySelectorAll('.commentMsg'); //顯示文字的<div>
        for (let i = 0; i < commentSubmitBtn.length; i++) {
            commentSubmitBtn[i].addEventListener('click', function () {
                console.log(res.data[i].id)
                commentMsg[i].innerHTML = `${msgerMsg[i].value}`;
            }, false)
        }
        // like功能
        let likeBtn = document.querySelectorAll('.likeBtn'); //對應like按鈕
        let likeNum = document.querySelectorAll('.likeNum'); //對應like顯示
        let like = 0;
        for (let i = 0; i < likeBtn.length; i++) {
            likeBtn[i].addEventListener('click', function () {
                // 確認點擊ID名稱
                console.log('ID:' + res.data[i].id)
                // 判斷式：當使用者點擊likeBtn時，likeNum會顯示1，因此以likeNum所顯示的數字為1或0做判斷
                // 若數字為0，則進入axios.post的程序，將下列資料傳到JSON-Server;若數字為1，則什麼都不做
                // 備註：likeNum[i].innerHTML=`${like + 1}`必須寫在if條件式後面，若先把數字1寫進HTML，則永遠無法進入下個步驟
                if (likeNum[i].innerHTML == 0) {
                    axios.post('https://fierce-forest-92782.herokuapp.com/like', {
                        id: '', //預設值(自動生成)
                        mName: `${parseStatus.loginName}`, // 登入者的名稱(使用localStorage打撈資料)
                        msgOwenerID: `${parseStatus.loginID}`,　// 登入者的ID(使用localStorage打撈資料)
                        articleID: `${a}`, //文章ID
                        like: 1, //直接使用數字1即可，每一篇文章只能like一次
                    }).then((res) => {
                    }, false)
                }
                // 使用者端：當使用者點擊likeBtn時，likeNum會顯示1
                likeNum[i].innerHTML = `${like + 1}`; // 變數like的預設值為0，若此處不設定+1，則必須按兩次才會顯示1
            })
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
            // isSort在也是空值
            if (isSort == '舊至新') {
                // 不能寫res.data[i].id.sort，因為這樣會對應到一個數字，沒辦法以sort方法做比較
                res.data.sort((a, b) => {
                    return a.id - b.id;
                });
            } else if (isSort == '新至舊') {
                res.data.sort((a, b) => {
                    return b.id - a.id;
                });
                // 最高Like數排序...
            } else {
                axios.get('https://fierce-forest-92782.herokuapp.com/like', {
                }).then((res) => {
                    let sumA = 0;
                    let sumB = 0;
                    for (i = 0; i < res.data.length; i++) {
                        if (res.data[i].msgOwenerID == 1) {
                            sumA += parseInt(res.data[i].like);
                        } if (res.data[i].msgOwenerID == 2) {
                            sumB += parseInt(res.data[i].like);
                        }
                    }
                    console.log(sumA, sumB)
                    // res.data.sort((a, b) => {
                    //     return b.length - a.length;
                    // });
                });

            }
            let ansPanel = document.getElementById('ansPanel');
            ansPanel.innerHTML = printComment(res.data);

            // 留言板的留言功能
            let commentSubmitBtn = document.querySelectorAll('.commentSubmitBtn'); //留言的按鈕
            let msgerMsg = document.querySelectorAll('.msgerMsg'); //擷取msgerMsg裡的文字內容
            let commentMsg = document.querySelectorAll('.commentMsg'); //顯示文字的<div>
            for (let i = 0; i < commentSubmitBtn.length; i++) {
                commentSubmitBtn[i].addEventListener('click', function () {
                    console.log(res.data[i].id)
                    commentMsg[i].innerHTML = `${msgerMsg[i].value}`;
                }, false)
            }
            // like功能
            let likeBtn = document.querySelectorAll('.likeBtn'); //對應like按鈕
            let likeNum = document.querySelectorAll('.likeNum'); //對應like顯示
            let like = 0;
            for (let i = 0; i < likeBtn.length; i++) {
                likeBtn[i].addEventListener('click', function () {
                    // 確認點擊ID名稱
                    console.log('ID:' + res.data[i].id)
                    // 判斷式：當使用者點擊likeBtn時，likeNum會顯示1，因此以likeNum所顯示的數字為1或0做判斷
                    // 若數字為0，則進入axios.post的程序，將下列資料傳到JSON-Server;若數字為1，則什麼都不做
                    // 備註：likeNum[i].innerHTML=`${like + 1}`必須寫在if條件式後面，若先把數字1寫進HTML，則永遠無法進入下個步驟
                    if (likeNum[i].innerHTML == 0) {
                        axios.post('https://fierce-forest-92782.herokuapp.com/like', {
                            id: '', //預設值(自動生成)
                            mName: `${parseStatus.loginName}`, // 登入者的名稱(使用localStorage打撈資料)
                            msgOwenerID: `${parseStatus.loginID}`,　// 登入者的ID(使用localStorage打撈資料)
                            articleID: `${a}`, //文章ID
                            like: 1, //直接使用數字1即可，每一篇文章只能like一次
                        }).then((res) => {
                        }, false)
                    }
                    // 使用者端：當使用者點擊likeBtn時，likeNum會顯示1
                    likeNum[i].innerHTML = `${like + 1}`; // 變數like的預設值為0，若此處不設定+1，則必須按兩次才會顯示1
                })
            }
        });
    }, false)
}
// 賦予sortButton函式三個參數值，Old2New與New2Old對應到監聽按鈕HTMLBtn，'舊至新'與'新至舊'對應到isSort判斷式
sortButton(Old2New, '舊至新');
sortButton(New2Old, '新至舊');
sortButton(MostLike)


// let loginID = parseStatus.loginID;
// // 判斷式：當localStorage的loginID，等於msg資料庫裡的msgOwenerID，才可累加
// if (loginID == res.data[i].msgOwenerID) {
//     確認點擊項目的id
// }