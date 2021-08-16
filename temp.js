var array = ['walmart', 'shopify', 'ebay']
var count = 0

function changeText() {
    setTimeout(() => {
        count == 3 ? count = 0 : count = count
        document.getElementById('gen').innerText = array[count]
        count++
        changeText()
    }, 3000)
}

changeText()