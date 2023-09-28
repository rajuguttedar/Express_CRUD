const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "rajuguttedar517@gmail.com",
    pass: "hiulxrravtzvarkc",
  },
});

let invitation = async (email,name) => {
  let mailOptions= {
      from: "rajuguttedar517@gmail.com",
    //to: "rajuguttedar036@gmail.com",
      to: email,
      subject: "Invitation Mail",
      text: "Thanks for registering with us",
      html:`<h1>Thanks for registering with us ${name}</h1>`
    }
  transporter.sendMail(mailOptions,() => {console.log("Mail Sent Successfully")});
};

let sendOTPtoEmail=async(email,name,otp)=>{
    transporter.sendMail(
      {
        from: "rajuguttedar517@gmail.com",
        to: email,
        subject: "Invitation Mail",
        text: "Thanks for registering with us",
        html: `<h1>Thanks for registering with us ${name} and your one time password is ${otp}</h1>`,
        // html: `<h1>Happy B'day Mr.${name} stay with happiness</h1>`,
      },
      () => {
        console.log("Mail Sent Successfully");
      }
    );
}

//*````````````````````````````````````````````````````````````````````````
let invitaionMail=async(email,name,role)=>
{
    let mailOptions = {
      from: "rajuguttedar517@gmail.com",
      to: email,
      subject: "Invitation Mail",
      html: `<h1>Thanks For Registring ${name.toUpperCase()} with us <br/>
        Your Account is created as ${role} <br/>
         You can login to access the app</h1>`,
    };
    transporter.sendMail(mailOptions, ()=>{console.log("Invitation Mail Sent Successfully")})
}


let sendOtp=async (email,otp,name)=>
{
    let mailOptions={
        from:"rajuguttedar517@gmail.com",
        to:email,
        subject:"OTP Mail",
        html:`<h1>Hi ${name}, Your OTP for your Application is ${otp}</h1>`
    }
    transporter.sendMail(mailOptions, ()=>{console.log("OTP Sent Successfully")})
}

module.exports = {
  invitation,
  sendOTPtoEmail,
  invitaionMail,
  sendOtp
};




















/*
function generateOTP(){
  let digits="0123456789"
  let otp=""
  for (let i = 0; i <6; i++) {
      otp+=digits[Math.floor(Math.random()*10)]    
  }
  return otp;
}
*/