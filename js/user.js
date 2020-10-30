const api = `https://fierce-forest-92782.herokuapp.com/articles`;
const article_num = document.querySelector('.profile-main__badge');
const article_list = document.querySelector('.user-article-list');
const get_draftID = document.getElementById('get_draftID');
const articles = document.getElementById('articles');
const articles_1 = document.querySelector('.articles');
const questions = document.getElementById('questions');
const views = document.querySelector('.people-count__view-num');

// (´・ω・｀)
let userID = parseStatus.loginID;
let userName = parseStatus.loginName;

console.log(`${userID}:${userName}`)//6

// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)


function getPersonInfo() {
  const artName = document.querySelector('.user-profile__name');
  artName.textContent = parseStatus.loginName + " ";

  const Name = document.querySelectorAll('.userBoard_nameID')
  Name.forEach(i => {
    i.textContent = parseStatus.loginName + " ";
  });
}
getPersonInfo();


/* 找到自己ID 的文章 */
axios.get(api)
  .then(res => {
    let data = res.data;
    let art = data.filter(i => i.artOnwerID == userID && i.type == 'article')
    let user_article_num = art.length;
    articles.textContent = user_article_num;
    articles_1.textContent = user_article_num;
    let que = data.filter(i => i.artOnwerID == userID && i.type == 'question')
    let user_question_num = que.length;
    questions.textContent = user_question_num
    let views_total = 0;
    art.forEach(function(i){
      views_total += Number(i.views)
      console.log(i.views)
    })
    console.log(views_total);
    views.textContent = views_total;
  })



// window.onload
function b(){ 
data.forEach(function(i,index){
  
})}