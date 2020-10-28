const loginBtn = document.getElementById('login');
const account = document.querySelector('.account');
const password = document.querySelector('.password');
const accountURL = "https://fierce-forest-92782.herokuapp.com/account";

let accountData = [];
let inputAccount = "";
let inputPassword = "";

let loginStatus = {
  loginCheck: false,
  loginID: '',
  loginName: '',
  loginEmail: '',
  loginPassword: ''
};

//抓取遠端資料
function getInfo() {
  axios.get(accountURL).then(res => {
    accountData = res.data
  })
};
getInfo();

//判斷輸入的值是否與遠端資料相符，相符才跳轉頁面
function compareInfo() {
  let chkAc = accountData.find(function (i) {
    return i.account === inputAccount && i.password === inputPassword;
  })
  if (chkAc) {
    loginStatus.loginID = chkAc.id;
    loginStatus.loginCheck = true;
    loginStatus.loginName = chkAc.name;
    loginStatus.loginEmail = chkAc.email;
    loginStatus.loginPassword = chkAc.password
    localStorage.setItem('loginStatus', JSON.stringify(loginStatus));
    let url = `${window.location.origin}/user.html`;
    window.location.replace(url)
  }
  else {
    alert('帳號密碼錯誤');
  }
}

// 判斷輸入欄位是否為空值，不是空值才執行抓取遠端資料，並拿資料去判斷輸入的值是否相等
function checkInfo() {
  event.preventDefault();
  inputAccount = account.value;
  inputPassword = password.value;
  if (inputAccount !== "" && inputPassword !== "") {
    compareInfo();
  }
  else {
    alert('帳號密碼不得為空')
  }
}

loginBtn.addEventListener('click', checkInfo)