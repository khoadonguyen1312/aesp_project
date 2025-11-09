package com.aesp_backend.aesp_backend.mentor.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class OmsCourseCreateParam {
    private String name;
    private String course_content;
    private  String required_for_learning;
    private String describe;
}
