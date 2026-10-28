package org.wheeloffortune.backend.model;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
@Getter
@Setter
@AllArgsConstructor 
@NoArgsConstructor

public class Round1 {

    private Puzzle puzzle;
    private boolean completed;

    // Initalized Round 1 with its puzzle
    public Round1(Puzzle puzzle) {
        if (puzzle == null) {
            throw new IllegalArgumentException("Round must have a puzzle");
        }
        this.puzzle = puzzle;
    }


    // Comletes the round and records the winner. Throw exceptions so there has to be a winner
    public void completeRound(Player winner){
        if (completed) {
            throw new IllegalStateException("Round is already completed");

    }

    if (winner == null) {
        throw new IllegalArgumentException("Winner cannot be null");

    } 
    this.winner = winner;
    this.completed = true;

    }
}



