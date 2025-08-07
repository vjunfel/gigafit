import { Container, Row, Col } from "react-bootstrap";

const GymBenefits = () => {
	const benefits = [
		["Open 24 hours", "Personal & group training"],
		["Access to 5,000+ gyms", "Free fitness consultation"],
		["Personalized plan",	"Free access to Apple Fitness+"],
	];

	return (
		<div id="learn-more" className="py-5 bg-white text-dark text-center">
			<h2 className="fw-bold mb-3 mt-5">FIND A GYM WITH</h2>
			<h2 className="fw-bold mb-5">ALL THE RIGHT BENEFITS</h2>

			<Container>
				<Row className="justify-content-center">
					{benefits.map((column, colIdx) => (
						<Col
							key={colIdx}
							md={4}
							className="mb-5 text-start"
						>
							{column.map((item, idx) => (
								<div
									key={idx}
									className="d-flex align-items-center mb-3"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										className="bi bi-check-lg"
										viewBox="0 0 16 16"
									>
										<path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
									</svg>
									<span className="ms-2">{item}</span>
								</div>
							))}
						</Col>
					))}
				</Row>
			</Container>
		</div>
	);
};

export default GymBenefits;
