import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Advert } from 'src/app/model/advert';
import { AdvertService } from 'src/app/services/advert.service';

@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss'],
})
export class MorePage implements OnInit {

  segmentModel = "Recientes";
  segmentModel2 = "Recientes";
  adverts: Advert[] = [];
  advertFilter: Advert[] = [];
  advertsNear: Advert[] = [];
  advert: Advert = {} as Advert;
  
  constructor(private router: Router, private advertService: AdvertService) { }

  ngOnInit() {
    // Fetch adverts from the service
    this.advertService.getAdvertAllUsers().then((data) => {
      // Assign the fetched data to the adverts array
      this.adverts = Array.isArray(data) ? data : [];

      // Sort adverts by the creation date, ensuring create_At exists
      this.advertsNear = this.adverts.sort((a1, a2) => {
        const date1 = a1.create_At ? new Date(a1.create_At).getTime() : 0;
        const date2 = a2.create_At ? new Date(a2.create_At).getTime() : 0;
        return date2 - date1;  // Sort by newest first
      });
    }).catch(err => console.error('Error fetching adverts:', err));
  }

  goToHome() {
    // Navigate to the home page
    this.router.navigateByUrl('/home');
  }

  goToInformation(id: string) {
    // Navigate to the advert info page based on the advert id
    this.router.navigateByUrl(`/adverts-info/${id}`);
  }
}