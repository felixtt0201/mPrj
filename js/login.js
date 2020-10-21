const loginBtn = document.getElementById('login');
const account = document.querySelector('.account');
const password = document.querySelector('.password');

let accountData = [];
const accountURL = "https://fierce-forest-92782.herokuapp.com/account";

let loginStatus = {
  loginCheck: false,
  loginID: ''
}

//登入功能
function login(event) {
  event.preventDefault();
  axios.get(accountURL).then((res) => {
    accountData = res.data;
    let inputAccount = account.value;
    let inputPassword = password.value;
    localStorage.clear();
    accountData.find(i => {
      if (inputAccount == i.account && inputPassword == i.password) {
        loginStatus.loginID = i.id;
        loginStatus.loginCheck = true;
        localStorage.setItem('loginStatus', JSON.stringify(loginStatus));

        // 跳轉頁面
        let url1 = `${window.location.origin}/layout.html`;
        window.location.replace(url1)
      }
      else {
        console.log('輸入錯誤');
      }
    });
  })
};

loginBtn.addEventListener('click', login)