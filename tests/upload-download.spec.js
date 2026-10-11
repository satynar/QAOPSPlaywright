const ExcelJs = require('exceljs');
const {test,expect}= require('@playwright/test');

async function excelTest1() {
    //It is for print the all data in excel
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile('C:/Users/satya/Downloads/datadrivenfile.xlsx')
    const worksheet = workbook.getWorksheet('Sheet1');
    worksheet.eachRow((row, rowNuumber) => {
        // Goes through each cell in the current row
        row.eachCell((cell, colNumber) => {
            // Prints the value of the current cell
            console.log(cell.value)
        })
    });

}


async function writeexcelTest(searchText,replaceText,change,filePath) {

    
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath)
    const worksheet = workbook.getWorksheet('Sheet1');
    const output= await readExcel(worksheet,searchText);
 
const cell= worksheet.getCell(output.row,output.column+change.colChange);
        cell.value=replaceText;
        await workbook.xlsx.writeFile(filePath);
}

async function readExcel(worksheet,searchText)
{
   let output={row:-1,column:-1};
       worksheet.eachRow((row, rowNuumber) => {
        // Goes through each cell in the current row
        row.eachCell((cell, colNumber) => {
            if(cell.value===searchText)
            {
               output.row=rowNuumber;
               output.column= colNumber;
            }
        })
        
    });
    return output;
}
//writeexcelTest("Mango",350,{rowChange:0,colChange:2},'C:/Users/satya/Downloads/datadrivenfile.xlsx');



test('Upload download excel validation',async ({page})=>
{
    const textSearch='Mango';
    const updatevalue='350';
await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
const downloadPromise=page.waitForEvent('download');
await page.getByRole('button',{name:'Download'}).click();
await downloadPromise;
writeexcelTest(textSearch,updatevalue,{rowChange:0,colChange:2},'C:/Users/satya/Downloads/download.xlsx');

await page.locator("#fileinput").click();
await page.locator('#fileinput').setInputFiles('C:/Users/satya/Downloads/download.xlsx');

const textLocator= page.getByText(textSearch);
const desiredRow= page.getByRole('row').filter({has:textLocator});
await 
expect (desiredRow.locator('#cell-4-undefined')).toContainText(updatevalue);


})