import { Case } from './Case';
import { Player } from './Player';
import { DisplayObject } from './DisplayObject';
import { Card } from './Card';

export class Community implements Case {
  cards: Card[] = [
    {
      message: ['Les contributions vous remboursent la somme de 1000€'],
      gain: (player: Player) => 1000,
    }, {
      message: ['Erreur de la Banque en votre faveur, recevez 2000€'],
      gain: (player: Player) => 2000,
    }, {
      message: ['Vous héritez la somme de 1000€'],
      gain: (player: Player) => 1000,
    }, {
      message: ['Vous êtes libéré de prison, cette carte peut être conservée jusqu\'a ce qu\'elle soit utilisé'],
      freeJailCard: true,
    }, {
      message: ['Recevez votre intérêt sur emprunt à 7%: 250€'],
      gain: (player: Player) => 250,
    }, {
      message: ['Vous avez gagné le deuxième prix de Beauté, 100€'],
      gain: (player: Player) => 1000,
    }, {
      message: ['Payez l\'hopital: 1000€'],
      loose: (player: Player) => 1000,
    }, {
      message: ['Payez une amende de 1000€ ou tirez une carte chance'],
      choices: {
        getLuckCard: true,
        loose: (player: Player) => 1000
      }
    }, {
      message: ['Payez la note du Médecin'],
      loose: (player: Player) => 500,
    }, {
      message: ["C'est votre anniversaire", "Tous les joueurs doivent donner 1000"],
      loose: (player: Player) => 1000,
    }, {
      message: ["C'est votre anniversaire", "Tous les joueurs doivent donner 1000"],
      otherPaid: 1000
    }, {
      message: ['Allez en prison et ne touchez pas l\'argent de la case Départ'],
      goToJail: true,
    }, {
      message: ['La vente de votre stock vous rapporte 500 €'],
      gain: (player: Player) => 500,
    }, {
      message: ['Retournez à Belleville'],
      goTo: 1,
    }, {
      message: ['Retournez à Belleville'],
      goTo: 1,
    }, {
      message: ['Vous avez gagné le deuxième Prix de Beauté'],
      gain: (player: Player) => 100
    }
  ]
  
  getRandomCard(): Card {
    return this.cards[Math.ceil(Math.random() * this.cards.length)];
  }

  execute(player: Player): DisplayObject {
    return {
      title: 'Caisse de communauté',
      message: ['Tirez une carte...'],
    }
  }
}