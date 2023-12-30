import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import java.io.IOException;
public class AroundTheNBA {
	
	public void printAroundTheNBA() throws InterruptedException {
		
	
		try {
			Connection connection = Jsoup.connect("https://www.nba.com/")
                .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36");
			
			// Simulate a delay between requests to appear more like a human
			int delayMillis = (int) (Math.random() * 50) + 100; // Random delay between 0.1 to 0.5 seconds
			Thread.sleep(delayMillis);

			// Execute the request using the connection object
			Document document = connection.get();

			// 找到所有帶有 href 屬性且有指定 CSS 類別的 <a> 元素
			for (Element aElement : document.select("a[href].ArticleTile_tileThumnailLink__g_e9w")) {
				// 取得 href 屬性的內容
				String title = aElement.attr("data-content");
				String content = aElement.attr("title");
				String absHrefValue = aElement.attr("href");
				if (content.startsWith("Article link for")) {
					content = content.substring("Article link for".length()).trim();
				}
				// 找到 <figure> 元素
				Element figureElement = aElement.selectFirst("figure");

				// 找到 <img> 元素
				Element imgElement = figureElement.selectFirst("img");

				// 取得照片的 src
				String photoSrc = imgElement.attr("src");


				System.out.println("Title: " + title);
				System.out.println("Content: " + content);
				System.out.println("Url: " + "https://www.nba.com" + absHrefValue);
				System.out.println("Photo Src: " + photoSrc);
				System.out.println("-----------------------------");
			}

		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}

