package NBAProFinder.demo;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
public class KeywordList
{
	private List<ResultItemWithScore> topResults = new ArrayList<>();
	private List<ResultItemWithScore> otherResults = new ArrayList<>();
	 private LinkedList<Keyword> lst;
	    private ArrayList<ResultItemWithScore> resultItemsWithScores;
	    private String NBAstatUrl;
	    private String userInput;
	    int count=0;
	    public KeywordList(String userInput) {
	        this.lst = new LinkedList<Keyword>();
	        this.resultItemsWithScores = new ArrayList<>();
	        this.userInput = userInput;
	    }
	    
	public void add(Keyword keyword) {
			lst.add(keyword);
	}
	  public String getUserInput() {
	        return userInput;
	    }

	public void addResultItemWithScore(ResultItem resultItem, float score) {
        ResultItemWithScore resultItemWithScore = new ResultItemWithScore(resultItem, score);
        resultItemsWithScores.add(resultItemWithScore);
    }
	
	/*public float calculateTotalScore2() {
    float totalScore = 0;
    for (Keyword k : lst) {
        totalScore += k.getCount() * k.getWeight();
    }
    return totalScore;
}*/
public float calculateTotalScore() {
ExecutorService executor = Executors.newFixedThreadPool(Runtime.getRuntime().availableProcessors());
List<Future<Float>> futures = new ArrayList<>();


for (Keyword k : lst) { // 使用內部的 Keyword 列表
    Callable<Float> task = () -> k.getCount() * k.getWeight();
    futures.add(executor.submit(task));
}

float totalScore = 0;
for (Future<Float> future : futures) {
    try {
        totalScore += future.get();
        if(totalScore<=-10000)
        {
        	totalScore=-30000;
        	break;
        }
        
    } catch (Exception e) {
        e.printStackTrace();
    }
}

executor.shutdown();
return totalScore;
}
	
	public String sortAndOutput(SearchGoogleDTO searchGoogleDTO) {
        String output = "";
		sort(0, resultItemsWithScores.size() - 1);
        topResults.add(new ResultItemWithScore(
                new ResultItem("WIKI " + getUserInput(), "https://en.wikipedia.org/wiki/" + getUserInput()), 
                30000 
            ));
        otherResults.add(new ResultItemWithScore(
                new ResultItem("WIKI " + getUserInput(), "https://en.wikipedia.org/wiki/" + getUserInput()), 
                30000 
            ));
        int count = 0;
        for (ResultItemWithScore resultItem : resultItemsWithScores) {
        	if(resultItem.getResultItem().getUrl().contains("nba.com/player/")) {
            	NBAstatUrl = resultItem.getResultItem().getUrl();
            }
            if (resultItem.getScore() > 0) {
                if (count < 3) {
                    topResults.add(resultItem);
                } else {
                    otherResults.add(resultItem);
                }
                count++;
            } else {
                break;
            } 
            
        }
        if(topResults.size()!=0)
        {
        	output += "Results Below are player info:";
        	for (ResultItemWithScore item : topResults) {


                output += "Score: " + (item.getScore() >= 0 ? item.getScore() : "uncalculated") +
                        " Title: " + item.getResultItem().getTitle() +
                        ", URL: " + item.getResultItem().getUrl();

                String score = (item.getScore() >= 0 ? ""+item.getScore() : "uncalculated");
                String title = item.getResultItem().getTitle();
                String url = item.getResultItem().getUrl();
                BioAndOthersDTO bioAndOthersDTO = new BioAndOthersDTO(score, title, url);

                searchGoogleDTO.setPlayerInfo(bioAndOthersDTO);
            }
        }
        else
        {
        	System.out.println("No results found"
            );
        }
        if(otherResults.size()!=0)
        {
        	output += "Results Below are other stats:";
        	for (ResultItemWithScore item : otherResults) {
                output += "Score: " + (item.getScore() >= 0 ? item.getScore() : "uncalculated") +
                        " Title: " + item.getResultItem().getTitle() +
                        ", URL: " + item.getResultItem().getUrl();

                String score = (item.getScore() >= 0 ? ""+item.getScore() : "uncalculated");
                String title = item.getResultItem().getTitle();
                String url = item.getResultItem().getUrl();
                BioAndOthersDTO bioAndOthersDTO = new BioAndOthersDTO(score, title, url);

                searchGoogleDTO.setOthers(bioAndOthersDTO);
            }
        	
        }
        else
        {
        	System.out.println("No other results found"
            );
        }
        return output;
        
    }

	public String getNBAstatUrl() {
		return NBAstatUrl;
	}
      
        
	private void printKeywordList(LinkedList<Keyword> kLst)
	{
		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < kLst.size(); i++)
		{
			Keyword k = kLst.get(i);
			if (i > 0)
				sb.append(" ");
			sb.append(k.toString());
		}
		System.out.println(sb.toString());
	}
	
	private void sort(int leftbound, int rightbound) {
        if (leftbound < rightbound) {
            int pivotIndex = partition(leftbound, rightbound);
            sort(leftbound, pivotIndex - 1);
            sort(pivotIndex + 1, rightbound);
        }
    }

    private int partition(int leftbound, int rightbound) {
        ResultItemWithScore pivot = resultItemsWithScores.get(rightbound);
        int leftIndex = leftbound;
        int rightIndex = rightbound - 1;

        while (leftIndex <= rightIndex) {
            while (leftIndex <= rightIndex && resultItemsWithScores.get(leftIndex).getScore() >= pivot.getScore()) {
                leftIndex++;
            }
            while (leftIndex <= rightIndex && resultItemsWithScores.get(rightIndex).getScore() < pivot.getScore()) {
                rightIndex--;
            }
            if (leftIndex < rightIndex) {
                swap(leftIndex, rightIndex);
            }
        }
        swap(leftIndex, rightbound);

        return leftIndex;
    }

    private void swap(int aIndex, int bIndex) {
        ResultItemWithScore temp = resultItemsWithScores.get(aIndex);
        resultItemsWithScores.set(aIndex, resultItemsWithScores.get(bIndex));
        resultItemsWithScores.set(bIndex, temp);
    }
	
	public void output()
	{
		StringBuilder sb = new StringBuilder();

		for (int i = 0; i < lst.size(); i++)
		{
			Keyword k = lst.get(i);
			if (i > 0)
				sb.append(" ");
			sb.append(k.toString());
		}

		System.out.println(sb.toString());
	}
}




