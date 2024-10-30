import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/model/iuser';
import { Pet } from 'src/app/model/pet';
import { PetService } from 'src/app/services/pet.service';
import { PhotoService } from 'src/app/services/photo.service';
import { UserService } from 'src/app/services/user.service';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-register-pets',
  templateUrl: './register-pets.page.html',
  styleUrls: ['./register-pets.page.scss'],
})
export class RegisterPetsPage implements OnInit {

  pet: Pet = {enfermedad: false, vacunas: false, chip: false} as Pet;
  pets = [];
  user: IUser = {} as IUser;
  users!: IUser[] | null;

  constructor(private petService: PetService, private userService: UserService, private router: Router, private photoService: PhotoService) { }

  ngOnInit() {
    this.userService.getIUser().subscribe((data) => {
      console.log(data);
      this.users = data;
      this.user = this.users[0];
    });
  }

  
  goToHome(){
    this.router.navigateByUrl('/account');
  }

  goToBack() {
    if (this.users && this.users.length > 0) { // Verificar que users no es null y tiene al menos un elemento
      this.pet.idUser = this.users[0].userId;
      this.petService.addPet(this.pet);
      this.router.navigateByUrl('/profile-pets');
    } else {
      console.error('No se encontró ningún usuario.');
      // Puedes agregar lógica adicional aquí si es necesario, como redirigir a otra página o mostrar un mensaje de error.
    }
  }

  async openCamera() {
    const doPhoto = await this.photoService.takePicture();    
    const uploadPhoto = await this.photoService.uploadFile(doPhoto, `Pets/${this.pet.nombre} - ${this.user.name} ${this.user.apellidos}`);
    this.pet.photo = uploadPhoto;
  }

}