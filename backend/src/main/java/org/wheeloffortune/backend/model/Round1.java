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


    public void completeRound(){
        this.completed = true;
    }
}



