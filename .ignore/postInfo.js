const accountURL = "https://fierce-forest-92782.herokuapp.com/account";
const articlesURL = "https://fierce-forest-92782.herokuapp.com/articles";
const messageURL = "https://fierce-forest-92782.herokuapp.com/message";
let accountData = [];
let articlesData = [];
let messageData = [];
const date = new Date();
const nowDay = date.toLocaleString();

//抓帳號元素
const accountSubmit = document.getElementById('accountSubmit');
const accountDelete = document.getElementById('accountDelete');
const accountResult = document.getElementById('accountResult');

//抓文章元素
const articleSubmit = document.getElementById('articleSubmit');
const articleDelete = document.getElementById('articleDelete');
const articleResult = document.getElementById
  ('articleResult');

//抓留言元素
const messageSubmit = document.getElementById('messageSubmit');
const messageDelete = document.getElementById('messageDelete');
const messageResult = document.getElementById
  ('messageResult');


// Account_FakeInfo
const accountInfo = [
  {
    name: 'Ben',
    email: 'ben@gmail.com',
    password: '123456',

  },
  {
    name: 'Kent',
    email: 'kevin@gmail.com',
    password: '123456',
  },
  {
    name: 'Ben',
    email: 'Ben@gmail.com',
    password: '123456',
  },
  {
    name: 'Marry',
    email: 'marry@gmail.com',
    password: '123456',
  },
  {
    name: 'Cin',
    email: 'cin@gmail.com',
    password: '123456',
  },
  {
    name: 'Sonyko',
    email: 'Sonyko@gmail.com',
    password: '123456',
  }
];



//Article_FakeInfo
const articlesInfo = [
  {
    title: '標題1',
    author: 'Ben',
    date: nowDay,
    views: '',
    content: 'orem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium doloremque sapiente praesentium reiciendis beatae eligendi consequuntur maiores sequi quo mollitia facere, molestias quia vero aperiam architecto minus qui, libero assumenda modi exercitationem eius dolorem? Laboriosam impedit fugiat dignissimos praesentium repellat magnam quod tempora, consectetur voluptate blanditiis reiciendis soluta omnis rem possimus, sequi assumenda, perspiciatis ducimus molestias ratione? Quaerat corrupti ullam, adipisci excepturi nesciunt vel impedit numquam iusto, illum perferendis inventore perspiciatis, iste quasi tenetur harum facilis laboriosam quod. Laudantium aliquam nisi quas fugit provident maiores, autem asperiores ipsum voluptatum doloribus, deserunt repudiandae eum suscipit recusandae, eius voluptates ea praesentium esse fugiat. Praesentium vero expedita obcaecati consectetur saepe vitae suscipit, id accusamus nulla ipsum facere a debitis quam error porro in? Dignissimos odit architecto voluptatem distinctio incidunt eos error dolor magnam vel provident laudantium ut maxime blanditiis nihil voluptatibus aliquid, sint necessitatibus ducimus accusantium eius veritatis. Unde non officia ipsum corrupti hic dignissimos distinctio commodi ipsam. Saepe a autem adipisci aut vel, inventore quam delectus iste animi recusandae totam ipsa earum facilis blanditiis perspiciatis dignissimos repellat aspernatur sint reiciendis. Nihil excepturi quibusdam corporis, fugit reiciendis saepe quis delectus dolorem sed numquam, natus, modi quod itaque et veniam veritatis. Ipsa eum totam hic incidunt tenetur provident, fugiat distinctio similique quia, id dolorum suscipit amet consectetur! Culpa velit eos iusto animi praesentium aspernatur aliquid minus est magni quis pariatur totam nisi, placeat commodi ratione. Quibusdam sint excepturi sequi. Sunt, exercitationem. Dolor, odio. Eum ab laboriosam et magnam. Reprehenderit nisi animi provident saepe eaque? Mollitia eaque provident voluptate in, nemo rerum quia, sapiente veritatis pariatur sed quae et. Cumque ea laboriosam eveniet nesciunt rem vel quas dolorem velit eum? Aliquid quam officiis repellat earum. Itaque enim, hic aut expedita excepturi officiis dolorum quibusdam ab eveniet nobis ratione repellat libero cum quae perferendis accusamus dolorem.',
    likes: '',
    artOnwerID: ''
  },
];

//Meaasge_FaleInfo
const messageInfo = [
  {
    mName: 'Ben',
    date: nowDay,
    mContent: '',
    msgOnwerID: ''
  }

]


//刪除資料方法
function deleteData(url, id) {
  axios.delete(`${url}/${id}`, {
    data: {
      id: id
    }
  }).then(res => {
    console.log(res)
  })
};

/* Account Function Start*/
//上傳Account資料
function postAccountInfo() {
  accountInfo.forEach(i => {
    axios.post(accountURL, {
      name: i.name,
      email: i.email,
      password: i.password,
    }).then((res) => {
      console.log(res);
    }).catch((error) => {
      console.log(error);
    })
  })
};

// 取的Account資料
function getAccountInfo() {
  axios.get(accountURL).then((res) => {
    accountData = res.data;
    console.log(accountData)
  })
};

// 刪除全部Account資料
function deleteAccountInfo() {
  accountData.forEach(i => {
    deleteData(accountURL, i.id)
  })
  getAccountInfo();
};
accountSubmit.addEventListener('click', postAccountInfo)
accountDelete.addEventListener('click', deleteAccountInfo)
accountResult.addEventListener('click', getAccountInfo);
/* Account Function End*/


/* Article Function Start */

//上傳Articles資料
function postArticlesInfo() {
  articlesInfo.forEach(i => {
    axios.post(articlesURL, {
      title: i.title,
      author: i.author,
      date: i.date,
      views: i.views,
      content: i.content,
      like: i.likes,
      artOnwerID: i.artOnwerID
    }).then(res => {
      console.log(res);
    }).catch(error => {
      console.log(error)
    })
  })
};
articleSubmit.addEventListener('click', postArticlesInfo)

//取得全部Articles資料
function getArticleInfo() {
  axios.get(articlesURL).then((res) => {
    articlesData = res.data;
    console.log(articlesData)
  })
}
//刪除全部Articles資料
function deleteArticlesInfo() {
  articlesData.forEach(i => {
    deleteData(articlesURL, i.id)
  })
  getArticleInfo()
};
articleSubmit.addEventListener('click', postArticlesInfo)
articleDelete.addEventListener('click', deleteArticlesInfo)
articleResult.addEventListener('click', getArticleInfo)
/* Article Function End */


/*Message Function Start*/
//上傳Message資料
function postMessageInfo() {
  messageInfo.forEach(i => {
    axios.post(messageURL, {
      mName: i.mName,
      date: i.date,
      mContent: i.mContent,
      msgOnwerID: i.msgOnwerID
    })
  })
};

//取得Meaasge資料
function getMessageInfo() {
  axios.get(messageURL).then(res => {
    messageData = res.data;
    console.log(messageData);
  });
};

//刪除全部Message資料
function deleteMessageInfo() {
  messageData.forEach(i => {
    deleteData(messageURL, i.id)
  })
  getMessageInfo();
};
messageSubmit.addEventListener('click', postMessageInfo);
messageDelete.addEventListener('click', deleteMessageInfo);
messageResult.addEventListener('click', getMessageInfo);
/*Message Function End*/

