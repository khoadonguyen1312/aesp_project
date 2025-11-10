package com.aesp_backend.aesp_backend.mentor.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OmsVocabularyDto {
    private String vocabulary;
    private String mean;
    private String noun;
    private String phonetic;
    private byte[] audio;
}
