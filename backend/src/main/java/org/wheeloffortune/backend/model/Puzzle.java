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
        
     public int guessLetter(char letter) {

        if (answer == null || answer.isBlank()) {
            throw new IllegalStateException(
                "Puzzle has no answer"
            );
        }

        char guess = Character.toUpperCase(letter);

        if (guess < 'A' || guess > 'Z') {
            throw new IllegalArgumentException(
                "Guess must be a letter A-Z"
            );
        }

        if (!guessedLetters.add(guess)) {
            throw new IllegalArgumentException(
                "Letter already guessed"
            );
        }

        int count = 0;

        for (char c : answer.toUpperCase(Locale.ROOT).toCharArray()) {
            if (c == guess) {
                count++;
            }
        }

        return count;
    }

    // Display guessed letters and hide remaining letters
    public String getRevealedPuzzle() {

        StringBuilder revealed = new StringBuilder();

        for (char c : answer.toUpperCase(Locale.ROOT).toCharArray()) {

            if (!Character.isLetter(c) || guessedLetters.contains(c)) {
                revealed.append(c);
            } else {
                revealed.append('_');
            }
        }

        return revealed.toString();
    }

    // Check whether all letters have been revealed
    public boolean isSolved() {

        for (char c : answer.toUpperCase(Locale.ROOT).toCharArray()) {

            if (Character.isLetter(c) && !guessedLetters.contains(c)) {
                return false;
            }
        }

        return true;
    }
}
