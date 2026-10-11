const base= require('@playwright/test');

exports.customtest =base.test.extend(
   
    {
        //custom fixture
testDataForOrder:

    {
        username: "satyasidda98@gmail.com",
        password: "123456",
        productName: "ZARA COAT 3"
    }

    }
)