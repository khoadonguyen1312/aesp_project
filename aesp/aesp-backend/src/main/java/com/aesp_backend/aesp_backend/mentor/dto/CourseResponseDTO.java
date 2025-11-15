package com.aesp_backend.aesp_backend.mentor.dto;

import com.aesp_backend.aesp_backend.jpa.entity.OmsCourse;
import lombok.Getter;
import lombok.Setter;

import java.util.Base64;
import java.util.List;

@Getter
@Setter
public class CourseResponseDTO {
    private int id;
    private String name;
    private String description;
    private int mentorId;
    private String mentorName;
    private String mentorUsername;
    private String thumb;
    private int leason_count;

    public CourseResponseDTO(OmsCourse course) {
        if (course.getThumb() != null) {
            this.thumb = Base64.getEncoder().encodeToString(course.getThumb());
        }
        this.id = course.getId();
        this.name = course.getName();
        this.description = course.getDescription();
        if (course.getOmsLeasons() != null) {
            this.leason_count = course.getOmsLeasons().size();
        }
        if (course.getMentor() != null) {
            this.mentorId = course.getMentor().getId();
            this.mentorName = course.getMentor().getUsername();
            this.mentorUsername = course.getMentor().getUsername();
        }
    }

}
