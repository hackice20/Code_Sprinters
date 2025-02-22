import Quiz from '@/components/Admin/Course/Quiz';
import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

const CreateQuiz = () => {
  const token = sessionStorage.getItem("token");
  const [course, setCourse] = useState([]);
  const {id} = useParams();
  const form = useForm({
    defaultValues: {
      title: course.title,
      course: id,
      timeLimit: 30,
      quiz: Array(10).fill({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
      }),
    },
  });

  const getCourse = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/courses/${id}`, {
        method: "GET"
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setCourse(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCourse();
  }, [id]);

  const router = useNavigate();
  const handleCreateQuiz = async () => {
    try {
      const formData = form.getValues();
      
      console.log(formData);
      const response = await fetch(`http://localhost:3000/api/quiz`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          title: course.title,
          course: id,
          questions: formData.quiz,
          timer: formData.timeLimit,
        }),
      });

      if (response.ok) {
        alert('Quiz created successfully!');
        router('/admin/quizzes');
      } else {
        const errorData = await response.json();
        alert(`Failed to create quiz: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Failed to create quiz:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <FormProvider {...form}>
        <Quiz form={form} questions={form.getValues().quiz} />
      </FormProvider>
      <div className="flex justify-center w-full">
        <button
          className="bg-purple-600 hover:bg-purple-700 m-5 p-2 text-white rounded"
          onClick={handleCreateQuiz}
        >
          Create Quiz
        </button>
      </div>
    </div>
  );
};

export default CreateQuiz;
