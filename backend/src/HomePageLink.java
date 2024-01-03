
public class HomePageLink {
	public String title;
    public String content;
    public String absHrefValue;
    public String photoSrc;
    public HomePageLink(String title, String content,String absHrefValue,String photoSrc){
		this.title = title;
		this.absHrefValue = absHrefValue;
		this.content = content;
		this.photoSrc = photoSrc;
    }
    
    public String getabsHrefValue() {
    	return absHrefValue;
    }

    public String getContent() {
    	return content;
    }
    
    public String getName()
    {
    	return title;
    }
    
    public String getWeight()
    {
    	return photoSrc;
    }
}
