console.clear()

const input = {
    "orderId": "382-b8b",
    "status": "unfulfilled",
    "comment": "",
    "orderComment": "",
    "acceptedOn": "2021-03-20T18:22:46.187Z",
    "disputedOn": null,
    "disputeUpdatedOn": null,
    "disputeLastStatus": null,
    "fulfilledOn": null,
    "refundedOn": null,
    "customerPaid": {
        "unit": "PLN",
        "value": 0,
        "string": "zł 0,00 PLN"
    },
    "netAmount": {
        "unit": "PLN",
        "value": 0,
        "string": "zł 0,00 PLN"
    },
    "shippingProvider": null,
    "shippingTracking": null,
    "shippingTrackingURL": null,
    "customerInfo": {
        "fullName": "Bartosz Kustra",
        "email": "bartekkustra@gmail.com"
    },
    "shippingAddress": {
        "type": "shipping",
        "addressee": "Bartosz Kustra",
        "line1": "Sybiraków",
        "line2": "8",
        "city": "Bydgoszcz",
        "state": "9532586867",
        "country": "PL",
        "postalCode": "85-796"
    },
    "allAddresses": [
        {
            "type": "billing",
            "addressee": "Bartosz Kustra",
            "line1": "Sybiraków",
            "line2": "8",
            "city": "Bydgoszcz",
            "state": "9532586867",
            "country": "PL",
            "postalCode": "85-796"
        },
        {
            "type": "shipping",
            "addressee": "Bartosz Kustra",
            "line1": "Sybiraków",
            "line2": "8",
            "city": "Bydgoszcz",
            "state": "9532586867",
            "country": "PL",
            "postalCode": "85-796"
        }
    ],
    "purchasedItems": [
        {
            "count": 4,
            "rowTotal": {
                "unit": "PLN",
                "value": 0,
                "string": "zł 0,00 PLN"
            },
            "productId": "6055eb7c1a82e70ba30c020d",
            "productName": "Gift Card",
            "productSlug": "gift-card",
            "variantId": "6055eb7c1a82e76e4a0c020e",
            "variantName": "Gift Card",
            "variantSlug": "gift-card",
            "variantSKU": "123",
            "variantImage": {
                "fileId": "6055eb7c1a82e725df0c0210",
                "url": "https://uploads-ssl.webflow.com/6055eb7c1a82e750ec0c01a1/6055eb7c1a82e725df0c0210_acme-gift-card.jpg",
                "alt": null
            },
            "variantPrice": {
                "unit": "PLN",
                "value": 0,
                "string": "zł 0,00 PLN"
            },
            "weight": 0,
            "height": 0,
            "width": 0,
            "length": 0
        },
        {
            "count": 2,
            "rowTotal": {
                "unit": "PLN",
                "value": 0,
                "string": "zł 0,00 PLN"
            },
            "productId": "6055eb7c1a82e75dc00c01ff",
            "productName": "White Tent",
            "productSlug": "white-tent",
            "variantId": "6055eb7c1a82e766200c0200",
            "variantName": "White Tent",
            "variantSlug": "white-tent",
            "variantSKU": null,
            "variantImage": {
                "fileId": "6055eb7c1a82e7061a0c01a8",
                "url": "https://uploads-ssl.webflow.com/6055eb7c1a82e750ec0c01a1/6055eb7c1a82e7061a0c01a8_patrick-hendry-eDgUyGu93Yw-unsplash.jpg",
                "alt": null
            },
            "variantPrice": {
                "unit": "PLN",
                "value": 0,
                "string": "zł 0,00 PLN"
            },
            "weight": 0,
            "height": 0,
            "width": 0,
            "length": 0
        }
    ],
    "purchasedItemsCount": 6,
    "stripeDetails": {
        "customerId": null,
        "chargeId": null,
        "disputeId": null,
        "paymentIntentId": null,
        "paymentMethod": null,
        "subscriptionId": null,
        "refundId": null,
        "refundReason": null
    },
    "customData": [],
    "paypalDetails": {
        "orderId": null,
        "payerId": null,
        "captureId": null,
        "refundId": null,
        "refundReason": null,
        "disputeId": null
    },
    "applicationFee": {
        "unit": "PLN",
        "value": 0
    },
    "requiresShipping": true,
    "hasDownloads": false,
    "metadata": {
        "buyNow": false
    },
    "paymentProcessor": null,
    "billingAddress": {
        "type": "billing",
        "addressee": "Bartosz Kustra",
        "line1": "Sybiraków",
        "line2": "8",
        "city": "Bydgoszcz",
        "state": "9532586867",
        "country": "PL",
        "postalCode": "85-796"
    },
    "totals": {
        "subtotal": {
            "unit": "PLN",
            "value": 0,
            "string": "zł 0,00 PLN"
        },
        "extras": [
            {
                "type": "shipping",
                "name": "FREE",
                "description": "",
                "price": {
                    "unit": "PLN",
                    "value": 0,
                    "string": "zł 0,00 PLN"
                }
            }
        ],
        "total": {
            "unit": "PLN",
            "value": 0,
            "string": "zł 0,00 PLN"
        }
    },
    "downloadFiles": []
}

const products = input.purchasedItems
let cleanProducts = []
products.forEach(product => {
  const single = {
    sku: parseInt(product.variantSKU, 10) || 0,
    name: product.variantName || product.productName,
    quantity: product.count,
    price: product.variantPrice.value
  }
  cleanProducts.push(single)
})

console.log(cleanProducts)



count: 4 height: 0 length: 0 productId: 6055eb7c1a82e70ba30c020d productName: Gift Card productSlug: gift-card rowTotal: {'unit': 'PLN', 'value': 0, 'string': 'zł\xa00,00\xa0PLN'} variantId: 6055eb7c1a82e76e4a0c020e variantImage: {'fileId': '6055eb7c1a82e725df0c0210', 'url': 'https://uploads-ssl.webflow.com/6055eb7c1a82e750ec0c01a1/6055eb7c1a82e725df0c0210_acme-gift-card.jpg', 'alt': None} variantName: Gift Card variantPrice: {'unit': 'PLN', 'value': 0, 'string': 'zł\xa00,00\xa0PLN'} variantSKU: 123 variantSlug: gift-card weight: 0 width: 0 count: 2 height: 0 length: 0 productId: 6055eb7c1a82e75dc00c01ff productName: White Tent productSlug: white-tent rowTotal: {'unit': 'PLN', 'value': 0, 'string': 'zł\xa00,00\xa0PLN'} variantId: 6055eb7c1a82e766200c0200 variantImage: {'fileId': '6055eb7c1a82e7061a0c01a8', 'url': 'https://uploads-ssl.webflow.com/6055eb7c1a82e750ec0c01a1/6055eb7c1a82e7061a0c01a8_patrick-hendry-eDgUyGu93Yw-unsplash.jpg', 'alt': None} variantName: White Tent variantPrice: {'unit': 'PLN', 'value': 0, 'string': 'zł\xa00,00\xa0PLN'} variantSKU: None variantSlug: white-tent weight: 0 width: 0