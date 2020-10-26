var simplemde = new SimpleMDE({
    autofocus: true,
    autosave: {
        enabled: true,
        uniqueId: "MyUniqueID",
        delay: 1000,
    },
    blockStyles: {
        bold: "__",
        italic: "_"
    },
    element: document.getElementById("MyID"),
    forceSync: true,
    hideIcons: ["guide", "heading"],
    indentWithTabs: false,
    initialValue: "",
    insertTexts: {
        horizontalRule: ["", "\n\n-----\n\n"],
        image: ["![](http://", ")"],
        link: ["[", "](http://)"],
        table: ["", "\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text      | Text     |\n\n"],
    },
    lineWrapping: false,
    parsingConfig: {
        allowAtxHeaderWithoutSpace: true,
        strikethrough: false,
        underscoresBreakWords: true,
    },
    placeholder: "快來寫下你的回答...",
    previewRender: function (plainText) {
        return customMarkdownParser(plainText); // Returns HTML from a custom parser
    },
    previewRender: function (plainText, preview) { // Async method
        setTimeout(function () {
            preview.innerHTML = customMarkdownParser(plainText);
        }, 250);

        return "Loading...";
    },
    promptURLs: true,
    renderingConfig: {
        singleLineBreaks: false,
        codeSyntaxHighlighting: true,
    },
    shortcuts: {
        drawTable: "Cmd-Alt-T"
    },
    showIcons: ["code", "table"],
    spellChecker: false,
    status: false,
    status: ["autosave", "lines", "words", "cursor"], // Optional usage
    status: ["autosave", "lines", "words", "cursor", {
        className: "keystrokes",
        defaultValue: function (el) {
            this.keystrokes = 0;
            el.innerHTML = "0 Keystrokes";
        },
        onUpdate: function (el) {
            el.innerHTML = ++this.keystrokes + " Keystrokes";
        }
    }], // Another optional usage, with a custom status bar item that counts keystrokes
    // styleSelectedText: false,
    // tabSize: 4,
    // toolbar: false,
    // toolbarTips: false,
});


// 文章頁面的留言功能
let leaveMessage = document.getElementById('leaveMessage');
leaveMessage.addEventListener('click', function () {
    // axios.get(`https://fierce-forest-92782.herokuapp.com/account/${}`)

    let _date = new Date();
    let date = _date.getFullYear() + '/' + (_date.getMonth() + 1) + '/' + _date.getDate();
    let time = _date.getHours() + ':' + _date.getMinutes() + ':' + _date.getSeconds();
    let getContent = document.getElementById('MyID').value;

    axios.post('https://fierce-forest-92782.herokuapp.com/message', {
        id: '',
        mName: '阿瀚',
        date: `${date} ${time}`,
        mcontent: `${getContent}`,
        msgOwenerID: 'sfsfsfsf',
    })
    console.log('點到了')
}, false)