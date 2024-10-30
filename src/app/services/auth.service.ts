import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FacebookAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, User, signInWithPopup } from 'firebase/auth';

const provider = new GoogleAuthProvider();
const providerF = new FacebookAuthProvider();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  user: User | null = null;

  constructor(private auth: Auth) {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        console.log('Usuario autenticado:', user);
      } else {
        console.log('No hay usuario autenticado');
        this.user = null;
      }
    });
  }

  login(email: string, pass: string): Promise<boolean> {
    return signInWithEmailAndPassword(this.auth, email, pass).then(
      data => {
        this.user = data.user;
        return true;
      },
      error => {
        console.error('Error en inicio de sesión:', error);
        return false;
      }
    );
  }

  getCurrentUser(): User | null {
    return getAuth().currentUser;
  }

  logout(): Promise<void> {
    return signOut(this.auth).catch(error => console.error('Error al cerrar sesión:', error));
  }

  register(email: string, pass: string): Promise<boolean> {
    return createUserWithEmailAndPassword(this.auth, email, pass).then(
      () => true,
      error => {
        console.error('Error en registro:', error);
        return false;
      }
    );
  }

  resetPass(email: string): Promise<void> {
    return sendPasswordResetEmail(this.auth, email).catch(error => console.error('Error en restablecer contraseña:', error));
  }

  loginGoogle(): Promise<boolean> {
    return signInWithPopup(this.auth, provider).then(
      (result) => {
        this.user = result.user;
        return true;
      },
      (error) => {
        console.error('Error en inicio de sesión con Google:', error);
        return false;
      }
    );
  }

  loginFacebook(): Promise<boolean> {
    return signInWithPopup(this.auth, providerF).then(
      (result) => {
        this.user = result.user;
        return true;
      },
      (error) => {
        console.error('Error en inicio de sesión con Facebook:', error);
        return false;
      }
    );
  }
}