import React from "react";
import { Card, CardContent, Typography, Box, Button, Divider, Grid } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import PeopleIcon from "@mui/icons-material/People";

const CourseCard = () =>
{
	return (
		// <Card sx={{ maxWidth: 900, margin: "auto", boxShadow: 3, borderRadius: 3 }}>
		<div className="mt-100 ml-50 mr-50">
			<CardContent>
				<Typography variant="h4" color="textSecondary" gutterBottom>
					Courses &gt; Web Development 
				</Typography>

				<Typography variant="h3" fontWeight="bold" gutterBottom>
					HTML and CSS for Beginners - Build a Website & Launch ONLINE
				</Typography>

				<Typography variant="h4" color="textSecondary" gutterBottom>
					HTML and CSS for Beginners course will give you all the knowledge you
					need to master HTML and CSS easily and quickly.
				</Typography>

				<Typography variant="h5" color="primary" gutterBottom>
					 Access this top-rated course, plus 1000+ more top-rated courses, with a EduProIndia plan.
				</Typography>

				<Typography variant="h5" color="textSecondary">
					Last updated 10/2024 • English [Auto], Bulgarian [Auto], 19 more
				</Typography>

				<Grid container spacing={2} alignItems="center" sx={{ mt: 2 }}>
					<Grid item>
						<Box display="flex" alignItems="center">
							<StarIcon sx={{ color: "#FFA41B" }} />
							<Typography variant="h4" sx={{ ml: 0.5 }}>
								4.4
							</Typography>
						</Box>
						<Typography variant="h5" color="textSecondary">
							36,983 ratings
						</Typography>
					</Grid>

					<Grid item>
						<Box display="flex" alignItems="center">
							<PeopleIcon sx={{ color: "#6C757D" }} />
							<Typography variant="h4" sx={{ ml: 0.5 }}>
								371,086
							</Typography>
						</Box>
						<Typography variant="h5" color="textSecondary">
							learners
						</Typography>
					</Grid>
				</Grid>
				<Divider sx={{ my: 3 }} />

				<Typography variant="h4" fontWeight="bold" gutterBottom>
					What you'll learn
				</Typography>

				<Grid container spacing={2}>
					<Grid item xs={6}>
						<ul>
							<li>You will Learn HTML</li>
							<li>You will get a certification after the course that you can print</li>
						</ul>
					</Grid>
					<Grid item xs={6}>
						<ul >
							<li>You will learn CSS</li>
							<li>You will get the skills you need to make websites</li>
						</ul>
					</Grid>
				</Grid>
				<button className="theme btn" size="large">
					Get Started
				</button>
			</CardContent>
			
		</div>
		
	);
};

export default CourseCard;