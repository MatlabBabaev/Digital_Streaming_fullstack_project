import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Actor } from 'src/app/common/actor';
import { ActorService } from 'src/app/services/actor.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-add',
  templateUrl: './movie-add.component.html',
  styleUrls: ['./movie-add.component.css']
})
export class MovieAddComponent {

  actors: Actor[];
  actorsLoaded:Boolean = false;
  actorList='';
  actorIds: Number[]=[];

  movieAddForm: FormGroup

  constructor(private formBuilder: FormBuilder, private router: Router, 
              private movieService: MovieService, private actorService: ActorService ){

  }

  ngOnInit(){
    this.movieAddForm = this.formBuilder.group({
      movieTitle:  new FormControl(),
      movieCost: new FormControl(),
      movieYear: new FormControl(),
      actorIds: new FormControl(),
    })

    this.listActors();
  }

  listActors() {
    this.actorService.getActorList().subscribe(
      (data) => {
      this.actors = data;
      this.actorsLoaded = true;
    });
  
  }
  actorsAdded(actor: Actor){ 
    this.actorList= `${this.actorList}, ${actor.firstName} ${actor.lastName}`;
    this.actorIds.push(actor.id);
    this.movieAddForm.patchValue({
      actorIds: this.actorIds})    
    const index = this.actors.indexOf(actor);
    this.actors.splice(index, 1);  
  }

  onMovieAdd(){
    this.movieService.addMovie(this.movieAddForm.value).subscribe({
      next: response =>{
        alert(`The movie was added`);
        this.router.navigate(['movies']);
      },
      error: (err: { message: any; })=>{
        alert(`Something went wrong: ${err.message}`)
      } 
    })

  }
}
