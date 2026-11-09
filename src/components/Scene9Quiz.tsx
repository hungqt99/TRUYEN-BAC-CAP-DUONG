import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/storyData';
import { soundFx } from '../utils/audioSynthesis';
import { RotateCcw, ArrowRight, CheckCircle2, HelpCircle, Star, Sparkles, Volume2 } from 'lucide-react';

interface Scene9QuizProps {
  onSpeakQuestion: (text: string) => void;
  onConcludeQuiz: () => void;
}

export const Scene9Quiz: React.FC<Scene9QuizProps> = ({ onSpeakQuestion, onConcludeQuiz }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [starsEarned, setStarsEarned] = useState(0);

  const question = QUIZ_QUESTIONS[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === QUIZ_QUESTIONS.length - 1;

  const handleSelectOption = (idx: number, isCorrect: boolean) => {
    setSelectedOptionIndex(idx);
    setShowAnswer(true);

    if (isCorrect) {
      soundFx.playSuccessFanfare();
      setStarsEarned((prev) => prev + 1);
      onSpeakQuestion(`Hoan hô các con! ${question.explanation}`);
    } else {
      soundFx.playChime(350);
      onSpeakQuestion("Bé hãy suy nghĩ thêm một chút nhé!");
    }
  };

  const handleAskAgain = () => {
    setShowAnswer(false);
    setSelectedOptionIndex(null);
    soundFx.playChime();
    onSpeakQuestion(`${question.numberText}: ${question.question}`);
  };

  const handleNextQuestion = () => {
    soundFx.playChime();
    if (!isLastQuestion) {
      const nextIdx = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIdx);
      setSelectedOptionIndex(null);
      setShowAnswer(false);
      onSpeakQuestion(`${QUIZ_QUESTIONS[nextIdx].numberText}: ${QUIZ_QUESTIONS[nextIdx].question}`);
    } else {
      soundFx.playSuccessFanfare();
      onSpeakQuestion("Các con giỏi lắm! Cô khen tất cả các con!");
      onConcludeQuiz();
    }
  };

  return (
    <div className="bg-amber-50/90 backdrop-blur-md rounded-3xl p-5 md:p-7 border-2 border-amber-300 shadow-xl max-w-4xl mx-auto my-3">
      {/* Header with Step Tracker */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-amber-200 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="w-10 h-10 rounded-2xl bg-amber-500 text-white font-extrabold flex items-center justify-center text-lg shadow-md">
            {currentQuestionIndex + 1}
          </span>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-slate-800">
              {question.numberText}: {question.question}
            </h3>
            <p className="text-xs md:text-sm text-slate-600 font-medium">
              Gợi ý của cô: {question.hint}
            </p>
          </div>
        </div>

        {/* Stars Earned */}
        <div className="flex items-center gap-1.5 bg-amber-100 text-amber-800 px-3.5 py-1.5 rounded-full font-bold text-sm shadow-sm border border-amber-300">
          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span>Bé nhận {starsEarned} sao</span>
        </div>
      </div>

      {/* Answer Cards for Toddlers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-6">
        {question.options.map((opt, idx) => {
          const isSelected = selectedOptionIndex === idx;
          const showResult = showAnswer;
          const isCorrect = opt.isCorrect;

          let btnColor = "bg-white hover:bg-amber-50/80 border-amber-200 text-slate-700 shadow-sm";
          if (showResult && isCorrect) {
            btnColor = "bg-emerald-50 border-emerald-400 text-emerald-800 ring-2 ring-emerald-300 shadow-md";
          } else if (showResult && isSelected && !isCorrect) {
            btnColor = "bg-rose-50 border-rose-300 text-rose-700";
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(idx, opt.isCorrect)}
              className={`p-4 rounded-2xl border-2 text-left transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex flex-col justify-between min-h-[110px] ${btnColor}`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <span className="text-2xl">{opt.icon}</span>
                {showResult && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                )}
              </div>
              <span className="font-bold text-sm md:text-base leading-snug">
                {opt.text}
              </span>
            </button>
          );
        })}
      </div>

      {/* Explanation Box */}
      {showAnswer && (
        <div className="bg-emerald-100/80 border border-emerald-300 text-emerald-950 p-4 rounded-2xl mb-5 flex items-start gap-3 shadow-sm animate-fade-in">
          <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <p className="text-sm md:text-base font-semibold leading-relaxed">
            {question.explanation}
          </p>
        </div>
      )}

      {/* Required Interactive Action Buttons: "Cô hỏi lại" & "Tiếp tục" */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <button
          onClick={handleAskAgain}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 font-bold border border-slate-300 shadow-sm transition-all hover:scale-102"
        >
          <RotateCcw className="w-4 h-4 text-slate-600" />
          <span>Cô hỏi lại</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSpeakQuestion(`${question.numberText}: ${question.question}`)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold shadow-md transition-all hover:scale-102"
          >
            <Volume2 className="w-4 h-4" />
            <span>Nghe câu hỏi</span>
          </button>

          <button
            onClick={handleNextQuestion}
            className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold shadow-md transition-all hover:scale-105"
          >
            <span>{isLastQuestion ? 'Hoàn thành câu hỏi' : 'Tiếp tục câu hỏi'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
