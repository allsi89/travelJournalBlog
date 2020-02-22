import { AbstractControl } from '@angular/forms';

export const errorMsgs: { [key: string] : string} = {
    required: 'Required field',
    usernameLength: 'Username must be between 6 and 20 characters',
    emailInvalid: 'Email must be a valid email address (username@domain)',
    passwordLength: 'Password must be between 6 and 15 characters',
    passwordsNotMatch: `Passwords don't match`
}


export class PasswordValidator {
    static matchPasswords( ac: AbstractControl) {
        let password = ac.get('password').value;
        let cnfPassword = ac.get('confirmPassword').value;
        if(password !== cnfPassword) {
            ac.get('confirmPassword').setErrors({notMatch: true})
           
        } else {
            return null;
        }
    }
}