const offerings = fetch('https://acme-users-api-rev.herokuapp.com/api/offerings')
const companies = fetch('https://acme-users-api-rev.herokuapp.com/api/companies')
const products = fetch('https://acme-users-api-rev.herokuapp.com/api/products')


const loadData = () => {
    return Promise.all([offerings, companies, products])
        .then(responses => {
            const offeringsResponse = responses[0];
            const companiesResponse = responses[1];
            const productsResponse = responses[2];

            return Promise.all([offeringsResponse.json(), companiesResponse.json(), productsResponse.json()])
        }).then(result => {
            const offeringsResult = result[0];
            const companiesResult = result[1];
            const productsResult = result[2];
            console.log([offeringsResult, companiesResult, productsResult])
            return [offeringsResult, companiesResult, productsResult]
        })
}
loadData().then(results => {
    renderInfo(results)
})

const renderInfo = (info) => {

    const productsInfo = info[2];
    const companiesInfo = info[1];
    const offeringsInfo = info[0];

    productsInfo.forEach(product => {
        console.log(product.name, product.description, product.suggestedPrice)
        const offerings = offeringsInfo.filter(offerings => {
            //console.log(offerings.productId)
            return product.id === offerings.productId
        }).map((productOfferings) => {
            //console.log(productOfferings.companyId)
            const companyName = companiesInfo.find(companies => {
                return productOfferings.companyId === companies.id
            });
            //console.log(companyName)
            //console.log(`Offered by ${companyName.name} at price: ${productOfferings.price}`)
            return (`Offered by ${companyName.name} at price: ${productOfferings.price}`)
        })
        console.log(offerings)
    })



}

// [productObj1, { name: "foo", description: "whatever", offerings: [`<li>Offered by ${company.name} at ${offering.price}</li>`] }]