public class Keyword {
	public String keyword;
    public float weight;
    public int count;
    
    public Keyword(String keyword, int count,float weight){
		this.keyword = keyword;
		this.weight = weight;
		this.count = count;
    }
    
    @Override
    public String toString(){
    	return "["+keyword+","+count+","+weight+"]";
    }

    public int getCount() {
    	return count;
    }
    
    public String getName()
    {
    	return keyword;
    }
    
    public float getWeight()
    {
    	return weight;
    }
}