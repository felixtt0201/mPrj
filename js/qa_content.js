const qa_api = 'https://fierce-forest-92782.herokuapp.com/articles';
const qa_title = document.querySelector('.qa_title');
const nameInfo = document.getElementById('nameInfo');
const timeInfo = document.querySelector('.timeInfo');
const qaMarkDown = document.getElementById('qaMarkDown');
const replyFrame = document.querySelector('.replyFrame');

let get_qa_id = localStorage.getItem('questionID'); // 發出文章id
let get_qa_articles = localStorage.getItem('articleID'); //點擊文章id
let miu = localStorage.getItem('貓');
console.log(get_qa_id); // id:109
console.log(get_qa_articles);//51603938286298 id:14
let data = {};
let B ='';
let h ='';
get_qa_contgent();
function get_qa_contgent(){
    axios.get(qa_api)
        .then(function(res){
            data = res.data;
            if('喵' == miu){
                console.log('OK')
                localStorage.removeItem('貓') // 不清除的話會永遠無法判斷，11:42p.m，卡了半天ㄉ腦袋
                listrender()
            }else{
                postrender()
                console.log('555')
            }
    })
}

function postrender(){
    let A = '';
    A = `${get_qa_id}`-1;
    console.log(A);
    qa_title.textContent = data[A].title;
    nameInfo.textContent = data[A].author;
    qaMarkDown.innerHTML = data[A].content;
    timeInfo.textContent = data[A].date;
}
function listrender(){
    let C ='';
    data.forEach(function(i,index){
        if( get_qa_articles == i.articleID){
            // console.log('list')
            // console.log(i.id)
            // console.log(index)
            C = index;
        }else{
            console.log('listno')
        }
    })
    console.log(C)
    qa_title.textContent = data[C].title;
    nameInfo.textContent = data[C].author;
    qaMarkDown.innerHTML = data[C].content;
    timeInfo.textContent = data[C].date;
}
// --
// function r(){
//     var newid;
//     // for (let index = 0; index < data.length; index++) {
//     //     const element = data[index];
//     //     if(get_qa_articles == element.articleID){
//     //         //         console.log(i.id)
//     //                 // r_id = i.id-1;
//     //                 newid = element.id-1;
//     //                 break;
//     //     }
//     //     else{
//     //         console.log('nonono!');
//     //     }
//     // }
//     data.forEach(function(i){
//         if(get_qa_articles == i.articleID){
//             console.log(i.id)
//             // r_id = i.id-1;
//             newid = i.id-1;
//             qa_title.textContent = data[newid].title;
//             nameInfo.textContent = data[newid].author;
//             qaMarkDown.innerHTML = data[newid].content;
//             timeInfo.textContent = data[newid].date;
//     // return true;
//             // break;
//         }else{
//             console.log('nonono!')
//         }

//     })
      
    // qa_title.textContent = data[r_id].title;
    // nameInfo.textContent = data[r_id].author;
    // qaMarkDown.innerHTML = data[r_id].content;
    // timeInfo.textContent = data[r_id].date;
// }

// console.log(data)