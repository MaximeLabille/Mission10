let articles = [
    {nom: "Article 1", prix: 10, quantite: 0},
]

const auto_articles_templates = [
    {nom: "souris", prix: 4, quantite: 4},
    {nom: "ecran 17 pouse", prix: 150, quantite: 6},
    {nom: "clef usb 16 go", prix: 13, quantite: 3},
]

const buttonAddLine = document.querySelector('#addline')
const buttonSubmit = document.querySelector('#submit')
const buttonReset = document.querySelector('#reset')
const remise = document.querySelector('#remise')
const taxe = document.querySelector('#taxe')
const fraisPorts = document.querySelector('#frais-ports')
const buttonAutoFill = document.querySelector('#autofill')

const t1_4 = document.querySelector('#t1-4')
const tTotal = document.querySelector('#t-total')

buttonAddLine.addEventListener('click', () => {
    const tr = document.createElement('tr')
    tr.innerHTML = `
    <th scope="row" class="copied"><input id="t${articles.length + 1}-1" placeholder="Nom de l'article" type="text" maxlength="25"/></th>
    <td><input id="t${articles.length + 1}-2" placeholder="0" value="0" min="0" type="number" /></td>
    <td><input id="t${articles.length + 1}-3" placeholder="0" value="0" min="0" type="number" /></td>
    <td><input id="t${articles.length + 1}-4" disabled placeholder="0" value="0" type="text" /></td>
    `
    document.querySelector('#table').appendChild(tr)
    articles.push({nom: `Article ${articles.length + 1}`, prix: 0, quantite: 0})
})

buttonSubmit.addEventListener('click', () => {
    let total = 0
    for (let i = 0; i < articles.length; i++) {
        if (document.querySelector(`#t${i + 1}-2`) && document.querySelector(`#t${i + 1}-3`)) {
            articles[i].prix = document.querySelector(`#t${i + 1}-2`).value
            articles[i].quantite = document.querySelector(`#t${i + 1}-3`).value
            document.querySelector(`#t${i + 1}-4`).value = articles[i].prix * articles[i].quantite
            total += articles[i].prix * articles[i].quantite
        }
    }
    total = total * (1 - remise.value / 100) * (1 + taxe.value / 100) + fraisPorts.value
    tTotal.value = total/10
})


function cleanemptytd() {
    const table = document.querySelector('#table')
    const trs = table.querySelectorAll('tr')
    trs.forEach(tr => {
        const tds = tr.querySelectorAll('td')
        for (let i = 0; i < tds.length; i++) {
            console.log(tds[i].outerHTML)
            if (tds[i].outerHTML == "<td></td>") {
                tr.remove()
            }
        }
    })
}

function reset() {
    for (let i = 1; i < articles.length; i++) {
        document.querySelector(`#t${i + 1}-1`).remove()
        document.querySelector(`#t${i + 1}-2`).remove()
        document.querySelector(`#t${i + 1}-3`).remove()
        document.querySelector(`#t${i + 1}-4`).remove()
    }
    
    articles = [
        {nom: "Article 1", prix: 10, quantite: 0},
    ]
    tTotal.value = 0
    cleanemptytd()
}

buttonReset.addEventListener('click', reset)

buttonAutoFill.addEventListener('click', () => {
    reset()
    for (let i = 0; i < auto_articles_templates.length; i++) {
        const tr = document.createElement('tr')
        tr.innerHTML = `
        <th scope="row" class="copied"><input id="t${articles.length + 1}-1" placeholder="Nom de l'article" type="text" maxlength="25" value="${auto_articles_templates[i].nom}"/></th>
        <td><input id="t${articles.length + 1}-2" placeholder="0" value="${auto_articles_templates[i].prix}" min="0" type="number" /></td>
        <td><input id="t${articles.length + 1}-3" placeholder="0" value="${auto_articles_templates[i].quantite}" min="0" type="number" /></td>
        <td><input id="t${articles.length + 1}-4" disabled placeholder="0" value="0" type="text" /></td>
        `
        document.querySelector('#table').appendChild(tr)
        articles.push({nom: auto_articles_templates[i].nom, prix: auto_articles_templates[i].prix, quantite: auto_articles_templates[i].quantite})
    }
    cleanemptytd()
})

