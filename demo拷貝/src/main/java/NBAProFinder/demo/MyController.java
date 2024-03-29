package NBAProFinder.demo;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class MyController {
	
	private KeywordList kLst;
	
	public static boolean isEnglishOrPunctuation(String text) {
	        return text.matches("^[a-zA-Z\\s.,!?()-_]+$");
	    }
   
    @PostMapping("/searchFullname")
    public List searchFullname(@RequestBody String firstname) {
        // 在這裡使用 frontendInput 進行後續處理
    	
    	String name = firstname;
    	DatabasePlayerSearch DBsearch = new DatabasePlayerSearch();
        System.out.println(name);
    	List<String> matchingNames = DBsearch.searchPlayerByName(name);
    	return matchingNames;
    }
    @PostMapping("/searchGoogle")
    public SearchGoogleDTO searchGoogle(@RequestBody String fullname) throws IOException, InterruptedException {
        System.out.println("Search Google: "+ fullname);
    	// 在這裡使用 frontendInput 進行後續處理
    	String output;
    	NewsFinder finder = new NewsFinder(fullname);
        GoogleQuery googleQuery = new GoogleQuery(fullname, 30);
        finder.googleQuery(fullname);

        SearchGoogleDTO searchGoogleDTO = new SearchGoogleDTO();
        output = finder.findNewsWithKeyword(searchGoogleDTO);

        ArrayList<ResultItem> results = googleQuery.query();
        kLst = new KeywordList(fullname);
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
        output += kLst.sortAndOutput(searchGoogleDTO);
        System.out.println(output);
    	return searchGoogleDTO ;
    }
    @PostMapping("/searchStats")
    public StatsDTO searchStats() throws InterruptedException {
        System.out.println("Search stats");
        // 在這裡使用 frontendInput 進行後續處理
        String url = kLst.getNBAstatUrl();
        System.out.println(url);
    	PlayerStats stats = new PlayerStats(url);
        StatsDTO output = stats.getStats();
//        System.out.println(output);
    	return output;
    }
   
    
    @RestController
    @RequestMapping("/api/nba")
    @CrossOrigin(origins = "*")
    public class NBAController {

        private final AroundTheNBA aroundTheNBA;

        public NBAController() {
            this.aroundTheNBA = new AroundTheNBA();
            aroundTheNBA.fetchNBAData();
        }

        @GetMapping("/links")
        public List<HomePageLink> getHomePageLinks() {
            return aroundTheNBA.getLinks();
        }
    }
}

