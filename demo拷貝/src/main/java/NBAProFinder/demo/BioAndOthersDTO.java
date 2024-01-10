package NBAProFinder.demo;

import java.util.Objects;
public class BioAndOthersDTO {
    private String score;
    private String title;
    private String url;

    // 默认构造函数
    public BioAndOthersDTO() {
    }

    // 带所有参数的构造函数
    public BioAndOthersDTO(String score, String title, String url) {
        this.score = score;
        this.title = title;
        this.url = url;
    }

    // Getter 方法
    public String getScore() {
        return score;
    }

    public String getTitle() {
        return title;
    }

    public String getUrl() {
        return url;
    }

    // Setter 方法
    public void setScore(String score) {
        this.score = score;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setUrl(String url) {
        this.url = url;
    }
    // 重写 hashCode 方法
    @Override
    public int hashCode() {
        return Objects.hash(score, title, url);
    }
}
