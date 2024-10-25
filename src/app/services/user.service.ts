import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { docData } from 'rxfire/firestore';
import { AuthService } from './auth.service';
import { IUser } from '../model/iuser';
import { Pet } from '../model/pet';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: Firestore, private authService: AuthService) { }

  // Método para obtener el usuario actual o lanzar un error si no está autenticado
  private getCurrentUserUid(): string {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('No user is currently authenticated.');
    }
    return currentUser.uid;
  }

  async addUser(user: IUser) {
    const uid = this.getCurrentUserUid();  // Verificación del usuario
    const newDoc = doc(collection(this.firestore, `users/${uid}/iuser`));
    user.userId = newDoc.id;
    await setDoc(newDoc, user);
  }

  getUser(): Observable<IUser[]> {
    const uid = this.getCurrentUserUid();  // Verificación del usuario
    return collectionData(collection(this.firestore, `users/${uid}/iuser`), { idField: 'userId' }) as Observable<IUser[]>;
  }

  async deleteUser(id: string) {
    const uid = this.getCurrentUserUid();  // Verificación del usuario
    const docRef = doc(this.firestore, `users/${uid}/iuser/${id}`);
    await deleteDoc(docRef);
  }

  updateUser(user: IUser) {
    const uid = this.getCurrentUserUid();  // Verificación del usuario
    const docRef = doc(this.firestore, `users/${uid}/iuser/${user.userId}`);
    setDoc(docRef, user);
  }

  updatePet(pet: Pet) {
    const uid = this.getCurrentUserUid();  // Verificación del usuario
    const docRef = doc(this.firestore, `users/${uid}/Pet/${pet.petId}`);
    setDoc(docRef, pet);
  }
}