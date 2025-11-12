package com.aesp_backend.aesp_backend.mentor.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter

public class OmsLeasonDto {

    private int orderIndex;
    private String description;
    private String title;

    private byte[] pdf;
    private List<OmsVocabularyDto> vocabularies;
}
