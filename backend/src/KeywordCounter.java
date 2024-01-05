import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLDecoder;

import javax.net.ssl.HttpsURLConnection;

public class KeywordCounter {
	private String urlStr;
	private String content;

	public KeywordCounter(String urlStr) {
		this.urlStr = urlStr;
	}

	private String fetchContent() throws IOException {
		URL url = new URL(this.urlStr);
		
		URLConnection conn = url.openConnection();
		
		InputStream in = conn.getInputStream();
		BufferedReader br = new BufferedReader(new InputStreamReader(in));

		String retVal = "";

		String line = null;

		while ((line = br.readLine()) != null) {
			retVal = retVal + line + "\n";
		}

		return retVal;
	}

	 public int countKeyword(String keyword) {
	        try {
	            if (content == null) {
	                content = fetchContent();
	            }
	            content = content.toUpperCase();
	            keyword = keyword.toUpperCase();

	            return KMP(content, keyword);
	        } catch (IOException e) {
	            return 0; 
	        }
	    }
	    public int KMP(String text, String pattern) {
	        int[] lps = computeLPSArray(pattern);
	        int j = 0; 
	        int count = 0; 
	        for (int i = 0; i < text.length(); ) {
	            if (pattern.charAt(j) == text.charAt(i)) {
	                j++;
	                i++;
	            }
	            if (j == pattern.length()) {
	                count++; // Found pattern
	                j = lps[j - 1];
	            } else if (i < text.length() && pattern.charAt(j) != text.charAt(i)) {
	                if (j != 0) {
	                    j = lps[j - 1];
	                } else {
	                    i++;
	                }
	            }
	        }
	        return count;
	    }

	    private int[] computeLPSArray(String pattern) {
	        int[] lps = new int[pattern.length()];
	        int length = 0; // length of the previous longest prefix suffix
	        int i = 1;
	        lps[0] = 0; // lps[0] is always 0

	        while (i < pattern.length()) {
	            if (pattern.charAt(i) == pattern.charAt(length)) {
	                length++;
	                lps[i] = length;
	                i++;
	            } else {
	                if (length != 0) {
	                    length = lps[length - 1];
	                } else {
	                    lps[i] = length;
	                    i++;
	                }
	            }
	        }
	        return lps;
	    }


	}
