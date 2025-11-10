import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../../core/auth';
import { forkJoin } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, HttpClientModule]
})
export class HomePage implements OnInit {
  selectedTab: string = 'chistes';
  chistes: string[] = [];
  perros: string[] = [];
  gatos: string[] = [];
  cargando = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.obtenerChistes();
  }

  async logout() {
    await this.auth.logout();
    this.router.navigate(['/login']);
  }

  // === OBTENER CHISTES EN ESPAÑOL (20) ===
  obtenerChistes() {
    this.cargando = true;
    this.chistes = [];

    // Endpoint base
    const url = 'https://v2.jokeapi.dev/joke/Any?lang=es&amount=10';

    // Hacemos dos peticiones para obtener 20 chistes (10 + 10)
    const req1 = this.http.get<any>(url);
    const req2 = this.http.get<any>(url);

    forkJoin([req1, req2]).pipe(
      map(([res1, res2]) => {
        // Combinar resultados de ambas peticiones
        const chistesTotales = [...res1.jokes, ...res2.jokes];
        // Convertir cada chiste en texto plano
        return chistesTotales.map((j: any) =>
          j.type === 'single' ? j.joke : `${j.setup} ${j.delivery}`
        );
      }),
      catchError(err => {
        console.error('Error obteniendo chistes:', err);
        return [];
      })
    ).subscribe({
      next: (chistes) => {
        this.chistes = chistes;
        this.cargando = false;
      },
      error: () => {
        this.chistes = ['Error al cargar chistes 😢'];
        this.cargando = false;
      }
    });
  }

  // === OBTENER PERROS (12 FOTOS) ===
  obtenerPerros() {
    this.cargando = true;
    this.perros = [];

    this.http.get<any>('https://dog.ceo/api/breeds/image/random/12')
      .subscribe({
        next: (data) => {
          this.perros = data.message;
          this.cargando = false;
        },
        error: (err) => {
          console.error('Error cargando perros', err);
          this.perros = [];
          this.cargando = false;
        }
      });
  }

  // === OBTENER GATOS (12 FOTOS) ===
  obtenerGatos() {
    this.cargando = true;
    this.gatos = [];

    this.http.get<any[]>('https://api.thecatapi.com/v1/images/search?limit=12')
      .subscribe({
        next: (data) => {
          this.gatos = data.map(g => g.url);
          this.cargando = false;
        },
        error: (err) => {
          console.error('Error cargando gatos', err);
          this.gatos = [];
          this.cargando = false;
        }
      });
  }
}
