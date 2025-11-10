package com.aesp_backend.aesp_backend.mentor.dto;

import java.util.List;

public class OmsCourseDto {

    private String name;
    private byte[] thumb;
    private String courseContent;
    private String requiredForLearning;
    private byte video;
    private String description;
    private List<OmsLeasonDto> leasons;
}


//{

//        "name": "English Speaking Mastery",
//        "thumb": "iVBORw0KGgoAAAANSUhEUgAA...",
//        "courseContent": "This course includes 10 lessons covering daily English conversations.",
//        "requiredForLearning": "Basic English level A2 or higher.",
//        "video": 1,
//        "description": "A full guide to mastering spoken English with real-life examples.",
//        "leasons": [
//        {

//        "orderIndex": 1,
//        "description": "Introduction to greetings and self-introduction in English.",
//        "title": "Lesson 1: Greetings",
//        "video": "AAAAIGZ0eXBpc29tAAACAGlzb20ybXA0MQAA...",
//        "pdf": "JVBERi0xLjQKJcfs...",
//        "vocabularies": [
//        {

//        "vocabulary": "Hello",
//        "mean": "Xin chào",
//        "noun": "Interjection",
//        "phonetic": "/həˈləʊ/",
//        "audio": "UklGRlIAAABXQVZFZm10IBAAAAABAAEA..."
//        },
//        {

//        "vocabulary": "Good morning",
//        "mean": "Chào buổi sáng",
//        "noun": "Phrase",
//        "phonetic": "/ɡʊd ˈmɔː.nɪŋ/",
//        "audio": "UklGRlIAAABXQVZFZm10IBAAAAABAAEA..."
//        }
//        ]
//        },
//        {

//        "orderIndex": 2,
//        "description": "Learn how to introduce yourself with confidence.",
//        "title": "Lesson 2: Introducing Yourself",
//        "video": "AAAAIGZ0eXBpc29tAAACAGlzb20ybXA0MQAA...",
//        "pdf": "JVBERi0xLjQKJcfs...",
//        "vocabularies": []
//        }
//        ]
//        }
