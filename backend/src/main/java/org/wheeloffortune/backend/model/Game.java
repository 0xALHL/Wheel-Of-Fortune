package org.wheeloffortune.backend.model;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.utli.List;
import java.util.ArrayList;
@Getter
@Setter
@AllArgsConstructor 
@NoArgsConstructor
public class Game {
    // Using an Array to store players that are in each game
    private List<Player> players =  new ArrayList<>();

    private int currentPlayerIndex = 0;
    private Round1 round1;

    private boolean gameActive = false;

    // Helper Method to get current player
    public Player getCurrentPlayer() {
        if (players == null || players.isEmpty())
            throw new IllegalStateException("No players in the game");

    }

    return players.get(currentPlayerIndex);


    // Method for making sure we are starting game with 3 players
    public void startGame(player1, player2, player3, Puzzle puzzle){
        if (gameActive) {
            throw new IllegalStateException("Game is currently active");
        }
        If(player1 == null || player2 == null || player3 == null || puzzle == null) {
            throw new IllegalStateException("Three players and puzzle required");
        }
    // A type of queue in order to add and clear players. 3 Players is mandatory for the game to start
        players.clear();
        players.add(Player1);
        players.add(Player2);
        players.add(Player3);
    }

    currentPlayerIndex = 0;
    round1 = new round1(puzzle, false);
    gameActive = true;


}
