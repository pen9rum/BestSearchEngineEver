import java.util.ArrayList;
import java.util.List;

public class HomePageLink {
    private String title;
    private String content;
    private String absHrefValue;
    private String photoSrc;

    // Static list to hold all HomePageLinks
    private static final List<HomePageLink> links = new ArrayList<>();

    // Constructor
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

    // Static method to add a new HomePageLink to the list
    public static void add(String title, String content, String absHrefValue, String photoSrc) {
        HomePageLink newLink = new HomePageLink(title, content, absHrefValue, photoSrc);
        links.add(newLink);
    }

    // Method to get all HomePageLinks
    public static List<HomePageLink> getAllLinks() {
        return new ArrayList<>(links); // Return a copy of the list
    }
}