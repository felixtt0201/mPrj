const accountURL = "https://fierce-forest-92782.herokuapp.com/account";
const inputName = document.getElementById('inputName');
const inputEmail = document.getElementById('inputEmail');
const inputAccount = document.getElementById('inputAccount');
const inputPassword = document.getElementById('inputPassword');
const send = document.getElementById('login');
let accountData = [];


let acEmail = "";
let acAccount = "";
function getInfo() {
  axios.get(accountURL).then(res => {
    accountData = res.data;
    console.log(accountData)
  })
}
getInfo();

function compareInfo() {
  let checkAC = accountData.find(i => {
    return i.account === inputAccount.value
  })
  let checkEmail = accountData.find(i => {
    return i.email === inputEmail.value
  })
  if (checkAC) {
    alert('帳號重複');
  }
  else if (checkEmail) {
    alert('信箱重複');
  }
  else {
    axios.post(accountURL, {
      name: inputName.value,
      email: inputEmail.value,
      account: inputAccount.value,
      password: inputPassword.value
    }).then(() => {
      window.location.href = `index.html`
    }
    )

    console.log('成功註冊');
    alert('註冊成功');

  }

};



function register(e) {
  e.preventDefault();
  if (!inputName.value) {
    alert('請填寫姓名')
  }
  else if (!inputEmail.value) {
    alert('請填寫信箱')
  }
  else if (!inputAccount.value) {
    alert('帳號不能為空')
  }
  else if (!inputPassword.value) {
    alert('密碼不能為空')
  }
  else {
    compareInfo()

  }



};
// send.addEventListener('click', () => {
//   // let url = `${window.location.origin}/index.html`;
//   // register();
//   compareInfo();
//   // window.location.href = `http://www.google.com.tw`
// })

send.addEventListener('click', (e) => {
  register(e)
}
)