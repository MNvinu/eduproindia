import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button, Box, Rating } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const courses = [
	{
		id: 1,
		title: 'Web Designing',
		description: 'Learn the basics of HTML, CSS, and JavaScript to design beautiful websites.',
		image: require('../assets/img/gallery/courses/web.webp'),
		price: 5000,
		instructor: 'John Doe',
		rating: 4.5,
		totalReviews: 120,
		duration: '3 total hours',
		level: 'Beginner',
		whatYouLearn: [
			'Build responsive websites using HTML, CSS, and JavaScript.',
			'Understand the fundamentals of web design and UX principles.',
			'Implement interactive elements with JavaScript.',
			'Optimize websites for performance and SEO.',
		],
	},
	{
		id: 2,
		title: 'Fashion Designing',
		description: 'Develop your creativity and design unique apparel with expert guidance.',
		image: require('../assets/img/gallery/courses/course2.jpg'),
		price: 7000,
		instructor: 'Jane Smith',
		rating: 4.6,
		totalReviews: 95,
		duration: '4 total hours',
		level: 'Intermediate',
		whatYouLearn: [
			'Build responsive websites using HTML, CSS, and JavaScript.',
			'Understand the fundamentals of web design and UX principles.',
			'Implement interactive elements with JavaScript.',
			'Optimize websites for performance and SEO.',
		],
	},
	{
		id: 3,
		title: 'Digital Marketing',
		description: 'Master social media, SEO, and digital advertising strategies.',
		image: require('../assets/img/gallery/courses/digital.jpg'),
		price: 5000,
		instructor: 'Mike Johnson',
		rating: 4.7,
		totalReviews: 142,
		duration: '5 total hours',
		level: 'All Levels',
		whatYouLearn: [
			'Build responsive websites using HTML, CSS, and JavaScript.',
			'Understand the fundamentals of web design and UX principles.',
			'Implement interactive elements with JavaScript.',
			'Optimize websites for performance and SEO.',
		],
	},
	{
		id: 4,
		title: 'Data Science',
		description: 'Analyze data and solve real-world problems with machine learning and AI.',
		image: require('../assets/img/gallery/courses/datascience.avif'),
		price: 15000,
		instructor: 'Dr. Sarah Lee',
		rating: 4.8,
		totalReviews: 200,
		duration: '8 total hours',
		level: 'Advanced',
		whatYouLearn: [
			'Build responsive websites using HTML, CSS, and JavaScript.',
			'Understand the fundamentals of web design and UX principles.',
			'Implement interactive elements with JavaScript.',
			'Optimize websites for performance and SEO.',
		],
	},
	{
		id: 5,
		title: 'Graphic Design',
		description: 'Create captivating visuals using Adobe Photoshop and Illustrator.',
		image: require('../assets/img/gallery/courses/graphcdesign.jpg'),
		price: 6000,
		instructor: 'Chris Brown',
		rating: 4.6,
		totalReviews: 110,
		duration: '6 total hours',
		level: 'Beginner',
		whatYouLearn: [
			'Build responsive websites using HTML, CSS, and JavaScript.',
			'Understand the fundamentals of web design and UX principles.',
			'Implement interactive elements with JavaScript.',
			'Optimize websites for performance and SEO.',
		],
	},
	{
		id: 6,
		title: 'SQL',
		description: 'Learn professional techniques for capturing and editing stunning photos.',
		image: require('../assets/img/gallery/courses/sql.png'),
		price: 4000,
		instructor: 'Emily White',
		rating: 4.4,
		totalReviews: 85,
		duration: '3.5 total hours',
		level: 'Beginner',
		whatYouLearn: [
			'Build responsive websites using HTML, CSS, and JavaScript.',
			'Understand the fundamentals of web design and UX principles.',
			'Implement interactive elements with JavaScript.',
			'Optimize websites for performance and SEO.',
		],
	},
	{
		id: 7,
		title: 'Mobile App Development',
		description: 'Build cross-platform mobile applications with React Native and Flutter.',
		image: require('../assets/img/gallery/courses/mobile.jpeg'),
		price: 20000,
		instructor: 'Robert Black',
		rating: 4.9,
		totalReviews: 175,
		duration: '10 total hours',
		level: 'Advanced',
		whatYouLearn: [
			'Build responsive websites using HTML, CSS, and JavaScript.',
			'Understand the fundamentals of web design and UX principles.',
			'Implement interactive elements with JavaScript.',
			'Optimize websites for performance and SEO.',
		],
	},
	{
		id: 8,
		title: 'Cybersecurity',
		description: 'Protect systems and data from digital threats with advanced techniques.',
		image: require('../assets/img/mainpgpic.jpg'),
		price: 10000,
		instructor: 'Nathan Green',
		rating: 4.7,
		totalReviews: 132,
		duration: '7 total hours',
		level: 'Intermediate',
		whatYouLearn: [
			'Build responsive websites using HTML, CSS, and JavaScript.',
			'Understand the fundamentals of web design and UX principles.',
			'Implement interactive elements with JavaScript.',
			'Optimize websites for performance and SEO.',
		],
	},
	{
		id: 9,
		title: 'Artificial Intelligence',
		description: 'Explore the foundations of AI and build intelligent applications.',
		image: require('../assets/img/wallpic1.jpg'),
		price: 13000,
		instructor: 'Sophia Brown',
		rating: 4.8,
		totalReviews: 210,
		duration: '12 total hours',
		level: 'Advanced',
		whatYouLearn: [
			'Build responsive websites using HTML, CSS, and JavaScript.',
			'Understand the fundamentals of web design and UX principles.',
			'Implement interactive elements with JavaScript.',
			'Optimize websites for performance and SEO.',
		],
	},
	{
		id: 10,
		title: 'Business Management',
		description: 'Develop management skills for success in any business environment.',
		image: require('../assets/img/wallpic3.jpg'),
		price: 9000,
		instructor: 'David Wilson',
		rating: 4.5,
		totalReviews: 98,
		duration: '6 total hours',
		level: 'All Levels',
		whatYouLearn: [
			'Build responsive websites using HTML, CSS, and JavaScript.',
			'Understand the fundamentals of web design and UX principles.',
			'Implement interactive elements with JavaScript.',
			'Optimize websites for performance and SEO.',
		],
	},
];

