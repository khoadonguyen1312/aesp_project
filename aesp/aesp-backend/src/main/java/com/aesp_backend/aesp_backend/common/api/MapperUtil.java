package com.aesp_backend.aesp_backend.common.api;

import com.aesp_backend.aesp_backend.jpa.entity.OmsCourse;
import com.aesp_backend.aesp_backend.jpa.entity.OmsLeason;
import com.aesp_backend.aesp_backend.jpa.entity.OmsVocabulary;
import com.aesp_backend.aesp_backend.mentor.dto.OmsCourseDto;
import com.aesp_backend.aesp_backend.mentor.dto.OmsLeasonDto;
import com.aesp_backend.aesp_backend.mentor.dto.OmsVocabularyDto;
import org.springframework.beans.BeanUtils;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class MapperUtil {
    /*** Course <-> CourseDto ***/
    public static OmsCourseDto toCourseDto(OmsCourse course) {
        if (course == null) return null;

        OmsCourseDto courseDto = new OmsCourseDto();
        BeanUtils.copyProperties(course, courseDto);

        if (course.getOmsLeasons() != null) {
            List<OmsLeasonDto> lessonsDto = course.getOmsLeasons().stream()
                    .map(MapperUtil::toLeasonDto)
                    .collect(Collectors.toList());
            courseDto.setLeasons(lessonsDto);
        }

        if (course.getThumb() != null) {
            courseDto.setThumb(course.getThumb());
        }

        return courseDto;
    }

    public static OmsCourse toCourse(OmsCourseDto courseDto) {
        if (courseDto == null) return null;

        OmsCourse course = new OmsCourse();
        BeanUtils.copyProperties(courseDto, course);

        if (courseDto.getLeasons() != null) {
            List<OmsLeason> lessons = courseDto.getLeasons().stream()
                    .map(MapperUtil::toLeason)
                    .collect(Collectors.toList());
            course.setOmsLeasons(lessons);
        }

        return course;
    }

    /*** Leason <-> LeasonDto ***/
    public static OmsLeasonDto toLeasonDto(OmsLeason leason) {
        if (leason == null) return null;

        OmsLeasonDto dto = new OmsLeasonDto();
        BeanUtils.copyProperties(leason, dto);

        if (leason.getOmsVocabulary() != null && !leason.getOmsVocabulary().isEmpty()) {
            List<OmsVocabularyDto> vocabsDto = leason.getOmsVocabulary().stream()
                    .map(MapperUtil::toVocabularyDto)
                    .collect(Collectors.toList());
            dto.setVocabularies(vocabsDto);
        }

        if (leason.getPdf() != null) {
            dto.setPdf(leason.getPdf());
        }

        return dto;
    }

    public static OmsLeason toLeason(OmsLeasonDto dto) {
        if (dto == null) return null;

        OmsLeason leason = new OmsLeason();
        BeanUtils.copyProperties(dto, leason);

        if (dto.getVocabularies() != null && !dto.getVocabularies().isEmpty()) {
            Set<OmsVocabulary> vocabs = dto.getVocabularies().stream()
                    .map(MapperUtil::toVocabulary)
                    .collect(Collectors.toSet());
            leason.setOmsVocabulary(vocabs);
        }

        return leason;
    }

    /*** Vocabulary <-> VocabularyDto ***/
    public static OmsVocabularyDto toVocabularyDto(OmsVocabulary vocab) {
        if (vocab == null) return null;

        OmsVocabularyDto dto = new OmsVocabularyDto();
        BeanUtils.copyProperties(vocab, dto);

        if (vocab.getAudio() != null) {
            dto.setAudio(vocab.getAudio());
        }

        return dto;
    }

    public static OmsVocabulary toVocabulary(OmsVocabularyDto dto) {
        if (dto == null) return null;

        OmsVocabulary vocab = new OmsVocabulary();
        BeanUtils.copyProperties(dto, vocab);

        if (dto.getAudio() != null) {
            vocab.setAudio(dto.getAudio());
        }

        return vocab;
    }

    /*** Map list of courses to DTOs ***/
    public static List<OmsCourseDto> toCourseDtoList(List<OmsCourse> courses) {
        return courses.stream().map(MapperUtil::toCourseDto).collect(Collectors.toList());
    }

    public static List<OmsCourse> toCourseList(List<OmsCourseDto> dtos) {
        return dtos.stream().map(MapperUtil::toCourse).collect(Collectors.toList());
    }
}
