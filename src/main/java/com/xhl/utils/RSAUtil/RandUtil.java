package com.xhl.utils.RSAUtil;
import java.util.Random;


public class RandUtil {
	
	public String  randKey() {

		Random r=new Random();
		String code="";
		
		for(int i=0;i<9;++i)
		{
			if(i%2==0) //偶数位生产随机整数
			{
				code=code+r.nextInt(10);
			}
			else//奇数产生随机字母包括大小写
			{
				int temp=r.nextInt(52);
				char x=(char)(temp<26?temp+97:(temp%26)+65);
				code+=x;
			}
		}

		System.out.println(code);
		return code;
	}
	
	/**将二进制转换成16进制 
	* @param buf 
	* @return  String
	*/  
	public  String parseByte2HexStr(byte buf[]) {  
	       StringBuffer sb = new StringBuffer();  
	       for (int i = 0; i < buf.length; i++) {  
	               String hex = Integer.toHexString(buf[i] & 0xFF);  
	               if (hex.length() == 1) {  
	                       hex = '0' + hex;  
	               }  
	               sb.append(hex.toUpperCase());  
	       }  
	       return sb.toString();  
	}
	/**将16进制转换为二进制 
	* @param hexStr 
	* @return  byte[]
	*/  
	public  byte[] parseHexStr2Byte(String hexStr) {  
	       if (hexStr.length() < 1)  
	               return null;  
	       byte[] result = new byte[hexStr.length()/2];  
	       for (int i = 0;i< hexStr.length()/2; i++) {  
	               int high = Integer.parseInt(hexStr.substring(i*2, i*2+1), 16);  
	               int low = Integer.parseInt(hexStr.substring(i*2+1, i*2+2), 16);  
	               result[i] = (byte) (high * 16 + low);  
	       }  
	       return result;  
	}  
	
	public static void main(String[] args) {
		RandUtil rand = new RandUtil();
	}

}
