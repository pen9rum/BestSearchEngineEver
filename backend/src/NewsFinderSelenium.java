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
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class NewsFinder {
    private String playerUrl;
    private List<NewsItem> newsWithKeyword;
    private String queryInput;

    public NewsFinder(String queryInput) {
        this.newsWithKeyword = new ArrayList<>();
        this.queryInput = queryInput;
    }

    public void googleQuery(String searchKeyword) {
        try {
            String encodedKeyword = java.net.URLEncoder.encode("Yahoo NBA news" + searchKeyword, "utf-8");
            playerUrl = "https://www.google.com/search?q=" + encodedKeyword + "&lr=lang_en";
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    public void findNewsWithKeyword() throws InterruptedException {
        System.setProperty("webdriver.chrome.driver", "D:\\JavaLib\\Selenium\\webdrivers\\Chrome\\chromedriver.exe");
        WebDriver driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);

        driver.get(playerUrl);

        List<WebElement> newsElements = driver.findElements(By.cssSelector("a[href]"));
        for (WebElement newsElement : newsElements) {
            String url = newsElement.getAttribute("href");
            String title = newsElement.getText();

            driver.get(url);
            String text = driver.findElement(By.tagName("body")).getText();

            int count = countOccurrences(text.toLowerCase(), queryInput.toLowerCase());
            if (count > 0) {
                synchronized (this) {
                    newsWithKeyword.add(new NewsItem(title, url, count));
                }
            }
        }

        driver.quit();

        newsWithKeyword.sort((item1, item2) -> Integer.compare(item2.getKeywordCount(), item1.getKeywordCount()));
        for (int i = 0; i < Math.min(newsWithKeyword.size(), 50); i++) {
            NewsItem item = newsWithKeyword.get(i);
            if (item.getUrl().contains("news")) {
                System.out.println("Title: " + item.getTitle() + " | URL: " + item.getUrl() + " | Count: " + item.getKeywordCount());
            }
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
    
    public static void main(String[] args) {
        NewsFinder finder = new NewsFinder("keyword");
        finder.googleQuery("keyword");
        try {
            finder.findNewsWithKeyword();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
