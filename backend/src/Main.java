import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

import java.io.File;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;

public class Main {
	 public static boolean isEnglishOrPunctuation(String text) {
	        return text.matches("^[a-zA-Z\\s.,!?()-_]+$");
	    }

    public static void main(String[] args) throws KeyManagementException, NoSuchAlgorithmException {
        try {
        	AroundTheNBA aroundTheNBA = new AroundTheNBA();
    		aroundTheNBA.printAroundTheNBA();
            DatabasePlayerSearch DBsearch = new DatabasePlayerSearch();
        	Scanner scn = new Scanner(System.in);
        	//System.out.print("Enter the name to search: ");
        	String inputName;
        	while (true) {
        	    System.out.print("Enter the name to search: ");
        	    inputName = scn.nextLine();
        	    if (inputName.length() > 25) {
        	        System.out.println("Not allowed insert, name too long.");
        	        continue; 
        	    }
        	    if (!isEnglishOrPunctuation(inputName)) {
        	        System.out.println("Only English allowed.");
        	        continue; 
        	    }
        	    break;
        	}
        	/*List<String> matchingNames = DBsearch.searchPlayerByName(inputName);
        	while(matchingNames.size()==0)
        	{
        		System.out.print("Enter the name to search: ");
        		inputName = scn.nextLine();
        		matchingNames = DBsearch.searchPlayerByName(inputName);
        	}      	
        		System.out.println("Matching Names:");
        		for (String fullName : matchingNames) {
        			System.out.println(fullName);
        		} */     	
        	System.out.print("Enter the name among them and press Enter : ");
            String queryInput = scn.nextLine();
            NewsFinder finder = new NewsFinder(queryInput);
        	System.out.print("Enter the searchValue: ");
            int searchValue = scn.nextInt();
            GoogleQuery googleQuery = new GoogleQuery(queryInput, searchValue);
            finder.googleQuery(queryInput);
            finder.findNewsWithKeyword();
            
            ArrayList<ResultItem> results = googleQuery.query();
            for (ResultItem result : results) {
                System.out.println(result);
              
            }
            KeywordList kLst = new KeywordList(queryInput);
            String urlStr;
            KeywordCounter counter = null;
            File file = new File("input.txt");
            Scanner fileSC = new Scanner(file);
            if (fileSC.hasNextLine()) {
                fileSC.nextLine();
            }
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
                fileSC = new Scanner(file);
                if (fileSC.hasNextLine()) {
                    fileSC.nextLine();
                }
            }
            kLst.sortAndOutput();
            PlayerStats stats = new PlayerStats(kLst.getNBAstatUrl());
            stats.getStats();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e1) {
            e1.printStackTrace();
        }
    }
}
