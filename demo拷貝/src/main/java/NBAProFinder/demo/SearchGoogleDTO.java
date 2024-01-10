package NBAProFinder.demo;


import java.util.ArrayList;
import java.util.Objects;

public class SearchGoogleDTO {
    private ArrayList<NewsDTO> news;
    private ArrayList<BioAndOthersDTO> playerInfo;
    private ArrayList<BioAndOthersDTO> others;

    public SearchGoogleDTO() {
        this.news = new ArrayList<>();
        this.playerInfo = new ArrayList<>();
        this.others = new ArrayList<>();
    }

    // Getter 方法
    public ArrayList<NewsDTO> getNews() {
        return news;
    }

    public ArrayList<BioAndOthersDTO> getPlayerInfo() {
        return playerInfo;
    }

    public ArrayList<BioAndOthersDTO> getOthers() {
        return others;
    }

    public void addNews(NewsDTO news){
        this.news.add(news);
    }

    public void setPlayerInfo(BioAndOthersDTO playerInfo){
        this.playerInfo.add(playerInfo);
    }

    public void setOthers(BioAndOthersDTO others){
        this.others.add(others);
    }

    @Override
    public int hashCode() {
        return Objects.hash(news, playerInfo, others);
    }
}


