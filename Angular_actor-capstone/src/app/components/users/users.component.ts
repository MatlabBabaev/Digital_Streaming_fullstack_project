import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  emailnUse: Boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService // private authenticationService: AuthenticationService,
  ) {}

  ngOnInit() {
    /**
     * (?=.*\d)         should contain at least userEmail digit
     * (?=(.*\W){1})    should contain at least 1 special characters
     * (?=.*[a-z])   should contain at least 1 lower case alphabetic
     * * (?=.*[A-Z])   should contain at least 1 upper case alphabetic
     * (?!.*\s)         should not contain any blank space
     * (?=.*[*@!#%&()^~{}]) represents at least one of these  ?=.*[*@!#%&()^~{} charecters
     */

    let regExprUserName: RegExp = /^[a-zA-Z]*$/; //A pattern string is to be passed to the RegEx constructor object.
    //const phoneNumber = "^((\\+65-?)|0)?[0-9]{10}$";
    this.form = this.formBuilder.group(
      {
        userId: [],
        fullName: [
          '',
          [Validators.required, Validators.pattern('^[a-zA-Z, ]*$')],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[*@!#%&()^~{}])).{4,20}'
            ),
          ],
        ],
      },
      {
        //validators:this.matchRegExpression('name',regExprUserName)
        //validatorsuserEmail:this.matchRegExpressionuserEmail('password',regExprPassword)
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  matchRegExpression(controlName: string, regExp: RegExp) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName]; //get the control to be custom validated
      //any errors other than current validation type, return
      if (control.errors && !control.errors['matchRegExpression']) {
        return;
      }

      console.log('expression returned', regExp.test(control.value));
      if (regExp.test(control.value) == false) {
        //control.value checks with the expression and returns a Boolean value as true or false.
        control.setErrors({ matchRegExpression: true }); //{} are used to pass object
      } else {
        control.setErrors(null);
      }
    };
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      // this.submitted = false;
      return;
    }

    console.log('BEFORE::  Is Email already in Use>>>', this.emailnUse);
    console.log('Register user request:', this.form.value);

    console.log('CHECKING EMAIL>>>>>', this.form.get('email').value);

    this.userService
      .emailInUse(this.form.get('email').value)
      .subscribe((data) => {
        this.emailnUse = data;
        if (data === true) {
          alert('Email already in use');
        }

        if (!this.emailnUse) {
          this.userService.registerUser(this.form.value).subscribe({
            next: (data) => {
              console.log('Registered user response: ', data);
              alert('Successfully registered new user.Proceed to login page ');
              // window.location.reload;
              this.router.navigate(['/home']);
            },
            error: (err: HttpErrorResponse) => {
              if (err instanceof HttpErrorResponse) {
                if (err.status === 400) {
                  this.form.controls['email'].setErrors([
                    'mail already in use',
                  ]);
                  alert('Email already in use');
                  return;
                }
              }
            },
          });
        }
      });
  }
}
