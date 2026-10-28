package org.wheeloffortune.backend.model;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
@Getter
@Setter
@AllArgsConstructor 
@NoArgsConstructor
public class Game {
    // Using an Array to store players that are in each game
    private List<Player> players =  new ArrayList<>();

    private int currentPlayerIndex = 0;
    prvite Round1 round1;

    private boolean gameActive = false;

    // Helper Method to get current player
    public Player getCurrentPlayer() {
        if (player == null || players.isEmpty())
            throw new IllegalStateException("No players in the game");

    }

    return players.get(currentPlayerIndex);

}
