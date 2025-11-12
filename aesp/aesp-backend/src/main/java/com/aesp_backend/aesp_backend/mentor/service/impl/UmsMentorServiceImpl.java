package com.aesp_backend.aesp_backend.mentor.service.impl;

import com.aesp_backend.aesp_backend.jpa.cache.UmsRoleCache;
import com.aesp_backend.aesp_backend.jpa.entity.*;
import com.aesp_backend.aesp_backend.jpa.respository.OmsCourseRepository;
import com.aesp_backend.aesp_backend.jpa.respository.UmsMemberRepository;
import com.aesp_backend.aesp_backend.jpa.respository.UmsMentorDataRepository;
import com.aesp_backend.aesp_backend.mentor.dto.OmsCourseDto;
import com.aesp_backend.aesp_backend.mentor.dto.UmsMentorDto;
import com.aesp_backend.aesp_backend.mentor.service.UmsMentorService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UmsMentorServiceImpl implements UmsMentorService {

    private Logger logger = LoggerFactory.getLogger(UmsMentorServiceImpl.class);
    @Autowired
    private OmsCourseRepository omsCourseRepository;
    @Autowired
    private UmsMemberRepository umsMemberRepository;
    @Autowired
    private UmsRoleCache umsRoleCache;
    @Autowired
    private UmsMentorDataRepository umsMentorDataRepository;


    @Override
    public int deleteCourse(int id) {

        Optional<OmsCourse> omsCourseOpt = omsCourseRepository.findById(Long.valueOf(id));
        if (omsCourseOpt.isPresent()) {
            omsCourseRepository.delete(omsCourseOpt.get());
            return 1;
        }
        return 0;

    }

    @Override
    public OmsCourse createCourse(OmsCourseDto omsCourseDto) {
        OmsCourse omsCourse = new OmsCourse();
        BeanUtils.copyProperties(omsCourseDto, omsCourse);

        // Thumb
        if (omsCourseDto.getThumb() != null) {
            omsCourse.setThumb(Base64.getDecoder().decode(omsCourseDto.getThumb()));
        }

        // Lessons
        if (omsCourseDto.getLeasons() != null && !omsCourseDto.getLeasons().isEmpty()) {
            List<OmsLeason> lessons = omsCourseDto.getLeasons().stream().map(dto -> {
                OmsLeason lesson = new OmsLeason();
                BeanUtils.copyProperties(dto, lesson);

                if (dto.getPdf() != null) {
                    lesson.setPdf(Base64.getDecoder().decode(dto.getPdf()));
                }


                // Vocabularies (Set)
                if (dto.getVocabularies() != null && !dto.getVocabularies().isEmpty()) {
                    Set<OmsVocabulary> vocabularies = dto.getVocabularies().stream().map(vocabDto -> {
                        OmsVocabulary vocab = new OmsVocabulary();
                        BeanUtils.copyProperties(vocabDto, vocab);
                        if (vocabDto.getAudio() != null) {
                            vocab.setAudio(Base64.getDecoder().decode(vocabDto.getAudio()));
                        }
                        return vocab;
                    }).collect(Collectors.toSet());
                    lesson.setOmsVocabulary(vocabularies);
                }

                lesson.setOmsCourse(omsCourse);
                return lesson;
            }).toList();
            omsCourse.setOmsLeasons(lessons);
        }

        return omsCourseRepository.save(omsCourse);
    }

    @Override
    public OmsCourse updateCourse(int id, OmsCourseDto omsCourseDto) {
        Optional<OmsCourse> omsCourseOptional = omsCourseRepository.findById(Long.valueOf(id));
        if (omsCourseOptional.isEmpty()) {
            return null;
        }

        OmsCourse omsCourse = omsCourseOptional.get();
        BeanUtils.copyProperties(omsCourseDto, omsCourse);

        // Thumb
        if (omsCourseDto.getThumb() != null) {
            omsCourse.setThumb(Base64.getDecoder().decode(omsCourseDto.getThumb()));
        }

        // Lessons
        if (omsCourseDto.getLeasons() != null && !omsCourseDto.getLeasons().isEmpty()) {
            List<OmsLeason> lessons = omsCourseDto.getLeasons().stream().map(dto -> {
                OmsLeason lesson = new OmsLeason();
                BeanUtils.copyProperties(dto, lesson);

                if (dto.getPdf() != null) {
                    lesson.setPdf(Base64.getDecoder().decode(dto.getPdf()));
                }

                // Vocabularies (Set)
                if (dto.getVocabularies() != null && !dto.getVocabularies().isEmpty()) {
                    Set<OmsVocabulary> vocabularies = dto.getVocabularies().stream().map(vocabDto -> {
                        OmsVocabulary vocab = new OmsVocabulary();
                        BeanUtils.copyProperties(vocabDto, vocab);
                        if (vocabDto.getAudio() != null) {
                            vocab.setAudio(Base64.getDecoder().decode(vocabDto.getAudio()));
                        }
                        return vocab;
                    }).collect(Collectors.toSet());
                    lesson.setOmsVocabulary(vocabularies);
                }

                lesson.setOmsCourse(omsCourse);
                return lesson;
            }).toList();
            omsCourse.setOmsLeasons(lessons);
        }

        return omsCourseRepository.save(omsCourse);
    }


    @Override
    public OmsCourse getCourse(int id) {
        Optional<OmsCourse> omsCourse = omsCourseRepository.findById(Long.valueOf(id));
        if (omsCourse.isEmpty()) {
            return null;
        }
        return omsCourse.get();
    }

    @Override
    public UmsMember register(UmsMentorDto umsMentorDto) {

        if (umsMemberRepository.existsByUsername(umsMentorDto.getUsername()) || umsMemberRepository.existsByEmail(umsMentorDto.getEmail())) {
            return null;
        }
        UmsMember umsMember = new UmsMember();
        UmsMentorData umsMentorData = new UmsMentorData();
        BeanUtils.copyProperties(umsMentorDto, umsMember);
        BeanUtils.copyProperties(umsMentorDto, umsMentorData);

        umsMentorData.setDay_join(LocalDateTime.now());

        umsMember.setUmsRoles(umsRoleCache.MENTOR_ROLE());

        umsMember.setUmsMentorData(umsMentorData);
        umsMentorDataRepository.save(umsMentorData);

        umsMemberRepository.save(umsMember);
        return umsMember;
    }
}
