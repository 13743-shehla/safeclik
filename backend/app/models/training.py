from sqlalchemy import Column, String, Integer, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base
import uuid

class TrainingModule(Base):
    __tablename__ = "training_modules"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    category = Column(String, nullable=False) # Phishing, Passwords, Ransomware, Remote Work
    difficulty = Column(String, default="Beginner", nullable=False)
    estimated_minutes = Column(Integer, default=15)
    badge_name = Column(String, default="Cyber Defender")
    icon = Column(String, default="Shield")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    lessons = relationship("Lesson", back_populates="module", cascade="all, delete-orphan", order_by="Lesson.order_index")
    quiz = relationship("Quiz", back_populates="module", uselist=False, cascade="all, delete-orphan")

class Lesson(Base):
    __tablename__ = "lessons"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    module_id = Column(String, ForeignKey("training_modules.id", ondelete="CASCADE"), nullable=False)
    title = Column(String, nullable=False)
    content_markdown = Column(Text, nullable=False)
    order_index = Column(Integer, default=1)
    key_takeaways_json = Column(Text, nullable=True) # JSON list of strings

    module = relationship("TrainingModule", back_populates="lessons")

class Quiz(Base):
    __tablename__ = "quizzes"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    module_id = Column(String, ForeignKey("training_modules.id", ondelete="CASCADE"), unique=True, nullable=False)
    passing_score = Column(Integer, default=80)

    module = relationship("TrainingModule", back_populates="quiz")
    questions = relationship("QuizQuestion", back_populates="quiz", cascade="all, delete-orphan")

class QuizQuestion(Base):
    __tablename__ = "quiz_questions"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    quiz_id = Column(String, ForeignKey("quizzes.id", ondelete="CASCADE"), nullable=False)
    question_text = Column(Text, nullable=False)
    options_json = Column(Text, nullable=False) # JSON array of 4 options
    correct_answer_index = Column(Integer, nullable=False)
    explanation = Column(Text, nullable=False)

    quiz = relationship("Quiz", back_populates="questions")

class QuizAttempt(Base):
    __tablename__ = "quiz_attempts"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    quiz_id = Column(String, ForeignKey("quizzes.id", ondelete="CASCADE"), nullable=False)
    score = Column(Integer, nullable=False)
    passed = Column(Boolean, default=False)
    completed_at = Column(DateTime(timezone=True), server_default=func.now())

class TrainingProgress(Base):
    __tablename__ = "training_progress"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    module_id = Column(String, ForeignKey("training_modules.id", ondelete="CASCADE"), nullable=False)
    completed = Column(Boolean, default=False)
    score = Column(Integer, nullable=True)
    last_accessed = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
