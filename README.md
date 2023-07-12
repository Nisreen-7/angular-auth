# AngularAuth

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.



## Angular Material

1. En suivant ce getting started, ajouter Angular Material à votre projet : https://material.angular.io/guide/getting-started#install-angular-material
	
2. Modifier le template du RegisterComponent pour y faire du style avec les composants de angular-material, par exemple une Card avec des des Form Field dedans (regarder dans le code de la doc, pour chaque component angular-material utilisé, il faut rajouter un module dans les imports de notre AppModule, par exemple le MatCardModule pour utiliser le component card)
	
3. Faire que si la requête de register ne fonctionne pas, on affiche une erreur dans le formulaire (chercher comment gérer les erreurs avec les subscribe d'angular)
	
4. Rajouter une prorpiété repeatPassword liée à un form field dans le template et faire que au submit, si le repeat ne correspond pas au user.password alors on l'indique dans le feedback (et on fait pas la requête). Bonus : essayer de le faire cette vérification en temps réel quand on tape dans l'input.


# Formulaire de login/register
1. Dans le RegisterComponent, rajouter une propriété isLogin initialisée à false
	
2. Dans le template, en se basant uniquement sur cette propriété isLogin, faire en sorte de modifier l'affichage pour faire que dans le cas où isLogin alors on affiche le titre "Login", on affiche pas le champ repeatPassword et on fait que le bouton register passe isLogin à false. Dans le cas où isLogin est false, on affiche le title Register, le champ repeatPassword et on fait que au click sur login ça passe isLogin à true
	
3. On rajoute dans notre AuthService une méthode login qui va être (pour l'instant) un copié-collé de la méthode register, mais pas sur la même route
	
4. Dans le RegisterComponent, dans le onSubmit, on fait en sorte d'appeler un login ou un register selon la valeur de isLogin

# La Navbar et la page qui liste les users
1. Générer un component NavigationComponent, dedans faire une Toolbar angular-material
	
2. En utilisant le authService comme dans l'exemple du HomeComponent, faire en sorte d'afficher un bouton logout dans la toolbar si on est connecté, sinon on affiche un lien vers la page register
	
3. Générer un component ListUserComponent, l'associer à une route '/list-user'
	
4. Rajouter un lien vers list-user dans la toolbar et ne l'afficher que si l'on est connecté
	
5. Dans ce ListUserComponent, faire un appel à /api/user en get et faire une boucle sur le résultat pour afficher la liste des users
