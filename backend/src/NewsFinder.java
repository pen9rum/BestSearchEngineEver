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
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class NewsFinder {

    private String playerUrl;
    private String queryInput;
    private List<NewsItem> newsWithKeyword;

    public NewsFinder(String playerUrl, String queryInput) {
        this.playerUrl = playerUrl;
        this.queryInput = queryInput;
        this.newsWithKeyword = new ArrayList<>();
    }

    public void findNewsWithKeyword() throws IOException, InterruptedException {
        Document doc = Jsoup.connect(playerUrl).get();
        Elements newsElements = doc.select("a[href]");
        
        ExecutorService executor = Executors.newFixedThreadPool(10); // 使用固定大小的線程池

        for (Element newsElement : newsElements) {
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
        System.out.println("---------------------------------------------------------------------");
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
