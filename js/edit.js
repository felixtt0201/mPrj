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
 // 以上是kent哥ㄉ 
const btn = document.getElementById('btn-draft-edit-btn');
const edit_api = 'https://fierce-forest-92782.herokuapp.com/articles';
const edit_content = document.getElementById('editor-main');
const edit_title = document.querySelector('.draft-header-title');
// 要覆蓋掉的話要取Dom , 只有渲染ㄉ時候會取物件值 //
const date = new Date();
  const nowDay = {
    year:'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric', 
    minute: 'numeric', 
    second: 'numeric'
  }
  const result = date.toLocaleDateString("ja-JP", nowDay);
// 取api的值
getData();
let data = {};
function getData(){
    axios.get(edit_api)
        .then(function(res){
            data = res.data
            render();
        })
        .catch(function(error){
            console.log(error)
        })
}

function render(){
    let str = '';
    let A = data[2].content; 
    str += CKEDITOR.instances["editor-main"].setData(A);
    let rendertitle = data[1].title;
    console.log(rendertitle);
    // 因為input無法使用textContent，所以要改用setAttribute改值
    edit_title.setAttribute("value",`${rendertitle}`);
}


// 以上程式碼沒問題 //

// 修改ㄉ 程式碼 //
function getpatch(){
    axios.patch(edit_api + `/6`,{
        title: edit_title.value,
        date: result,
        content: CKEDITOR.instances["editor-main"].getData()
      })
    .then(function(res){
        console.log(res)
        console.log('修改成功')
        getData();
    })
}
// CKEDITOR.instances["editor-main"].setData();

// 測試按鈕是否正常 OK //
// function test(){
//     console.log('測試成功!');
// }
btn.addEventListener('click',getpatch);