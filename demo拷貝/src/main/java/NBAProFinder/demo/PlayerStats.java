package NBAProFinder.demo;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import java.io.IOException;

public class PlayerStats {
	
	private String playerUrl;
	
	public PlayerStats(String playerUrl) {
		this.playerUrl = playerUrl;
	}
		 
	public StatsDTO getStats() throws InterruptedException{
		String result = null;
        StatsDTO statsDto = null;
        try {
         Connection connection = Jsoup.connect(playerUrl)
                 .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36");
         Thread.sleep(DynamicDelayCrawler.getCurrentDelay());
         Document document = connection.get();

         String point = document.select("p.PlayerSummary_playerStatValue___EDg_").text();
         String[] splitPoints = point.split(" "); // 使用空格作为分隔符

         Element imageElement = document.selectFirst("img.PlayerImage_image__wH_YX.PlayerSummary_playerImage__sysif");
         String imageUrl = imageElement.attr("src");
         result = point + "\n" + imageUrl;
         System.out.println("Hi"+result);
         statsDto = new StatsDTO(splitPoints[0],splitPoints[1],splitPoints[2],splitPoints[3], imageUrl);
         
     } catch (IOException e) {
         e.printStackTrace();
     }


        return statsDto;
  } 
}
