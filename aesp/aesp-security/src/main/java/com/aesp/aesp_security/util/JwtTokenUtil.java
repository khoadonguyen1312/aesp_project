package com.aesp.aesp_security.util;

import cn.hutool.core.util.StrUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JwtTokenUtil {
    private String secretkey = "dz3DqaZ7AG6g4JTLsgKxYMUvhYk2GSqyG9WmUb17S6YmFwcZAtvi6jzidEtAtXubHeu5iJrG8paUBwwoaGgKl3";
    private long expiration = 60;
    private static final String CLAIM_KEY_USERNAME = "sub";
    private static final String CLAIM_KEY_CREATED = "created";

    private String tokenhead ="Bearer ";
    private String generateToken(Map<String, Object> claims) {
        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(generateExpirationDate())
                .signWith(SignatureAlgorithm.HS512, secretkey)
                .compact();


    }

    private Date generateExpirationDate() {
        return new Date(System.currentTimeMillis() + expiration * 1000
        );
    }

    private Claims getClaimsFromToken(String token) {
        Claims claims = null;
        try {
            claims = Jwts.parser()
                    .setSigningKey(secretkey)
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {

        }
        return claims;
    }

    public String getUsernameFormToken(String token) {
        String username = null;
        try {
            Claims claims = getClaimsFromToken(token);

            username = claims.getSubject();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return username;
    }

    private Date getExpirateFromToken(String token) {
        Claims claims = getClaimsFromToken(token);
        return claims.getExpiration();
    }

    private boolean isTokenExpired(String token) {
        Date expired = getExpirateFromToken(token);
        return expired.before(new Date());

    }

    public boolean validateToken(String token, UserDetails userDetails) {
        String username = getUsernameFormToken(token);

        return (userDetails.getUsername().equalsIgnoreCase(username) && !isTokenExpired(token));
    }

    private boolean tokenRefreshJustBefore(String token, int timeInSeconds) {
        Claims claims = getClaimsFromToken(token);
        Date created = claims.get(CLAIM_KEY_CREATED, Date.class);
        Date refreshDate = new Date();

        // Tính thời gian giới hạn refresh (tức created + time giây)
        Date limit = new Date(created.getTime() + timeInSeconds * 1000L);

        // Nếu refreshDate nằm giữa created và limit thì hợp lệ
        return refreshDate.after(created) && refreshDate.before(limit);
    }

    public String generateToken(UserDetails userDetails)
    {
        Map<String,Object> claims =new HashMap<>();

        claims.put(CLAIM_KEY_USERNAME,userDetails.getUsername());
        claims.put(CLAIM_KEY_CREATED,new Date());
        return generateToken(claims);



    }

    public String refreshHeadToken(String oldToken) {
        if(StrUtil.isEmpty(oldToken)){
            return null;
        }
        String token = oldToken.substring(tokenhead.length());
        if(StrUtil.isEmpty(token)){
            return null;
        }

        Claims claims = getClaimsFromToken(token);
        if(claims==null){
            return null;
        }

        if(isTokenExpired(token)){
            return null;
        }

        if(tokenRefreshJustBefore(token,30*60)){
            return token;
        }else{
            claims.put(CLAIM_KEY_CREATED, new Date());
            return generateToken(claims);
        }
    }


}
