import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

import { Storage } from '@ionic/storage-angular';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  form = new FormGroup({
    imgUrl: new FormControl(),
    caption: new FormControl(),
  });

  comment = new FormControl();

  userData: any;

  postNumber: number = 5;

  postSelected: any;

  createPostModalVisibilty: boolean = false;
  commentsModalVisibility: boolean = false;

  posts = [];

  constructor(
    private apiService: ApiService,
    private storage: Storage,
    private storageService: StorageService
  ) {}

  async ngOnInit() {
    console.log(await this.storage.get('accessToken'));
    this.getPosts();
    this.getUserData();

    this.storageService.remove('accessToken')
  }

  publish = () =>
    this.apiService
      .publish(
        this.form.controls.caption.value,
        this.form.controls.imgUrl.value
      )
      .subscribe(
        (result) => (
          this.posts.unshift({
            creator: { nickname: this.userData.nickname },
            message: this.form.controls.caption.value,
            imageUrl: this.form.controls.imgUrl.value,
            likes: [],
            comments: [],
          }),
          this.toggleCreatePostModal()
        ),
        (err) => this.storageService.remove('accessToken')
      );

  toggleCreatePostModal = () =>
    (this.createPostModalVisibilty = !this.createPostModalVisibilty);

  getUserData = () =>
    this.apiService.me().subscribe((result) => (this.userData = result));

  like = (postId: string, postIndex: number) => {
    const addLike = this.posts[postIndex].likes.find(
      ({ id }) => id === this.userData.id
    )
      ? false
      : true;

    this.apiService.like(postId, addLike).subscribe(() =>
      addLike
        ? this.posts[postIndex].likes.push({
            id: this.userData.id,
          })
        : this.posts[postIndex].likes.splice(
            this.posts[postIndex].likes.findIndex(
              ({ id }) => id === this.userData.id
            ),
            1
          )
    );
  };

  toggleCommentsModal = () =>
    (this.commentsModalVisibility = !this.commentsModalVisibility);

  openComments = (postIndex: number) => (
    (this.commentsModalVisibility = true),
    (this.postSelected = this.posts[postIndex])
  );

  publishComment = () =>
    this.apiService
      .comment(this.postSelected.id, this.comment.value)
      .subscribe(() => {
        this.postSelected.comments.push({
          message: this.comment.value,
          user: { id: this.userData.id, nickname: this.userData.nickname },
        });
      });

  getPosts = (event?: any) =>
    this.apiService.getFeeds(this.posts.length, this.postNumber).subscribe(
      (result: any) => (
        this.posts.push(...result),
        console.log(this.posts),
        event && event.target.complete()
      ),
      (err) => event && event.target.complete()
    );

  loadData = (event) => this.getPosts(event);
}