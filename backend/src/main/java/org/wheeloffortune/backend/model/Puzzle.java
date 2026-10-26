package org.wheeloffortune.backend.model;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.Set;
import java.util.HashSet;
@Getter
@Setter
@AllArgsConstructor 
@NoArgsConstructor
public class Puzzle {

    private String anwser;
    private String category;
    private Set<Character> guessedletters = new HashSet<>();

    // Some Helper methods
}
