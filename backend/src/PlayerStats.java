import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;

public class PlayerStats {
	
	private String playerUrl;
	
	public PlayerStats(String playerUrl) {
		this.playerUrl = playerUrl;
	}
		 
	public void getStats() throws InterruptedException{
     try {
         Connection connection = Jsoup.connect(playerUrl)
                 .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36");
         Thread.sleep(DynamicDelayCrawler.getCurrentDelay());
         Document document = connection.get();

         String point = document.select("p.PlayerSummary_playerStatValue___EDg_").text();
         Element imageElement = document.selectFirst("img.PlayerImage_image__wH_YX.PlayerSummary_playerImage__sysif");
         String imageUrl = imageElement.attr("src");

         System.out.println("球员數據: \n" + "PPG " + "RPG " + "APG " + "PIE " + "\n" + point + "\n球員照片:\n" + imageUrl);
     } catch (IOException e) {
         e.printStackTrace();
     }
	
  } 
}