export default function MainPage()
{
	const navigate = useNavigate();

	const handleViewCourse = (id) =>
	{
		navigate(`/course/${id}`);
	};

	return (
		<Box sx={{ padding: '40px', marginTop: '30px' }}>
			<Typography variant="h3" gutterBottom>
				Explore Our Courses
			</Typography>
			<Grid container spacing={4}>
				{/* Left side - Menu */}
				<Grid item xs={12} md={3}>
					<Card sx={{ padding: '20px', height: '100%' }}>
						<Button fullWidth variant="outlined" sx={{ marginBottom: '20px', fontSize: '14px', fontWeight:'500px'}}>
							Menu
						</Button>
						{/* <Typography variant="h5" gutterBottom>Menu</Typography> */}
						<Typography variant="h5" className='CourseMenu' gutterBottom>HTML</Typography>
						<Typography variant="h5" className='CourseMenu' gutterBottom>CSS</Typography>
						<Typography variant="h5" className='CourseMenu' gutterBottom>JavaScript</Typography>
						<Typography variant="h5" className='CourseMenu' gutterBottom>BootStrap</Typography>
						<Typography variant="h5" className='CourseMenu' gutterBottom>Digital Marketing</Typography>
						<Typography variant="h5" className='CourseMenu' gutterBottom>Cyber Security</Typography>
						<Typography variant="h5" className='CourseMenu' gutterBottom>Graphic Design</Typography>
						<Typography variant="h5" className='CourseMenu' gutterBottom>Data Science</Typography>
						<Typography variant="h5" className='CourseMenu' gutterBottom>Mobile App Development</Typography>
						<Typography variant="h5" className='CourseMenu' gutterBottom>Web App Development</Typography>
						<Typography variant="h5" className='CourseMenu' gutterBottom>Python</Typography>
						<Typography variant="h5" className='CourseMenu' gutterBottom>React</Typography>
						<Typography variant="h5" className='CourseMenu' gutterBottom>NodeJS</Typography>
						<Typography variant="h5" className='CourseMenu' gutterBottom>SQL</Typography>
						<Typography variant="h5" className='CourseMenu' gutterBottom>Excel</Typography>
						<Typography variant="h5" className='CourseMenu' gutterBottom>Angular</Typography>
						<Typography variant="h5" className='CourseMenu' gutterBottom>C++</Typography>
						<Typography variant="h5" className='CourseMenu' gutterBottom>Java</Typography>
					</Card>
				</Grid>

				{/* Right side - Course Grid */}
				<Grid item xs={12} md={9}>
					<Grid container spacing={3}>
						{courses.map((course) => (
							<Grid item xs={12} key={course.id}>
								<Card sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
									<CardMedia
										component="img"
										sx={{ width: 160, height: 120, borderRadius: '5px' }}
										image={course.image}
										alt={course.title}
									/>
									<CardContent sx={{ flex: 1, paddingLeft: '20px' }}>
										<Typography variant="h4" gutterBottom>
											{course.title}
										</Typography>
										<Typography variant="h4" color="text.secondary" gutterBottom>
											{course.description}
										</Typography>
										<Typography variant="h5" gutterBottom>
											Instructor: {course.instructor}
										</Typography>
										<Box display="flex" alignItems="center" gutterBottom>
											<Rating value={course.rating} precision={0.1} readOnly />
											<Typography variant="h5" sx={{ marginLeft: '8px' }}>
												{course.rating} ({course.totalReviews} reviews)
											</Typography>
										</Box>
										<Typography variant="h5" gutterBottom>
											Duration: {course.duration} | {course.level}
										</Typography>
										<Typography variant="h5" color="primary">
											{/* Price: ₹{course.price} */}
										</Typography>
										<Button
											variant="contained"
											color="primary"
											sx={{ marginTop: '10px' }}
											onClick={() => handleViewCourse(course.id)}
										>
											View Details
										</Button>
									</CardContent>
								</Card>
							</Grid>
						))}
					</Grid>
				</Grid>
			</Grid>
		</Box>

	);
}
