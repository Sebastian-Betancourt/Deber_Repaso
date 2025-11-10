import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  // LOGIN
  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // LOGOUT
  logout() {
    return this.afAuth.signOut();
  }

  // REGISTRO + ENVÍO DE CORREO DE VERIFICACIÓN
  register(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        // Enviar correo de verificación
        userCredential.user?.sendEmailVerification();
        return userCredential;
      });
  }

  // RECUPERACIÓN DE CONTRASEÑA
  resetPassword(email: string) {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  // OBSERVAR ESTADO DEL USUARIO
  get user() {
    return this.afAuth.authState;
  }
}
