public class DynamicDelayCrawler {

    private static long delay = 500; // 初始延迟设为500毫秒
    private static final long MAX_DELAY = 300; // 最大延迟时间
    private static final long MIN_DELAY = 50; // 最小延迟时间
    private static final long INCREMENT = 50; // 增加的延迟时间
    private static final long DECREMENT = 10; // 减少的延迟时间

    public static long getCurrentDelay() {
        return delay;
    }

    public static void main(String[] args) {
        while (true) {
            try {
                boolean success = sendRequest();

                if (!success) {
                    // 如果请求失败，增加延迟
                    delay = Math.min(MAX_DELAY, delay + INCREMENT);
                } else {
                    // 如果请求成功，则减少延迟
                    delay = Math.max(MIN_DELAY, delay - DECREMENT);
                }

                Thread.sleep(delay); // 根据当前延迟时间等待
            } catch (InterruptedException e) {
                e.printStackTrace();
                break; // 中断循环，结束程序
            }
        }
    }

    // 这里模拟发送请求的方法
    private static boolean sendRequest() {
        // 实际应用中，这里应该包含发送HTTP请求的代码
        // 以下仅作为示例：
        return Math.random() > 0.2; // 80% 概率模拟成功的请求
    }
}

