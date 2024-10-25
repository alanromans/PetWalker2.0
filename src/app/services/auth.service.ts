import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FacebookAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, User, signInWithPopup } from 'firebase/auth';

const provider = new GoogleAuthProvider();
const providerF = new FacebookAuthProvider()

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  user!: User;

  constructor(private auth: Auth) { }

  login(email: string, pass: string): Promise<boolean> {
    return signInWithEmailAndPassword(this.auth, email, pass).then(
      data => {
        this.user = data.user;  // Asigna el usuario autenticado
        return true;
      },
      error => {
        console.error(error); // Loguear el error
        return false;
      }
    );
  }

  getCurrentUser(): User | null {
    return getAuth().currentUser;
  }

  logout(){
    signOut(this.auth);
  }

  register(email: string, pass: string): Promise<boolean> {
    return createUserWithEmailAndPassword(this.auth, email, pass).then(
      () => true,
      () => false
    );
  }

  resetPass(email: string): Promise<void>{
    return sendPasswordResetEmail(this.auth, email);
  }

  loginGoogle(): Promise<boolean>{
    return signInWithPopup(this.auth, provider).then(
      () => true,
      () => false
    );
  }

  loginFacebook(): Promise<boolean>{
    return signInWithPopup(this.auth, providerF).then(
      () => true,
      () => false
    );
  }
}