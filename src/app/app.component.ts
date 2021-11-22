import { Component } from '@angular/core';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { CurrencyPipe } from '@angular/common';
import {
  CountryISO,
  SearchCountryField
} from "ngx-intl-tel-input";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'digitalchameleon';
  currentTimeZoneDate: Date;
  myDpOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'dd/mm/yyyy',
    openSelectorTopOfInput: false,
    stylesData: {
      selector: 'dp1',
      styles: `
         .dp1 {
            position: relative;
            top:-38px;
         }`
        },
  };
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  myDateInit: boolean = true;
  model: IMyDateModel = null;
  hobbies: any[] =[];
  enHobbies: any[] = [{ hobby: "Creative writing", id: "creative_writing" }, { hobby: "Dancing", id: "dancing" }, { hobby: "Singing", id: "singing" }, { hobby: "Others", id: "others" }]
  esHobbies: any[] = [{ hobby: "Escritura creativa", id: "creative_writing" }, { hobby: "Baile", id: "dancing" }, { hobby: "Cantando", id: "singing" }, { hobby: "Otras", id: "others" }]
  frHobbies: any[] = [{ hobby: "Écriture créative", id: "creative_writing" }, { hobby: "Dansante", id: "dancing" }, { hobby: "En chantant", id: "singing" }, { hobby: "Autres", id: "others" }]
  formDetails: any = {
    email: "",
    password:"",
    confirmPassword:"",
    phoneNumber:"",
    dateofBirth:this.model,
    annual_income:"",
    gender:"",
    termsConditions:false
  };
  errors:any={};
  emailRegex = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]/;
  passwordValidations: any[]=[];
  enPasswordValidations: any[] = [
    { isValid: false, message: "8-20 characters (no spaces)", regex: /^.{8,20}$/ },
    { isValid: false, message: "At least 1 uppercase letter", regex: /[A-Z]/ },
    { isValid: false, message: "At least 1 lowercase letter", regex: /[a-z]/ },
    { isValid: false, message: "At least 1 number", regex: /[\d]/ },
    { isValid: false, message: " At least 1 of the following special characters ! @ # $ %", regex: /[!@#$%]/ },
  ];
  esPasswordValidations: any[] = [
    { isValid: false, message: "8-20 caracteres (no espacios)", regex: /^.{8,20}$/ },
    { isValid: false, message: "Al menos 1 letra mayúscula", regex: /[A-Z]/ },
    { isValid: false, message: "Al menos 1 letra minúscula", regex: /[a-z]/ },
    { isValid: false, message: "Al menos 1 número", regex: /[\d]/ },
    { isValid: false, message: " Al menos 1 de los siguientes caracteres especiales ! @ # $ %", regex: /[!@#$%]/ },
  ];
  frPasswordValidations: any[] = [
    { isValid: false, message: "8-20 personnages (sans espaces)", regex: /^.{8,20}$/ },
    { isValid: false, message: "Au moins 1 lettre majuscule", regex: /[A-Z]/ },
    { isValid: false, message: "Au moins 1 lettre minuscule", regex: /[a-z]/ },
    { isValid: false, message: "Au moins 1 numéro", regex: /[\d]/ },
    { isValid: false, message: " Au moins 1 des caractères spéciaux suivants ! @ # $ %", regex: /[!@#$%]/ },
  ];
  isValidPassword: boolean = true;
  showValidations: boolean = false;
  public imagePath;
  imgURL: any;
  public message: string;
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  currencyDetails=["INR","USD","JPY","CAD","EUR"];
  currency='INR'
  constructor(private sanitizer: DomSanitizer,public translate: TranslateService,
    private currencyPipe:CurrencyPipe) {
      // Register translation languages
      // translate.addLangs(['en', 'es', 'fr']);
      // Set default language
      // translate.setDefaultLang('en');
      translate.addLangs(['English', 'Español', 'français']);
      translate.setDefaultLang('English');
  
      const browserLang = translate.getBrowserLang();
      translate.use(browserLang.match(/English|français/) ? browserLang : 'English');
   }
  ngOnInit() { 
    this.updateMyDatePickerOptions();
    this.hobbies = this.enHobbies;
    this.passwordValidations = this.enPasswordValidations;
  }

  submit() {
  this.validateEmail();
  this.validatePassword();
  this.confirmPasswordValidation();
  this.genderValidation();
  this.dateOfBirthValidation();
  this.phoneNumberValidation();
  this.phoneNumberValidation();
  if(this.formDetails.termsConditions==undefined || this.formDetails.termsConditions==false)
  this.errors.termsConditions="required";
  }

  validateEmail(){
    if(this.formDetails.email==undefined || this.formDetails.email==""){
      this.errors.email="required";
    }else if(!this.formDetails.email.match(this.emailRegex)){
      this.errors.email="invalid";
    }else{
      this.errors.email=""
    }
  }
  validatePassword() {
    this.isValidPassword = true;
    this.showValidations = true;
      this.passwordValidations.forEach(validation => {
        validation.isValid = (this.formDetails.password || "").match(validation.regex) ? true : false;
        if (!validation.isValid)
          this.isValidPassword = false;
      });
    // document.getElementById('password_error').innerHTML = "";
    if (!this.formDetails.password) {
      this.showValidations = false;
      this.errors.password="required";
      // document.getElementById('password_error').innerHTML = "Please enter password";
    }else{
     if(this.passwordValidations.findIndex(x=>x.isValid==false)==-1){
       this.showValidations=false;
     }
    }
    // if (!this.user.password && !this.user.password_confirmation)
    //   this.showValidations = false;
  }
  confirmPasswordValidation(){
    if(this.formDetails.confirmPassword==undefined || this.formDetails.confirmPassword==""){
      this.errors.confirmPassword="required";
    }else if(this.formDetails.confirmPassword!==this.formDetails.password){
      this.errors.confirmPassword="invalid";
    }else{
      this.errors.confirmPassword=""
    }
  }
  hideErrorLabel() {
    this.showValidations = false;
    if (!this.formDetails.password ) {
      document.getElementById("password_error").innerHTML = "";
      // document.getElementById("confirm_password_error").innerHTML = "";
    }
  }
  genderValidation(){
    if(this.formDetails.gender== undefined || this.formDetails.gender ==""){
      this.errors.gender="required";
    }
  }
  dateOfBirthValidation(){
    if(this.formDetails.dateofBirth==null){
      this.errors.dateofBirth="required"
    }
  }
  phoneNumberValidation(){
    if(this.formDetails.phoneNumber==null || !this.formDetails.phoneNumber || this.formDetails.phoneNumber.number==undefined || this.formDetails.phoneNumber.number=="undefined"){
      this.errors.phoneNumber="required";
    }
  }
  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result;
      this.imgURL=this.sanitizeImageUrl(this.imgURL) ;

    }
 
  }
  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
} 
//Switch language
translateLanguageTo(lang: string) {
  this.translate.use(lang);
  if(lang == 'English'){
    this.hobbies = this.enHobbies;
    this.passwordValidations = this.enPasswordValidations;
  }else if(lang == 'Español'){
    this.hobbies = this.esHobbies;
    this.passwordValidations = this.esPasswordValidations;
  }else {
    this.hobbies = this.frHobbies;
    this.passwordValidations = this.frPasswordValidations;
  }
}
transformAmount(element) {
    
  this.formDetails.annual_income = this.currencyPipe.transform(
    this.formDetails.annual_income,
    this.currency
  );
      element.target.value = this.formDetails.annual_income;
}
onCurrencyChange(){
  this.formDetails.annual_income="";
}
numberOnly(event): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode==8  || (charCode > 47 && charCode < 58)) {
    return true;
  }
  return false;

}
updateMyDatePickerOptions() {
  this.currentTimeZoneDate = new Date();
  this.myDpOptions = {
    dateRange: false,
    dateFormat: 'dd/mm/yyyy',
    openSelectorTopOfInput: false,
    stylesData: {
      selector: 'dp1',
      styles: `
         .dp1 {
            position: relative;
            top:-38px;
         }`
        },
    disableSince: { year: this.currentTimeZoneDate.getFullYear(), month: this.currentTimeZoneDate.getMonth() + 1, day: this.currentTimeZoneDate.getDate() + 1 }
  };
}
}
