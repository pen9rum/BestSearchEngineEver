import java.io.IOException;
import java.util.ArrayList;
import java.util.Scanner;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;

public class Main 
{
	public static void main(String[] args) throws KeyManagementException, NoSuchAlgorithmException
	{
		
			
		try {
            Scanner scn = new Scanner(System.in);
            String queryInput = scn.next();
            GoogleQuery googleQuery = new GoogleQuery(queryInput);

            ArrayList<ResultItem> results = googleQuery.query();
            for(ResultItem result : results) {
            	System.out.println(result);
            }

            KeywordList kLst;
            String urlStr;
            KeywordCounter counter = null;
            File file = new File("input_personal.txt");
            Scanner fileSC = new Scanner(file);

            // Skip the first line
            if (fileSC.hasNextLine()) {
                fileSC.nextLine();
            }

            kLst = new KeywordList();

            for (ResultItem resultItem : results) {
                counter = new KeywordCounter(resultItem.getUrl());

                while (fileSC.hasNext()) {
                    String keyword = fileSC.next();
                    int count = counter.countKeyword(keyword);
                    float weight = fileSC.nextFloat();
                    Keyword k = new Keyword(keyword, count, weight);
                    kLst.add(k);
                }
                
                float totalScore = kLst.calculateTotalScore();
                kLst.addResultItemWithScore(resultItem, totalScore);

             
                //kLst.sort();

                // Reset the scanner position to the beginning of the file
                fileSC = new Scanner(file);
                // Skip the first line
                if (fileSC.hasNextLine()) {
                    fileSC.nextLine();
                }
                
                // Output the sorted results
               
            } kLst.sortAndOutput();
            PlayerStats stats = new PlayerStats(kLst.getNBAstatUrl());
            stats.getStats();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException  e1) {
			 e1.printStackTrace();
		}
		
		
		
			
		
    }
}