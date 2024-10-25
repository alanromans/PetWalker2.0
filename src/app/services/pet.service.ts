import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { docData } from 'rxfire/firestore';
import { AuthService } from './auth.service';
import { Pet } from '../model/pet';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(private firestore: Firestore, private authService: AuthService) { }

  private getCurrentUserUid(): string {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('No user is currently authenticated.');
    }
    return currentUser.uid;
  }

  async addPet(pet: Pet) {
    const uid = this.getCurrentUserUid();  // Verificación del usuario
    const newDoc = doc(collection(this.firestore, `users/${uid}/Pet`));
    pet.petId = newDoc.id;
    await setDoc(newDoc, pet);
  }

  getPets(): Observable<Pet[]> {
    const uid = this.getCurrentUserUid();  // Verificación del usuario
    return collectionData(collection(this.firestore, `users/${uid}/Pet`), {idField: 'petId'}) as Observable<Pet[]>;
  }

  // Para implementar más tarde: Obtener una mascota por su ID
  getPet(id: string): Observable<Pet> {
    const uid = this.getCurrentUserUid();  // Verificación del usuario
    const docRef = doc(this.firestore, `users/${uid}/Pet/${id}`);
    return docData(docRef, { idField: 'petId' }) as Observable<Pet>;
  }

  // Para implementar más tarde: Eliminar una mascota por su ID
  async deletePet(id: string) {
    const uid = this.getCurrentUserUid();  // Verificación del usuario
    const docRef = doc(this.firestore, `users/${uid}/Pet/${id}`);
    await deleteDoc(docRef);
  }

  updatePet(pet: Pet) {
    const uid = this.getCurrentUserUid();  // Verificación del usuario
    const docRef = doc(this.firestore, `users/${uid}/Pet/${pet.petId}`);
    setDoc(docRef, pet);
  }
}