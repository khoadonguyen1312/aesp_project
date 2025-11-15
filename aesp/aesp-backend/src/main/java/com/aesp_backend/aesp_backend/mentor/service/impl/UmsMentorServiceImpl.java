package com.aesp_backend.aesp_backend.mentor.service.impl;

import com.aesp_backend.aesp_backend.jpa.cache.UmsRoleCache;
import com.aesp_backend.aesp_backend.jpa.entity.*;
import com.aesp_backend.aesp_backend.jpa.respository.OmsCourseRepository;
import com.aesp_backend.aesp_backend.jpa.respository.UmsMemberRepository;
import com.aesp_backend.aesp_backend.jpa.respository.UmsMentorDataRepository;
import com.aesp_backend.aesp_backend.mentor.dto.OmsCourseDto;
import com.aesp_backend.aesp_backend.mentor.dto.OmsLeasonDto;
import com.aesp_backend.aesp_backend.mentor.dto.OmsVocabularyDto;
import com.aesp_backend.aesp_backend.mentor.dto.UmsMentorDto;
import com.aesp_backend.aesp_backend.mentor.service.UmsMentorService;
import com.aesp_backend.aesp_backend.security.component.GetCurrentUmsMember;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.*;
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
    @Autowired
    private GetCurrentUmsMember getCurrentUmsMember;

    @Override
    public int deleteCourse(int id) {

        Optional<OmsCourse> omsCourseOpt = omsCourseRepository.findById(id);
        if (omsCourseOpt.isPresent()) {
            omsCourseRepository.delete(omsCourseOpt.get());
            return 1;
        }
        return 0;

    }

    @Override
    public OmsCourse createCourse(OmsCourseDto omsCourseDto) {
        logger.debug("dang bat dau tao course");
        OmsCourse omsCourse = new OmsCourse();
        logger.debug(omsCourseDto.getDescription());
        logger.debug(omsCourseDto.getRequiredForLearning());
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
        logger.debug("tao course thanh cong");
        omsCourse.setRequired_for_learning(omsCourseDto.getRequiredForLearning());
        omsCourse.setCourse_content(omsCourseDto.getCourseContent());
        omsCourse.setMentor(getCurrentUmsMember.getMember());

        return omsCourseRepository.save(omsCourse);
    }

    @Override
    public OmsCourse updateCourse(int id, OmsCourseDto omsCourseDto) {
        logger.debug("dang update khoa hoc");
        Optional<OmsCourse> omsCourseOptional = omsCourseRepository.findById(id);
        if (omsCourseOptional.isEmpty()) {
            return null;
        }

        OmsCourse omsCourse = omsCourseOptional.get();

        // Lưu reference cũ để xử lý
        List<OmsLeason> oldLessons = omsCourse.getOmsLeasons();

        // Copy các thuộc tính cơ bản (không copy collection)
        BeanUtils.copyProperties(omsCourseDto, omsCourse, "leasons", "thumb");

        // Thumb - chỉ update nếu có giá trị mới
        if (omsCourseDto.getThumb() != null && !omsCourseDto.getThumb().isEmpty()) {
            try {
                omsCourse.setThumb(Base64.getDecoder().decode(omsCourseDto.getThumb()));
            } catch (IllegalArgumentException e) {
                logger.error("Invalid Base64 for thumb", e);
                // Giữ nguyên thumb cũ nếu Base64 không hợp lệ
            }
        }

        // Lessons - tạo MUTABLE list
        if (omsCourseDto.getLeasons() != null && !omsCourseDto.getLeasons().isEmpty()) {
            // Xóa các lesson cũ nếu cần
            if (oldLessons != null) {
                oldLessons.clear(); // Clear để JPA xử lý orphan removal
            }

            // Tạo MUTABLE ArrayList thay vì immutable List.of() hoặc .toList()
            List<OmsLeason> lessons = new ArrayList<>();

            for (OmsLeasonDto dto : omsCourseDto.getLeasons()) {
                OmsLeason lesson = new OmsLeason();
                BeanUtils.copyProperties(dto, lesson, "pdf", "video", "vocabularies");

                // PDF - chỉ update nếu có giá trị mới
                if (dto.getPdf() != null && !dto.getPdf().isEmpty()) {
                    try {
                        lesson.setPdf(Base64.getDecoder().decode(dto.getPdf()));
                    } catch (IllegalArgumentException e) {
                        logger.error("Invalid Base64 for PDF in lesson: " + dto.getTitle(), e);
                    }
                }


                // Vocabularies - tạo MUTABLE HashSet
                if (dto.getVocabularies() != null && !dto.getVocabularies().isEmpty()) {
                    Set<OmsVocabulary> vocabularies = new HashSet<>();

                    for (OmsVocabularyDto vocabDto : dto.getVocabularies()) {
                        OmsVocabulary vocab = new OmsVocabulary();
                        BeanUtils.copyProperties(vocabDto, vocab, "audio");

                        // Audio - chỉ update nếu có giá trị mới
                        if (vocabDto.getAudio() != null) {
                            try {
                                vocab.setAudio(Base64.getDecoder().decode(vocabDto.getAudio()));
                            } catch (IllegalArgumentException e) {
                                logger.error("Invalid Base64 for Audio in vocabulary: " + vocabDto.getVocabulary(), e);
                            }
                        }

                        vocabularies.add(vocab);
                    }

                    lesson.setOmsVocabulary(vocabularies);
                }

                lesson.setOmsCourse(omsCourse);
                lessons.add(lesson);
            }

            omsCourse.setOmsLeasons(lessons);
        }

        omsCourse.setMentor(getCurrentUmsMember.getMember());

        return omsCourseRepository.save(omsCourse);
    }

    @Override
    public List<OmsCourse> listCourse() {
        List<OmsCourse> omsCourses = omsCourseRepository.findByMentorUsername(getCurrentUmsMember.getMember().getUsername());
        for (var i : omsCourses) {
            logger.debug(i.getName());
        }
        return omsCourses;
    }

    @Override
    public OmsCourse getCourse(int id) {
        Optional<OmsCourse> omsCourse = omsCourseRepository.findById(id);
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
