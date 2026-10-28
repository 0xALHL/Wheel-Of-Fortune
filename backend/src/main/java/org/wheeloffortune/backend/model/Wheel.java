package org.wheeloffortune.backend.model;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
@Getter
@Setter
@AllArgsConstructor 
@NoArgsConstructor
public class Wheel {

    // List of all wheel landing spots
    private final List<String> segments = List.of(
        "$2500",
        "WILD CARD",
        "$900",
        "$700",
        "$600",
        "$650",
        "PRIZE",
        "$700",
        "MILLION DOLLAR",
        "$600",
        "$550",
        "$500",
        "$600",
        "BANKRUPT",
        "$650",
        "$850",
        "$700",
        "LOSE A TURN",
        "$800",
        "$500",
        "$650",
        "$500",
        "$900",
        "BANKRUPT"
    );

    private final Random random = new Random();

    // Randomly select a wheel segment
    public int spin() {
        return random.nextInt(segments.size());
    }

    // Get the result of the selected segment
    public String getOutcome(int index) {
        return segments.get(index);
    }

    // Provide the wheel layout to the frontend
    public List<String> getSegments() {
        return segments;
    }
}
