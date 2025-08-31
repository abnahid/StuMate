import { Timer } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Label } from "../../../../components/ui/label";
import { Progress } from "../../../../components/ui/progress";
import { RadioGroup, RadioGroupItem } from "../../../../components/ui/radio-group";
import { cn } from '../../../../lib/utils';
import { QuizResults } from './QuizResults';

const TIME_PER_QUESTION = 60;

export function QuizDisplay({ quizData, onExit, onRetry }) {
    const [quizState, setQuizState] = useState('start');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [timeLeft, setTimeLeft] = useState(quizData.questions.length * TIME_PER_QUESTION);

    useEffect(() => {
        if (quizState !== 'in-progress' || timeLeft === 0) return;

        const timerId = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timerId);
                    setQuizState('finished');
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timerId);
    }, [quizState, timeLeft]);

    const startQuiz = () => {
        setQuizState('in-progress');
        setUserAnswers(new Array(quizData.questions.length).fill(null));
    };

    const handleAnswerSelect = (answer) => {
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestionIndex] = answer;
        setUserAnswers(newAnswers);
    };



    const handleNextQuestion = () => {
        if (currentQuestionIndex < quizData.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setQuizState('finished');
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    if (quizState === 'start') {
        return (
            <Card className="h-full">
                <CardHeader>
                    <CardTitle>You are about to start a quiz!</CardTitle>
                    <CardDescription>Topic: <strong>{quizData.settings.topic}</strong></CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-center">
                    <p>Number of Questions: {quizData.questions.length}</p>
                    <p>Time Limit: {formatTime(timeLeft)}</p>
                    <p>When you are ready, click the start button.</p>
                    <div className="flex gap-4 justify-center pt-4">
                        <Button onClick={onExit} variant="outline">Exit</Button>
                        <Button onClick={startQuiz}>Start Quiz</Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (quizState === 'finished') {
        return <QuizResults quizData={quizData} userAnswers={userAnswers} onRetry={onRetry} />;
    }

    const currentQuestion = quizData.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / quizData.questions.length) * 100;

    // Render different UI based on question type
    let answerInput;

    if (currentQuestion.type === 'mcq' && Array.isArray(currentQuestion.options)) {
        answerInput = (
            <RadioGroup
                onValueChange={handleAnswerSelect}
                value={userAnswers[currentQuestionIndex]}
                className="space-y-3"
            >
                {currentQuestion.options.map((option, index) => (
                    <Label key={index} className={cn(
                        "flex items-center gap-3 rounded-lg border p-4 cursor-pointer hover:bg-accent hover:text-white",
                        userAnswers[currentQuestionIndex] === option && "bg-primary/20 border-primary"
                    )}>
                        <RadioGroupItem value={option} id={`q${currentQuestionIndex}-o${index}`} />
                        {option}
                    </Label>
                ))}
            </RadioGroup>
        );
    } else if (currentQuestion.type === 'truefalse') {
        answerInput = (
            <RadioGroup
                onValueChange={handleAnswerSelect}
                value={userAnswers[currentQuestionIndex]}
                className="space-y-3"
            >
                {['True', 'False'].map((option, index) => (
                    <Label key={index} className={cn(
                        "flex items-center gap-3 rounded-lg border p-4 cursor-pointer hover:bg-accent hover:text-white",
                        userAnswers[currentQuestionIndex] === option && "bg-primary/20 border-primary"
                    )}>
                        <RadioGroupItem value={option} id={`q${currentQuestionIndex}-tf${index}`} />
                        {option}
                    </Label>
                ))}
            </RadioGroup>
        );
    } else {
        answerInput = <p className="text-destructive">Unknown question type.</p>;
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>Question {currentQuestionIndex + 1} / {quizData.questions.length}</CardTitle>
                    <div className="flex items-center gap-2 text-lg font-semibold text-destructive">
                        <Timer className="h-5 w-5" />
                        <span>{formatTime(timeLeft)}</span>
                    </div>
                </div>
                <Progress value={progress} className="mt-2" />
            </CardHeader>
            <CardContent className="space-y-6">
                <p className="text-lg font-medium">{currentQuestion.question}</p>
                {answerInput}
                <div className="flex justify-end pt-4">
                    <Button
                        onClick={handleNextQuestion}
                        disabled={
                            currentQuestion.type === 'short'
                                ? !userAnswers[currentQuestionIndex] || userAnswers[currentQuestionIndex].trim() === ''
                                : !userAnswers[currentQuestionIndex]
                        }
                    >
                        {currentQuestionIndex < quizData.questions.length - 1 ? "Next Question" : "Finish Quiz"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}