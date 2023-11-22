import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';

import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss'],
})
export class MoviePage implements OnInit {
 movies: any[] = []
currentPage = 1;
imageBaseUrl = environment.images;

  constructor(private movieService : MovieService,private LoadingCtrl: LoadingController ) { }
ngOnInit() {
  this.loadMovies();
  
}
  async loadMovies(event? : InfiniteScrollCustomEvent) {
    const loading = await this.LoadingCtrl.create({
      message: 'Loading..',
      spinner:'bubbles'
    });
    await loading.present();

    this.movieService.getTopRatedMovies(this.currentPage)
    .subscribe((res) =>{
      loading.dismiss();
      // this.movies = [...this.movies, ...res.results]
      this.movies.push(...res.results)
      console.log(res);
      event?.target.complete();
    });
  }

loadMore(event: InfiniteScrollCustomEvent){
  this.currentPage++;
  this.loadMovies(event);


}

}
