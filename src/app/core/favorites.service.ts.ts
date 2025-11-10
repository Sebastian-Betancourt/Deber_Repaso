import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { switchMap, of } from 'rxjs';

export interface Favorito {
  id: string;
  title?: string;
  url: string;
  dateAdded: Date;
}

@Injectable({ providedIn: 'root' })
export class FavoritosService {
  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {}

  // Agregar un favorito
  addFavorito(item: Favorito) {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (!user) throw new Error('Usuario no autenticado');
        const favorito: Favorito = { ...item, dateAdded: new Date() };
        return this.afs.collection('usuarios').doc(user.uid).update({
          favoritos: firebase.firestore.FieldValue.arrayUnion(favorito)
        });
      })
    );
  }

  // Eliminar un favorito
  removeFavorito(item: Favorito) {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (!user) throw new Error('Usuario no autenticado');
        const favorito: Favorito = { ...item, dateAdded: new Date() };
        return this.afs.collection('usuarios').doc(user.uid).update({
          favoritos: firebase.firestore.FieldValue.arrayRemove(favorito)
        });
      })
    );
  }

  // Obtener favoritos
  getFavoritos() {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (!user) return of([]);
        return this.afs.collection('usuarios').doc(user.uid).valueChanges();
      })
    );
  }
}
