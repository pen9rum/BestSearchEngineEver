

public class ResultItemWithScore {
    private ResultItem resultItem;
    private float score;

    public ResultItemWithScore(ResultItem resultItem, float score) {
        this.resultItem = resultItem;
        this.score = score;
    }

    public ResultItem getResultItem() {
        return resultItem;
    }

    public float getScore() {
        return score;
    }
}

