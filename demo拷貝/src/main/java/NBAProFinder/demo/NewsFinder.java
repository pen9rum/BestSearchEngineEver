package NBAProFinder.demo;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;



import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class NewsFinder {
    
    private String playerUrl;
    private List<NewsItem> newsWithKeyword;
    private String queryInput;

    public NewsFinder(String queryInput) {
        //this.playerUrl = playerUrl;
        this.newsWithKeyword = new ArrayList<>();
        this.queryInput = queryInput;
    }
   
    public void googleQuery(String searchKeyword)
   	{
   		String url = null;	   
   		try 
   		{		
   			String encodeKeyword=java.net.URLEncoder.encode( "NBA.com"+searchKeyword,"utf-8");
   			
   			url = "https://www.google.com/search?q="+ encodeKeyword +"&lr=lang_en";
//            System.out.println("QQ0");
               System.out.println(url);
   			Document document = Jsoup.connect(url).get();
//            System.out.println("QQ1");
               Elements searchResults = document.select("div.tF2Cxc");
//            System.out.println("QQ2");
               if (!searchResults.isEmpty()) {
                   Element firstResult = searchResults.first();
                   String resultUrl = firstResult.select("a[href]").attr("href");
                   playerUrl = resultUrl;
                   System.out.println("First Result URL: " + playerUrl); // 打印找到的第一个结果的 URL
               }else {
                   System.out.println("No results found"); // 如果没有找到结果
               }
   		}
   		catch (Exception e)
   		{
   			System.out.println(e.getMessage());
   		}
   	}	
   
    public String findNewsWithKeyword(SearchGoogleDTO searchGoogleDTO) throws IOException, InterruptedException {

        String output = "";
        System.out.println("Connecting to URL: " + playerUrl); // 打印正在连接的 URL
        Document doc = Jsoup.connect(playerUrl).get();

        for (Element aElement : doc.select("div.PlayerNews_item__10b5O")) {
            String title = aElement.select("p.PlayerNews_headline__w4cFW").text();
            String content = aElement.select("p.PlayerNews_update__ntYMq").text();
            String date = aElement.select("p.PlayerNews_date___Te0H").text();

            NewsDTO news = new NewsDTO();
            news.setTitle(title);
            news.setContent(content);
            news.setDate(date);

            searchGoogleDTO.addNews(news);
            output += title + "\n" + content + "\n" + date + "\n";

            // 打印每个新闻项的信息
            System.out.println("Title: " + title);
            System.out.println("Content: " + content);
            System.out.println("Date: " + date);
            System.out.println("-----------------------------");
        }
    	 
             
              
        ExecutorService executor = Executors.newFixedThreadPool(10); // 使用固定大小的線程池

        return output;
		/*for (Element newsElement : newsElements) {
            executor.submit(() -> {
                String url = newsElement.absUrl("href");
                try {
                    Document newsDoc = Jsoup.connect(url).get();
                    String text = newsDoc.body().text();
                    int count = countOccurrences(text.toLowerCase(), queryInput.toLowerCase());
                    if (count > 0) {
                        String title = newsElement.text();
                        synchronized(this) {
                            newsWithKeyword.add(new NewsItem(title, url, count));
                        }
                    }
                } catch (IOException e) {
                    System.out.println("Error processing URL: " + url);
                }
            });
        }

        executor.shutdown();
        executor.awaitTermination(1, TimeUnit.HOURS); // 等待所有任務完成

        newsWithKeyword.sort((item1, item2) -> Integer.compare(item2.getKeywordCount(), item1.getKeywordCount()));
        for (int i = 0; i < Math.min(newsWithKeyword.size(), 10); i++) {
            NewsItem item = newsWithKeyword.get(i);
            System.out.println("Title: " + item.getTitle() + " | URL: " + item.getUrl() + " | Count: " + item.getKeywordCount());
        }
        System.out.println("---------------------------------------------------------------------");*/
         
    }

    private int countOccurrences(String text, String keyword) {
        int count = 0;
        int i = 0;
        while ((i = text.indexOf(keyword, i)) != -1) {
            count++;
            i += keyword.length();
        }
        return count;
    }

    

    

    public static class NewsItem {
        private final String title;
        private final String url;
        private final int keywordCount;

        public NewsItem(String title, String url, int keywordCount) {
            this.title = title;
            this.url = url;
            this.keywordCount = keywordCount;
        }

        public String getTitle() {
            return title;
        }

        public String getUrl() {
            return url;
        }

        public int getKeywordCount() {
            return keywordCount;
        }
    }


    
   


	
}