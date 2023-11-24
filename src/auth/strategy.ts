import {AuthenticationStrategy} from '@loopback/authentication';
import {AuthenticationBindings} from '@loopback/authentication/dist/keys';
import {AuthenticationMetadata} from '@loopback/authentication/dist/types';
import {inject} from '@loopback/context';
import {HttpErrors, Request} from '@loopback/rest';
import parseBearerToken from 'parse-bearer-token';
import {UserProfile} from '@loopback/security';



export class AuthStrategy implements AuthenticationStrategy {
  name: string = 'auth';

  constructor(@inject(AuthenticationBindings.METADATA)
  private metadata: AuthenticationMetadata[],)
   {}

    /**
     * Autentificacion de un usuario frente a una accion en la base de datos
     * @param request la solicitud con el token
     * @returns el perfil del usuario o undefined si no esta autenticado
     */

  async authenticate( request: Request): Promise<UserProfile | undefined> {
    //console.log('se ejecuto estrategia');
    let token = parseBearerToken(request);
    if(token){
      let idMenu: string = this.metadata[0].options![0];
      let accion: string = this.metadata[0].options![1];
      let continuar: boolean = false;
      if(continuar){
        let perfil: UserProfile = Object.assign({
          permitido: "OK"
        })
        return perfil;
      }
      else{
        return undefined;
      }
    }
    throw new HttpErrors[401]("No es posible ejecutar por falta de token");
    console.log('se ejecuto estrategia pero el metodo no recibio token, recordar que el navegador no funciona para esta accion');
  }


}
