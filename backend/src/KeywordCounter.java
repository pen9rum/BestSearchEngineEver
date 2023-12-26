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

	public int BoyerMoore(String T, String P) {
		int i = P.length() -1;
		int j = P.length() -1;
	    while (i < T.length() && j >= 0) {
	        if (P.charAt(j) == T.charAt(i)) {
	            if (j == 0) {
	                return i;
	            } else {
	                i--;
	                j--;
	            }
	        } else {
	            int lastCharIndex = last(T.charAt(i), P);
	            i = i + P.length() - min(j, 1 + lastCharIndex);
	            j = P.length() - 1;
	        }
	    }

	    return -1;
	}   
    public static int last(char c, String P)
    {
        for (int i=P.length()-1; i>=0; i--)
        {
            if (P.charAt(i) == c)
            {
                return i;
            }
        }
        return -1;
    }

	public int min(int a, int b) {
		if (a < b)
			return a;
		else if (b < a)
			return b;
		else
			return a;
	}

	public int countKeyword(String keyword) {
		
		    try {
		       
		        if (content == null) {
					content = fetchContent();
				}
				content = content.toUpperCase();
				keyword = keyword.toUpperCase();

				int retVal = 0;
				
				while (this.BoyerMoore(content, keyword) != -1) {
					int appear = this.BoyerMoore(content, keyword);
					content = content.substring(appear + keyword.length() - 1);
					retVal++;
				}	
				return retVal;
				
		    } catch (IOException e) {

		        return 0; // 或者其他適當的默認值
		    }
		}

	}


