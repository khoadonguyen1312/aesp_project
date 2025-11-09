import React, { useState, useRef } from "react";
import { Button, Card, Progress, Typography, Alert } from "antd";

const { Title, Text } = Typography;
const SENTENCE = "The weather is nice today";

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({length: m+1}, () => Array(n+1).fill(0));
  for (let i=0;i<=m;i++) dp[i][0]=i;
  for (let j=0;j<=n;j++) dp[0][j]=j;
  for (let i=1;i<=m;i++){
    for (let j=1;j<=n;j++){
      dp[i][j] = Math.min(
        dp[i-1][j]+1,
        dp[i][j-1]+1,
        dp[i-1][j-1] + (a[i-1]===b[j-1] ? 0 : 1)
      );
    }
  }
  return dp[m][n];
}

export default function PronunciationPractice() {
  const [recognizedText, setRecognizedText] = useState("");
  const [score, setScore] = useState(null);
  const [recording, setRecording] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const recognitionRef = useRef(null);

  const calculateScore = (original, spoken) => {
    if (!spoken) return 0;
    // compare at character level with Levenshtein normalized
    const a = original.toLowerCase().trim();
    const b = spoken.toLowerCase().trim();
    const dist = levenshtein(a, b);
    const maxLen = Math.max(a.length, b.length) || 1;
    const similarity = Math.max(0, 100 - Math.round((dist / maxLen) * 100));
    return similarity;
  };

  const startRecording = () => {
    setErrMsg(null);
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      setErrMsg("Trình duyệt không hỗ trợ Web Speech API (SpeechRecognition). Dùng Chrome/Edge trên localhost hoặc HTTPS.");
      return;
    }

    try {
      const recognition = new SpeechRec();
      recognition.lang = "en-US";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        console.log("Speech recognition started");
        setRecording(true);
        setRecognizedText("");
        setScore(null);
      };

      recognition.onresult = (evt) => {
        console.log("onresult", evt);
        const transcript = Array.from(evt.results)
          .map(r => r[0].transcript)
          .join(" ");
        setRecognizedText(transcript);
        const newScore = calculateScore(SENTENCE, transcript);
        setScore(newScore);
      };

      recognition.onerror = (e) => {
        console.error("recognition.onerror", e);
        setErrMsg(`Lỗi nhận diện: ${e.error || e.message || JSON.stringify(e)}`);
      };

      recognition.onend = () => {
        console.log("Speech recognition ended");
        setRecording(false);
      };

      recognition.start();
      recognitionRef.current = recognition;
    } catch (e) {
      console.error(e);
      setErrMsg("Không thể khởi tạo SpeechRecognition: " + e.message);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.warn("stop error", e);
      }
      setRecording(false);
    }
  };

  return (
    <div style={{ padding: 30, display: "flex", justifyContent: "center" }}>
      <Card style={{ width: 560, borderRadius: 12, textAlign: "center" }}>
        <Title level={4}>🎧 Luyện phát âm</Title>
        <p style={{ fontSize: 18 }}><b>Câu mẫu:</b> "{SENTENCE}"</p>

        {errMsg && <Alert message={errMsg} type="error" style={{ marginBottom: 12 }} />}

        <div style={{ margin: 20 }}>
          {!recording ? (
            <Button type="primary" size="large" onClick={startRecording}>🎙️ Bắt đầu nói</Button>
          ) : (
            <Button danger size="large" onClick={stopRecording}>⏹️ Dừng</Button>
          )}
        </div>

        {recognizedText ? (
          <>
            <Text strong>Bạn nói:</Text>
            <p style={{ marginBottom: 8 }}>"{recognizedText}"</p>
          </>
        ) : null}

        {score !== null ? (
          <div style={{ marginTop: 10 }}>
            <Progress percent={score} status={score > 70 ? "success" : "active"} />
            <p>🎯 <b>Điểm phát âm:</b> {score}/100</p>
          </div>
        ) : null}

        <div style={{ marginTop: 12, color: "#888" }}>
          <small>Chú ý: Web Speech API phụ thuộc trình duyệt; kết quả có thể khác nhau. Mở Console (F12) nếu gặp lỗi.</small>
        </div>
      </Card>
    </div>
  );
}

