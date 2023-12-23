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
		
	playerUrl = "https://www.nba.com/player/201939" ; // 201939是Stephen Curry的球员ID，你可以替换成其他球员的ID
 	//String playerUrl = "https://www.nba.com/player/1630173/precious-achiuwa";
     try {
         Connection connection = Jsoup.connect(playerUrl)
                 .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36");

         // Simulate a delay between requests to appear more like a human
         int delayMillis = (int) (Math.random() * 5000) + 1000; // Random delay between 1 to 5 seconds
         Thread.sleep(delayMillis);

         // Execute the request using the connection object
         Document document = connection.get();

         // 提取球员的得分
         String point = document.select("p.PlayerSummary_playerStatValue___EDg_").text();
         System.out.println("球员數據: " + point);

         // 提取球员的统计数据
         

     } catch (IOException e) {
         e.printStackTrace();
     }
	
  } 
}
