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
			this.url = "https://www.google.com/search?q="+encodeKeyword+"&oe=utf8&num=10";
			
			// this.url = "https://www.google.com/search?q="+searchKeyword+"&oe=utf8&num=20";
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
		
		    
		//set HTTP header
		conn.setRequestProperty("User-agent", "Chrome/107.0.5304.107");
		 // 設定 HTTP header
        //conn.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3");

		// 引入延遲，休眠1秒
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
	
	 public ArrayList<ResultItem> query() throws IOException {
	        if (content == null) {
	            content = fetchContent();
	        }

	        ArrayList<ResultItem> resultItems = new ArrayList<>();

	        Document doc = Jsoup.parse(content);
	        Elements lis = doc.select("div");
			lis = lis.select(".kCrYT");
	       

	        for (Element li : lis) {
	            try {
	                String citeUrl = li.select("a").get(0).attr("href").replace("/url?q=", "");
	                String title = li.select("a").get(0).select(".vvjwJb").text();
	                
	                if (title.equals("")) {
	                    continue;
	                }
	                String decodedUrl = URLDecoder.decode(citeUrl, StandardCharsets.UTF_8.toString());
	                if(decodedUrl.contains("&")){
	                	
	                	int position = decodedUrl.indexOf("&");
	                	if (decodedUrl.charAt(position + 1) == 's' && decodedUrl.charAt(position + 2) == 'a') {
	                	    decodedUrl = decodedUrl.substring(0, position);
	                	}
	                	
	                }
	               // System.out.println("Title: " + title + " , url1: " + decodedUrl);
	               
	                ResultItem resultItem = new ResultItem(title, decodedUrl);
	                resultItems.add(resultItem);

	            } catch (IndexOutOfBoundsException e) {
	                // Handle the exception if needed
	            }
	        }

	        return resultItems;
	    }
	/*public HashMap<String, String> query() throws IOException
	{
		if(content == null)
		{
			content = fetchContent();
		}

		HashMap<String, String> retVal = new HashMap<String, String>();
		
		/* 
		 * some Jsoup source
		 * https://jsoup.org/apidocs/org/jsoup/nodes/package-summary.html
		 * https://www.1ju.org/jsoup/jsoup-quick-start
 		 */
		
	/*	//using Jsoup analyze html string
		Document doc = Jsoup.parse(content);
		
		//select particular element(tag) which you want 
		Elements lis = doc.select("div");
		lis = lis.select(".kCrYT");
		
		for(Element li : lis)
		{
			try 
			{
				String citeUrl = li.select("a").get(0).attr("href").replace("/url?q=", "");
				String title = li.select("a").get(0).select(".vvjwJb").text();
				
				if(title.equals("")) 
				{
					continue;
				}
				
				System.out.println("Title: " + title  + " , url: " + citeUrl);
				
				//put title and pair into HashMap
				retVal.put(title, citeUrl);

			} catch (IndexOutOfBoundsException e) 
			{
//				e.printStackTrace();
			}
		}
		
		return retVal;
	} */
}