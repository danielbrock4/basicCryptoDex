// Quokka Plugin that connects to the index.js file or html file with same name as the js file
({ plugin: ['jsdom-quokka-plugin']})


// import fetch function
// import fetch from "node-fetch"

// URLs
    // Coin Paprika coin rankings
    const coinpaprikaAPI = `https://api.coinpaprika.com/v1/coins`

    // 1InchAPI for Coin Details
    const oneInchAPI = `https://api.1inch.exchange/v3.0/1/tokens`

// // Coin Paprika
async function topTenTokens() {
    try {
        let responseObj = await fetch(coinpaprikaAPI)
        let apiTokenListJSON = await responseObj.json()
        let tokenObjList = Object.values(apiTokenListJSON)
        let tokenPropertiesList = tokenObjList
            .filter(tokenProperty => 
                tokenProperty.rank <= 10 &&
                tokenProperty.rank !== 0)
            // Used Destructuring desired Properties
            // .map(({symbol, rank}) => ({symbol, rank}))
            .map(tokenSymbolValue => tokenSymbolValue.symbol)    
        return tokenPropertiesList
    }
    catch (error) {
        console.log(error)
    }
}

topTenTokens().then(console.log)

// OneInch
async function filterTickers(tickerList) {
    try {
        let responseObj = await fetch(oneInchAPI)
        let apiTokenListJSON = await responseObj.json()
        let tokenObjList = Object.values(apiTokenListJSON.tokens)
        let tokenPropertiesList = tokenObjList
            .filter(tokenSymbolValue => tickerList.includes(tokenSymbolValue.symbol))
        //     .map(({symbol, name, address, decimals}) => ({symbol, name, address, decimals}))
        return tokenPropertiesList
    }
    catch (error) {
        console.log(error)
    }
}

// function renderForm(tokens) {
//     console.log(tokens);
// }

// topTenTokens()
//     // The topTenTokens list is passing through as the tickerList in FilterTickers Function
//     .then(tickerList => filterTickers(tickerList))
//     // .then(filterTickers)
//     .then(renderForm)

// const tokenDropDownMenu = document.getElementById("tokenDropDownMenu")
// console.log({tokenDropDownMenu})

// const dropDownMenu = async () => {
//     const options = await topTenTokens();
//     for (option of options) {
//         const newOption = document.createElement("option")
//         newOption.text = option.dropDownTicker;
//         tokenDropDownMenu.appendChild(newOption)
//     }
// }

// dropDownMenu()
