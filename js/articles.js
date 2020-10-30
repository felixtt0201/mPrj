// // // 以localStorage.getItem('key')取得使用者登入資料(這裡取得的資料為一組字串，沒辦法直接使用)
// let getStatus = localStorage.getItem('loginStatus');
// // // 以JSON.parse解析資料，將字串轉成JSON陣列，只有將字串轉成陣列，才能提取loginStatus裡面的值(loginName)
// let parseStatus = JSON.parse(getStatus);
// // 看一下parseStatus長怎麼樣?
// console.log(parseStatus);

// // 把loginStatus取得的值(loginName)，塞到menuRight的欄位
// let menuRight = document.getElementById('menuRight');
// menuRight.innerHTML =
//   `<a href=""><li><i class="fas fa-search"></i></li></a>
// <a href=""><li><button type="button" class="menu__ironman-btn" data-toggle="modal" data-target="#group">鐵人發文</button></li></a>
// <a href="questions.html"><li>發問</li></a>
// <a href="draft.html"><li>發文<i class="fas fa-sort-down"></i></li></a>
// <a href=""><li><i class="fas fa-comment-dots"></i></li></a>
// <a href=""><li><i class="fa fa-bell fa-fw"></i></li></a>
// <a href=""><li><img src="https://member.ithome.com.tw/avatars/151507?s=ithelp" class="accountPhoto">
// <span>${parseStatus.loginName}</span><i class="fas fa-sort-down"></i></li></a>
// <a href="./setting.html"><li>修改密碼</li></a>`;



//抓取內文資料
const articleApi = `https://fierce-forest-92782.herokuapp.com/articles`;
const columnBoard = document.querySelector('.columnBoard')
const get_draftID = document.getElementById('get_draftID');

axios.get(articleApi).then(res => {
    let indexData = res.data;
    let articleAry = indexData.filter(i => i.type == "article");
    //render
    let str = "";
    articleAry.forEach(i => {
        str += `<div class="qaList">
                        <div class="qaCondition">
                            <li>
                                <a class="like" href="">
                                    <span>${i.likes}</span>
                                    <span>Like</span>
                                </a>
                            </li>
                            <li>
                                <a class="answer" href="">
                                    <span></span>
                                    <span>回答</span>
                                </a>
                            </li>
                            <li>
                                <a class="view" href="">
                                    <span>${i.view}</span>
                                    <span>瀏覽</span>
                                </a>
                            </li>
                        </div>
                        <div class="qaContent">
                            <li>
                                <a href="#">
                                    <h3 data-id='${i.articleID}'>${i.title}</h3>
                                </a>
                                <div class="qaTrivia">
                                    <a href="https://ithelp.ithome.com.tw/tags/questions/asus%20k401u%20%E7%AD%86%E9%9B%BB%E5%95%8F%E9%A1%8C"
                                        class="qaTags">asus k401u 筆電問題</a>
                                    <a class="qaTime" title="2020-10-21 13:16:08">2020-10-21</a>‧ 由
                                    <a class="qaInfoLink" href="https://ithelp.ithome.com.tw/users/20067337">
                                        ${i.author}
                                    </a>提問
                                </div>
                            </li>
                        </div>
                    </div>`
    });
    columnBoard.innerHTML = str;
    getID();
});

function getID() {
    let id = '';
    get_draftID.addEventListener('click', function (e) {
        id = e.target.dataset.id
        console.log(id)
        localStorage.setItem('articleID', id);
        window.location.href = '/content.html';
    });
}