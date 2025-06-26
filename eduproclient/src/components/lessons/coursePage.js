import React, { useEffect, useState } from 'react';

const CoursePage = () =>
{
	const [lessons, setLessons] = useState([]);
	const [selectedLessonIndex, setSelectedLessonIndex] = useState(0);
	const [content, setContent] = useState('');

	useEffect(() =>
	{
		fetch('/lessons/lessons.json')
			.then(res => res.json())
			.then(data =>
			{
				setLessons(data);
				loadLessonContent(data[0].file); // Load first lesson
			});
	}, []);

	const loadLessonContent = (file) =>
	{
		fetch(`/lessons/${file}`)
			.then(res => res.text())
			.then(data => setContent(data))
			.catch(() => setContent('Error loading lesson.'));
	};

	const handleSelectLesson = (index) =>
	{
		setSelectedLessonIndex(index);
		loadLessonContent(lessons[index].file);
	};

	return (
		<div className="flex flex-col md:flex-row min-h-screen">
			{/* Sidebar */}
			<aside className="w-full md:w-1/4 bg-gray-100 p-4">
				<h2 className="text-lg font-semibold mb-4">Lessons</h2>
				<ul className="space-y-2">
					{lessons.map((lesson, index) => (
						<li key={index}>
							<button
								onClick={() => handleSelectLesson(index)}
								className={`w-full text-left p-2 rounded ${index === selectedLessonIndex ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
									}`}
							>
								{lesson.title}
							</button>
						</li>
					))}
				</ul>
			</aside>

			{/* Content */}
			<main className="flex-1 p-6">
				{lessons[selectedLessonIndex] && (
					<h1 className="text-2xl font-bold mb-4">
						{lessons[selectedLessonIndex].title}
					</h1>
				)}
				<div className="whitespace-pre-wrap bg-white p-4 rounded shadow">
					{content}
				</div>
			</main>
			{/* Navigation Buttons */}
			<div className="flex justify-between mt-6">
				<button
					onClick={() => handleSelectLesson(selectedLessonIndex - 1)}
					disabled={selectedLessonIndex === 0}
					className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
				>
					Previous
				</button>

				<button
					onClick={() => handleSelectLesson(selectedLessonIndex + 1)}
					disabled={selectedLessonIndex === lessons.length - 1}
					className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
				>
					Next
				</button>
			</div>

		</div>
	);
};

export default CoursePage;
