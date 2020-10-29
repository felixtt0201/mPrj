const api = `https://fierce-forest-92782.herokuapp.com/articles`;
const article_num = document.querySelector('.profile-main__badge');
const article_list = document.querySelector('.user-article-list');
const get_draftID = document.getElementById('get_draftID');
const articles = document.getElementById('articles');
const articles_1 = document.querySelector('.articles');
const questions = document.getElementById('questions');

// (´・ω・｀)
let userID = parseStatus.loginID;
let userName = parseStatus.loginName;

console.log(`${userID}:${userName}`)//6

// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)


/* 找到自己ID 的文章 */
axios.get(api)
  .then(res => {
    let data = res.data;
    let art = data.filter(i => i.artOnwerID == userID && i.type =='article')
    let user_article_num = art.length;
    articles.textContent = user_article_num ;
    articles_1.textContent = user_article_num ;
    let que = data.filter(i=>i.artOnwerID == userID && i.type =='question')
    let user_question_num = que.length;
    questions.textContent = user_question_num
  })



// window.onload 