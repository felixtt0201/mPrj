var test = CKEDITOR.replace('editor1');

// 文章頁面的留言功能
let leaveMessage = document.getElementById('leaveMessage');
leaveMessage.addEventListener('click', function () {
    // axios.get(`https://fierce-forest-92782.herokuapp.com/account/${}`)
    let _date = new Date();
    let date = _date.getFullYear() + '/' + (_date.getMonth() + 1) + '/' + _date.getDate();
    let time = _date.getHours() + ':' + _date.getMinutes() + ':' + _date.getSeconds();
    let getContent = CKEDITOR.instances.editor1.getData();

    axios.post('https://fierce-forest-92782.herokuapp.com/message', {
        id: '',
        mName: '', // 必須打撈localStorage的資料，才能取得
        date: `${date} ${time}`,
        mcontent: `${getContent}`,
        msgOwenerID: '',　// 必須打撈localStorage的資料，才能取得
    })
    console.log('已完成留言')
}, false)
