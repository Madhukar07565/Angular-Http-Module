import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { map } from 'rxjs/operators';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  loadedPosts: Post[] = [];
  isLoading = false;
  error = null;

  title = 'httprequest';

  ngOnInit() {
    this.subscription = this.postService.error.subscribe(
      errorMsg => {
        this.error = errorMsg;
      }
    );
    this.isLoading = true;
    this.postService.fetchPosts().subscribe(
      (posts) => {
        this.isLoading = false;
        this.loadedPosts = posts;
      },
      error => {
        this.error = error.message;
      }
    );
  }

  constructor(private http: HttpClient, private postService: PostsService) { };

  onCreatePost(postData: Post) {
    this.postService.createAndStorePost(postData);
  }

  onFetchPosts() {
    this.isLoading = true;
    this.postService.fetchPosts().subscribe(
      (posts) => {
        this.isLoading = false;
        this.loadedPosts = posts;
      },
      error => {
        this.error = error.message;
      }
    );
  }

  onClearPosts() {
    this.postService.clearPosts().subscribe(
      () => {
        this.loadedPosts = []
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
