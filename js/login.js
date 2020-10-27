const loginBtn = document.getElementById('login');
const account = document.querySelector('.account');
const password = document.querySelector('.password');

let accountData = [];
const accountURL = "https://fierce-forest-92782.herokuapp.com/account";

let loginStatus = {
  loginCheck: false,
  loginID: '',
  loginName: '',
  loginEmail: '',
  loginPassword: ''
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
        loginStatus.loginName = i.name;
        loginStatus.loginEmail = i.email;
        loginStatus.loginPassword = i.password
        localStorage.setItem('loginStatus', JSON.stringify(loginStatus));

        alert(loginStatus.loginName + '你已成功登入')
        // 跳轉頁面
        let url = `${window.location.origin}/user.html`;
        window.location.replace(url)
      }
      else {
        // alert('帳號密碼錯誤');
      }
    });
  })
};

loginBtn.addEventListener('click', login)