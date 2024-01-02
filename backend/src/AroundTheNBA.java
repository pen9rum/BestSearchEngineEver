import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import java.io.IOException;
import java.util.concurrent.Executors;
import java.util.concurrent.ExecutorService;

public class AroundTheNBA {
    
    public void printAroundTheNBA() {
        ExecutorService executor = Executors.newFixedThreadPool(10); // Create a thread pool with 10 threads
        
        executor.submit(() -> {
            try {
                Connection connection = Jsoup.connect("https://www.nba.com/")
                        .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36");
                Document document = connection.get();
                processDocument(document);

            } catch (IOException e) {
                e.printStackTrace();
            }
        });

        executor.shutdown(); 
    }

    private void processDocument(Document document) {
        for (Element aElement : document.select("a[href].ArticleTile_tileThumnailLink__g_e9w")) {
            String title = aElement.attr("data-content");
            String content = aElement.attr("title");
            String absHrefValue = aElement.attr("href");
            if (content.startsWith("Article link for")) {
                content = content.substring("Article link for".length()).trim();
            }
            Element figureElement = aElement.selectFirst("figure");
            Element imgElement = figureElement.selectFirst("img");
            String photoSrc = imgElement.attr("src");
            System.out.println("Title: " + title);
            System.out.println("Content: " + content);
            System.out.println("Url: " + "https://www.nba.com" + absHrefValue);
            System.out.println("Photo Src: " + photoSrc);
            System.out.println("-----------------------------");
        }
    }
}
