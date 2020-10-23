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
    hideIcons: ["guide", "heading", "side-by-side", "fullscreen"],
    indentWithTabs: false,
    initialValue: " ",
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
    placeholder: "Type here...",
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
    showIcons: ["bold", "italic", "link", "quote", "code", "image", "|", "ordered-list", "unordered-list", "horizontal-rule", "|", "preview"],
    spellChecker: false,
    status: false,
});