import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { Movie } from 'src/app/common/movie';
import { MovieService } from 'src/app/services/movie.service';

// export interface DialogData {
//   animal: string;
//   name: string;
// }

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent {

  movies: Movie[] = [];
  movieLoaded: boolean=false;
  filteredStatus ='';

  constructor(@Inject(AppComponent) public parent: AppComponent, 
    private router: Router, private movieService: MovieService) {}

  ngOnInit(){
      this.listMovies();
  }

  listMovies(){
    this.movieService.getMovieList()
    .pipe(take(1))
    .subscribe(
      (data)=>{
        this.movies = data;
        this.movieLoaded = true;
      }
    )
  }
}
