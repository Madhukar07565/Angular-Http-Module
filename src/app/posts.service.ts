import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Post } from './post.model';
import { map, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  createAndStorePost(postData: Post) {
    this.http.post('https://ng-http-request-39e75.firebaseio.com/posts.json',
      postData,
      {
        headers: new HttpHeaders({ "Custom-header": 'hello' }),
        observe: 'body'
      })
      .subscribe(
        (responsedata) => {
          console.log(responsedata);
        }, error => {
          this.error.next(error.message);
        });
  }

  fetchPosts() {
    return this.http.get<{ [key: string]: Post }>('https://ng-http-request-39e75.firebaseio.com/posts.json',
      {
        headers: new HttpHeaders({ "Custom-header": 'hello' }),
        params: new HttpParams().set('print', "pretty")
      })
      .pipe(map(responseData => {
        const postsArray: Post[] = [];
        for (const key in responseData) {
          postsArray.push({ ...responseData[key], id: key });
        }
        return postsArray;
      }));
  }

  clearPosts() {
    return this.http.delete('https://ng-http-request-39e75.firebaseio.com/posts.json');
  }
}
