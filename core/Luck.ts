import { Player } from './Player';
import { DisplayObject } from './DisplayObject';
import { Card } from './Card';
import { Property } from './Property';
import { CaseCard } from './CaseCard';
import { START_CASH } from './constants';

export class Luck implements CaseCard {
  cards: Card[] = [
    {
      message: ['Amende pour exces de vitesse, 150 €'],
      loose: (player: Player) => 150,
    }, {
      message: ['Vous avez gagné le prix de mots croisés, 1000€'],
      gain: (player: Player) => 1000,
    }, {
      message: ['Rendez vous à la Place de la Bourse', `Vous passez par la case 'Départ' et recevrez ${ START_CASH } €`],
      goTo: 26,
      dontTouchStartCash: true,
      gain: (player: Player) => START_CASH,
    },  {
      message: [`Payez pour faire de scolarité. 500€`],
      loose: (player: Player) => 500,
    }, {
      message: ['Faites des réparations dans toutes vos maisons', 'Versez pour chaque maison 250€ et pour chaque hotel 1000€'],
      loose: (player: Player) => {
        const properties: Property[] = player.getProperties();
        let sum = 0;

        for(let property of properties) {
          if(property.getNbHouses() === 5) {
            sum += 1000;
          } else {
            sum += 250;
          }
        }

        return sum;
      }
    }, {
      message: ['Reculez de trois cases'],
      moveTo: -3
    }, {
      message: ['Vous êtes imposé pour les réparations de voirie à raison de ', ' 400 € par maison', '1150 par hotel'],
      loose: (player: Player) => {
        const properties: Property[] = player.getProperties();
        let sum = 0;

        for(let property of properties) {
          if(property.getNbHouses() === 5) {
            sum += 1150;
          } else {
            sum += 400;
          }
        }

        return sum;
      }
    }, {
      message: ['Avancez jusqu\'à la case Départ'],
      goTo: 0,
    }, {
      message: ['Allez à la gare de Lyon,', `si vous passez par la case "Départ" pour toucherez ${ START_CASH }`],
      goTo: 15,
      gain: (player: Player) => {
        if(player.getPosition() > 15){
          return START_CASH;
        }

        return 0;
      } 
    }, {
      message: ['Votre immeuble et votre prêt rapportent', 'Vous touchez 1500 €'],
      gain: (player: Player) => 1500,
    }, {
      message: ['Rendez vous à la rue de la Paix'],
      goTo: 39,
    }, {
      message: ['Amende pour ivresse, 200 €'],
      loose: (player: Player) => 200,
    }, {
      message: ['Avancez au Boulevard de la Villette', `Si vous passez par la case Départ touchez ${ START_CASH }`],
      dontTouchStartCash: true,
      goTo: 11,
      gain: (player: Player) => {
        if(player.getPosition() > 11){
          return START_CASH;
        }

        return 0;
      }
    }, {
      message: [`Vous êtes libéré de prison, cette carte peut être conservée`],
      freeJailCard: true,
    }, {
      message: [`Allez en prison, ne touchez pas l'argent de la case départ`],
      goToJail: true,
    }, {
      message: [`La Banque vous verse un dividende de 500 €`],
      gain: (player: Player) => 500
    }, {
      message: [`Allez en prison, ne touchez pas l'argent de la case départ`],
      goToJail: true,
    }
  ]

  getRandomCard(): Card {
    return this.cards[Math.ceil(Math.random() * this.cards.length)]; 
    //return this.cards[14];
  }

  execute(player: Player): DisplayObject {
    return {
      title: 'Chance',
      message: ['piochez une carte...'],
    };
  }
}