var test = CKEDITOR.replace('editor1');

// 以localStorage.getItem('key')取得使用者登入資料(這裡取得的資料為一組字串，沒辦法直接使用)
let getStatus = localStorage.getItem('loginStatus');
// 以JSON.parse解析資料，將字串轉成JSON陣列，只有將字串轉成陣列，才能提取loginStatus裡面的值(loginName)
let parseStatus = JSON.parse(getStatus);
console.log(parseStatus);

// 將message資料渲染到menuRight：把loginStatus取得的值(loginName)，塞到menuRight的欄位
let menuRight = document.getElementById('menuRight');
menuRight.innerHTML =
    `<a href=""><li><i class="fas fa-search"></i></li></a>
<a href=""><li><button type="button" class="menu__ironman-btn" data-toggle="modal" data-target="#group">鐵人發文</button></li></a>
<a href=""><li>發問</li></a>
<a href=""><li>發文<i class="fas fa-sort-down"></i></li></a>
<a href=""><li><i class="fas fa-comment-dots"></i></li></a>
<a href=""><li><i class="fa fa-bell fa-fw"></i></li></a>
<a href=""><li><img src="https://member.ithome.com.tw/avatars/151507?s=ithelp" class="accountPhoto">
<span>${parseStatus.loginName}</span><i class="fas fa-sort-down"></i></li></a>`;

// 將message資料渲染到動態留言板：把loginStatus取得的值(loginName)，塞到留言板的名稱欄位
let replyFramePerson = document.getElementById('replyFrame-person');
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
            <button id="likeBtn"><i class="fa fa-caret-up"></i></button>
            <p class="likeNum"></p>
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
                <ul class="ansPanel-comment-body">
                </ul>
            </div
        </div>
        </div>
        </li>`
    }
    return str;
}

const msgURL = 'https://fierce-forest-92782.herokuapp.com/message';
// 將message資料渲染到靜態留言板
function renderData() {
    axios.get(msgURL, {
    }).then((res) => {
        let ansPanel = document.getElementById('ansPanel');
        ansPanel.innerHTML = printComment(res.data);

        let msgNum = document.getElementById('msgNum');
        msgNum.innerHTML = res.data.length;

        // // 
        // let likeBtn = document.querySelectorAll('.ansPanel');
        // let likeNum = document.querySelectorAll('.likeNum');
        // // 當使用者點擊likeBtn時，按鈕下方會顯示1
        // for (let i = 0; i < likeBtn.length; i++) {
        //     likeBtn[i].addEventListener('click', function () {
        //         likeNum.innerHTML = 1;
        //         // console.log(res.data);
        //     }, false)
        // }

    });
}
renderData(); // 執行renderData函式，顯示預設畫面(舊至新)
let Old2New = document.getElementById('Old2New');
let New2Old = document.getElementById('New2Old');

// 分類函式sortButton：HTMLBtn與isSort在一開始都是空值，所有函式都必須經過呼叫才能執行
function sortButton(HTMLBtn, isSort) {
    // HTMLBtn在事件監聽的此時還是空值
    HTMLBtn.addEventListener('click', function () {
        axios.get(msgURL, {
        }).then((res) => {
            // isSort在此也是空值
            if (isSort) {
                // 不能寫res.data[i].id.sort，因為這樣會對應到一個數字，沒辦法以sort方法做比較
                res.data.sort((a, b) => {
                    return a.id - b.id;
                });
            } else {
                res.data.sort((a, b) => {
                    return b.id - a.id;
                });
            }
            let ansPanel = document.getElementById('ansPanel');
            ansPanel.innerHTML = printComment(res.data);
        });
    }, false)
}
// 賦予sortButton函式兩個參數值，Old2New與New2Old對應到監聽按鈕HTMLBtn，true與false對應到isSort判斷式
sortButton(Old2New, true);
sortButton(New2Old, false);




// // 
// function likeFn() {
//     axios.get(`${msgURL}`, {
//         like: '1',
//     }).then((res) => {

//     })
// }
// likeFn();