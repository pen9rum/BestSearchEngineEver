package NBAProFinder.demo;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
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
    	List<String> matchingNames = DBsearch.searchPlayerByName(name);
    	return matchingNames;
    }
    @PostMapping("/searchGoogle")
    public String searchGoogle(@RequestBody String fullname) throws IOException, InterruptedException {
        
    	// 在這裡使用 frontendInput 進行後續處理
    	String output;
    	NewsFinder finder = new NewsFinder(fullname);
        GoogleQuery googleQuery = new GoogleQuery(fullname, 30);
        finder.googleQuery(fullname);
        output = finder.findNewsWithKeyword();
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
        output += kLst.sortAndOutput();
    	return output ;
    }
    @PostMapping("/searchStats")
    public String searchStats(@RequestBody String url) throws InterruptedException {
        // 在這裡使用 frontendInput 進行後續處理
    	PlayerStats stats = new PlayerStats(kLst.getNBAstatUrl());
    	return stats.getStats();
    }
   
    
    @RestController
    @RequestMapping("/api/nba")
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

