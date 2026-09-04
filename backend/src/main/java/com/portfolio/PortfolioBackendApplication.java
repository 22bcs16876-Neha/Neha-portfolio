package com.portfolio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PortfolioBackendApplication {

    public static void main(String[] args) {
        loadEnvIfPresent();
        SpringApplication.run(PortfolioBackendApplication.class, args);
    }

    private static void loadEnvIfPresent() {
        String[] possiblePaths = {"../.env", "./.env", ".env"};
        for (String p : possiblePaths) {
            java.io.File f = new java.io.File(p);
            if (f.exists() && f.isFile()) {
                try (java.io.BufferedReader br = new java.io.BufferedReader(new java.io.FileReader(f))) {
                    String line;
                    while ((line = br.readLine()) != null) {
                        line = line.trim();
                        if (line.isEmpty() || line.startsWith("#") || !line.contains("=")) {
                            continue;
                        }
                        int idx = line.indexOf('=');
                        String key = line.substring(0, idx).trim();
                        String val = line.substring(idx + 1).trim();
                        if (val.startsWith("\"") && val.endsWith("\"") && val.length() >= 2) {
                            val = val.substring(1, val.length() - 1);
                        } else if (val.startsWith("'") && val.endsWith("'") && val.length() >= 2) {
                            val = val.substring(1, val.length() - 1);
                        }
                        if (System.getProperty(key) == null && System.getenv(key) == null) {
                            System.setProperty(key, val);
                        }
                    }
                } catch (Exception e) {
                    System.err.println("Notice: Could not load .env file from " + p + ": " + e.getMessage());
                }
                break;
            }
        }
    }
}
