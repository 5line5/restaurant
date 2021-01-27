function makeRandomId() {
    let text = "";
    let possible = "1234567890";

    for(let i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

module.exports = {
    makeRandomId
};