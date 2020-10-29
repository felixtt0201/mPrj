const qa_api = 'https://fierce-forest-92782.herokuapp.com/articles';
const qa_title = document.querySelector('.qa_title');
const nameInfo = document.getElementById('nameInfo');
const timeInfo = document.querySelector('.timeInfo');
const qaMarkDown = document.getElementById('qaMarkDown');
const replyFrame = document.querySelector('.replyFrame');

let get_qa_id = localStorage.getItem('questionID');
let data = {};
get_qa_contgent();
function get_qa_contgent(){
    // let get_qa_id = localStorage.getItem('questionID');
    axios.get(qa_api)
        .then(function(res){
            data = res.data;
            console.log(data);
            render();
    })
    console.log(get_qa_id)
}

function render(){
    let A = '';
    data.forEach(function(i){
        if(i.id == get_qa_id){
            A = i.id -1
            console.log(i.id)
            console.log(A)
            console.log('OK!')
            
        }else{
            console.log('安安你失敗ㄌ ')
        }
    });
    console.log(A);
    qa_title.textContent = data[A].title;
    nameInfo.textContent = data[A].author;
    qaMarkDown.innerHTML = data[A].content;
    timeInfo.textContent = data[A].date;
    
}