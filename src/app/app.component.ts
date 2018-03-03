import {Component, NgModule, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {FormGroup, FormControl, Validators} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

export class User{
    constructor(public firstName: string, 
                public lastName: string,
                public phoneNum: number, 
                public comment: string)
    { }
}
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private translate: TranslateService) {
        translate.addLangs(["en", "ru", "kz"]);
        translate.setDefaultLang('en');

        let browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|ru|kz/) ? browserLang : 'en');
    }

    user: User = new User("","", 0, "");
    users = [{'firstName':'Q', 'lastName':'Q', 'phoneNum':0, 'comment':'Q'}];

    createForm = new FormGroup({
        firstName: new FormControl(this.user.firstName, [
            Validators.required,
            Validators.minLength(4)
        ]),
        lastName: new FormControl(this.user.lastName, [
            Validators.required,
            Validators.minLength(4)
        ]),
        phoneNum: new FormControl(),
        comment: new FormControl(this.user.comment, Validators.required)
    });
    addUser(){
        this.users.push(new User(
            this.user.firstName, 
            this.user.lastName, 
            this.user.phoneNum, 
            this.user.comment
        ));
        this.createForm.reset();
    }

    updateRow = {}; 
    updateForm = new FormGroup({
        firstName: new FormControl(),
        lastName: new FormControl(),
        phoneNum: new FormControl(),
        comment: new FormControl()
    });
    editUser(i){
        console.log(this.user[i]);    
        this.updateRow = this.users[i];
        console.log(this.updateRow);
    }
    updateUser(){
        let user = this.updateRow;
        this.users[i] = this.updateForm.value;
    }
    
    removeUser(user){
        var index = this.users.indexOf(user);
        this.users.splice(index, 1);
    }

}