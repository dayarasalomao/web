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

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <WhenToSeek />
      <Diseases />
      <Treatments />
      <Testimonials />
      <CV />
      <Contact />
      <Footer />
    </div>
  )
}
