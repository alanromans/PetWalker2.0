import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Advert } from 'src/app/model/advert';
import { Comment } from 'src/app/model/comment';
import { IUser } from 'src/app/model/iuser';
import { AdvertService } from 'src/app/services/advert.service';
import { CommentsService } from 'src/app/services/comments.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {
  @ViewChild('rating') rating : any;
  
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private userService: UserService, private commentService: CommentsService, private advertService: AdvertService) { }

  user: IUser = {} as IUser;
  comment: Comment = {} as Comment;
  advert: Advert = {} as Advert;
  @Input() halfStar: boolean | undefined;

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if(id != null) {
      this.advertService.getAdvert(id).then((data) => {
        if (data) { // Verificar si data no es null
          this.advert = data;
        } else {
          console.error('No se pudo obtener el anuncio, data es null');
        }
      }, (err) => console.error(err));
    }
  }

  goToHome() {
    this.router.navigateByUrl(`/adverts-info/${this.advert.id}`);
  }

  addComment() {
    if (this.comment.rate === 0 || !this.comment.rate) {
      console.warn('No se puede agregar un comentario sin calificación.');
      return;
    }

    if (!this.advert.rate) {
      this.advert.rate = [];
    }

    this.advert.rate.push(this.comment.rate);

    this.comment.idUser = this.user.userId;
    this.comment.idAdvert = this.advert.id;
    this.comment.propiety = this.user;

    this.advert.rateAvg = Math.floor(
      this.advert.rate.reduce((partialSum, a) => partialSum + a, 0) / this.advert.rate.length
    );

    // Añadir el comentario y actualizar el anuncio
    this.commentService.addComment(this.comment);
    this.advertService.updateAdvert(this.advert);

    this.router.navigateByUrl(`/adverts-info/${this.advert.id}`);
  }

  onRatingChange(rating: any){
    console.log('The evaluation was modified and now its value is: ',rating);
    // do your stuff
  } 
}
