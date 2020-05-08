import { Case } from '@/core/Case';
import { Property } from '@/core/Property';
import { Community } from '@/core/Community';
import { IncomeTax } from '@/core/IncomeTax';
import { Station } from '@/core/Station';
import { Luck } from '@/core/Luck';
import { Start } from '@/core/Start';
import { Colors } from '@/core/Colors';
import { Jail } from '@/core/Jail';
import { GoToJail } from '@/core/GoToJail';
import { Park } from '@/core/Park';
import { Company } from '@/core/Company';
import { LuxTax } from '@/core/LuxTax';

export const MonopolyCases: Case[] = [
  new Start(),

  new Property('Boulevard de Belleville', Colors.BROWN, 60, 50, 30, {
    rent: 2,
    with1House: 10,
    with2Houses: 30,
    with3Houses: 90,
    with4Houses: 160,
    withHotel: 250,
  }),
  new Community(),
  new Property('Rue Lecourbe', Colors.BROWN, 60, 50, 30, {
    rent: 4,
    with1House: 20,
    with2Houses: 60,
    with3Houses: 180,
    with4Houses: 320,
    withHotel: 450,    
  }),
  new IncomeTax(),
  new Station('Gare de Montparnasse', 119),
  new Property('Rue de Vaugirard', Colors.CYAN, 100, 50, 50, {
    rent: 6,
    with1House: 30,
    with2Houses: 90,
    with3Houses: 270,
    with4Houses: 400,
    withHotel: 550,
  }),
  new Luck(),
  new Property('Rue de Courcelles', Colors.CYAN, 100, 50, 50, {
    rent: 6,
    with1House: 30,
    with2Houses: 90,
    with3Houses: 270,
    with4Houses: 400,
    withHotel: 550,
  }),
  new Property('Avenue de la République', Colors.CYAN, 120, 50, 60, {
    rent: 8,
    with1House: 40,
    with2Houses: 100,
    with3Houses: 300,
    with4Houses: 450,
    withHotel: 600,
  }),

  new Jail(),

  new Property('Boulevard de la Villette', Colors.PURPLE, 140, 100, 70, {
    rent: 10,
    with1House: 50,
    with2Houses: 150,
    with3Houses: 450,
    with4Houses: 625,
    withHotel: 750,
  }),
  new Company('Compagnie de distribution d\'électricité', 5000),
  new Property('Avenue de Neuilly', Colors.PURPLE, 140, 100, 70, {
    rent: 10,
    with1House: 50,
    with2Houses: 150,
    with3Houses: 450,
    with4Houses: 625,
    withHotel: 750,
  }),
  new Property('Rue de Paradis', Colors.PURPLE, 160, 100, 80, {
    rent: 12,
    with1House: 60,
    with2Houses: 180,
    with3Houses: 500,
    with4Houses: 700,
    withHotel: 900,
  }),
  new Station('Gare de Lyon', 120),
  new Property('Avenue de Mozart', Colors.ORANGE, 180, 100, 80, {
    rent: 14,
    with1House: 70,
    with2Houses: 200,
    with3Houses: 550,
    with4Houses: 700,
    withHotel: 900,
  }),
  new Community(),
  new Property('Boulevard de Saint Michel', Colors.ORANGE, 180, 100, 90, {
    rent: 14,
    with1House: 70,
    with2Houses: 200,
    with3Houses: 550,
    with4Houses: 700,
    withHotel: 950,
  }),
  new Property('Place Pigalle', Colors.ORANGE, 200, 100, 90, {
    rent: 16,
    with1House: 80,
    with2Houses: 220,
    with3Houses: 600,
    with4Houses: 800,
    withHotel: 1000,
  }),

  new Park(),
 
  new Property('Avenue de Matignon', Colors.RED, 220, 100, 100, {
    rent: 18,
    with1House: 90,
    with2Houses: 250,
    with3Houses: 700,
    with4Houses: 875,
    withHotel: 1050,
  }),
  new Luck(),
  new Property('Boulevard Malesherbes', Colors.RED, 220, 150, 110, {
    rent: 18,
    with1House: 90,
    with2Houses: 250,
    with3Houses: 700,
    with4Houses: 875,
    withHotel: 1050,
  }),
  new Property('Faubourg Saint Honoré', Colors.YELLOW, 240, 150, 120, {
    rent: 20,
    with1House: 100,
    with2Houses: 300,
    with3Houses: 750,
    with4Houses: 925,
    withHotel: 1100,
  }),
  new Station('Gare de Nord', 73),
  new Property('Place de la Bourse', Colors.YELLOW, 260, 150, 130, {
    rent: 18,
    with1House: 110,
    with2Houses: 330,
    with3Houses: 800,
    with4Houses: 975,
    withHotel: 1150,
  }),
  new Company('Compagnie de distribution des eaux', 5000),
  new Property('Rue Lafayette', Colors.YELLOW, 260, 150, 130, {
    rent: 22,
    with1House: 10,
    with2Houses: 330,
    with3Houses: 800,
    with4Houses: 975,
    withHotel: 1150,
  }),

  new GoToJail(),

  new Property('Avenye de Breteuil', Colors.GREEN, 280, 150, 140, {
    rent: 24,
    with1House: 120,
    with2Houses: 360,
    with3Houses: 850,
    with4Houses: 1025,
    withHotel: 1200,
  }),
  new Property('Avenue Foch', Colors.GREEN, 300, 200, 140, {
    rent: 26,
    with1House: 130,
    with2Houses: 390,
    with3Houses: 900,
    with4Houses: 1100,
    withHotel: 1275,
  }),
  new Community(),
  new Property('Boulevard des Capucines', Colors.GREEN, 300, 200, 150, {
    rent: 26,
    with1House: 130,
    with2Houses: 390,
    with3Houses: 900,
    with4Houses: 1100,
    withHotel: 1275,
  }),
  new Station('Gare Saint Lazare', 118),
  new Luck(),
  new Property('Avenue des champs élysées', Colors.BLUE, 350, 200, 175, {
    rent: 35,
    with1House: 175,
    with2Houses: 500,
    with3Houses: 1100,
    with4Houses: 1300,
    withHotel: 1500,
  }),
  new LuxTax(),
  new Property('Rue de la Paix', Colors.BLUE, 400, 200, 200, {
    rent: 50,
    with1House: 200,
    with2Houses: 600,
    with3Houses: 1400,
    with4Houses: 1700,
    withHotel: 2000,
  }),
]
