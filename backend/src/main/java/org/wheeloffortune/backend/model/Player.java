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

        // Update the round earnings by adding the amount to the current round earnings
    public void updateRoundEarnings(int amount) {

        if (amount < 0) {
            throw new IllegalArgumentException("Earnings can't be negative");
        }

        this.roundEarnings += amount;

    }

    // Reset the round earnings to zero
    public void resetRoundEarnings() {
        this.roundEarnings = 0;
    }

    // Bank the round earnings by adding them to the total earnings and resetting
    public void bankRoundEarnings() {

        this.totalEarnings += this.roundEarnings;
        resetRoundEarnings();

    }

       
}
