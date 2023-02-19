# Slide puzzle
This game took me 1–2 hours to design and come up with the algorithm. I did play this game before, but I didn't know it were made and the algorithm behind. 
The algorithm I implemented in this source code came from my idea, and I didn't search for it or see any other references,
so I am not 100% sure that my solution was correct (there are some cases that I can't solve the puzzle, but I am not a good player in this game, so I cannot tell whether is the algorithm right or not?)

The operations of this game are simple:
1. Slicing original image to a bunch of small pieces (9, 25, 64 pieces...)
2. Shuffle the pieces
3. Check if the pieces are in order (game over)

Shuffled pieces were represented as an array, the game is over when the array is sorted.

The final version took me 3–4 hours to finish (most of the time writing CSS and thinking about the front-end design) : https://tknightz.github.io/sliding-puzzle/
