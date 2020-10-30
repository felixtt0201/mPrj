const qa_api = 'https://fierce-forest-92782.herokuapp.com/articles';
const qa_title = document.querySelector('.qa_title');
const nameInfo = document.getElementById('nameInfo');
const timeInfo = document.querySelector('.timeInfo');
const qaMarkDown = document.getElementById('qaMarkDown');
const replyFrame = document.querySelector('.replyFrame');

let get_qa_id = localStorage.getItem('questionID'); // 發出文章的articleId
let get_qa_articles = localStorage.getItem('articleID'); //點擊文章articleId
let miu = localStorage.getItem('貓');
let data = {};
get_qa_contgent();
function get_qa_contgent(){
    axios.get(qa_api)
        .then(function(res){
            data = res.data;
            if('喵' == miu){
                console.log('OK')
                localStorage.removeItem('貓') // 不清除的話會永遠無法判斷QAQ卡卡卡
                listrender()
            }else{
                postrender()
                console.log('555')
            }
    })
}

function postrender(){
    let ccc = data.filter(function(i){
        return i.articleID === get_qa_id
    });
    console.log(ccc);

    qa_title.textContent = ccc[0].title;
    nameInfo.textContent = ccc[0].author;
    qaMarkDown.innerHTML = ccc[0].content;
    timeInfo.textContent = ccc[0].date;
}
function listrender(){
    let C ='';
    data.forEach(function(i,index){
        if( get_qa_articles == i.articleID){
            C = index;
        }else{
            console.log('listno')
        }
    })
    qa_title.textContent = data[C].title;
    nameInfo.textContent = data[C].author;
    qaMarkDown.innerHTML = data[C].content;
    timeInfo.textContent = data[C].date;
}