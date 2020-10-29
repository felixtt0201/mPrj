
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
<a href="/user.html"><li><img src="https://member.ithome.com.tw/avatars/151507?s=ithelp" class="accountPhoto">
<span>${parseStatus.loginName}</span><i class="fas fa-sort-down"></i></li></a>
<a href="./setting.html"><li>修改密碼</li></a>`;

const artName = document.querySelector('.user-profile__name');
artName.textContent = parseStatus.loginName + " ";

const Name = document.querySelectorAll('.userBoard_nameID')
Name.forEach(i => {
  i.textContent = parseStatus.loginName + " ";
})


