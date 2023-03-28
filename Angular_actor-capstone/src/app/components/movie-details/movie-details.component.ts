import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actor } from 'src/app/common/actor';
import { Movie } from 'src/app/common/movie';
import { Review } from 'src/app/common/review';
import { ActorService } from 'src/app/services/actor.service';
import { MovieService } from 'src/app/services/movie.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent {
  movie: Movie;
  movieIdFromRoute: number;
  reviews: Review[];
  actors: Actor[];

  fullStar = 0;
  halfStar = 0;
  emptyStar = 0;

  movieForm: FormGroup;
  reviewForm: FormGroup;

  formDataLoaded: boolean = false;
  reviewsLoaded: boolean = false;
  actorsLoaded: boolean = true;

  constructor(
    private movieService: MovieService,
    private actorService: ActorService,
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit() {
    //This can also get id from the address link
    // const theMovieId: number = +this.route.snapshot.paramMap.get('movieId')

    this.formDataLoaded = false;
    this.movieIdFromRoute = this.route.snapshot.params['movieId'];
    this.movieService.getMovieById(this.movieIdFromRoute).subscribe((data) => {
      this.movie = data;
      console.log('data: ', JSON.stringify(data));
      this.movieForm = this.formBuilder.group({
        movieId: new FormControl(this.movie.movieId),
        movieTitle: new FormControl(this.movie.movieTitle),
        movieCost: new FormControl(this.movie.movieCost),
        movieYear: new FormControl(this.movie.movieYear),
      });
      this.formDataLoaded = true;
    });

    this.actorService
      .getActorsByMovie(this.movieIdFromRoute)
      .subscribe((data) => {
        this.actors = data;
        console.log('actors loaded by movie id', data);
        this.actorsLoaded = true;
      });

    this.reviewService
      .getReviewList(this.movieIdFromRoute)
      .subscribe((data) => {
        this.reviews = data;
        console.log('reviews are: ', JSON.stringify(data));
        this.reviewsLoaded = true;
        let total = 0;
        this.reviews.forEach((t) => {
          total += t.rating / this.reviews.length;
        });

        console.log('RATING IS: +>>>>>>', total);

        let raiting = total;
      
        if (raiting != undefined && raiting > 0 && raiting <= 5) {
          for (let i = 0; i <= 4; i++) {
            if (raiting - 1 >= 0) {
              this.fullStar = this.fullStar + 1;
              raiting = raiting - 1;
            } else if (raiting == 0.5) {
              this.halfStar = this.halfStar + 1;
              raiting = raiting - 0.5;
            } else if (raiting == 0) {
              this.emptyStar = this.emptyStar + 1;
            } else break;
          }
        } else {
          this.emptyStar = 5;
        }

        console.log(`FullStar: ${this.fullStar}, halfStar: ${this.halfStar}, emptyStar: ${this.emptyStar}`);

      });

      this.reviewForm = this.formBuilder.group({
        datePosted: new FormControl(),
        description: new FormControl(), 
        rating: new FormControl(),
        movieId: new FormControl()
      })
  }
  onMoviesUpdateSubmit() {
    console.warn('Movie updating!', this.movieForm.value);
    this.movieService.movieUpdate(this.movieForm.value).subscribe({
      next: (response) => {
        alert(`The movie has been updated`);
        this.router.navigate(['movies']);
      },
      error: (err) => {
        alert(`Something went wrong: ${err.message}`);
      },
    });
  }

  addFeedback(){

    const date = new Date(Date.now());
    const today = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`

    this.reviewForm.patchValue({
      datePosted: today,
      movieId: this.movie.movieId
    }) 

     console.log("Here is the review", JSON.stringify(this.reviewForm.value));
      this.reviewService.createReview(this.reviewForm.value).subscribe();
      // .subscribe({
      //   next: ()=>{
      //     alert('Feedback is sent')
      //     // this.router.navigate(['/'])
      //   },
      //   error: (err) => {
      //     alert(`Something went wrong: ${err.message}`);
      //   },
      // });

      // this.review.description=feedback;
      // this.review.rating=rate;
      // console.log("Here is the review", this.review);
      // this.review.movieId = this.movie.movieId
      // const date = new Date(Date.now());
      // const today = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear}}`

      // this.review.datePosted = today




      // console.log("Here is the review", JSON.stringify(this.review));
      // this.reviewService.createReview(this.review).subscribe({
      //   next: ()=>{
      //     alert('Feedback is sent')
      //     this.router.navigate(['/'])
      //   },
      //   error: (err) => {
      //     alert(`Something went wrong: ${err.message}`);
      //   },
      // });
  }
}
