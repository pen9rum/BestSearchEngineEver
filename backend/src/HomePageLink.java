import java.util.ArrayList;
import java.util.List;

public class HomePageLink {
    private String title;
    private String content;
    private String absHrefValue;
    private String photoSrc;

    private static final List<HomePageLink> links = new ArrayList<>();
    public HomePageLink(String title, String content, String absHrefValue, String photoSrc) {
        this.title = title;
        this.content = content;
        this.absHrefValue = absHrefValue;
        this.photoSrc = photoSrc;
    }

    // Getter methods
    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public String getAbsHrefValue() {
        return absHrefValue;
    }

    public String getPhotoSrc() {
        return photoSrc;
    }
    public static void add(String title, String content, String absHrefValue, String photoSrc) {
        HomePageLink newLink = new HomePageLink(title, content, absHrefValue, photoSrc);
        links.add(newLink);
    }
    public static List<HomePageLink> getAllLinks() {
        return new ArrayList<>(links); 
    }
}