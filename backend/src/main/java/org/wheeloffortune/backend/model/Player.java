package org.wheeloffortune.backend.model;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
@Getter
@Setter
@AllArgsConstructor 
@NoArgsConstructor
public class Player {

    // Encapsulation for variables
    private String firstName;
    private String lastName;

    // This represents dollars ?
    private int roundEarnings;
    private int totalEarnings;

    // Maybe handles updated winnings

    public addRoundEarnings(int amount) {
        if (amount < 0) {
            throw new IllegalArgumentException("Earnings can't be negative");
        }

        this.roundEarnings += amount;
    }
        // Reset Earnings for each round
    public void resetRoundEarnings() {
        this.roundEarnings = 0;
    }

    public void bankWinnings() {
        this.totalEarnings += this.roundEarnings;
        this.roundEarnings = 0;
    }

}
