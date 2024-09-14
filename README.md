# Sliding Puzzle

This is a sliding puzzle game I built in [1-2 hours](time to design and code algorithm). While I'd played this game before, I never knew about the solving algorithm! 

The algorithm I implemented in this code is entirely my own design. I didn't search for existing solutions or reference any other code. As a result, I can't guarantee it's perfect - there are some cases where the puzzle remains unsolved.  However, since I'm not a master of the game myself, it's difficult to say definitively if it's the algorithm or my own playing skills! 

**The Game:**

The game mechanics are simple:

1. **Slice the Image:** Your chosen image is cut into a grid of squares (e.g., 3x3, 5x5, 8x8 pieces).
2. **Shuffle the Pieces:** The squares are then shuffled, scrambling the image.
3. **Solve the Puzzle:** Rearrange the squares back into the original image. 

**Implementation:**

Internally, the shuffled pieces are represented by an array. The game is won when the array is sorted in the correct order.

**The Final Touches:**

While the core functionality came together quickly, the final touches (mostly involving CSS and front-end design) took an additional [3-4 hours] to complete.

**Ready to Play?**

Check out the live demo here: [https://tknightz.github.io/sliding-puzzle/](https://tknightz.github.io/sliding-puzzle/)
