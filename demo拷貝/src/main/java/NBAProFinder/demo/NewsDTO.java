package NBAProFinder.demo;

import java.util.Objects;

class NewsDTO{
    private String title;
    private String content;
    private String date;

    public void setTitle(String title){
        this.title = title;
    }

    public void setContent(String content){
        this.content = content;
    }

    public void setDate(String date){
        this.date = date;
    }

    public String getTitle(){
        return this.title;
    }

    public String getContent(){
        return this.content;
    }

    public String getDate(){
        return this.date;
    }

    @Override
    public int hashCode() {
        return Objects.hash(title, content, date);
    }
}