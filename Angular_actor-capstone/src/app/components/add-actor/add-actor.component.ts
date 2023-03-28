import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actor } from 'src/app/common/actor';
import { ActorService } from 'src/app/services/actor.service';

@Component({
  selector: 'app-add-actor',
  templateUrl: './add-actor.component.html',
  styleUrls: ['./add-actor.component.css']
})
export class AddActorComponent {

  actorForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private route:ActivatedRoute, 
    private router: Router, private actorService: ActorService) {
    }
  ngOnInit(){
    this.actorForm = this.formBuilder.group({
      firstName:  new FormControl(),
      lastName:  new FormControl(),
      gender:  new FormControl(),
      age:  new FormControl()
    });

  }

  onAddActor(){
      this.actorService.addActor(this.actorForm.value).subscribe({
        next: response =>{
          alert(`The actor was added`);
          this.router.navigate(['/']);
        },
        error: (err: { message: any; })=>{
          alert(`Something went wrong: ${err.message}`)
        } 
      })
  }  

}
