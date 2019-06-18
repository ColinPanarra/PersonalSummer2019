#include <iostream>
using namespace std;
#define keyUP 72
#define keyDown 80 
#define keyLeft 75
#define keyRight 77

bool gameOver;
const int width = 20; 
const int height = 20;
int x, y, fruitX, fruitY, score; 
enum eDirection { STOP = 0; LEFT, RIGHT, UP, DOWN };
eDirection dir; 


void Setup() {
	gameOver = false; 
	dir = STOP; 
	x = width / 2; 
	y = height / 2;
	fruit = 
}

void Draw() {
	//show the snake moving
	char board[height][width]; 
	//insert snake position and its tail to board as well as fruit

	std::cout << "####################"; 
	std::cout << " # " //first row + "#"; 
						//repeat for all row
	std::cout << "####################";

}
void Input() {

	//get user input 
	int c = 0;
	switch ((c = getch())) {
		case keyUP: 
			if(dir!=DOWN)
			dir = UP; 
			break;
		case keyDown: 
			if (dir != UP)
			dir = DOWN; 
			break; 
		case keyLeft:
			if (dir != RIGHT)
			dir = LEFT;
			break;
		case keyRight: 
			if (dir != LEFT)
			dir = RIGHT;
			break;
	}
	



}

void Logic() {
	//change direction based on input; 
	switch (dir) {
		case UP:

		case DOWN: 
		case LEFT:
		case RIGHT: 

	}

	//collisions
	//increase tail 
	//game over 
	//direction needs meaning 



}

int main(){
	Setup(); 
	while (!gameOver) 
	{
		Draw();
		Input();
		Logic();

	}
}
