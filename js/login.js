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
};



//登入功能
function login() {
  event.preventDefault();
  let inputAccount = account.value;
  let inputPassword = password.value;

  axios.get(accountURL).then(res => {
    accountData = res.data;
    accountData.some(function (i) {
      if (i.account === inputAccount && i.password === inputPassword) {
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
        return true;
      }
      else if (inputAccount === "") {
        alert('帳號不得為空白')
        return true;
      }
      else if (inputPassword === "") {
        alert('密碼不得為空白')
        return true;
      }
      else {
        alert('帳號或密碼不存在')
        return true;
      }
    })
  })
}

loginBtn.addEventListener('click', login)