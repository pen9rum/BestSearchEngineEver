import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class KeywordList
{
	private LinkedList<Keyword> lst;
	private ArrayList<ResultItemWithScore> resultItemsWithScores;

	public KeywordList()
	{
		this.lst = new LinkedList<Keyword>();
		this.resultItemsWithScores = new ArrayList<>();
	}

	public void add(Keyword keyword) {
			lst.add(keyword);
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
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        executor.shutdown();
        return totalScore;
    }
	
	public void sortAndOutput() {
        // Sort the list by score in descending order
        sort(0, resultItemsWithScores.size() - 1);

        // Output title, URL, and score for each keyword
        for (ResultItemWithScore resultItem : resultItemsWithScores) {
            System.out.println("Score: " + resultItem.getScore() + ", Title: " + resultItem.getResultItem().getTitle() +
                    ", URL: " + resultItem.getResultItem().getUrl()
                    );
        }
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
	
	/*public void sort()
	{
		if (lst.size() == 0)
		{
			System.out.println("InvalidOperation");
		}
		else
		{
			quickSort(0, lst.size() - 1);
		}
	}

	// YOUR TURN
	// 1. Implement QuickSort algorithm
	// We assume that you are using an in-place approach, hence the return type is
	// void. If you prefer to use a different approach, you can modify this return
	// type (e.g., change it to return ArrayList<Keyword>)
	private void quickSort(int leftbound, int rightbound)
	{
		 if (leftbound >= rightbound) {
		         return;
		     }
		     Keyword pivot = lst.get(rightbound);
		     int leftIndex = leftbound;
		     int rightIndex = rightbound - 1;

		     while (leftIndex <= rightIndex) {
		         while (leftIndex <= rightIndex && lst.get(leftIndex).count <= pivot.count) {
		             leftIndex++;
		         }
		         while (leftIndex <= rightIndex && lst.get(rightIndex).count > pivot.count) {
		             rightIndex--;
		         }
		         if (leftIndex < rightIndex) {
		             swap(leftIndex, rightIndex);   //把小的往前跟大的換
		         }
		     }
		     swap(leftIndex, rightbound);    //把大的跟pivot換
		     quickSort(leftbound, leftIndex - 1);
		     quickSort(leftIndex + 1, rightbound);
	}

	private void swap(int aIndex, int bIndex)
	{
		Keyword temp = lst.get(aIndex);
		lst.set(aIndex, lst.get(bIndex));
		lst.set(bIndex, temp);
	}*/

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


