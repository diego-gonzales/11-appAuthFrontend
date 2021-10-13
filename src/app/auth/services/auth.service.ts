import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { AuthResponse, User } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _urlAPI: string = environment.urlAPI;
  private _user!: User;

  get user() {
    return {...this._user};
  };

  constructor( private http: HttpClient ) { }

  // Method que hace peticion POST de logueo a nuestro backend
  postLogin( email: string, password: string ) {
    const body = { email, password };
    return this.http.post<AuthResponse>(`${this._urlAPI}/auth`, body)
                .pipe(
                  tap( resp => {
                    if (resp.ok) {
                      localStorage.setItem( 'token', resp.token! );
                    } else {
                      localStorage.clear();
                    }
                  }),
                  map( resp => resp.ok ),
                  catchError( err => of(err.error.mesagge) ) // esto se enviara como respuesta en cualquier caso de error
                );
  };


  // Method para hacer un posteo con los datos de un nuevo usuario
  postRegister( name: string, email: string, password: string ) {
    const body = { name, email, password };
    return this.http.post<AuthResponse>(`${this._urlAPI}/auth/new`, body)
                .pipe(
                  tap( ({ok, token}) => {
                    if (ok) {
                      localStorage.setItem('token', token!);
                    } else {
                      localStorage.clear();
                    }
                  }),
                  map( ({ok}) => ok ),
                  catchError( err => of(err.error.mesagge) )
                );
  };

  // validamos el token del localstorage. Esta peticion nos devolvera la informacion del usuario con un token renovado, ver backend
  validateToken(): Observable<boolean> {
    const headers = new HttpHeaders()
          .set( 'x-token', localStorage.getItem('token') || '' ); // puede que este en localstorage o no, por eso el ''

    // Como la respuesta de este endpoint es igual al del login entonces le ponemos el mismo tipado con la interfaz AuthResponse
    return this.http.get<AuthResponse>( `${this._urlAPI}/auth/renew`, { headers } )
                .pipe(
                  map( resp => {
                    // esto lo podria hacer en un tap
                    localStorage.setItem( 'token', resp.token! ); // esto renovara el token, ver backend ya que este envia token nuevo
                    this._user = {
                      name: resp.name!,
                      uid: resp.uid!,
                      email: resp.email!
                    };

                    return resp.ok;
                  }),
                  catchError( err => of(false) )
                )
  };


  // Este metodo destruira el token y asi no podra entrar de nuevo a mi modulo protegido a menos que se loguee otra vez
  logout() {
    // localStorage.clear(); //pero esta podra borrar otras cosas que se tengan almancenadas en localstorage
    localStorage.removeItem('token');
  };

}
