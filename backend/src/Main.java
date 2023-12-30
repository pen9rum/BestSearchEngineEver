import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.io.File;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;

public class Main {
    public static void main(String[] args) throws KeyManagementException, NoSuchAlgorithmException {
        try {
        	AroundTheNBA aroundTheNBA = new AroundTheNBA();
    		aroundTheNBA.printAroundTheNBA();
            DatabasePlayerSearch DBsearch = new DatabasePlayerSearch();
        	Scanner scn = new Scanner(System.in);
        	System.out.print("Enter the name to search: ");
        	String inputName = scn.nextLine();
        	List<String> matchingNames = DBsearch.searchPlayerByName(inputName);
        	System.out.println("Matching Names:");
    		for (String fullName : matchingNames) {
    			System.out.println(fullName);
    		}
        	System.out.print("Enter the name among them and press Enter : ");
            String queryInput = scn.nextLine();
        	System.out.print("Enter the searchValue: ");
            int searchValue = scn.nextInt();
            
            // Create a GoogleQuery instance with user input
            GoogleQuery googleQuery = new GoogleQuery(queryInput, searchValue);

            ArrayList<ResultItem> results = googleQuery.query();
            for (ResultItem result : results) {
                System.out.println(result);
            }

            // Pass the queryInput to KeywordList constructor
            KeywordList kLst = new KeywordList(queryInput);

            String urlStr;
            KeywordCounter counter = null;
            File file = new File("input.txt");
            Scanner fileSC = new Scanner(file);

            // Skip the first line
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
                // Skip the first line
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
