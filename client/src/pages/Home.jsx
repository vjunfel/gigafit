import Hero from "../components/Hero";
import Footer from "../components/Footer";
import GymBenefits from "../components/GymBenefits";

const Home = () => {

	return (
		<div className="bg-black text-center text-white vh-100">
			<Hero />
			<GymBenefits />
			<Footer />
		</div>
	);
};

export default Home;
