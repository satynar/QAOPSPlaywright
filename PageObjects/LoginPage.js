class LoginPage{

constructor(page){
    this.page= page;
this.signInButton= page.getByRole("button",{name:'Login'});
this.username=page.getByPlaceholder("email@example.com");
this.password= page.getByPlaceholder("enter your passsword");
}
async goTo()
{

    await this.page.goto("https://rahulshettyacademy.com/client");
}

async validLogin(username,password)
{
await  this.username.fill(username);
await this.password.fill(password);
await this.signInButton.click();
await this.page.waitForLoadState('networkidle');
}



}


module.exports={LoginPage};

