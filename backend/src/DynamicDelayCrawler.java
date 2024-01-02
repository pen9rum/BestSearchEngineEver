public class DynamicDelayCrawler {
    private static long delay = 500; 
    private static final long MAX_DELAY = 300; 
    private static final long MIN_DELAY = 50; 
    private static final long INCREMENT = 50; 
    private static final long DECREMENT = 10; 
    public static long getCurrentDelay() {
        return delay;
    }
    public static void main(String[] args) {
        while (true) {
            try {
                boolean success = sendRequest();
                if (!success) {
                    delay = Math.min(MAX_DELAY, delay + INCREMENT);
                } else {
                    delay = Math.max(MIN_DELAY, delay - DECREMENT);
                }
                Thread.sleep(delay); 
            } catch (InterruptedException e) {
                e.printStackTrace();
                break; 
            }
        }
    }
    private static boolean sendRequest() {
        return Math.random() > 0.2;
    }
}

