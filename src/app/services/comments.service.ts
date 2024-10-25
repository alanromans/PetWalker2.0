import { Injectable } from '@angular/core';
import { DocumentData, Firestore } from '@angular/fire/firestore';
import { collection, deleteDoc, doc, setDoc, collectionGroup, query, where } from 'firebase/firestore';
import { collectionData } from 'rxfire/firestore';
import { Observable } from 'rxjs';
import { Comment } from '../model/comment';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private firestore: Firestore, private authService: AuthService) { }

  private getCurrentUserUid(): string {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('No user is currently authenticated.');
    }
    return currentUser.uid;
  }

  async addComment(comment: Comment): Promise<void> {
    const uid = this.getCurrentUserUid();  // Verificación del usuario
    const newDoc = doc(collection(this.firestore, `users/${uid}/Comments`));
    comment.id = newDoc.id;
    await setDoc(newDoc, comment);
  }

  getComments(id: string): Promise<Comment[]> {
    return new Promise(resolve => {
      collectionData(query(collectionGroup(this.firestore, 'Comments'), where('idAdvert', '==', id)), { idField: 'id' })
        .subscribe((data: DocumentData[]) => {
          // Convertir los datos al tipo Comment[]
          const comments = data.map(doc => {
            return {
              id: doc['id'],
              description: doc['description'],
              idAdvert: doc['idAdvert'],
              idUser: doc['idUser'],
              rate: doc['rate'],
              // Añade más propiedades aquí si es necesario
            } as Comment;
          });
          resolve(comments);
        });
    });
  }

  async deleteComment(id: string): Promise<void> {
    const uid = this.getCurrentUserUid();  // Verificación del usuario
    const docRef = doc(this.firestore, `users/${uid}/Comments/${id}`);
    await deleteDoc(docRef);
  }

  async updateComments(comment: Comment): Promise<void> {
    const uid = this.getCurrentUserUid();  // Verificación del usuario
    const docRef = doc(this.firestore, `users/${uid}/Comments/${comment.id}`);
    await setDoc(docRef, comment);
  }
}