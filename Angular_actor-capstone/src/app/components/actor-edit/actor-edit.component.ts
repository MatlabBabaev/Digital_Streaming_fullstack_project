import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Actor } from '../../common/actor';
import { ActorService } from '../../services/actor.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Movie } from 'src/app/common/movie';

@Component({
  selector: 'app-actor-edit',
  templateUrl: './actor-edit.component.html',
  styleUrls: ['./actor-edit.component.css']
})
export class ActorEditComponent {
  actor: Actor;
  actorIdFromRoute!: number;
  movies: Movie[]=[];  

  actorForm: FormGroup;
  formDataLoaded: Boolean=false;
  moviesLoaded: Boolean=false;


  constructor(private formBuilder: FormBuilder, private route:ActivatedRoute, 
    private router: Router, private actorService: ActorService) {
    }


  ngOnInit() {
    this.formDataLoaded=false;
    this.moviesLoaded=false;

  this.actorIdFromRoute = this.route.snapshot.params['actorId'];

  this.actorService.getActorById(this.actorIdFromRoute).subscribe(
    (data) => {
    this.actor = data;
    console.log("We have the data : " + JSON.stringify(data));
    this.actorForm = this.formBuilder.group({
      id: new FormControl(this.actor.id),
      firstName:  new FormControl(this.actor.firstName),
      lastName:  new FormControl(this.actor.lastName),
      gender:  new FormControl(this.actor.gender),
      age:  new FormControl(this.actor.age)
    });
    this.formDataLoaded=true;
  }
  
  );

  this.actorService.getMoviesByActorId(this.actorIdFromRoute).subscribe(
    (data)=>{
      this.movies = data
      console.log("The movies actor starred: ", JSON.stringify(data));
      this.moviesLoaded=true;
    }
  )    
  }

  editActor(id: number) {
    this.router.navigate(['actors',id]);
}

  onActorUpdateSubmit() {
    console.warn('UPDATED!', this.actorForm.value);
    this.actorService.actorUpdate(this.actorForm.value).subscribe({
      next: response =>{
        alert(`The actor has been updated`);
        this.router.navigate(['/']);
      },
      error: err=>{
        alert(`Something went wrong: ${err.message}`)
      } 
    });

  }

}
