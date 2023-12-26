
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import java.net.URL;
import java.net.URLConnection;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;



import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
public class GoogleQuery 
{
	public String searchKeyword;
	public String url;
	public String content;	
	public GoogleQuery(String searchKeyword)
	{
		this.searchKeyword = searchKeyword;
		
		   
		try 
		{		
			String encodeKeyword=java.net.URLEncoder.encode(searchKeyword,"utf-8");
			this.url = "https://www.google.com/search?q="+encodeKeyword+"&oe=utf8&num=100";
		}
		catch (Exception e)
		{
			System.out.println(e.getMessage());
		}
	}
	
	private String fetchContent() throws IOException
	{
		
		String retVal = "";

		URL u = new URL(url);
		URLConnection conn = u.openConnection();

		conn.setRequestProperty("User-agent", "Chrome/107.0.5304.107");
        try {
        	Thread.sleep(DynamicDelayCrawler.getCurrentDelay());
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
		InputStream in = conn.getInputStream();
		InputStreamReader inReader = new InputStreamReader(in, "utf-8");
		BufferedReader bufReader = new BufferedReader(inReader);
		String line = null;

		while((line = bufReader.readLine()) != null)
		{
			retVal += line;
		}
		return retVal;
	}
	
	public ArrayList<ResultItem> query() throws IOException, InterruptedException {
	    if (content == null) {
	        content = fetchContent();
	    }

	    Document doc = Jsoup.parse(content);
	    Elements lis = doc.select("div").select(".kCrYT");

	    ExecutorService executor = Executors.newFixedThreadPool(Runtime.getRuntime().availableProcessors());
	    List<Future<ResultItem>> futures = new ArrayList<>();

	    for (Element li : lis) {
	        Future<ResultItem> future = executor.submit(() -> {
	            try {
	                String citeUrl = li.select("a").get(0).attr("href").replace("/url?q=", "");
	                String title = li.select("a").get(0).select(".vvjwJb").text();
	                
	                if (!title.isEmpty()) {
	                    String decodedUrl = URLDecoder.decode(citeUrl, StandardCharsets.UTF_8.toString());
	                    if (decodedUrl.contains("&")) {
	                        int position = decodedUrl.indexOf("&");
	                        if (position > -1 && decodedUrl.charAt(position + 1) == 's' && decodedUrl.charAt(position + 2) == 'a') {
	                            decodedUrl = decodedUrl.substring(0, position);
	                        }
	                    }
	                    return new ResultItem(title, decodedUrl);
	                }
	            } catch (IndexOutOfBoundsException e) {
	            }
	            return null; 
	        });

	        futures.add(future);
	    }

	    executor.shutdown();
	    executor.awaitTermination(Long.MAX_VALUE, TimeUnit.NANOSECONDS);

	    ArrayList<ResultItem> resultItems = new ArrayList<>();
	    for (Future<ResultItem> future : futures) {
	        try {
	            ResultItem result = future.get();
	            if (result != null) {
	                resultItems.add(result);
	            }
	        } catch (InterruptedException e) {
	           
	            Thread.currentThread().interrupt(); 
	           
	        } catch (ExecutionException e) {
	            
	        }
	    }
	    return resultItems;
	}

}