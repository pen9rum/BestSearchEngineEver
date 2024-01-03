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
import java.util.ArrayList;
import java.util.List;

public class NewsFinder {
    
    private String playerUrl;
    private String content;
    private boolean isPlayerInTitle;
    private List<NewsItem> newsWithKeyword;
    private String queryInput;

    public NewsFinder(String playerUrl, String queryInput) {
        this.playerUrl = playerUrl;
        this.isPlayerInTitle = false;
        this.newsWithKeyword = new ArrayList<>();
        this.queryInput = queryInput;
    }
   

    private String fetchContent() throws IOException {
        URL url = new URL(this.playerUrl);
        URLConnection conn = url.openConnection();
        InputStream in = conn.getInputStream();
        BufferedReader br = new BufferedReader(new InputStreamReader(in));

        StringBuilder retVal = new StringBuilder();
        String line;

        while ((line = br.readLine()) != null) {
            retVal.append(line).append("\n");
        }
        br.close();

        return retVal.toString();
    }

    public void findNewsWithKeyword(String keyword) throws IOException {
        content = fetchContent();
        Document doc = Jsoup.parse(content);
        Elements titleElements = doc.select("h1, h2, h3, h4, h5, h6"); // Add more selectors as needed

        for (Element titleElement : titleElements) {
            String titleText = titleElement.text();
            if (titleText.toLowerCase().contains(keyword.toLowerCase())) {
                Element anchorElement = titleElement.closest("a"); // Find the nearest ancestor 'a' element
                if (anchorElement != null) {
                    String url = anchorElement.absUrl("href"); // Use absUrl to get the absolute URL
                    newsWithKeyword.add(new NewsItem(titleText, url));
                    isPlayerInTitle = true;
                }
            }
        }
    }


    public List<NewsItem> getNewsWithKeyword() {
        return newsWithKeyword;
    }

    public boolean isPlayerInTitle() {
        return isPlayerInTitle;
    }

    public static class NewsItem {
        private final String title;
        private final String url;

        public NewsItem(String title, String url) {
            this.title = title;
            this.url = url;
        }

        public String getTitle() {
            return title;
        }

        public String getUrl() {
            return url;
        }
    }

    public void newsFinder() {      
        try {
            findNewsWithKeyword(queryInput);
            List<NewsItem> newsItems = getNewsWithKeyword();
            if (isPlayerInTitle()) {
                for (NewsItem item : newsItems) {
                    System.out.println("Title: " + item.getTitle() + " URL: " + item.getUrl());
                }
            } else {
                System.out.println("No news titles with the specified keyword were found.");
            }System.out.println("------------------------------------------------------");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


	
}

