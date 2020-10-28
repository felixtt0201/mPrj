const api = `https://fierce-forest-92782.herokuapp.com/articles`;
const article_num = document.querySelector('.profile-main__badge');
const article_list = document.querySelector('.user-article-list');
const get_draftID = document.getElementById('get_draftID');
const articles = document.getElementById('articles');
const articles_1 = document.querySelector('.articles');

// (´・ω・｀)
let userID = parseStatus.loginID;
let userName = parseStatus.loginName;

console.log(`${userID}:${userName}`)//6

// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)


/* 找到自己ID 的文章 */
axios.get(api)
  .then(res => {
    let data = res.data;
    let newData = data.filter(i => i.artOnwerID == userID)
    let user_article_num = newData.length;
    console.log(user_article_num)
    articles.textContent = user_article_num ;
    articles_1.textContent = user_article_num ;
  })



// window.onload 