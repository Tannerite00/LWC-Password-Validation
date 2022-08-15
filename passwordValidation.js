import { LightningElement, track, wire, api } from 'lwc';

export default class passwordValidation {
  
   isPasswordValid;
   @track pass1Value;
   @track pass2value;
   @track isPasswordMatch;
  
  @track passwordRules = [
                        {
                            "rule" : '8+ characters',
                            "ruleClass" : 'no-class'
                        },
                        {
                            "rule" : 'Upper & lower case',
                            "ruleClass" : 'no-class'
                        },
                        {
                            "rule" : 'At least 1 number',
                            "ruleClass" : 'no-class'
                        },
                        {
                            "rule" : 'At least 1 special character',
                            "ruleClass" : 'no-class'
                        }
                    ];
  
  handlePwdChange(event){
        let passValue = event.detail.value;
        this.pass1Value = passValue;
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        let counter = 0;
        let passwordRules = this.passwordRules;
        this.isPasswordMatch = this.pass2Value ? this.pass1Value === this.pass2Value : true;

        passwordRules.forEach(rule => {
            if(rule.rule == '8+ characters'){
                if(passValue.length >= 8){
                    rule.ruleClass = 'password-valid';
                   
                }
                else{
                    rule.ruleClass = 'no-class';
                    
                }
            }
            else if(rule.rule == 'At least 1 number'){
                if(/[0-9]/.test(passValue)){
                    rule.ruleClass = 'password-valid';
            
                }                
                else{
                    rule.ruleClass = 'no-class';
                    
                }
            }
            else if(rule.rule == 'At least 1 special character'){
                if(specialChars.test(passValue)){
                    rule.ruleClass = 'password-valid';
                }
                else{
                    rule.ruleClass = 'no-class';
                    
                }
            }
            else if(rule.rule == 'Upper & lower case'){
                if(/(?=.*[A-Z])/.test(passValue) && /(?=.*[a-z])/.test(passValue)){
                    rule.ruleClass = 'password-valid';
                }
                else{
                    rule.ruleClass = 'no-class';
                    
                }
            }
        });

        passwordRules.forEach(rule => {
            if(rule.ruleClass === 'password-valid') {
                counter++ 
            } 
        });

        if(counter === 4) {
            this.isPasswordValid = true;
        } else {
            this.isPasswordValid = false;
        }
  }
  
   handlePass2Input(event) {
        this.pass2Value = event.detail.value;
        this.isPasswordMatch = this.pass1Value === this.pass2Value;
    }

}
