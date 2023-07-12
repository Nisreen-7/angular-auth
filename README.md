# AngularAuth

Projet angular avec de l'authentification JWT. Nécessite le projet [symfony-auth-rest](https://github.com/m2i-grenoble-dam/symfony-auth-rest) qui tourne pour fonctionner.

## Nécessaire pour l'authentification
Déjà, pour ce qui est du type d'authentification utilisé dans ce projet, il s'agit d'une connexion avec JWT, qui va donc se baser sur un token d'identification à stocker dans le front et à envoyer dans les headers de requêtes vers le serveur

Côté front, on aura donc besoin :
### Une méthode de connexion
```typescript
login(user:User) {
    return this.http.post<{token:string}>(environment.serverUrl+'/api/login', user).pipe(
      tap(data => {
        localStorage.setItem('token', data.token); 
        this.logged = true;
      })
    );
  }
```
On fait une requête vers la route /api/login qui a été définie dans notre routes.yaml et notre security.yaml dans symfony qui va récupérer l'email et le mot de passe, et si ces derniers sont corrects, le serveur va renvoyer un JWT.
Grâce au pipe et au tap, on fait en sorte de récupérer le token en question lorsque la méthode login est appélée avec succès et on stock le JWT dans le localStorage. On passe également une variable logged à true qui indiquera à l'interface graphique si l'on est connecté ou non (voir la partie "gérer l'état de connexion")

### Une méthode d'inscription
```typescript
register(user:User) {
    return this.http.post<User>(environment.serverUrl+'/api/user', user);
}
```
Qui va donc poster un nouveau user sur la base de données

### Une méthode de déconnexion
Le fait de se déconnecter va consister à supprimer le token du localStorage et à passer une propriété de connexion à false pour mettre à jour l'interface (voir la partie "gérer l'état de connexion")

```typescript
  logout() {
    localStorage.removeItem('token');
    this.logged =false;
  }
```

### Envoyer le token dans les requêtes
Pour que l'authentification soit effective, il faut injecter le token dans les requêtes http faites vers le serveur, on peut le faire sur chaque requête individuellement comme suit.

Exemple:
```typescript
routeProtegee(user:User) {
    return this.http.get<Truc[]>(environment.serverUrl+'/api/truc', {
        headers: {
            Authorization: 'Bearer '+localstorage.getItem('token')
        }
    });
}
```

Mais une manière un peu plus pratique sera de faire ce qu'on appel un interceptor qui est une classe spéciale en angular qui viendra, comme son nom l'indique, intercepter toutes les requêtes faites avec HttpClient et appliquera une modification dessus.

Dans [cet interceptor](src/app/auth.interceptor.ts), on fait fait en sorte de rajouter le Authorization Bearer avec le token dans chacune des requêtes qui sera effectuée :

```typescript
intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(localStorage.getItem('token')) {
      return next.handle(request.clone({ setHeaders: { 'Authorization': 'Bearer '+localStorage.getItem('token') } })).pipe(
        tap({
          error: (err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status != 401) {
                return;
              }
              this.auth.logout();
              this.router.navigate(['register']);
            }
          }
        }))
  ;
    }
    return next.handle(request);
  }
```

On vérifie donc qu'on a un token en localStorage, si oui on modifie la requête sortante pour y ajouter un header Authorization Bearer avec le token dedans.

On rajoute également une interception d'erreur pour faire que si jamais on reçoit une erreur 401 alors qu'on a mis le token dans la requête, ça signifie que notre token a expiré/n'est plus valide, dans ce cas là on se déconnecte avec la méthode logout du service et on fait une redirection vers la page d'inscription/connexion.


### Gérer l'état de connexion
Pour afficher l'interface comme il faut selon l'état de connexion et selon les informations du user connecté, s'il est présent, il faut une manière de stocker quelque part l'état de la connexion'.

Pour ça, on peut partir sur le fait de stocker un booléen directement dans le AuthService
```typescript
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  logged = false;
```

L'idée sera de faire en sorte que lorsqu'on fait un login, on passe la valeur de logged à true, et dans le cas d'un logout, en plus de supprimer le token, on passe la valeur de logged à false.


Pour utiliser ce user dans les templates, il faudra injecter le AuthService dans le component associé, puis d'utiliser le auth.logged soit dans le template soit dans le component pour faire un affichage conditionnel à l'état de la connexion ([exemple complet](src/app/home/home.component.ts))

```typescript
export class HomeComponent implements OnInit {

  constructor(public auth:AuthService) { }
```

## Exercices
### Créer le front et le formulaire d'inscription
1. Générer un projet `angular-auth` avec routing
2. Générer un HomeComponent et lui assigner la route '/'
3. Rajouter le HttpClientModule et le FormsModule dans l'application
4. Générer un RegisterComponent et le lier à la route '/register'
5. Créer un fichier entities.ts et dedans faire une interface User qui va reprendre les propriétés de l'entité PHP
6. Générer un AuthService et dedans faire une méthode addUser(user:User) qui va faire un post sur la route /api/user du serveur
7. Dans le RegisterComponent faire un formulaire avec email et mot de passe et faire qu'au submit ça fasse un addUser

### Formulaire de login/register
1. Dans le RegisterComponent, rajouter une propriété isLogin initialisée à false
2. Dans le template, en se basant uniquement sur cette propriété isLogin, faire en sorte de modifier l'affichage pour faire que dans le cas où isLogin alors on affiche le titre "Login", on affiche pas le champ repeatPassword et on fait que le bouton register passe isLogin à false. Dans le cas où isLogin est false, on affiche le title Register, le champ repeatPassword et on fait que au click sur login ça passe isLogin à true
3. On rajoute dans notre AuthService une méthode login qui va être (pour l'instant) un copié-collé de la méthode register, mais pas sur la même route
4. Dans le RegisterComponent, dans le onSubmit, on fait en sorte d'appeler un login ou un register selon la valeur de isLogin

### La Navbar et la page qui liste les users
1. Générer un component NavigationComponent, dedans faire une Toolbar angular-material
2. En utilisant le authService comme dans l'exemple du HomeComponent, faire en sorte d'afficher un bouton logout dans la toolbar si on est connecté, sinon on affiche un lien vers la page register
3. Générer un component ListUserComponent, l'associer à une route '/list-user'
4. Rajouter un lien vers list-user dans la toolbar et ne l'afficher que si l'on est connecté
5. Dans ce ListUserComponent, faire un appel à /api/user en get et faire une boucle sur le résultat pour afficher la liste des users
