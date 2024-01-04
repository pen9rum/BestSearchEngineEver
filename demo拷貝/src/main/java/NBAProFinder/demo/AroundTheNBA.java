package NBAProFinder.demo;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class AroundTheNBA {
    
    private List<HomePageLink> links;

    public AroundTheNBA() {
        this.links = new ArrayList<>();
    }

    public void fetchNBAData() {
        ExecutorService executor = Executors.newFixedThreadPool(10);

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
            links.add(new HomePageLink(title, content, absHrefValue, photoSrc));
        }
    }

    public List<HomePageLink> getLinks() {
        return links;
    }
}
