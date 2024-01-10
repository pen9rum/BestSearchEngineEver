package NBAProFinder.demo;

import java.util.Objects;

public class StatsDTO {
    private String PRG;
    private String RPG;
    private String APG;
    private String PIE;
    private String imageUrl;

    public StatsDTO(String PRG, String RPG, String APG, String PIE, String imageUrl) {
        this.PRG = PRG;
        this.RPG = RPG;
        this.APG = APG;
        this.PIE = PIE;
        this.imageUrl = imageUrl;
    }

    // Getter 方法
    public String getPRG() {
        return PRG;
    }

    public String getRPG() {
        return RPG;
    }

    public String getAPG() {
        return APG;
    }

    public String getPIE() {
        return PIE;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    // Setter 方法
    public void setPRG(String PRG) {
        this.PRG = PRG;
    }

    public void setRPG(String RPG) {
        this.RPG = RPG;
    }

    public void setAPG(String APG) {
        this.APG = APG;
    }

    public void setPIE(String PIE) {
        this.PIE = PIE;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    // toString 方法
    @Override
    public String toString() {
        return "StatsDTO{" +
                "PRG='" + PRG + '\'' +
                ", RPG='" + RPG + '\'' +
                ", APG='" + APG + '\'' +
                ", PIE='" + PIE + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                '}';
    }

    // hashCode 和 equals 方法
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof StatsDTO)) return false;
        StatsDTO statsDTO = (StatsDTO) o;
        return Objects.equals(PRG, statsDTO.PRG) &&
                Objects.equals(RPG, statsDTO.RPG) &&
                Objects.equals(APG, statsDTO.APG) &&
                Objects.equals(PIE, statsDTO.PIE) &&
                Objects.equals(imageUrl, statsDTO.imageUrl);
    }

    @Override
    public int hashCode() {
        return Objects.hash(PRG, RPG, APG, PIE, imageUrl);
    }
}
