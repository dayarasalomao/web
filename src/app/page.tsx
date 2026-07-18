import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import WhenToSeek from '@/components/WhenToSeek'
import Diseases from '@/components/Diseases'
import Treatments from '@/components/Treatments'
import Testimonials from '@/components/Testimonials'
import CV from '@/components/CV'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import LatestArticles from '@/components/LatestArticles'
import PracticeTransitionNotice from '@/components/PracticeTransitionNotice'

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen">
      <Header />
      <Hero />
      <PracticeTransitionNotice />
      <About />
      <WhenToSeek />
      <Diseases />
      <Treatments />
      <LatestArticles />
      <Testimonials />
      <CV />
      <Contact />
      <Footer />
    </main>
  )
}
