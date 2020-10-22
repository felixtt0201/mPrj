const accountURL = "https://fierce-forest-92782.herokuapp.com/account";
const inputName = document.getElementById('inputName');
const inputEmail = document.getElementById('inputEmail');
const inputAccount = document.getElementById('inputAccount');
const inputPassword = document.getElementById('inputPassword');
const submit = document.getElementById('login');
let accountData = [];

function register(e) {
  e.preventDefault();
  let acEmail = "";
  let acAccount = "";
  axios.get(accountURL).then(res => {
    accountData = res.data;
    accountData.forEach(i => {
      acEmail = i.email;
      acAccount = i.account;
    })
    if (!inputName.value) {
      alert('請填寫姓名')
    }
    else if (!inputEmail.value) {
      alert('請填寫信箱')
    }
    else if (!inputAccount.value) {
      alert('不能為空')
    }
    else if (!inputPassword.value) {
      alert('不能為空')
    }
    else if (inputEmail.value === acEmail) {
      alert('重複信箱')
    }
    else if (inputAccount.value === acAccount) {
      alert('重複帳號')

    }
    else {
      axios.post(accountURL, {
        name: inputName.value,
        email: inputEmail.value,
        account: inputAccount.value,
        password: inputPassword.value
      })
      console.log('成功註冊');
    }
  })
};
submit.addEventListener('click', register)