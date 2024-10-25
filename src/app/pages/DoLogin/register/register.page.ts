import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { User } from 'firebase/auth';
import { IUser } from 'src/app/model/iuser';
import { AuthService } from 'src/app/services/auth.service';
import { PhotoService } from 'src/app/services/photo.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
 
 
  currentUser: User | null = null;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private photoService: PhotoService
  ) {}

  user: IUser = {} as IUser;
  users = [];
  cont = 0;
  

  ngOnInit() {
    
    const type = this.activatedRoute.snapshot.paramMap.get('type');
    // Verificar si type es null, y asignar una cadena vacía en caso de que lo sea
    this.user.type = type ? type : '';
  
    // this.authService.logout(); // Asegúrate de que realmente deseas esto al cargar la página
  
    this.currentUser = this.authService.getCurrentUser();
  
    if (this.currentUser) {
      // Verificar si el email es null, y asignar una cadena vacía en caso de que lo sea
      this.user.email = this.currentUser.email ? this.currentUser.email : '';
      // Verificar si displayName es null, y asignar una cadena vacía en caso de que lo sea
      this.user.name = this.currentUser.displayName ? this.currentUser.displayName : '';
    } else {
      console.warn('No se encontró ningún usuario autenticado.');
      // Descomentar la siguiente línea para redirigir al usuario si no está autenticado
      this.router.navigateByUrl('/login');
    }
  }

  async register() {
    if (!this.validateUser()) {
      this.alerterror('Error en la creación de usuario', 'Has dejado alguno de los campos obligatorios vacío');
      return;
    }
  
    // Verificar que this.user.pass no sea undefined, si lo es, asignar una cadena vacía
    const password = this.user.pass ? this.user.pass : '';
  
    if (this.currentUser || await this.authService.register(this.user.email, password)) {
      await this.userService.addUser(this.user);
      this.router.navigateByUrl('/login');
    } else {
      this.alertErrorEmail();
    }
  }
  validateUser(): boolean {
    if (!this.user.name) {
      this.alerterror('Error en la creación de usuario', 'El campo nombre es obligatorio');
      return false;
    }
    if (!this.user.apellidos) {
      this.alerterror('Error en la creación de usuario', 'El campo apellidos es obligatorio');
      return false;
    }
    if (!this.currentUser && !this.user.email) {
      this.alerterror('Error en la creación de usuario', 'El campo email es obligatorio');
      return false;
    }
    if (!this.currentUser && !this.user.pass) {
      this.alerterror('Error en la creación de usuario', 'El campo contraseña es obligatorio');
      return false;
    }
    if (!this.user.sexo) {
      this.alerterror('Error en la creación de usuario', 'El campo sexo es obligatorio');
      return false;
    }
    if (this.user.type == null) {
      this.alerterror('Error en la creación de usuario', 'El campo tipo es obligatorio');
      return false;
    }
    return true;
  }

  goBack() {
    this.router.navigateByUrl('/register-selection');
  }

  async openCamera() {
    if (!this.user.name || !this.user.apellidos) {
      this.alerterror('Error', 'El nombre o los apellidos no están definidos');
      return;
    }
  
    try {
      const doPhoto = await this.photoService.takePicture();
      const uploadPhoto = await this.photoService.uploadFile(doPhoto, `Users/${this.user.name} ${this.user.apellidos}`);
      this.user.photo = uploadPhoto;
    } catch (error) {
      console.error('Error al tomar o subir la foto:', error);
      this.alerterror('Error', 'No se pudo tomar o subir la foto. Inténtalo de nuevo.');
    }
  }
  async alerterror(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['De acuerdo']
    });
    await alert.present();
  }

  async alertErrorEmail() {
    await this.alerterror('Error en la creación de usuario', 'Has introducido un email ya existente');
  }
}