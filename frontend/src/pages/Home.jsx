
import BestSeller from '../components/BestSeller'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import NewsLetter from '../components/NewsLetter'
import OurPolicy from '../components/OurPolicy'

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <LatestCollection></LatestCollection>
      <BestSeller></BestSeller>
      <OurPolicy></OurPolicy>
      <NewsLetter></NewsLetter>
    </div>
  )
}

export default Home