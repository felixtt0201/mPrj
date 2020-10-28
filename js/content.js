var test = CKEDITOR.replace('editor1');
const api = `https://fierce-forest-92782.herokuapp.com/articles`;
const content_userName = document.querySelector('.nameInfo');
const timeInfo = document.querySelector('.timeInfo');
const content_title = document.getElementById('content_title');
const nameInfo = document.getElementById('nameInfo');
const qaMarkDown = document.getElementById('qaMarkDown');
/* -----------------------  文章渲染  -----------------------*/
get_articleID()
function get_articleID(){
    let a = localStorage.getItem('articleID')
    axios.get(api)
    .then(res=>{
        let contentData = res.data;
        // console.log(data)
        //let newData = data.filter(i => i.artOnwerID == userID)
        let new_Data = contentData.filter(i=>i.articleID == a );
        console.log(new_Data) 

        content_title.textContent = new_Data[0].title;
        nameInfo.textContent = new_Data[0].author;
        qaMarkDown.innerHTML = new_Data[0].content;
        timeInfo.textContent = new_Data[0].date;


    })
}









/* -----------------------  留言功能  -----------------------*/
// 以localStorage.getItem('key')取得使用者登入資料(這裡取得的資料為一組字串，沒辦法直接使用)
let getStatus = localStorage.getItem('loginStatus');
// 以JSON.parse解析資料，將字串轉成JSON陣列，只有將字串轉成陣列，才能提取loginStatus裡面的值(loginName)
let parseStatus = JSON.parse(getStatus);
// 看一下parseStatus長怎麼樣?
console.log(parseStatus);

// 把loginStatus取得的值(loginName)，塞到menuRight的欄位
let menuRight = document.getElementById('menuRight');
menuRight.innerHTML =
`<a href=""><li><i class="fas fa-search"></i></li></a>
<a href=""><li><button type="button" class="menu__ironman-btn" data-toggle="modal" data-target="#group">鐵人發文</button></li></a>
<a href=""><li>發問</li></a>
<a href=""><li>發文<i class="fas fa-sort-down"></i></li></a>
<a href=""><li><i class="fas fa-comment-dots"></i></li></a>
<a href=""><li><i class="fa fa-bell fa-fw"></i></li></a>
<a href=""><li><img src="https://member.ithome.com.tw/avatars/151507?s=ithelp" class="accountPhoto">
<span>${parseStatus.loginName}</span><i class="fas fa-sort-down"></i></li></a>
<a href="./setting.html"><li>修改密碼</li></a>`;

// 把loginStatus取得的值(loginName)，塞到留言板的名稱欄位
let replyFramePerson = document.getElementById('replyFrame-person');
replyFramePerson.innerHTML = parseStatus.loginName;


// 文章頁面的留言功能
let leaveMessage = document.getElementById('leaveMessage');
leaveMessage.addEventListener('click', function () {
    let _date = new Date();
    let date = _date.getFullYear() + '/' + (_date.getMonth() + 1) + '/' + _date.getDate();
    let time = _date.getHours() + ':' + _date.getMinutes() + ':' + _date.getSeconds();
    let getContent = CKEDITOR.instances.editor1.getData();

    axios.post('https://fierce-forest-92782.herokuapp.com/message', {
        id: '',
        mName: `${parseStatus.loginName}`, // 必須打撈localStorage的資料，才能取得
        date: `${date} ${time}`,
        mcontent: `${getContent}`,
        msgOwenerID: `${parseStatus.loginID}`,　// 必須打撈localStorage的資料，才能取得
    })
    console.log('已完成留言')
}, false)
