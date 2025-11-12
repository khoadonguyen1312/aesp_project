package com.aesp_backend.aesp_backend.mentor.service.impl;

import com.aesp_backend.aesp_backend.jpa.cache.UmsRoleCache;
import com.aesp_backend.aesp_backend.jpa.entity.OmsCourse;
import com.aesp_backend.aesp_backend.jpa.entity.UmsMember;
import com.aesp_backend.aesp_backend.jpa.entity.UmsMentorData;
import com.aesp_backend.aesp_backend.jpa.respository.OmsCourseRepository;
import com.aesp_backend.aesp_backend.jpa.respository.UmsMemberRepository;
import com.aesp_backend.aesp_backend.jpa.respository.UmsMentorDataRepository;
import com.aesp_backend.aesp_backend.mentor.dto.OmsCourseDto;
import com.aesp_backend.aesp_backend.mentor.dto.UmsMentorDto;
import com.aesp_backend.aesp_backend.mentor.service.UmsMentorService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDateTime;

@Service
public class UmsMentorServiceImpl implements UmsMentorService {
    @Autowired
    private OmsCourseRepository omsCourseRepository;
    @Autowired
    private UmsMemberRepository umsMemberRepository;
    @Autowired
    private UmsRoleCache umsRoleCache;
    @Autowired
    private UmsMentorDataRepository umsMentorDataRepository;

    @Override
    public OmsCourse createCourse(OmsCourseDto omsCourseDto) {
        OmsCourse omsCourse = new OmsCourse();
        BeanUtils.copyProperties(omsCourseDto, omsCourse);

        omsCourseRepository.save(omsCourse);
        return omsCourse;
    }

    @Override
    public int deleteCourse(int id) {
        return 0;
    }

    @Override
    public OmsCourse updateCourse(int id) {
        return null;
    }

    @Override
    public OmsCourse getCourse(int id) {
        return null;
    }

    @Override
    public UmsMember register(UmsMentorDto umsMentorDto) {

        if (umsMemberRepository.existsByUsername(umsMentorDto.getUsername()) || umsMemberRepository.existsByEmail(umsMentorDto.getEmail())) {
            return null;
        }
        UmsMember umsMember = new UmsMember();
        UmsMentorData umsMentorData = new
                UmsMentorData();
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
