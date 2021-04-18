import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class movieService {
    movies: Object[] = [
        {
            id: 1,
            title: 'Forrest Gump',
            description: ' Forrest est un garçon un peu simplet, que Robert Zemeckis met en scène depuis son enfance, dans les années 50, jusqu’à sa vie d’adulte, dans les années 80',
            image: 'https://picsum.photos/150'
        },
        {
            id: 2,
            title: 'Fight Club',
            description: 'Edward Norton joue ici un homme qui erre sans but réel dans sa vie. Las de son existence morne, il devient membre du Fight Club, une organisation de combats clandestins dirigée par Tyler Durden, brillamment incarnée par Brad Pitt.',
            image: 'https://picsum.photos/150'
        },
        {
            id: 3,
            title: 'Le Seigneur Des Anneaux',
            description: 'La trilogie met en scène le hobbit Frodon et les membres de la communauté de l’Anneau sur la Terre du Milieu. Tous sont en quête de l’Anneau, qui causera la perte de Sauron s’il est détruit.',
            image: 'https://picsum.photos/150'
        },
        {
            id: 4,
            title: 'John Wick',
            description: 'Depuis la mort de sa femme,John mène une vie sans histoire, jusqu’à ce qu’un malfrat s’introduit chez John pour voler  sa Ford Mustang de 1969, et tue sa chienne Daisy... John remonte la piste de malfrat qui etait est le fils unique d’un grand patron de la pègre.la tête de John est mise à prix et désormais tous les assassins de New York aux trousses.',
            image: 'https://picsum.photos/150'
        }];
    getMovie(index: number) {
        if (this.movies[index]) {
            return this.movies[index]
        }
        return false
    }
}