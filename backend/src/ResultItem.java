
public class ResultItem {
    private String title;
    private String url;

    public ResultItem(String title, String url) {
        this.title = title;
        this.url = url;
    }

    public String getTitle() {
        return title;
    }

    public String getUrl() {
        return url;
    }

    @Override
    public String toString() {
        return "Title: " + title + " , URL: " + url;
    }
}
