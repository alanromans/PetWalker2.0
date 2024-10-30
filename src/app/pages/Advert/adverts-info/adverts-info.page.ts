import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Advert } from 'src/app/model/advert';
import { Comment } from 'src/app/model/comment';
import { IUser } from 'src/app/model/iuser';
import { AdvertService } from 'src/app/services/advert.service';
import { CommentsService } from 'src/app/services/comments.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-adverts-info',
  templateUrl: './adverts-info.page.html',
  styleUrls: ['./adverts-info.page.scss'],
})
export class AdvertsInfoPage implements OnInit {
  imgUrl!: string;
  advert: Advert = { rate: [] } as unknown as Advert;
  user: IUser = {} as IUser;
  comments!: Comment[];

  constructor(private router: Router, private commentService: CommentsService, public userService: UserService, public advertService: AdvertService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if(id != null){
      console.log(id)
      this.advertService.getAdvert(id).then((data) => {
        console.log(data)
        if( data ){
          this.advert = data;
        } else this.goToHome();
      }, err => console.error(err));

      this.commentService.getComments(id).then(data => {
        this.comments = data;
      });
    }

  }


  goToHome() {
    this.router.navigateByUrl('/home');
  }

  goToCreateComment(id:string){
    this.router.navigateByUrl(`/comments/${id}`);
  }
}