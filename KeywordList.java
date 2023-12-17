import java.util.LinkedList;

public class KeywordList
{
	private LinkedList<Keyword> lst;

	public KeywordList()
	{
		this.lst = new LinkedList<Keyword>();
	}

	public void add(Keyword keyword) {
			lst.add(keyword);
	}

	public void outputScore()
	{
		float results = 0;
		for (Keyword k : lst) {
			results += k.getCount() * k.getWeight();
		}
		System.out.println(results);
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
}


