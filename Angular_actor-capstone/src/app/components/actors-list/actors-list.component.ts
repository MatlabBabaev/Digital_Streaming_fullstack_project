import { Component, Inject, OnInit } from '@angular/core';
import { Actor } from 'src/app/common/actor';
import { ActorService } from 'src/app/services/actor.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-actors-list',
  templateUrl: './actors-list.component.html',
  styleUrls: ['./actors-list.component.css'],
})
export class ActorsListComponent implements OnInit {
  // actors:any
  actors: Actor[] = [];
  formLoaded: boolean = false;
  id: number;
  token: String = '';
  tokenLoaded: boolean = false;
  // filteredStatus ='';  

  constructor(
    @Inject(AppComponent) public parent: AppComponent,   
    private router: Router,
    private actorService: ActorService,
    // private filter: FilterPipe
  ) {}

  editActor(actorId: number) {
    console.log(actorId);
    // this.router.navigate(['actorId',actorId]);
    this.router.navigate(['actors', actorId]);
  }

  ngOnInit() {    
    this.listActors();
  }


  listActors() {

    this.actorService.getActorList()
    .pipe(take(1))
    .subscribe((data) => {
      console.log('getting content>><<');
      console.log(data);
      this.actors = data;
      this.formLoaded = true;
    });

    // this.actorService.getActorList().subscribe((data) => {
    //   this.actors = data;
    //   this.formLoaded = true;
    // });
  }

  addActor() {
    this.router.navigate(['/addActor']);
  }
  onDeleteActor(id: number) {
    console.log('ID:+>>>>', id);
    this.actorService.deleteActor(id).subscribe({
      next: () => {
        alert(`The actor was deleted`);
        this.listActors();
      },
      error: (err: { message: any }) => {
        alert(`Something went wrong: ${err.message}`);
      },
    });
  }
}
