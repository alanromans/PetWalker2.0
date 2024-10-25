import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc, deleteDoc, query, where, collectionGroup, DocumentData } from '@angular/fire/firestore';
import { firstValueFrom, Observable } from 'rxjs';
import { collectionData, docData } from 'rxfire/firestore';
import { Advert } from '../model/advert';
import { AuthService } from './auth.service';
import { IUser } from '../model/iuser';

@Injectable({
  providedIn: 'root'
})
export class AdvertService {

  constructor(private firestore: Firestore, private authService: AuthService) { }

  // Verifica si el usuario está autenticado y obtiene su uid
  private getCurrentUserUid(): string {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('No user is currently authenticated.');
    }
    return currentUser.uid;
  }

  async addAdvert(advert: Advert): Promise<void> {
    const uid = this.getCurrentUserUid();
    const newDoc = doc(collection(this.firestore, `users/${uid}/Adverts`));
    advert.id = newDoc.id;
    await setDoc(newDoc, advert);
  }

  getAdverts(): Observable<Advert[]> {
    const uid = this.getCurrentUserUid();
    return collectionData(query(collection(this.firestore, `users/${uid}/Adverts`)), { idField: 'id' }) as Observable<Advert[]>;
  }

  async getAdvert(id: string): Promise<Advert | null> {
    const uid = this.getCurrentUserUid();
    const adverts = await firstValueFrom(
      collectionData(query(collection(this.firestore, 'Adverts'), where('id', '==', id)), { idField: 'id' }) as Observable<Advert[]>
    );
    
    return adverts.length > 0 ? adverts[0] : null;
  }

  async deleteAdvert(id: string): Promise<void> {
    const uid = this.getCurrentUserUid();
    const docRef = doc(this.firestore, `users/${uid}/Adverts/${id}`);
    await deleteDoc(docRef);
  }

  async updateAdvert(advert: Advert): Promise<void> {
    const uid = this.getCurrentUserUid();
    const docRef = doc(this.firestore, `users/${uid}/Adverts/${advert.id}`);
    await setDoc(docRef, advert, { merge: true }); // Usar merge para actualizar solo campos específicos
  }

  getAdvertAllUsers(id?: string): Promise<Advert | null> {
    return firstValueFrom(
      collectionData(
        query(collection(this.firestore, 'users'), where('userId', '==', id)),
        { idField: 'userId' }
      ) as Observable<IUser[]>
    ).then(async (users) => {
      if (users.length > 0) {
        const user = users[0] as IUser;
  
        const adverts = await firstValueFrom(
          collectionData(
            query(
              collection(this.firestore, 'Adverts'),
              where('id', '==', id),
              where('userId', '==', user.userId)
            ),
            { idField: 'id' }
          ) as Observable<Advert[]>
        );
  
        if (adverts.length > 0) {
          const advert = adverts[0]; // Get the first advert
          advert.nameUser = user.name; // Ensure user.name is a string.
          return advert; // Return the single advert
        }
      }
      return null; // Return null if no user or advert found
    });
  }
}