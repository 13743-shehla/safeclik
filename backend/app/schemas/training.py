from pydantic import BaseModel
from typing import List, Optional, Any
from datetime import datetime

class LessonOut(BaseModel):
    id: str
    module_id: str
    title: str
    content: str
    order_index: int
    key_takeaways: List[str] = []

    class Config:
        from_attributes = True

class QuizQuestionOut(BaseModel):
    id: str
    question_text: str
    options: List[str]
    correct_answer_index: Optional[int] = None
    explanation: Optional[str] = None

    class Config:
        from_attributes = True

class QuizOut(BaseModel):
    id: str
    module_id: str
    passing_score: int
    questions: List[QuizQuestionOut] = []

    class Config:
        from_attributes = True

class TrainingModuleOut(BaseModel):
    id: str
    title: str
    description: str
    category: str
    difficulty: str
    estimated_minutes: int
    badge_name: str
    icon: str
    lessons: List[LessonOut] = []
    quiz: Optional[QuizOut] = None
    completed: Optional[bool] = False
    score: Optional[int] = None

    class Config:
        from_attributes = True

class QuizSubmission(BaseModel):
    answers: dict[str, int] # question_index or question_id -> chosen option index

class QuizResultOut(BaseModel):
    score: int
    passed: bool
    passing_score: int
    badge_awarded: Optional[str] = None
    points_awarded: int
