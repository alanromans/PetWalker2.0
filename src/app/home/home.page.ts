import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Advert } from '../model/advert';
import { IUser } from '../model/iuser';
import { Pet } from '../model/pet';
import { AdvertService } from '../services/advert.service';
import { AdvertsNotPremiumService } from '../services/adverts-not-premium.service';
import { AuthService } from '../services/auth.service';
import { PetService } from '../services/pet.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  segmentModel = "Recientes";
  segmentModel2 = "Recientes";
  pet = {} as Pet;
  user: IUser = {} as IUser;
  adverts: Advert[] = [];
  advertRecent: Advert | undefined;
  advertFilter: Advert | undefined;
  advertNear: Advert | undefined;
  advertOther: Advert[] | undefined;

  constructor(public router: Router, private advertService: AdvertService, private userService: UserService, public authService: AuthService, private alertController: AlertController, private petService: PetService, private advertNotPremium: AdvertsNotPremiumService) {}
  
  ngOnInit() {
    const userId = this.user.userId; // Assuming you have the user's ID available
    this.userService.getUser().subscribe((data) => {
      if (data && data.length > 0) {
        this.user = data[0];
        console.log(this.user);
      } else {
        console.warn("No se encontró ningún usuario.");
      }
    }, (err) => console.error(err));
  
    this.advertService.getAdvertAllUsers(userId).then((advert: Advert | null) => {
      if (advert) {
        this.advertRecent = advert; // Handle the single advert instead of an array
        console.log(this.advertRecent);
  
        if (advert.rate && advert.rate.length > 0 && advert.rate[0] >= 4) {
          this.advertFilter = advert;
        }
  
        this.advertNear = advert; // Already the most recent advert
      } else {
        console.warn("No advert found for this user.");
      }
    }, err => console.error(err));
  
    this.advertNotPremium.getAdvertsFromStorage().then(data => {
      console.log(data);
      this.advertOther = data;
    }).catch(err => console.error("Error al obtener anuncios desde el almacenamiento:", err));
  }

  goToAdvert(){
    this.router.navigateByUrl('/adverts');
  }
  
  goToFeature(){
    this.router.navigateByUrl('/more');
  }

  goToInformation(id: string){
    this.router.navigateByUrl(`/adverts-info/${id}`);
  }

  goToProfile(){
    this.router.navigateByUrl('/account');
  }
  
  goToProfilePet(){
    if(this.user.type != 'dueño'){
      this.presentAlertConfirm(this.pet);
    }else{
      this.router.navigateByUrl('/profile-pets');
    }
    
  }

  async presentAlertConfirm(t: Pet) {
    console.log('alerta');
    const alert = await this.alertController.create({
      header: 'Perfil cerrado',
      message: `Necesitas ser dueño para acceder a esta opción, si quieres cambiar la opción a dueño ve a opciones`,

      buttons: [{
        text: 'Aceptar',
        role: 'Cancel'
      },
    ]
  });
    await alert.present();
    this.router.navigateByUrl('/home');
  }
}