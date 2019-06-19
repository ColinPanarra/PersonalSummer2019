
#include "Card.h"
#include <string>
#include <iostream>
using namespace std; 

class Deck {
public:
	Card card[52]; 
	
		void printname() {
			for (int i = 0; i < 52; i++) {
				cout << card[i].printname << endl;
			}
		};

		void makeDeck() {

			while (suit < 5) {
				Card card = new Card;
				//give value
				card.value = value;

				//give card color
				if (suit < 2) Card.color = black;
				else card.color = red;

				//give suit
				card.suit = suits[suit];

				//get cardType
				switch (value) {
				case(1):
					card.cardType = "Ace";
					break;
				case(11):
					card.cardType = "Jack";
					break;
				case(12):
					card.cardType = "Queen";
					break;
				case(13):
					card.cardType = "King";
					break;

					default card.cardType = value.str();
				}
				//keep values under 13 and increment the suit if its 13 
				if (i == 13)
				{
					i = 0;
					suit++;
				}
				deck[deckPosition] = card;
			}
		

};