//Class containing the card object

#include <string>
#include <iostream>
using namespace std; 
class Card 
{
	//access specifier
	public: 
		
		//Data Members: 
		string cardType; //king, queen, etc...
		string color; 
		string suit; //spades, clubs etc...
		int value; //values 1-13 ace-king 

		void printname() {
			
				cout << color + " " << cardType + " " << "of " << suit;
			
		}; 

};

