package com.aesp_backend.aesp_backend.common.api;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Component
public class SaveVideoReturnUrl {

    public String geturl(MultipartFile file, String folder) throws IOException {
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path path = Paths.get("uploads/" + folder + "/" + fileName);
        Files.createDirectories(path.getParent());
        Files.write(path, file.getBytes());
        return "http://localhost:8080/" + folder + "/" + fileName;
    }
}
