import React from 'react';

const TopicCard = ({ imageSrc, title }) => (
	<div className="col-lg-3 col-md-4 col-sm-6">
		<div className="single-topic text-center mb-30">
			<div className="topic-img">
				<img src={imageSrc} alt={title} />
				<div className="topic-content-box">
					<div className="topic-content">
						<h3><a href="#">{title}</a></h3>
					</div>
				</div>
			</div>
		</div>
	</div>
);

const TopicArea = () =>
{
	return (
		<div className="topic-area section-padding40">
			<div className="container">

				{/* Section Title */}
				<div className="row justify-content-center">
					<div className="col-xl-7 col-lg-8">
						<div className="section-tittle text-center mb-55">
							<h2>Explore top subjects</h2>
						</div>
					</div>
				</div>

				{/* Topics Grid */}
				<div className="row">
					<TopicCard imageSrc={require("../assets/img/gallery/topic1.png")} title="Programming" />
					{/* <TopicCard imageSrc="../assets/img/gallery/topic1.png" title="Programming" /> */}
					<TopicCard imageSrc={require("../assets/img/gallery/topic2.png")} title="Digital Marketing" />
					<TopicCard imageSrc={require("../assets/img/gallery/topic3.png")} title="Data Science" />
					<TopicCard imageSrc={require("../assets/img/gallery/topic4.png")} title="Graphic Designing" />
					<TopicCard imageSrc={require("../assets/img/gallery/topic5.png")} title="Interior Designing" />
					<TopicCard imageSrc={require("../assets/img/gallery/topic6.png")} title="Web Designing" />
					<TopicCard imageSrc={require("../assets/img/gallery/topic7.png")} title="Programming" />
					<TopicCard imageSrc={require("../assets/img/gallery/topic8.png")} title="Virtual Assisting" />
				</div>

				{/* View More Button */}
				<div className="row justify-content-center">
					<div className="col-xl-12">
						<div className="section-tittle text-center mt-20">
							<a href="/main" className="border-btn">View More Subjects</a>
						</div>
					</div>
				</div>

			</div>
		</div>
	);
};

export default TopicArea;
