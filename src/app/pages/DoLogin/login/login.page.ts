import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IUser } from 'src/app/model/iuser';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';  // Inicializamos con una cadena vacía
  password: string = '';
  remember: boolean | null | undefined;
  users: IUser[] = [];
  user: IUser = {} as IUser;

  constructor(
    private router: Router, 
    public alertController: AlertController, 
    private authService: AuthService, 
    private userService: UserService
  ) { }

  ngOnInit() {}

  register() {
    this.router.navigateByUrl('/register-selection');
  }

  async goToHome() {
    const current = await this.authService.login(this.email, this.password);
    if (current) {
      this.router.navigateByUrl('home');
    } else {
      this.alertError('Error de autentificación', 'Contraseña o email incorrecto, vuelve a introducirlos');
    }
  }

  async loginGoogle() {
    const current = await this.authService.loginGoogle();
    if (current) {
      const user = this.authService.getCurrentUser();
      if (user && user.uid) {
        console.log(user.uid);  // Verificamos si el usuario tiene uid
        this.userService.getIUser().subscribe(data => {
          if (data.length) this.router.navigateByUrl('/home');
          else this.router.navigateByUrl('/register-selection');
        });
      } else {
        this.alertError('Error', 'No se pudo obtener información del usuario');
      }
    } else {
      this.alertError('Error de autentificación', 'No se pudo iniciar sesión con Google');
    }
  }

  async loginFacebook() {
    const current = await this.authService.loginFacebook();
    if (current) {
      const user = this.authService.getCurrentUser();
      if (user && user.uid) {
        console.log(user.uid);  // Verificamos si el usuario tiene uid
        this.userService.getIUser().subscribe(data => {
          if (data.length) this.router.navigateByUrl('/home');
          else this.router.navigateByUrl('/register-selection');
        });
      } else {
        this.alertError('Error', 'No se pudo obtener información del usuario');
      }
    } else {
      this.alertError('Error de autentificación', 'No se pudo iniciar sesión con Facebook');
    }
  }

  resetPass() {
    this.authService.resetPass(this.email).then(
      () => {
        this.alertResetPassword();
        this.router.navigateByUrl('/login');
      }
    ).catch(
      () => this.alertError('Recuperación de contraseña incorrecto', 'No se ha podido enviar un correo para restablecer la contraseña. Inténtalo más tarde')
    );
  }

  async alertResetPassword() {
    const alert = await this.alertController.create({
      header: 'Recuperación de contraseña correcto',
      message: `Se ha enviado al correo ${this.email} el enlace que le permitirá recuperar la contraseña`,
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  async alertError(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Aceptar']
    });

    await alert.present();
  }
}