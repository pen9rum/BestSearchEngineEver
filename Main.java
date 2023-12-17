import java.io.IOException;
import java.util.ArrayList;
import java.util.Scanner;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;

public class Main 
{
	public static void main(String[] args) throws KeyManagementException, NoSuchAlgorithmException 
	{
		try 
		{
			
			Scanner scn = new Scanner(System.in);
			String queryInput = scn.next();
			GoogleQuery googleQuery = new GoogleQuery(queryInput);
			
	        ArrayList<ResultItem> results = googleQuery.query();

	        for (ResultItem resultItem : results) {
	                System.out.println(resultItem);
	        }
	        
			KeywordList kLst;
			String urlStr;
			KeywordCounter counter = null;
			//File file = new File("input.txt");
			//Scanner fileSC = new Scanner(file);
			Scanner sc = new Scanner(System.in);
			kLst = new KeywordList();
			for(ResultItem url : results) {
				
				counter = new KeywordCounter(url.getUrl());
				System.out.print(url.getUrl());
				//fileSC.nextLine();
				sc.nextLine();
				while (sc.hasNext()) {
					
					String keyword = sc.next();
					System.out.print(keyword);
					int count = counter.countKeyword(keyword);
					float weight = sc.nextFloat();
					Keyword k = new Keyword(keyword, count, weight);
					kLst.add(k);
					
				}
				kLst.outputScore();
				//fileSC.close();
				
			}
		} 
		catch (IOException e) 
		{
			e.printStackTrace();
		}
	}
}
