import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { collectionData, docData } from 'rxfire/firestore';
import { Observable } from 'rxjs';
import { IPay } from '../model/ipay';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PayService {

  constructor(private firestore: Firestore, private authService: AuthService) { }

  // Método para obtener el usuario actual o lanzar un error si no está autenticado
  private getCurrentUserUid(): string {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('Ningún usuario está actualmente autenticado.');
    }
    return currentUser.uid;
  }

  async addPay(pay: IPay) {
    const uid = this.getCurrentUserUid();  // Verificación del usuario
    const newDoc = doc(collection(this.firestore, `users/${uid}/Pay`));
    pay.id = newDoc.id;
    await setDoc(newDoc, pay);
  }

  getPays(): Observable<IPay[]> {
    const uid = this.getCurrentUserUid();  // Verificación del usuario
    return collectionData(collection(this.firestore, `users/${uid}/Pay`), {idField: 'id'}) as Observable<IPay[]>;
  }

  getPay(id: string): Observable<IPay> {
    const uid = this.getCurrentUserUid();  // Verificación del usuario
    const docRef = doc(this.firestore, `users/${uid}/Pay/${id}`);
    return docData(docRef,  {idField: 'id'}) as Observable<IPay>;
  }

  async deletePay(id: string) {
    const uid = this.getCurrentUserUid();  // Verificación del usuario
    const docRef = doc(this.firestore, `users/${uid}/Pay/${id}`);
    await deleteDoc(docRef);
  }

  updatePay(pay: IPay) {
    const uid = this.getCurrentUserUid();  // Verificación del usuario
    const docRef = doc(this.firestore, `users/${uid}/Pay/${pay.id}`);
    setDoc(docRef, pay);
  }
}