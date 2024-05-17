
import emailValidator from 'email-validator'

export const passwordValidator = (password:any)=>{
    const isWhiteSpace = /\s/;
    if(isWhiteSpace.test(password)){
        return 'Password must not contain WhiteSpace '
    }
    const isContainsUppercase = /^(?=.*[A-Z])/;
    if(!isContainsUppercase.test(password)){
        return 'password must contain atLeast one uppercase'
    }
    const isContainsLowercase = /^(?=.*[a-z])/;
    if (!isContainsLowercase.test(password)) {
      return "Password must have at least one Lowercase Character.";
    }

    const isContainsNumber = /^(?=.*[0-9])/;
    if(!isContainsNumber.test(password)){
          return "Password must have at least one Number";
    }

    const isContainsSymbol = /^(?=.*[~!@#$%^&*()])/;
    if(!isContainsSymbol.test(password)){
        return 'password must contain at least one Symbol'
    }
}



export const isEmailValid =(email:any)=>{

    const validate =  emailValidator.validate(email)
   if(!validate){
    return 'email is not valid'
   }

}

